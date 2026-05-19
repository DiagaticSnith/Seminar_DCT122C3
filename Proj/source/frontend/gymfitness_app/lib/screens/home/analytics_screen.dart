import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../providers/tracking_provider.dart';
import '../../providers/profile_provider.dart';
import '../../utils/constants.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({Key? key}) : super(key: key);

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      await context.read<TrackingProvider>().fetchAnalytics();
    } catch (e) {
      print('Error fetching analytics: $e');
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final trackingProvider = context.watch<TrackingProvider>();
    final profileProvider = context.watch<ProfileProvider>();
    final analytics = trackingProvider.analyticsLogs;
    
    final profile = profileProvider.profileData ?? {};
    final double targetCal = (profile['targetCalories'] ?? 2500).toDouble();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Analytics & Progress',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 20),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: AppColors.neonGreen),
            onPressed: () async {
              setState(() => _isLoading = true);
              await _fetchData();
            },
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: AppColors.neonGreen))
          : analytics.isEmpty
              ? _buildEmptyState()
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _buildSummaryCard(analytics, targetCal),
                      const SizedBox(height: 24),
                      
                      _buildWeightTrendSection(analytics),
                      const SizedBox(height: 24),
                      
                      _buildCalorieHistorySection(analytics, targetCal),
                      const SizedBox(height: 30),
                    ],
                  ),
                ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.analytics_outlined, color: AppColors.textGrey, size: 64),
          const SizedBox(height: 16),
          const Text(
            'No Analytics Data Available',
            style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            'Keep tracking your food and workouts to see trends!',
            style: TextStyle(color: AppColors.textGrey, fontSize: 13),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.neonGreen,
              foregroundColor: Colors.black,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: _fetchData,
            child: const Text('Retry', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryCard(List<dynamic> analytics, double targetCal) {
    // Calculate averages
    double totalCal = 0;
    double minWeight = 999;
    double maxWeight = 0;
    double avgWeight = 0;
    int weightPoints = 0;

    for (var log in analytics) {
      totalCal += (log['daily_calories'] ?? 0);
      final w = (log['daily_weight'] ?? 0).toDouble();
      if (w > 0) {
        if (w < minWeight) minWeight = w;
        if (w > maxWeight) maxWeight = w;
        avgWeight += w;
        weightPoints++;
      }
    }

    double avgCal = totalCal / analytics.length;
    avgWeight = weightPoints > 0 ? avgWeight / weightPoints : 70.0;
    if (minWeight == 999) minWeight = 0;

    return Container(
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
          const Text(
            '30-DAY SUMMARY',
            style: TextStyle(color: AppColors.neonGreen, fontWeight: FontWeight.bold, fontSize: 12, letterSpacing: 1.2),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildMetricSummary('Avg Calories', '${avgCal.round()} kcal', 'Target: ${targetCal.round()}'),
              Container(width: 1, height: 40, color: AppColors.darkGreenBorder),
              _buildMetricSummary('Current Weight', '${analytics.last['daily_weight']?.toStringAsFixed(1) ?? '0.0'} kg', 'Goal: ${minWeight.toStringAsFixed(1)} - ${maxWeight.toStringAsFixed(1)}'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMetricSummary(String title, String value, String subtitle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(color: AppColors.textGrey, fontSize: 12)),
        const SizedBox(height: 4),
        Text(value, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
        const SizedBox(height: 2),
        Text(subtitle, style: const TextStyle(color: AppColors.textGrey, fontSize: 10)),
      ],
    );
  }

  Widget _buildWeightTrendSection(List<dynamic> analytics) {
    // Generate Spots
    List<FlSpot> spots = [];
    double minWeight = 999;
    double maxWeight = 0;

    for (int i = 0; i < analytics.length; i++) {
      final w = (analytics[i]['daily_weight'] ?? 70.0).toDouble();
      spots.add(FlSpot(i.toDouble(), w));
      if (w < minWeight) minWeight = w;
      if (w > maxWeight) maxWeight = w;
    }

    // Set chart margins
    double yMin = (minWeight - 2).floorToDouble();
    if (yMin < 0) yMin = 0;
    double yMax = (maxWeight + 2).ceilToDouble();

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.darkGreenBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'WEIGHT FLUCTUATION (KG)',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
              ),
              Text(
                'Last 30 Days',
                style: TextStyle(color: AppColors.textGrey, fontSize: 12),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Container(
            height: 220,
            child: LineChart(
              LineChartData(
                gridData: FlGridData(
                  show: true,
                  drawVerticalLine: false,
                  getDrawingHorizontalLine: (value) => FlLine(
                    color: AppColors.darkGreenBorder.withOpacity(0.3),
                    strokeWidth: 1,
                  ),
                ),
                titlesData: FlTitlesData(
                  leftTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      reservedSize: 36,
                      getTitlesWidget: (val, _) {
                        if (val == yMin || val == yMax) return const SizedBox();
                        return Text(
                          '${val.toInt()}',
                          style: const TextStyle(color: AppColors.textGrey, fontSize: 10),
                        );
                      },
                    ),
                  ),
                  rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (val, _) {
                        final intVal = val.toInt();
                        if (intVal < 0 || intVal >= analytics.length) return const SizedBox();
                        // Show label every 6 days
                        if (intVal % 6 != 0) return const SizedBox();
                        final dateStr = analytics[intVal]['date'].toString().substring(5, 10);
                        return Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                          child: Text(dateStr, style: const TextStyle(color: AppColors.textGrey, fontSize: 9)),
                        );
                      },
                    ),
                  ),
                ),
                borderData: FlBorderData(show: false),
                minY: yMin,
                maxY: yMax,
                lineTouchData: LineTouchData(
                  touchTooltipData: LineTouchTooltipData(
                    getTooltipColor: (_) => AppColors.buttonBackground,
                    tooltipRoundedRadius: 8,
                    getTooltipItems: (touchedSpots) {
                      return touchedSpots.map((spot) {
                        final date = analytics[spot.x.toInt()]['date'];
                        return LineTooltipItem(
                          '$date\n${spot.y.toStringAsFixed(1)} kg',
                          const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                        );
                      }).toList();
                    },
                  ),
                ),
                lineBarsData: [
                  LineChartBarData(
                    spots: spots,
                    isCurved: true,
                    color: AppColors.neonGreen,
                    barWidth: 3,
                    dotData: FlDotData(
                      show: true,
                      getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(
                        radius: 3,
                        color: AppColors.neonGreen,
                        strokeWidth: 1.5,
                        strokeColor: AppColors.background,
                      ),
                    ),
                    belowBarData: BarAreaData(
                      show: true,
                      gradient: LinearGradient(
                        colors: [
                          AppColors.neonGreen.withOpacity(0.25),
                          AppColors.neonGreen.withOpacity(0.0),
                        ],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCalorieHistorySection(List<dynamic> analytics, double targetCal) {
    // Generate Bar groups
    List<BarChartGroupData> barGroups = [];
    double maxCal = targetCal;

    for (int i = 0; i < analytics.length; i++) {
      final cal = (analytics[i]['daily_calories'] ?? 0).toDouble();
      if (cal > maxCal) maxCal = cal;

      barGroups.add(
        BarChartGroupData(
          x: i,
          barRods: [
            BarChartRodData(
              toY: cal,
              color: cal >= targetCal ? AppColors.neonGreen : AppColors.neonGreen.withOpacity(0.6),
              width: 5,
              borderRadius: BorderRadius.circular(4),
            ),
          ],
        ),
      );
    }

    double yMax = (maxCal * 1.15).ceilToDouble();

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.darkGreenBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'CALORIE HISTORY (KCAL)',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
              ),
              Text(
                'Target: ${targetCal.toInt()} kcal',
                style: const TextStyle(color: AppColors.neonGreen, fontSize: 12, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Container(
            height: 220,
            child: BarChart(
              BarChartData(
                alignment: BarChartAlignment.spaceAround,
                gridData: FlGridData(show: false),
                titlesData: FlTitlesData(
                  leftTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      reservedSize: 40,
                      getTitlesWidget: (val, _) {
                        if (val == 0 || val == yMax) return const SizedBox();
                        return Text(
                          '${val.toInt()}',
                          style: const TextStyle(color: AppColors.textGrey, fontSize: 9),
                        );
                      },
                    ),
                  ),
                  rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  bottomTitles: AxisTitles(
                    sideTitles: SideTitles(
                      showTitles: true,
                      getTitlesWidget: (val, _) {
                        final intVal = val.toInt();
                        if (intVal < 0 || intVal >= analytics.length) return const SizedBox();
                        // Show label every 6 days
                        if (intVal % 6 != 0) return const SizedBox();
                        final dateStr = analytics[intVal]['date'].toString().substring(5, 10);
                        return Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                          child: Text(dateStr, style: const TextStyle(color: AppColors.textGrey, fontSize: 9)),
                        );
                      },
                    ),
                  ),
                ),
                borderData: FlBorderData(show: false),
                maxY: yMax,
                barTouchData: BarTouchData(
                  touchTooltipData: BarTouchTooltipData(
                    getTooltipColor: (_) => AppColors.buttonBackground,
                    tooltipRoundedRadius: 8,
                    getTooltipItem: (group, groupIndex, rod, rodIndex) {
                      final date = analytics[group.x]['date'];
                      return BarTooltipItem(
                        '$date\n${rod.toY.toInt()} kcal',
                        const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                      );
                    },
                  ),
                ),
                extraLinesData: ExtraLinesData(
                  horizontalLines: [
                    HorizontalLine(
                      y: targetCal,
                      color: Colors.redAccent.withOpacity(0.8),
                      strokeWidth: 2,
                      dashArray: [5, 5],
                      label: HorizontalLineLabel(
                        show: true,
                        alignment: Alignment.topRight,
                        labelResolver: (line) => 'Target: ${line.y.toInt()}',
                        style: const TextStyle(
                          color: Colors.redAccent,
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
                barGroups: barGroups,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
