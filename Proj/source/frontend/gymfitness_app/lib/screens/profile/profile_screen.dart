import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
<<<<<<< Updated upstream
import '../onboarding/onboarding_screen.dart';
=======
import '../../providers/profile_provider.dart';
import '../../providers/tracking_provider.dart';
import '../../providers/chat_provider.dart';
import '../../utils/constants.dart';
>>>>>>> Stashed changes

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();

  double? _height;
  double? _weight;
  int? _age;
  String? _gender;
  String? _activityLevel;
  String? _workoutStyle;
  String? _goal;
  String? _diet;

  bool _isInit = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _loadExistingProfile());
  }

  void _loadExistingProfile() {
    if (!mounted) return;
    final profile = context.read<ProfileProvider>().profileData;
    if (profile == null) return;

    setState(() {
      _height = profile['height'] != null ? (profile['height'] as num).toDouble() : null;
      _weight = profile['weight'] != null ? (profile['weight'] as num).toDouble() : null;
      _age = profile['age'] != null ? (profile['age'] as num).toInt() : null;
      _gender = profile['gender'];
      _activityLevel = profile['activityLevel'];
      _workoutStyle = profile['workoutStyle'];
      _goal = profile['goal'];
      _diet = profile['diet'];
    });
  }

  void _submit() async {
    if (!_formKey.currentState!.validate()) return;
    _formKey.currentState!.save();

    final data = {
      'height': _height,
      'weight': _weight,
      'age': _age,
      'gender': _gender,
      'activityLevel': _activityLevel,
      'workoutStyle': _workoutStyle,
      'goal': _goal,
      'diet': _diet,
    };

    final provider = Provider.of<ProfileProvider>(context, listen: false);

    try {
      final success = await provider.updateMetrics(data);
      if (success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text('Profile updated successfully! ✅'),
            backgroundColor: AppColors.neonGreen,
            action: SnackBarAction(label: 'OK', textColor: Colors.black, onPressed: () {}),
          ),
        );
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString()), backgroundColor: Colors.red),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
<<<<<<< Updated upstream
    return OnboardingScreen();
=======
    final profile = context.watch<ProfileProvider>().profileData;
    final isLoading = context.watch<ProfileProvider>().isLoading;

    if (profile == null) {
      _isInit = false;
    } else if (!_isInit) {
      _height = profile['height'] != null ? (profile['height'] as num).toDouble() : null;
      _weight = profile['weight'] != null ? (profile['weight'] as num).toDouble() : null;
      _age = profile['age'] != null ? (profile['age'] as num).toInt() : null;
      _gender = profile['gender'];
      _activityLevel = profile['activityLevel'];
      _workoutStyle = profile['workoutStyle'];
      _goal = profile['goal'];
      _diet = profile['diet'];
      _isInit = true;
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('⚙️ Profile Settings', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: AppColors.neonGreen),
            tooltip: 'Logout',
            onPressed: () {
              context.read<AuthProvider>().logout(
                context.read<ChatProvider>(),
                context.read<TrackingProvider>(),
                context.read<ProfileProvider>(),
              );
            },
          ),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator(color: AppColors.neonGreen))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Header Card
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [AppColors.buttonBackground, AppColors.inputBackground],
                        ),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppColors.darkGreenBorder),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Your Physical Profile',
                            style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w900),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            profile != null
                                ? 'Goal: ${profile['goal'] ?? 'N/A'} • Style: ${profile['workoutStyle'] ?? 'N/A'} • Diet: ${profile['diet'] ?? 'N/A'}'
                                : 'Fill in your details to get personalized recommendations.',
                            style: const TextStyle(color: AppColors.neonGreen, fontSize: 14),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 28),

                    _sectionTitle('BODY MEASUREMENTS'),
                    const SizedBox(height: 16),

                    Row(
                      children: [
                        Expanded(child: _buildNumberField('Height (cm)', (val) => _height = double.parse(val!), _height == null ? '' : _height!.toString())),
                        const SizedBox(width: 16),
                        Expanded(child: _buildNumberField('Weight (kg)', (val) => _weight = double.parse(val!), _weight == null ? '' : _weight!.toString())),
                      ],
                    ),
                    const SizedBox(height: 16),

                    Row(
                      children: [
                        Expanded(child: _buildNumberField('Age', (val) => _age = int.parse(val!), _age == null ? '' : _age!.toString())),
                        const SizedBox(width: 16),
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            value: _gender,
                            dropdownColor: Colors.grey[900],
                            decoration: _inputDecoration('Gender'),
                            style: const TextStyle(color: Colors.white),
                            items: [
                              DropdownMenuItem(value: 'M', child: const Text('Male')),
                              DropdownMenuItem(value: 'F', child: const Text('Female')),
                            ],
                            onChanged: (val) => setState(() => _gender = val),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 28),

                    _sectionTitle('ACTIVITY & GOALS'),
                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      value: _activityLevel,
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Activity Level'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Sedentary', 'Light', 'Moderate', 'Very', 'Extra']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g)))
                          .toList(),
                      onChanged: (val) => setState(() => _activityLevel = val),
                    ),
                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      value: _workoutStyle,
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Workout Style'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Bodybuilding', 'Cardio', 'Yoga', 'Calisthenics', 'Diet Only']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g)))
                          .toList(),
                      onChanged: (val) => setState(() => _workoutStyle = val),
                    ),
                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      value: _goal,
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Goal'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Fat Loss', 'Muscle Gain', 'Maintenance']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g)))
                          .toList(),
                      onChanged: (val) => setState(() => _goal = val),
                    ),
                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      value: _diet,
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Diet Type'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Balanced', 'Low Carb', 'Keto', 'Vegan', 'Vegetarian']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g)))
                          .toList(),
                      onChanged: (val) => setState(() => _diet = val),
                    ),
                    const SizedBox(height: 28),

                    if (profile != null) ...[
                      _sectionTitle('CURRENT TARGETS'),
                      const SizedBox(height: 16),
                      _buildTargetCard(profile),
                      const SizedBox(height: 28),
                    ],

                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.neonGreen,
                        foregroundColor: Colors.black,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      onPressed: _submit,
                      child: const Text('Save Profile & Recalculate', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildTargetCard(Map<String, dynamic> profile) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.inputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkGreenBorder),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _macroTarget('${profile['targetCalories'] ?? 0}', 'kcal/day', AppColors.neonGreen),
              _macroTarget('${profile['targetProtein'] ?? 0}g', 'Protein', Colors.blueAccent),
              _macroTarget('${profile['targetCarbs'] ?? 0}g', 'Carbs', Colors.orangeAccent),
              _macroTarget('${profile['targetFat'] ?? 0}g', 'Fat', Colors.redAccent),
            ],
          ),
        ],
      ),
    );
>>>>>>> Stashed changes
  }

  Widget _macroTarget(String value, String label, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(color: color, fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: AppColors.textGrey, fontSize: 11)),
      ],
    );
  }

  Widget _sectionTitle(String title) {
    return Text(title, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 1.2));
  }

  Widget _buildNumberField(String label, Function(String?) onSave, String initial) {
    return TextFormField(
      initialValue: initial,
      keyboardType: TextInputType.number,
      style: const TextStyle(color: Colors.white),
      decoration: _inputDecoration(label),
      validator: (value) => value!.isEmpty ? 'Required' : null,
      onSaved: onSave,
    );
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: const TextStyle(color: AppColors.neonGreen),
      enabledBorder: OutlineInputBorder(
        borderSide: const BorderSide(color: AppColors.darkGreenBorder),
        borderRadius: BorderRadius.circular(12),
      ),
      focusedBorder: OutlineInputBorder(
        borderSide: const BorderSide(color: AppColors.neonGreen, width: 2),
        borderRadius: BorderRadius.circular(12),
      ),
      filled: true,
      fillColor: AppColors.inputBackground,
    );
  }
}
