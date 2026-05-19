import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/profile_provider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/chat_provider.dart';
import '../../providers/tracking_provider.dart';

class OnboardingScreen extends StatefulWidget {
  @override
  _OnboardingScreenState createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _formKey = GlobalKey<FormState>();
  
  double? _height;
  double? _weight;
  int? _age;
  String? _gender;
  String? _activityLevel;
  String? _workoutStyle;
  String? _goal;
  String? _diet;

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
      'diet': _diet ?? 'Balanced',
    };

    final provider = Provider.of<ProfileProvider>(context, listen: false);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    
    try {
      final success = await provider.updateMetrics(data);
      if (success) {
        if (!mounted) return;
        authProvider.completeOnboarding();
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
    final provider = Provider.of<ProfileProvider>(context);

    return Scaffold(
      backgroundColor: const Color(0xFF121212), // Dark Mode
      appBar: AppBar(
        title: const Text('Setup Your Profile', style: TextStyle(color: Colors.greenAccent)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              context.read<AuthProvider>().logout(
                context.read<ChatProvider>(),
                context.read<TrackingProvider>(),
                context.read<ProfileProvider>(),
              );
            },
          )
        ],
      ),
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator(color: Colors.greenAccent))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text('Let’s personalize your experience!', style: TextStyle(color: Colors.white70, fontSize: 16)),
                    const SizedBox(height: 20),
                    
                    // Height & Weight
                    Row(
                      children: [
                        Expanded(
                          child: _buildNumberField(
                            'Height (cm)',
                            (val) => _height = double.parse(val!),
                            _height == null ? '' : _height!.toString(),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildNumberField(
                            'Weight (kg)',
                            (val) => _weight = double.parse(val!),
                            _weight == null ? '' : _weight!.toString(),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Age & Gender
                    Row(
                      children: [
                        Expanded(
                          child: _buildNumberField(
                            'Age',
                            (val) => _age = int.parse(val!),
                            _age == null ? '' : _age!.toString(),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            value: _gender,
                            hint: const Text('Select Gender', style: TextStyle(color: Colors.white30, fontSize: 14)),
                            dropdownColor: Colors.grey[900],
                            decoration: _inputDecoration('Gender'),
                            style: const TextStyle(color: Colors.white),
                            items: const [
                              DropdownMenuItem(value: 'M', child: Text('M')),
                              DropdownMenuItem(value: 'F', child: Text('F')),
                            ],
                            validator: (val) => val == null ? 'Required' : null,
                            onChanged: (val) => setState(() => _gender = val),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Activity Level
                    DropdownButtonFormField<String>(
                      value: _activityLevel,
                      hint: const Text('Select Activity Level', style: TextStyle(color: Colors.white30, fontSize: 14)),
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Activity Level'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Sedentary', 'Light', 'Moderate', 'Very', 'Extra']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
                      validator: (val) => val == null ? 'Required' : null,
                      onChanged: (val) => setState(() => _activityLevel = val),
                    ),
                    const SizedBox(height: 16),

                    // Workout Style
                    DropdownButtonFormField<String>(
                      value: _workoutStyle,
                      hint: const Text('Select Workout Style', style: TextStyle(color: Colors.white30, fontSize: 14)),
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Workout Style'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Bodybuilding', 'Cardio', 'Yoga', 'Calisthenics', 'Diet Only']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
                      validator: (val) => val == null ? 'Required' : null,
                      onChanged: (val) => setState(() => _workoutStyle = val),
                    ),
                    const SizedBox(height: 16),

                    // Goal
                    DropdownButtonFormField<String>(
                      value: _goal,
                      hint: const Text('Select Goal', style: TextStyle(color: Colors.white30, fontSize: 14)),
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Goal'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Fat Loss', 'Muscle Gain', 'Maintenance']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
                      validator: (val) => val == null ? 'Required' : null,
                      onChanged: (val) => setState(() => _goal = val),
                    ),
                    const SizedBox(height: 16),

                    // Diet Type
                    DropdownButtonFormField<String>(
                      value: _diet,
                      hint: const Text('Select Diet Type', style: TextStyle(color: Colors.white30, fontSize: 14)),
                      dropdownColor: Colors.grey[900],
                      decoration: _inputDecoration('Diet Type'),
                      style: const TextStyle(color: Colors.white),
                      items: ['Balanced', 'Low Carb', 'Keto', 'Vegan', 'Vegetarian']
                          .map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
                      validator: (val) => val == null ? 'Required' : null,
                      onChanged: (val) => setState(() => _diet = val),
                    ),
                    const SizedBox(height: 32),

                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.greenAccent,
                        foregroundColor: Colors.black,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: _submit,
                      child: const Text('Generate Routine & Save', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildNumberField(String label, Function(String?) onSave, String initial) {
    return TextFormField(
      initialValue: initial.isEmpty ? null : initial,
      keyboardType: TextInputType.number,
      style: const TextStyle(color: Colors.white),
      decoration: _inputDecoration(label),
      validator: (value) {
        if (value == null || value.isEmpty) return 'Required';
        if (double.tryParse(value) == null) return 'Invalid number';
        return null;
      },
      onSaved: onSave,
    );
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: const TextStyle(color: Colors.greenAccent),
      enabledBorder: OutlineInputBorder(
        borderSide: const BorderSide(color: Colors.white24),
        borderRadius: BorderRadius.circular(12),
      ),
      focusedBorder: OutlineInputBorder(
        borderSide: const BorderSide(color: Colors.greenAccent, width: 2),
        borderRadius: BorderRadius.circular(12),
      ),
      filled: true,
      fillColor: const Color(0xFF1E1E1E),
    );
  }
}
