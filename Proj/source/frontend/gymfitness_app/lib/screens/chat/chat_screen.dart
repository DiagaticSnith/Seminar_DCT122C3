import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../providers/chat_provider.dart';
import '../../providers/profile_provider.dart';
import '../../providers/tracking_provider.dart';
import '../../utils/constants.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _textController = TextEditingController();
  final _scrollController = ScrollController();
  bool _isSending = false;
  final Set<String> _loggedFoodMessageIds = {};

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _sendMessage() {
    final text = _textController.text.trim();
    if (text.isEmpty || _isSending) return;

    final profileProvider = context.read<ProfileProvider>();
    final profile = profileProvider.profileData ?? {};
    final trackingProvider = context.read<TrackingProvider>();
    final dailyLog = trackingProvider.dailyLog ?? {};
    final foodLogs = dailyLog['foodLogs'] as List<dynamic>? ?? [];

    final foodsList = foodLogs.map((log) {
      final foodName = log['food']?['name'] ?? 'Unknown Food';
      final grams = log['grams'] ?? 0;
      return '$foodName (${grams}g)';
    }).join(', ');

    final userContext = {
      'userId': profile['userId'] ?? 'Athlete',
      'goal': profile['goal'] ?? 'Muscle Gain',
      'workoutStyle': profile['workoutStyle'] ?? 'Bodybuilding',
      'tdee': profile['targetCalories'] ?? 2500,
      'targetProtein': profile['targetProtein'] ?? 150,
      'targetCarbs': profile['targetCarbs'] ?? 250,
      'targetFat': profile['targetFat'] ?? 70,
      'weight': profile['weight'] ?? 70,
      'diet': profile['diet'] ?? 'Balanced',
      'todayCalories': dailyLog['caloriesConsumed'] ?? 0,
      'todayProtein': dailyLog['proteinConsumed'] ?? 0,
      'todayCarbs': dailyLog['carbsConsumed'] ?? 0,
      'todayFat': dailyLog['fatConsumed'] ?? 0,
      'todayFoods': foodsList.isNotEmpty ? foodsList : 'None',
    };

    context.read<ChatProvider>().sendMessage(text, userContext);
    _textController.clear();
    setState(() => _isSending = false);
    _scrollToBottom();
  }

  @override
  Widget build(BuildContext context) {
    final chatProvider = context.watch<ChatProvider>();

    // Auto-scroll whenever messages change
    if (chatProvider.messages.isNotEmpty) {
      _scrollToBottom();
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: _buildAppBar(chatProvider),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              itemCount: chatProvider.messages.length + (chatProvider.isTyping ? 1 : 0),
              itemBuilder: (context, index) {
                // Typing indicator at end
                if (index == chatProvider.messages.length) {
                  return _buildTypingIndicator();
                }
                final message = chatProvider.messages[index];
                return _buildMessageBubble(message);
              },
            ),
          ),
          _buildInputBar(chatProvider),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(ChatProvider chatProvider) {
    return AppBar(
      backgroundColor: AppColors.inputBackground,
      elevation: 0,
      titleSpacing: 0,
      title: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.neonGreen.withOpacity(0.15),
              border: Border.all(color: AppColors.neonGreen, width: 2),
            ),
            child: const Center(
              child: Text('🤖', style: TextStyle(fontSize: 22)),
            ),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'HLV Zen',
                style: TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.bold),
              ),
              Row(
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: chatProvider.isConnected ? AppColors.neonGreen : Colors.red,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Text(
                    chatProvider.isConnected ? 'Online' : 'Connecting...',
                    style: TextStyle(
                      color: chatProvider.isConnected ? AppColors.neonGreen : Colors.red,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
      actions: [
        if (!chatProvider.isConnected)
          IconButton(
            icon: const Icon(Icons.refresh, color: AppColors.neonGreen),
            onPressed: () => context.read<ChatProvider>().reconnect(),
          ),
        const SizedBox(width: 8),
      ],
    );
  }

  Widget _buildMessageBubble(ChatMessage message) {
    final isUser = message.sender == MessageSender.user;
    final time = DateFormat('hh:mm a').format(message.timestamp);

    if (message.type == MessageType.medicalRejection) {
      return _buildMedicalRejectionCard(message, time);
    }
    if (message.type == MessageType.foodEstimate) {
      return _buildFoodEstimateCard(message, time);
    }
    if (message.type == MessageType.exerciseSwap) {
      return _buildExerciseSwapCard(message, time);
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        mainAxisAlignment: isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (!isUser) ...[
            Container(
              width: 32,
              height: 32,
              margin: const EdgeInsets.only(right: 8),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.neonGreen.withOpacity(0.15),
                border: Border.all(color: AppColors.neonGreen),
              ),
              child: const Center(child: Text('🤖', style: TextStyle(fontSize: 16))),
            ),
          ],
          Flexible(
            child: Column(
              crossAxisAlignment: isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
              children: [
                Container(
                  constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: isUser ? AppColors.neonGreen : AppColors.inputBackground,
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(18),
                      topRight: const Radius.circular(18),
                      bottomLeft: Radius.circular(isUser ? 18 : 4),
                      bottomRight: Radius.circular(isUser ? 4 : 18),
                    ),
                    border: isUser ? null : Border.all(color: AppColors.darkGreenBorder),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        message.content.isEmpty && message.isStreaming ? '...' : message.content,
                        style: TextStyle(
                          color: isUser ? Colors.black : Colors.white,
                          fontSize: 15,
                          height: 1.45,
                          fontWeight: isUser ? FontWeight.w600 : FontWeight.normal,
                        ),
                      ),
                      if (message.isStreaming)
                        Padding(
                          padding: const EdgeInsets.only(top: 6),
                          child: SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: isUser ? Colors.black54 : AppColors.neonGreen,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
                  child: Text(time, style: const TextStyle(color: AppColors.textGrey, fontSize: 11)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMedicalRejectionCard(ChatMessage message, String time) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Container(
        margin: const EdgeInsets.only(right: 40),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.red.shade900.withOpacity(0.3),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.red.shade700),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('⚕️', style: TextStyle(fontSize: 28)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Medical Advice Restricted', style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 6),
                  Text(message.content, style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.4)),
                  const SizedBox(height: 6),
                  Text(time, style: const TextStyle(color: AppColors.textGrey, fontSize: 11)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFoodEstimateCard(ChatMessage message, String time) {
    final data = message.extraData ?? {};
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Container(
        margin: const EdgeInsets.only(right: 40),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.inputBackground,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.darkGreenBorder),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Text('🍱', style: TextStyle(fontSize: 24)),
                const SizedBox(width: 8),
                Text(data['foodName'] ?? 'Food Estimate', style: const TextStyle(color: AppColors.neonGreen, fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
            const SizedBox(height: 12),
            Text(message.content, style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.4)),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _macroChip('${data['estimatedCalories'] ?? 0} kcal', AppColors.neonGreen),
                _macroChip('P: ${data['estimatedProtein'] ?? 0}g', Colors.blueAccent),
                _macroChip('C: ${data['estimatedCarbs'] ?? 0}g', Colors.orangeAccent),
                _macroChip('F: ${data['estimatedFat'] ?? 0}g', Colors.redAccent),
              ],
            ),
            const SizedBox(height: 12),
            _buildAddToDiaryButton(message, data),
            const SizedBox(height: 8),
            Text(time, style: const TextStyle(color: AppColors.textGrey, fontSize: 11)),
          ],
        ),
      ),
    );
  }

  Widget _buildAddToDiaryButton(ChatMessage message, Map<String, dynamic> data) {
    final isAdded = _loggedFoodMessageIds.contains(message.id);

    return ElevatedButton.icon(
      style: ElevatedButton.styleFrom(
        backgroundColor: isAdded ? Colors.grey[800] : AppColors.neonGreen,
        foregroundColor: isAdded ? AppColors.textGrey : Colors.black,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        minimumSize: const Size(double.infinity, 40),
      ),
      icon: Icon(isAdded ? Icons.check : Icons.add_circle_outline, size: 18),
      label: Text(
        isAdded ? 'Added' : 'Add to Diary',
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
      onPressed: isAdded
          ? null
          : () async {
              final profileProvider = context.read<ProfileProvider>();
              final trackingProvider = context.read<TrackingProvider>();
              final workoutStyle = profileProvider.profileData?['workoutStyle'] ?? 'Bodybuilding';

              final name = data['foodName'] ?? 'Food Estimate';
              final double kcal = (data['estimatedCalories'] ?? 0).toDouble();
              final double p = (data['estimatedProtein'] ?? 0).toDouble();
              final double c = (data['estimatedCarbs'] ?? 0).toDouble();
              final double f = (data['estimatedFat'] ?? 0).toDouble();

              final success = await trackingProvider.logCustomFood(
                name: name,
                calories: kcal,
                protein: p,
                carbs: c,
                fat: f,
                workoutStyle: workoutStyle,
              );

              if (success) {
                setState(() {
                  _loggedFoodMessageIds.add(message.id);
                });
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Added $name to today\'s diary! 🥗'),
                      backgroundColor: AppColors.neonGreen,
                      duration: const Duration(seconds: 2),
                    ),
                  );
                }
              } else {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Failed to add food to diary. Please try again.'),
                      backgroundColor: Colors.redAccent,
                    ),
                  );
                }
              }
            },
    );
  }

  Widget _buildExerciseSwapCard(ChatMessage message, String time) {
    final data = message.extraData ?? {};
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Container(
        margin: const EdgeInsets.only(right: 40),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.inputBackground,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.neonGreen),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Text('🔄', style: TextStyle(fontSize: 24)),
                SizedBox(width: 8),
                Text('Exercise Recommendation', style: TextStyle(color: AppColors.neonGreen, fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(color: Colors.red.withOpacity(0.2), borderRadius: BorderRadius.circular(10)),
                    child: Text('❌ ${data['swapFrom'] ?? ''}', style: const TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold)),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8),
                  child: Icon(Icons.arrow_forward, color: AppColors.neonGreen),
                ),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(color: AppColors.neonGreen.withOpacity(0.2), borderRadius: BorderRadius.circular(10)),
                    child: Text('✅ ${data['swapTo'] ?? ''}', style: const TextStyle(color: AppColors.neonGreen, fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(data['reason'] ?? message.content, style: const TextStyle(color: Colors.white, fontSize: 13, height: 1.45)),
            const SizedBox(height: 14),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.neonGreen,
                foregroundColor: Colors.black,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                minimumSize: const Size(double.infinity, 42),
              ),
              onPressed: () async {
                final trackingProvider = context.read<TrackingProvider>();
                final profileProvider = context.read<ProfileProvider>();
                final style = profileProvider.profileData?['workoutStyle'] ?? 'Bodybuilding';

                final success = await trackingProvider.swapExercise(
                  data['swapFrom'] ?? '',
                  data['swapTo'] ?? '',
                  style,
                );

                if (success && mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Workout schedule updated successfully! 🔄✅'),
                      backgroundColor: AppColors.neonGreen,
                      duration: Duration(seconds: 3),
                    ),
                  );
                }
              },
              child: const Text('Apply Swap to Schedule', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            ),
            const SizedBox(height: 8),
            Text(time, style: const TextStyle(color: AppColors.textGrey, fontSize: 11)),
          ],
        ),
      ),
    );
  }

  Widget _buildTypingIndicator() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 32, height: 32,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.neonGreen.withOpacity(0.15),
              border: Border.all(color: AppColors.neonGreen),
            ),
            child: const Center(child: Text('🤖', style: TextStyle(fontSize: 16))),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: AppColors.inputBackground,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: AppColors.darkGreenBorder),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _dot(1),
                const SizedBox(width: 4),
                _dot(2),
                const SizedBox(width: 4),
                _dot(3),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _dot(int index) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.3, end: 1.0),
      duration: Duration(milliseconds: 400 + index * 100),
      builder: (_, val, __) => Opacity(
        opacity: val,
        child: Container(
          width: 8, height: 8,
          decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.neonGreen),
        ),
      ),
      onEnd: () => setState(() {}),
    );
  }

  Widget _buildInputBar(ChatProvider chatProvider) {
    return Container(
      padding: EdgeInsets.only(
        left: 16, right: 16,
        top: 12,
        bottom: MediaQuery.of(context).viewInsets.bottom + 16,
      ),
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        border: Border(top: BorderSide(color: AppColors.darkGreenBorder)),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _textController,
              style: const TextStyle(color: Colors.white),
              maxLines: 4,
              minLines: 1,
              textCapitalization: TextCapitalization.sentences,
              decoration: InputDecoration(
                hintText: 'Message your PT...',
                hintStyle: TextStyle(color: Colors.grey.shade600),
                filled: true,
                fillColor: AppColors.background,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide.none,
                ),
              ),
              onSubmitted: (_) => _sendMessage(),
            ),
          ),
          const SizedBox(width: 10),
          GestureDetector(
            onTap: chatProvider.isConnected ? _sendMessage : null,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: chatProvider.isConnected ? AppColors.neonGreen : Colors.grey.shade800,
                boxShadow: chatProvider.isConnected
                    ? [BoxShadow(color: AppColors.neonGreen.withOpacity(0.4), blurRadius: 12, spreadRadius: 2)]
                    : [],
              ),
              child: Icon(
                Icons.send_rounded,
                color: chatProvider.isConnected ? Colors.black : Colors.grey,
                size: 22,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _macroChip(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.5)),
      ),
      child: Text(label, style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.bold)),
    );
  }
}
