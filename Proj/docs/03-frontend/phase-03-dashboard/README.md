# Frontend Phase 03: Dashboard, Tracking & Analytics UI

## 1. Objective
Build the core Home screen featuring the daily adaptive schedule, food logging interface, and progress charts.

## 2. Requirements Mapping
- **US05 & US06 (FR05):** Build the Daily Schedule UI. It must be **Adaptive**: display a checklist with Sets/Reps for Gym, or a countdown timer for Yoga. Hide the training tab if "Diet Only" is selected. Include a YouTube video player or link handler for tutorials.
- **US11 & US12:** Build a Nutrition Search screen. Users can search the dictionary, select an item, input custom grams, and tap "Add to Log".
- **US07:** Implement checkbox toggles for workout check-ins.
- **US08 & US14:** Integrate a charting library (e.g., `fl_chart` or `syncfusion_flutter_charts`) to display a Macro progress bar (Consumed vs Target) and a 30-day weight trend line chart.

## 3. Technical Implementation Details
- Implement a `TrackingProvider` to manage the state of the Daily Log, ensuring UI updates instantly when a food item is logged or an exercise is checked off.
- The Adaptive UI should parse the Polymorphic JSON returned from the backend and render distinct Flutter Widgets (e.g., `GymCardWidget` vs `YogaCardWidget`).

## 4. Definition of Done (DoD)
- [ ] Dashboard displays accurate target vs. consumed macros visually.
- [ ] Adaptive UI correctly differentiates between Gym and Yoga JSON structures.
- [ ] Users can successfully search the dictionary and log food, updating the progress bar in real-time.