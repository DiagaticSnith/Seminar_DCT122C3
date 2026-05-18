import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/profile_provider.dart';
import 'providers/tracking_provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/main_layout.dart';
import 'utils/constants.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ProfileProvider()),
        ChangeNotifierProvider(create: (_) => TrackingProvider()),
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
      home: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          if (auth.isAuthenticated) {
            return const MainLayoutScreen();
          }
          return const LoginScreen();
        },
      ),
    );
  }
}
