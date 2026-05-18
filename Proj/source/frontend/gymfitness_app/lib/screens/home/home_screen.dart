import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../providers/profile_provider.dart';
import '../../providers/tracking_provider.dart';
import '../../utils/constants.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isInit = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_isInit) {
      _initData();
      _isInit = true;
    }
  }

  Future<void> _initData() async {
    final profileProvider = context.read<ProfileProvider>();
    final trackingProvider = context.read<TrackingProvider>();

    await profileProvider.fetchProfile();
    final style = profileProvider.profileData?['workoutStyle'] ?? 'Bodybuilding';
    await trackingProvider.fetchSchedule(style);
    await trackingProvider.fetchAnalytics();
  }

  @override
  Widget build(BuildContext context) {
    final profileProvider = context.watch<ProfileProvider>();
    final trackingProvider = context.watch<TrackingProvider>();

    if (profileProvider.isLoading || trackingProvider.isLoading && trackingProvider.schedule.isEmpty) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator(color: AppColors.neonGreen)),
      );
    }

    final profile = profileProvider.profileData ?? {};
    final dailyLog = trackingProvider.dailyLog ?? {};
    final schedule = trackingProvider.schedule;
    final analytics = trackingProvider.analyticsLogs;

    final targetCal = (profile['targetCalories'] ?? 2500).toDouble();
    final consumedCal = (dailyLog['caloriesConsumed'] ?? 0).toDouble();

    final targetP = (profile['targetProtein'] ?? 150).toDouble();
    final consumedP = (dailyLog['proteinConsumed'] ?? 0).toDouble();

    final targetC = (profile['targetCarbs'] ?? 250).toDouble();
    final consumedC = (dailyLog['carbsConsumed'] ?? 0).toDouble();

    final targetF = (profile['targetFat'] ?? 70).toDouble();
    final consumedF = (dailyLog['fatConsumed'] ?? 0).toDouble();

    final workoutStyle = profile['workoutStyle'] ?? 'Bodybuilding';
    final isDietOnly = workoutStyle == 'Diet Only';

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            const Text('⚡ ', style: TextStyle(fontSize: 24)),
            Text(
              'Dashboard',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 22),
            ),
          ],
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: AppColors.neonGreen),
            onPressed: _initData,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Welcome Banner
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppColors.buttonBackground, AppColors.inputBackground],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.darkGreenBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome Back, Athlete! 💪',
                    style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w900),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Goal: ${profile['goal'] ?? 'Muscle Gain'} • Style: $workoutStyle',
                    style: const TextStyle(color: AppColors.neonGreen, fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Macro Progress Section
            Text('TODAY’S ENERGY & MACROS', style: _sectionTitleStyle()),
            const SizedBox(height: 16),
            _buildMacroCard('Calories', consumedCal, targetCal, AppColors.neonGreen, 'kcal'),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _buildMacroCard('Protein', consumedP, targetP, Colors.blueAccent, 'g')),
                const SizedBox(width: 12),
                Expanded(child: _buildMacroCard('Carbs', consumedC, targetC, Colors.orangeAccent, 'g')),
                const SizedBox(width: 12),
                Expanded(child: _buildMacroCard('Fat', consumedF, targetF, Colors.redAccent, 'g')),
              ],
            ),
            const SizedBox(height: 32),

            // Adaptive Schedule Section
            if (!isDietOnly) ...[
              Text('TODAY’S ADAPTIVE SCHEDULE', style: _sectionTitleStyle()),
              const SizedBox(height: 16),
              schedule.isEmpty
                  ? const Text('No workouts scheduled for today.', style: TextStyle(color: AppColors.textGrey))
                  : ListView.separated(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: schedule.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 12),
                      itemBuilder: (context, index) {
                        final item = schedule[index];
                        if (item['type'] == 'Yoga') {
                          return YogaCardWidget(item: item, workoutStyle: workoutStyle);
                        } else {
                          return GymCardWidget(item: item, workoutStyle: workoutStyle);
                        }
                      },
                    ),
              const SizedBox(height: 32),
            ],

            // 30-Day Trend Chart
            Text('30-DAY CALORIE TREND', style: _sectionTitleStyle()),
            const SizedBox(height: 16),
            Container(
              height: 220,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.inputBackground,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.darkGreenBorder),
              ),
              child: analytics.isEmpty
                  ? const Center(child: Text('Not enough data for chart', style: TextStyle(color: AppColors.textGrey)))
                  : LineChart(
                      LineChartData(
                        gridData: FlGridData(show: false),
                        titlesData: FlTitlesData(
                          leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              getTitlesWidget: (val, _) {
                                final intVal = val.toInt();
                                if (intVal % 5 != 0 || intVal < 0 || intVal >= analytics.length) return const SizedBox();
                                final dateStr = analytics[intVal]['date'].toString().substring(5, 10);
                                return Text(dateStr, style: const TextStyle(color: AppColors.textGrey, fontSize: 10));
                              },
                            ),
                          ),
                        ),
                        borderData: FlBorderData(show: false),
                        lineBarsData: [
                          LineChartBarData(
                            spots: analytics.asMap().entries.map((e) {
                              final cal = (e.value['caloriesConsumed'] ?? 0).toDouble();
                              return FlSpot(e.key.toDouble(), cal);
                            }).toList(),
                            isCurved: true,
                            color: AppColors.neonGreen,
                            barWidth: 3,
                            dotData: FlDotData(show: true),
                            belowBarData: BarAreaData(
                              show: true,
                              color: AppColors.neonGreen.withOpacity(0.15),
                            ),
                          ),
                        ],
                      ),
                    ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  TextStyle _sectionTitleStyle() {
    return const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold, letterSpacing: 1.2);
  }

  Widget _buildMacroCard(String title, double consumed, double target, Color color, String unit) {
    double progress = target > 0 ? consumed / target : 0;
    if (progress > 1) progress = 1;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkGreenBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(color: AppColors.textGrey, fontSize: 12, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${consumed.toInt()}$unit', style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
              Text('${target.toInt()}$unit', style: const TextStyle(color: AppColors.textGrey, fontSize: 12)),
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.white12,
              color: color,
              minHeight: 8,
            ),
          ),
        ],
      ),
    );
  }
}

// Adaptive Gym Card
class GymCardWidget extends StatelessWidget {
  final Map<String, dynamic> item;
  final String workoutStyle;

  const GymCardWidget({Key? key, required this.item, required this.workoutStyle}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ex = item['exercise'] ?? {};
    final completed = item['completed'] ?? false;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: completed ? AppColors.darkGreenBorder.withOpacity(0.2) : AppColors.inputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: completed ? AppColors.neonGreen : AppColors.darkGreenBorder),
      ),
      child: Row(
        children: [
          Checkbox(
            value: completed,
            activeColor: AppColors.neonGreen,
            checkColor: Colors.black,
            onChanged: completed
                ? null
                : (val) {
                    context.read<TrackingProvider>().checkinWorkout(item['id'], workoutStyle);
                  },
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  ex['name'] ?? 'Exercise',
                  style: TextStyle(
                    color: completed ? AppColors.textGrey : Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    decoration: completed ? TextDecoration.lineThrough : null,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${item['sets']} Sets • ${item['reps']} Reps | Category: ${ex['category'] ?? ''}',
                  style: const TextStyle(color: AppColors.textGrey, fontSize: 12),
                ),
              ],
            ),
          ),
          if (ex['youtubeLink'] != null)
            IconButton(
              icon: const Icon(Icons.play_circle_fill, color: Colors.redAccent, size: 28),
              onPressed: () => _showTutorialDialog(context, ex['name'], ex['youtubeLink']),
            ),
        ],
      ),
    );
  }

  void _showTutorialDialog(BuildContext context, String? name, String? url) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: AppColors.inputBackground,
        title: Text(name ?? 'Tutorial', style: const TextStyle(color: AppColors.neonGreen)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Watch the professional form breakdown on YouTube:', style: TextStyle(color: Colors.white)),
            const SizedBox(height: 12),
            SelectableText(url ?? '', style: const TextStyle(color: Colors.blueAccent)),
            const SizedBox(height: 16),
            const Text('Tip: Keep your core tight and focus on slow eccentric movement! 💪', style: TextStyle(color: AppColors.textGrey, fontSize: 12)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close', style: TextStyle(color: AppColors.neonGreen)),
          ),
        ],
      ),
    );
  }
}

// Adaptive Yoga Card
class YogaCardWidget extends StatefulWidget {
  final Map<String, dynamic> item;
  final String workoutStyle;

  const YogaCardWidget({Key? key, required this.item, required this.workoutStyle}) : super(key: key);

  @override
  State<YogaCardWidget> createState() => _YogaCardWidgetState();
}

class _YogaCardWidgetState extends State<YogaCardWidget> {
  bool _isRunning = false;
  int _timeLeft = 300;

  void _startTimer() {
    setState(() {
      _isRunning = true;
    });
    _runTimer();
  }

  void _runTimer() async {
    while (_isRunning && _timeLeft > 0) {
      await Future.delayed(const Duration(seconds: 1));
      if (!mounted) return;
      setState(() {
        _timeLeft--;
      });
      if (_timeLeft == 0) {
        _isRunning = false;
        context.read<TrackingProvider>().checkinWorkout(widget.item['id'], widget.workoutStyle);
      }
    }
  }

  @override
  void dispose() {
    _isRunning = false;
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final ex = widget.item['exercise'] ?? {};
    final completed = widget.item['completed'] ?? false;

    final minutes = (_timeLeft / 60).floor();
    final seconds = _timeLeft % 60;
    final timeStr = '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: completed ? AppColors.darkGreenBorder.withOpacity(0.2) : AppColors.inputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: completed ? AppColors.neonGreen : AppColors.darkGreenBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.self_improvement, color: completed ? AppColors.neonGreen : Colors.orangeAccent, size: 32),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      ex['name'] ?? 'Yoga Pose',
                      style: TextStyle(
                        color: completed ? AppColors.textGrey : Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        decoration: completed ? TextDecoration.lineThrough : null,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Duration: ${widget.item['duration_seconds'] ?? 300}s | Category: ${ex['category'] ?? ''}',
                      style: const TextStyle(color: AppColors.textGrey, fontSize: 12),
                    ),
                  ],
                ),
              ),
              if (ex['youtubeLink'] != null)
                IconButton(
                  icon: const Icon(Icons.play_circle_fill, color: Colors.redAccent, size: 28),
                  onPressed: () => _showTutorialDialog(context, ex['name'], ex['youtubeLink']),
                ),
            ],
          ),
          const SizedBox(height: 16),
          if (!completed)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Timer: $timeStr', style: const TextStyle(color: AppColors.neonGreen, fontSize: 18, fontWeight: FontWeight.bold)),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _isRunning ? Colors.redAccent : AppColors.neonGreen,
                    foregroundColor: Colors.black,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  onPressed: _isRunning ? () => setState(() => _isRunning = false) : _startTimer,
                  child: Text(_isRunning ? 'Pause' : 'Start Timer', style: const TextStyle(fontWeight: FontWeight.bold)),
                ),
              ],
            )
          else
            const Text('✨ Namaste! Session Completed.', style: TextStyle(color: AppColors.neonGreen, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  void _showTutorialDialog(BuildContext context, String? name, String? url) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: AppColors.inputBackground,
        title: Text(name ?? 'Tutorial', style: const TextStyle(color: AppColors.neonGreen)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Watch the professional form breakdown on YouTube:', style: TextStyle(color: Colors.white)),
            const SizedBox(height: 12),
            SelectableText(url ?? '', style: const TextStyle(color: Colors.blueAccent)),
            const SizedBox(height: 16),
            const Text('Tip: Focus on deep breathing and smooth transitions! 🧘', style: TextStyle(color: AppColors.textGrey, fontSize: 12)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close', style: TextStyle(color: AppColors.neonGreen)),
          ),
        ],
      ),
    );
  }
}
