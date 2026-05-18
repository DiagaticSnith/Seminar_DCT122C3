import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';

class TrackingProvider with ChangeNotifier {
  bool _isLoading = false;
  bool get isLoading => _isLoading;

  List<dynamic> _exercises = [];
  List<dynamic> _foodItems = [];
  List<dynamic> _schedule = [];
  Map<String, dynamic>? _dailyLog;
  List<dynamic> _analyticsLogs = [];

  List<dynamic> get exercises => _exercises;
  List<dynamic> get foodItems => _foodItems;
  List<dynamic> get schedule => _schedule;
  Map<String, dynamic>? get dailyLog => _dailyLog;
  List<dynamic> get analyticsLogs => _analyticsLogs;

  String get _trackingServiceUrl {
    if (kIsWeb) return 'http://127.0.0.1:3002';
    return 'http://10.0.2.2:3002';
  }

  Future<void> fetchMasterData() async {
    try {
      final exRes = await http.get(Uri.parse('$_trackingServiceUrl/tracking/master/exercises'));
      if (exRes.statusCode == 200) {
        _exercises = jsonDecode(exRes.body);
      }

      final foodRes = await http.get(Uri.parse('$_trackingServiceUrl/tracking/master/food'));
      if (foodRes.statusCode == 200) {
        _foodItems = jsonDecode(foodRes.body);
      }
      notifyListeners();
    } catch (e) {
      print('Fetch master data error: $e');
    }
  }

  Future<void> fetchSchedule(String workoutStyle) async {
    _isLoading = true;
    notifyListeners();

    try {
      final res = await http.get(
        Uri.parse('$_trackingServiceUrl/tracking/schedule?userId=current-user-mock-id&workoutStyle=$workoutStyle'),
      );
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        _dailyLog = data['dailyLog'];
        _schedule = data['schedule'];
      }
    } catch (e) {
      print('Fetch schedule error: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> fetchAnalytics() async {
    try {
      final res = await http.get(
        Uri.parse('$_trackingServiceUrl/tracking/analytics?userId=current-user-mock-id'),
      );
      if (res.statusCode == 200) {
        _analyticsLogs = jsonDecode(res.body);
        notifyListeners();
      }
    } catch (e) {
      print('Fetch analytics error: $e');
    }
  }

  Future<bool> logFood(String foodId, double grams, String workoutStyle) async {
    _isLoading = true;
    notifyListeners();

    try {
      final res = await http.post(
        Uri.parse('$_trackingServiceUrl/tracking/log/food'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'userId': 'current-user-mock-id',
          'foodId': foodId,
          'grams': grams,
        }),
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        await fetchSchedule(workoutStyle);
        await fetchAnalytics();
        return true;
      }
    } catch (e) {
      print('Log food error: $e');
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<bool> checkinWorkout(String workoutLogId, String workoutStyle) async {
    try {
      final res = await http.post(
        Uri.parse('$_trackingServiceUrl/tracking/log/workout/checkin'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'workoutLogId': workoutLogId}),
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        await fetchSchedule(workoutStyle);
        return true;
      }
    } catch (e) {
      print('Checkin workout error: $e');
    }
    return false;
  }
}
