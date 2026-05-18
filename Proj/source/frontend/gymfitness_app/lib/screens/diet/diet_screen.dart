import 'package:flutter/material.dart';

class DietScreen extends StatelessWidget {
  const DietScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Diet Log')),
      body: const Center(
        child: Text('Phase Pending - Coming Soon', style: TextStyle(fontSize: 18)),
      ),
    );
  }
}
