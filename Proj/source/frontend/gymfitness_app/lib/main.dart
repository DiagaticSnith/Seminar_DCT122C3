import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/profile_provider.dart';
import 'providers/tracking_provider.dart';
import 'providers/chat_provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/main_layout.dart';
import 'screens/onboarding/onboarding_screen.dart';
import 'utils/constants.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ProfileProvider()),
        ChangeNotifierProvider(create: (_) => TrackingProvider()),
        ChangeNotifierProvider(create: (_) => ChatProvider()),
      ],
      child: const GymFitnessApp(),
    ),
  );
}

class GymFitnessApp extends StatelessWidget {
  const GymFitnessApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GymFitness-AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: AppColors.background,
        colorScheme: ColorScheme.dark(
          primary: AppColors.neonGreen,
          background: AppColors.background,
        ),
        textTheme: const TextTheme(
          bodyMedium: TextStyle(color: AppColors.textLight),
        ),
      ),
      home: const AuthWrapper(),
    );
  }
}

class AuthWrapper extends StatefulWidget {
  const AuthWrapper({Key? key}) : super(key: key);

  @override
  State<AuthWrapper> createState() => _AuthWrapperState();
}

class _AuthWrapperState extends State<AuthWrapper> {
  bool _checkedProfile = false;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final profileProvider = context.watch<ProfileProvider>();

    if (!auth.isAuthenticated) {
      _checkedProfile = false;
      return const LoginScreen();
    }

    if (!_checkedProfile) {
      Future.microtask(() async {
        await profileProvider.fetchProfile();
        if (mounted) {
          setState(() {
            _checkedProfile = true;
          });
        }
      });
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(color: AppColors.neonGreen),
        ),
      );
    }

    final hasProfile = profileProvider.profileData != null &&
        profileProvider.profileData!['height'] != null;

    if (!hasProfile || auth.isNewUser) {
      return OnboardingScreen();
    }

    return const MainLayoutScreen();
  }
}
