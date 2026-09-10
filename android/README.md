# SwapCircle - Native Android App (Kotlin & Jetpack Compose)

This is the complete native Android SDK application for **SwapCircle**, built using **Kotlin**, **Jetpack Compose**, and **Material 3**.

## Architecture & Features

- **Kotlin & Jetpack Compose**: 100% declarative UI with Material 3 design and the sustainable forest green aesthetic (`#0F5238`).
- **Navigation Compose**: Single-Activity architecture with `NavHost`, `NavigationBar`, and typed route arguments.
- **Coil**: Smooth asynchronous image loading with rounded clipping.
- **Data Models & Mock Repository**:
  - `ItemListing` with dual modes (`ListingType.BARTER` vs `ListingType.FREE`), category support including **Others**, distance indicators, and match scoring.
  - `UserProfile` with community sustainability metrics (`ecoScore`, `itemsDiverted`, `co2SavedKg`, `moneySaved`).
  - `Exchange` with tracking for status (`WAITING`, `ACCEPTED`, `COMPLETED`, `DECLINED`) and side-by-side trade comparisons.
  - `ChatMessage` with conversational chat bubbles for coordinating drop-offs and swaps.

## Project Structure

```
android/
├── build.gradle.kts
├── settings.gradle.kts
└── app/
    ├── build.gradle.kts
    └── src/main/
        ├── AndroidManifest.xml
        └── java/com/swapcircle/app/
            ├── MainActivity.kt
            ├── model/
            │   └── Models.kt
            ├── data/
            │   └── MockData.kt
            └── ui/
                ├── theme/
                │   ├── Color.kt
                │   └── Theme.kt
                ├── navigation/
                │   └── Navigation.kt
                └── screens/
                    ├── HomeScreen.kt
                    ├── ExploreScreen.kt
                    ├── CreateListingScreen.kt
                    ├── ItemDetailScreen.kt
                    ├── ExchangesScreen.kt
                    ├── MessagingScreen.kt
                    └── ProfileScreen.kt
```

## How to Run

1. Open **Android Studio** (Koala, Ladybug, or newer).
2. Choose **Open an Existing Project** and select the `/android` directory.
3. Allow Gradle to sync dependencies.
4. Run on an Android Emulator or connected device running Android 8.0+ (API 26+).
