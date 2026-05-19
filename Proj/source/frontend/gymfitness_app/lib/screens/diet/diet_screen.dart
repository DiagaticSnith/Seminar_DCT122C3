import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/tracking_provider.dart';
import '../../providers/profile_provider.dart';
import '../../utils/constants.dart';

class DietScreen extends StatefulWidget {
  const DietScreen({Key? key}) : super(key: key);

  @override
  State<DietScreen> createState() => _DietScreenState();
}

class _DietScreenState extends State<DietScreen> {
  final _searchController = TextEditingController();
  String _searchQuery = '';
  bool _isInit = false;
  bool _isGeneratingMealPlan = false;
  int _currentPage = 0;
  static const int _itemsPerPage = 10;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_isInit) {
      context.read<TrackingProvider>().fetchMasterData();
      _isInit = true;
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final trackingProvider = context.watch<TrackingProvider>();
    final profileProvider = context.watch<ProfileProvider>();
    final workoutStyle = profileProvider.profileData?['workoutStyle'] ?? 'Bodybuilding';

    final foodItems = trackingProvider.foodItems.where((item) {
      final name = (item['name'] ?? '').toString().toLowerCase();
      return name.contains(_searchQuery.toLowerCase());
    }).toList();

    final totalPages = (foodItems.length / _itemsPerPage).ceil();
    final startIndex = _currentPage * _itemsPerPage;
    final endIndex = (startIndex + _itemsPerPage) > foodItems.length ? foodItems.length : (startIndex + _itemsPerPage);
    final paginatedFoodItems = foodItems.isEmpty ? <dynamic>[] : foodItems.sublist(startIndex, endIndex);

    final dailyLog = trackingProvider.dailyLog ?? {};
    final foodLogs = (dailyLog['foodLogs'] as List<dynamic>?) ?? [];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            const Text('🥗 ', style: TextStyle(fontSize: 24)),
            Text(
              'Diet Log & Nutrition',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 22),
            ),
          ],
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: TextField(
              controller: _searchController,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'Search nutrition dictionary...',
                hintStyle: TextStyle(color: Colors.grey.shade700),
                prefixIcon: const Icon(Icons.search, color: AppColors.neonGreen),
                suffixIcon: _searchQuery.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear, color: AppColors.textGrey),
                        onPressed: () {
                          _searchController.clear();
                          setState(() {
                            _searchQuery = '';
                            _currentPage = 0;
                          });
                        },
                      )
                    : null,
                filled: true,
                fillColor: AppColors.inputBackground,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: AppColors.darkGreenBorder),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: AppColors.neonGreen),
                ),
              ),
              onChanged: (val) => setState(() {
                _searchQuery = val;
                _currentPage = 0;
              }),
            ),
          ),

          // Today's Logged Food Header
          if (foodLogs.isNotEmpty) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Text('TODAY’S MEALS (${foodLogs.length})', style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 8),
            Container(
              height: 120,
              child: ScrollConfiguration(
                behavior: MouseDragScrollBehavior(),
                child: ListView.separated(
                  padding: const EdgeInsets.symmetric(horizontal: 20.0),
                  scrollDirection: Axis.horizontal,
                  itemCount: foodLogs.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 12),
                  itemBuilder: (context, index) {
                    final log = foodLogs[index];
                    return Container(
                      width: 160,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.inputBackground,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.darkGreenBorder),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(log['food']?['name'] ?? 'Food', maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text('${log['grams']}g', style: const TextStyle(color: AppColors.neonGreen, fontSize: 12, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text('${log['calories'].toInt()} kcal | ${log['protein'].toInt()}g P', style: const TextStyle(color: AppColors.textGrey, fontSize: 10)),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Divider(color: AppColors.darkGreenBorder, height: 1),
          ],

          // AI Daily Meal Plan Section
          _buildAiMealPlanSection(context, trackingProvider, workoutStyle),

          // Dictionary List Header
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Text('NUTRITION DICTIONARY', style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
          ),

          // Dictionary List
          trackingProvider.isLoading && trackingProvider.foodItems.isEmpty
              ? const Padding(
                  padding: EdgeInsets.symmetric(vertical: 40.0),
                  child: Center(child: CircularProgressIndicator(color: AppColors.neonGreen)),
                )
              : foodItems.isEmpty
                  ? const Padding(
                      padding: EdgeInsets.symmetric(vertical: 40.0),
                      child: Center(child: Text('No food items found', style: TextStyle(color: AppColors.textGrey))),
                    )
                  : Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        ListView.separated(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 8.0),
                          itemCount: paginatedFoodItems.length,
                          separatorBuilder: (_, __) => const SizedBox(height: 12),
                          itemBuilder: (context, index) {
                            final item = paginatedFoodItems[index];
                            return _buildFoodCard(context, item, workoutStyle);
                          },
                        ),
                        if (totalPages > 1) ...[
                          const SizedBox(height: 16),
                          Padding(
                            padding: const EdgeInsets.only(left: 20.0, right: 20.0, bottom: 20.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.inputBackground,
                                    foregroundColor: Colors.white,
                                    disabledBackgroundColor: AppColors.inputBackground.withOpacity(0.3),
                                    disabledForegroundColor: Colors.white30,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12),
                                      side: const BorderSide(color: AppColors.darkGreenBorder),
                                    ),
                                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                  ),
                                  onPressed: _currentPage > 0
                                      ? () => setState(() => _currentPage--)
                                      : null,
                                  child: const Text('Previous', style: TextStyle(fontWeight: FontWeight.bold)),
                                ),
                                Text(
                                  'Page ${_currentPage + 1} of $totalPages',
                                  style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                                ),
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.inputBackground,
                                    foregroundColor: Colors.white,
                                    disabledBackgroundColor: AppColors.inputBackground.withOpacity(0.3),
                                    disabledForegroundColor: Colors.white30,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12),
                                      side: const BorderSide(color: AppColors.darkGreenBorder),
                                    ),
                                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                  ),
                                  onPressed: _currentPage < totalPages - 1
                                      ? () => setState(() => _currentPage++)
                                      : null,
                                  child: const Text('Next', style: TextStyle(fontWeight: FontWeight.bold)),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ],
                    ),
        ],
      ),
    ),
  );
}

  Widget _buildFoodCard(BuildContext context, Map<String, dynamic> item, String workoutStyle) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkGreenBorder),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        title: Text(item['name'] ?? '', style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 8.0),
          child: Text(
            'Base (${item['baseServingSize']}g): ${item['baseCalories']} kcal | ${item['baseProtein']}g P | ${item['baseCarbs']}g C | ${item['baseFat']}g F',
            style: const TextStyle(color: AppColors.textGrey, fontSize: 12),
          ),
        ),
        trailing: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.neonGreen,
            foregroundColor: Colors.black,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          onPressed: () => _showLogFoodSheet(context, item, workoutStyle),
          child: const Text('Log', style: TextStyle(fontWeight: FontWeight.bold)),
        ),
      ),
    );
  }

  void _showLogFoodSheet(BuildContext context, Map<String, dynamic> item, String workoutStyle) {
    double grams = item['baseServingSize']?.toDouble() ?? 100.0;
    final baseGrams = item['baseServingSize']?.toDouble() ?? 100.0;

    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.inputBackground,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            final ratio = grams / baseGrams;
            final cal = (item['baseCalories'] * ratio).toInt();
            final p = (item['baseProtein'] * ratio).toStringAsFixed(1);
            final c = (item['baseCarbs'] * ratio).toStringAsFixed(1);
            final f = (item['baseFat'] * ratio).toStringAsFixed(1);

            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
                left: 24,
                right: 24,
                top: 24,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text('Log ${item['name']}', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  Text('Specify portion size in grams:', style: const TextStyle(color: AppColors.textGrey, fontSize: 14)),
                  const SizedBox(height: 12),
                  TextFormField(
                    initialValue: grams.toInt().toString(),
                    keyboardType: TextInputType.number,
                    style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                      labelText: 'Grams (g)',
                      labelStyle: const TextStyle(color: AppColors.neonGreen),
                      filled: true,
                      fillColor: AppColors.background,
                      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.darkGreenBorder)),
                      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.neonGreen)),
                    ),
                    onChanged: (val) {
                      final parsed = double.tryParse(val);
                      if (parsed != null && parsed > 0) {
                        setSheetState(() => grams = parsed);
                      }
                    },
                  ),
                  const SizedBox(height: 20),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.darkGreenBorder)),
                    child: Column(
                      children: [
                        const Text('Calculated Macros', style: TextStyle(color: AppColors.textGrey, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            _macroBadge('$cal kcal', 'Calories', AppColors.neonGreen),
                            _macroBadge('${p}g', 'Protein', Colors.blueAccent),
                            _macroBadge('${c}g', 'Carbs', Colors.orangeAccent),
                            _macroBadge('${f}g', 'Fat', Colors.redAccent),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.neonGreen,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    onPressed: () async {
                      Navigator.pop(context);
                      final success = await context.read<TrackingProvider>().logFood(item['id'], grams, workoutStyle);
                      if (success && mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Successfully logged ${grams.toInt()}g of ${item['name']}!'), backgroundColor: AppColors.neonGreen, action: SnackBarAction(label: 'OK', textColor: Colors.black, onPressed: () {})),
                        );
                      }
                    },
                    child: const Text('Add to Log', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _macroBadge(String value, String label, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(color: color, fontSize: 16, fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: AppColors.textGrey, fontSize: 10)),
      ],
    );
  }

  Widget _buildAiMealPlanSection(BuildContext context, TrackingProvider trackingProvider, String workoutStyle) {
    if (trackingProvider.aiMealPlan == null) {
      return Container(
        margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.inputBackground,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.darkGreenBorder),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                const Text('🤖 ', style: TextStyle(fontSize: 20)),
                const Text(
                  'AI Daily Meal Planner',
                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 8),
            const Text(
              'Generate a tailored daily meal plan (Breakfast, Lunch, Dinner) based on your target macros.',
              style: TextStyle(color: AppColors.textGrey, fontSize: 12),
            ),
            const SizedBox(height: 16),
            _isGeneratingMealPlan
                ? const Center(child: CircularProgressIndicator(color: AppColors.neonGreen))
                : ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.neonGreen,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    onPressed: () async {
                      setState(() => _isGeneratingMealPlan = true);
                      try {
                        await context.read<TrackingProvider>().generateMealPlan();
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Failed to generate meal plan: $e'), backgroundColor: Colors.redAccent),
                        );
                      } finally {
                        if (mounted) {
                          setState(() => _isGeneratingMealPlan = false);
                        }
                      }
                    },
                    child: const Text(
                      'Generate AI Meal Plan',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
          ],
        ),
      );
    }

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkGreenBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Text('🤖 ', style: TextStyle(fontSize: 20)),
                  const Text(
                    'AI Daily Meal Planner',
                    style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              if (!_isGeneratingMealPlan)
                TextButton(
                  onPressed: () async {
                    setState(() => _isGeneratingMealPlan = true);
                    try {
                      await context.read<TrackingProvider>().generateMealPlan();
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Failed to generate meal plan: $e'), backgroundColor: Colors.redAccent),
                      );
                    } finally {
                      if (mounted) {
                        setState(() => _isGeneratingMealPlan = false);
                      }
                    }
                  },
                  child: const Text('Regenerate', style: TextStyle(color: AppColors.neonGreen, fontSize: 12, fontWeight: FontWeight.bold)),
                ),
            ],
          ),
          const SizedBox(height: 12),
          if (_isGeneratingMealPlan)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 20.0),
              child: Center(child: CircularProgressIndicator(color: AppColors.neonGreen)),
            )
          else ...[
            Container(
              height: 200,
              child: ScrollConfiguration(
                behavior: MouseDragScrollBehavior(),
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: (trackingProvider.aiMealPlan!['meals'] as List<dynamic>).length,
                  separatorBuilder: (_, __) => const SizedBox(width: 12),
                  itemBuilder: (context, index) {
                    final meal = trackingProvider.aiMealPlan!['meals'][index];
                    return _buildSuggestedMealCard(context, meal, workoutStyle);
                  },
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildSuggestedMealCard(BuildContext context, Map<String, dynamic> meal, String workoutStyle) {
    final mealName = meal['meal_name'] ?? 'Meal';
    final foods = (meal['foods'] as List<dynamic>?) ?? [];

    int mealCalories = 0;
    double mealProtein = 0;
    double mealCarbs = 0;
    double mealFat = 0;

    for (var f in foods) {
      mealCalories += (f['calories'] as num).toInt();
      mealProtein += (f['protein'] as num).toDouble();
      mealCarbs += (f['carbs'] as num).toDouble();
      mealFat += (f['fat'] as num).toDouble();
    }

    return Container(
      width: 280,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkGreenBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                mealName,
                style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.neonGreen.withOpacity(0.1),
                  foregroundColor: AppColors.neonGreen,
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  minimumSize: Size.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                    side: const BorderSide(color: AppColors.neonGreen, width: 1),
                  ),
                ),
                onPressed: () async {
                  bool success = true;
                  for (var food in foods) {
                    final customFood = {
                      'name': food['name'],
                      'calories': (food['calories'] as num).toDouble(),
                      'protein': (food['protein'] as num).toDouble(),
                      'carbs': (food['carbs'] as num).toDouble(),
                      'fat': (food['fat'] as num).toDouble(),
                    };
                    final ok = await context.read<TrackingProvider>().logFood(
                      '',
                      (food['weight_grams'] as num).toDouble(),
                      workoutStyle,
                      customFood: customFood,
                    );
                    if (!ok) success = false;
                  }
                  if (success && mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Logged $mealName suggestion successfully!'),
                        backgroundColor: AppColors.neonGreen,
                      ),
                    );
                  }
                },
                child: const Text('Log Meal', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Expanded(
            child: ListView.builder(
              shrinkWrap: true,
              physics: const ClampingScrollPhysics(),
              itemCount: foods.length,
              itemBuilder: (context, fIndex) {
                final food = foods[fIndex];
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          food['name'] ?? '',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(color: Colors.white, fontSize: 12),
                        ),
                      ),
                      Text(
                        '${food['weight_grams']}g',
                        style: const TextStyle(color: AppColors.textGrey, fontSize: 11),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          const Divider(color: AppColors.darkGreenBorder, height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '$mealCalories kcal',
                style: const TextStyle(color: AppColors.neonGreen, fontSize: 13, fontWeight: FontWeight.bold),
              ),
              Row(
                children: [
                  _miniMacroBadge('${mealProtein.toInt()}g', Colors.blueAccent),
                  const SizedBox(width: 6),
                  _miniMacroBadge('${mealCarbs.toInt()}g', Colors.orangeAccent),
                  const SizedBox(width: 6),
                  _miniMacroBadge('${mealFat.toInt()}g', Colors.redAccent),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _miniMacroBadge(String value, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: color.withOpacity(0.3), width: 1),
      ),
      child: Text(
        value,
        style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold),
      ),
    );
  }
}

class MouseDragScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<PointerDeviceKind> get dragDevices => {
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
  };
}
