import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileProvider with ChangeNotifier {
  bool _isLoading = false;
  bool get isLoading => _isLoading;

  Map<String, dynamic>? _profileData;
  Map<String, dynamic>? get profileData => _profileData;

  String get _userServiceUrl {
    if (kIsWeb) return 'http://127.0.0.1:3001';
    return 'http://10.0.2.2:3001';
  }

  void clearState() {
    _profileData = null;
    notifyListeners();
  }

  Future<void> fetchProfile() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final response = await http.get(
        Uri.parse('$_userServiceUrl/users/me/metrics'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        _profileData = jsonDecode(response.body);
        notifyListeners();
      } else {
        _profileData = null;
        notifyListeners();
      }
    } catch (e) {
      _profileData = null;
      notifyListeners();
      print('Fetch profile error: $e');
    }
  }

  Future<bool> updateMetrics(Map<String, dynamic> data) async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final response = await http.put(
        Uri.parse('$_userServiceUrl/users/me/metrics'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
        body: jsonEncode(data),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        _profileData = jsonDecode(response.body);
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        throw Exception('Failed to update metrics: ${response.body}');
      }
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      throw Exception('Network error: $e');
    }
  }
}
