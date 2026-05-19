import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:shared_preferences/shared_preferences.dart';

enum MessageSender { user, ai }
enum MessageType { text, medicalRejection, foodEstimate, exerciseSwap }

class ChatMessage {
  final String id;
  final MessageSender sender;
  MessageType type;
  String content;
  final DateTime timestamp;
  bool isStreaming;
  Map<String, dynamic>? extraData;

  ChatMessage({
    required this.id,
    required this.sender,
    required this.content,
    required this.timestamp,
    this.type = MessageType.text,
    this.isStreaming = false,
    this.extraData,
  });
}

class ChatProvider extends ChangeNotifier {
  static String get _socketUrl {
    if (kIsWeb) return 'http://localhost:3003';
    return 'http://10.0.2.2:3003';
  }

  IO.Socket? _socket;
  final List<ChatMessage> _messages = [];
  bool _isConnected = false;
  bool _isTyping = false;
  String? _streamingMessageId;

  List<ChatMessage> get messages => List.unmodifiable(_messages);
  bool get isConnected => _isConnected;
  bool get isTyping => _isTyping;

  ChatProvider() {
    _addWelcomeMessage();
  }

  void _addWelcomeMessage() {
    _messages.add(ChatMessage(
      id: 'welcome',
      sender: MessageSender.ai,
      content: "Hey! I'm HLV Zen, your personal AI trainer. 💪\nHow can I help you today?",
      timestamp: DateTime.now(),
      type: MessageType.text,
    ));
  }

  Future<void> connectWithToken() async {
    _socket?.disconnect();
    _socket?.dispose();

    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('jwt_token');

    _socket = IO.io(
      _socketUrl,
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .setAuth({'token': token}) // Dynamically authenticate socket with token
          .disableAutoConnect()
          .build(),
    );

    _socket!.onConnect((_) {
      _isConnected = true;
      notifyListeners();
    });

    _socket!.onDisconnect((_) {
      _isConnected = false;
      notifyListeners();
    });

    _socket!.on('chat_stream_start', (_) {
      _isTyping = true;
      final streamId = DateTime.now().millisecondsSinceEpoch.toString();
      _streamingMessageId = streamId;
      _messages.add(ChatMessage(
        id: streamId,
        sender: MessageSender.ai,
        content: '',
        timestamp: DateTime.now(),
        isStreaming: true,
      ));
      notifyListeners();
    });

    _socket!.on('chat_stream_chunk', (data) {
      if (_streamingMessageId == null) return;
      final idx = _messages.indexWhere((m) => m.id == _streamingMessageId);
      if (idx != -1) {
        _messages[idx].content += (data['chunk'] ?? '');
        notifyListeners();
      }
    });

    _socket!.on('chat_response_complete', (data) {
      _isTyping = false;
      final intent = data['intent'] ?? 'general_response';

      if (_streamingMessageId != null) {
        final idx = _messages.indexWhere((m) => m.id == _streamingMessageId);
        if (idx != -1) {
          _messages[idx].isStreaming = false;
          _messages[idx].content = data['message'] ?? _messages[idx].content;

          if (intent == 'medical_rejection') {
            _messages[idx].type = MessageType.medicalRejection;
          } else if (intent == 'food_estimate') {
            _messages[idx].type = MessageType.foodEstimate;
            _messages[idx].extraData = Map<String, dynamic>.from(data);
          } else if (intent == 'exercise_swap') {
            _messages[idx].type = MessageType.exerciseSwap;
            _messages[idx].extraData = Map<String, dynamic>.from(data);
          }
        }
        _streamingMessageId = null;
      } else {
        _messages.add(ChatMessage(
          id: DateTime.now().millisecondsSinceEpoch.toString(),
          sender: MessageSender.ai,
          content: data['message'] ?? 'I cannot help with that.',
          timestamp: DateTime.now(),
          type: intent == 'medical_rejection' ? MessageType.medicalRejection : MessageType.text,
          extraData: intent == 'food_estimate' || intent == 'exercise_swap'
              ? Map<String, dynamic>.from(data)
              : null,
        ));
      }
      notifyListeners();
    });

    _socket!.on('chat_error', (data) {
      _isTyping = false;
      _streamingMessageId = null;
      _messages.add(ChatMessage(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        sender: MessageSender.ai,
        content: data['message'] ?? 'Something went wrong. Please try again.',
        timestamp: DateTime.now(),
      ));
      notifyListeners();
    });

    _socket!.connect();
  }

  void clearData() {
    _socket?.disconnect();
    _socket?.dispose();
    _socket = null;
    _isConnected = false;
    _isTyping = false;
    _streamingMessageId = null;
    _messages.clear();
    _addWelcomeMessage();
    notifyListeners();
  }

  void sendMessage(String text, Map<String, dynamic> userContext) {
    if (text.trim().isEmpty) return;

    _messages.add(ChatMessage(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      sender: MessageSender.user,
      content: text.trim(),
      timestamp: DateTime.now(),
    ));
    notifyListeners();

    _socket?.emit('chat_message', {'message': text.trim(), 'context': userContext});
  }

  void reconnect() {
    _socket?.connect();
  }

  @override
  void dispose() {
    _socket?.dispose();
    super.dispose();
  }
}
