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
      body: Column(
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
                          setState(() => _searchQuery = '');
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
              onChanged: (val) => setState(() => _searchQuery = val),
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
            const SizedBox(height: 20),
            const Divider(color: AppColors.darkGreenBorder, height: 1),
          ],

          // Dictionary List Header
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Text('NUTRITION DICTIONARY', style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
          ),

          // Dictionary List
          Expanded(
            child: trackingProvider.isLoading && trackingProvider.foodItems.isEmpty
                ? const Center(child: CircularProgressIndicator(color: AppColors.neonGreen))
                : foodItems.isEmpty
                    ? const Center(child: Text('No food items found', style: TextStyle(color: AppColors.textGrey)))
                    : ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 8.0),
                        itemCount: foodItems.length,
                        separatorBuilder: (_, __) => const SizedBox(height: 12),
                        itemBuilder: (context, index) {
                          final item = foodItems[index];
                          return _buildFoodCard(context, item, workoutStyle);
                        },
                      ),
          ),
        ],
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
}
