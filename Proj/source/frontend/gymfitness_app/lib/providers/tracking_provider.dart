import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TrackingProvider with ChangeNotifier {
  bool _isLoading = false;
  bool get isLoading => _isLoading;

  List<dynamic> _exercises = [];
  List<dynamic> _foodItems = [];
  List<dynamic> _schedule = [];
  Map<String, dynamic>? _dailyLog;
  List<dynamic> _analyticsLogs = [];
  Map<String, dynamic>? _aiMealPlan;

  List<dynamic> get exercises => _exercises;
  List<dynamic> get foodItems => _foodItems;
  List<dynamic> get schedule => _schedule;
  Map<String, dynamic>? get dailyLog => _dailyLog;
  List<dynamic> get analyticsLogs => _analyticsLogs;
  Map<String, dynamic>? get aiMealPlan => _aiMealPlan;

  String get _trackingServiceUrl {
    if (kIsWeb) return 'http://127.0.0.1:3002';
    return 'http://10.0.2.2:3002';
  }

  String get _aiCoachServiceUrl {
    if (kIsWeb) return 'http://127.0.0.1:3003';
    return 'http://10.0.2.2:3003';
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

  void clearState() {
    _dailyLog = null;
    _schedule = [];
    _analyticsLogs = [];
    _aiMealPlan = null;
    notifyListeners();
  }

  Future<void> fetchSchedule(String workoutStyle) async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final res = await http.get(
        Uri.parse('$_trackingServiceUrl/tracking/schedule?workoutStyle=$workoutStyle'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
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
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final res = await http.get(
        Uri.parse('$_trackingServiceUrl/tracking/analytics'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
      );
      if (res.statusCode == 200) {
        _analyticsLogs = jsonDecode(res.body);
        notifyListeners();
      }
    } catch (e) {
      print('Fetch analytics error: $e');
    }
  }

  Future<bool> logFood(String foodId, double grams, String workoutStyle, {Map<String, dynamic>? customFood}) async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final res = await http.post(
        Uri.parse('$_trackingServiceUrl/tracking/log/food'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          if (customFood == null) 'foodId': foodId,
          'grams': grams,
          if (customFood != null) 'customFood': customFood,
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

  Future<void> generateMealPlan() async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final res = await http.post(
        Uri.parse('$_aiCoachServiceUrl/api/ai/generate-meal-plan'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
      );

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        if (data['success'] == true) {
          _aiMealPlan = data['data'];
        }
      }
    } catch (e) {
      print('Generate meal plan error: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> checkinWorkout(String workoutLogId, String workoutStyle) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final res = await http.post(
        Uri.parse('$_trackingServiceUrl/tracking/log/workout/checkin'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
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

  Future<bool> swapExercise(String swapFrom, String swapTo, String workoutStyle) async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final res = await http.post(
        Uri.parse('$_trackingServiceUrl/tracking/workout/swap'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'swapFrom': swapFrom,
          'swapTo': swapTo,
        }),
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        await fetchSchedule(workoutStyle);
        return true;
      }
    } catch (e) {
      print('Swap exercise error: $e');
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<bool> logCustomFood({
    required String name,
    required double calories,
    required double protein,
    required double carbs,
    required double fat,
    required String workoutStyle,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwt_token');

      final res = await http.post(
        Uri.parse('$_trackingServiceUrl/tracking/log/custom'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'name': name,
          'calories': calories,
          'protein': protein,
          'carbs': carbs,
          'fat': fat,
        }),
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        await fetchSchedule(workoutStyle);
        await fetchAnalytics();
        return true;
      }
    } catch (e) {
      print('Log custom food error: $e');
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }
}
