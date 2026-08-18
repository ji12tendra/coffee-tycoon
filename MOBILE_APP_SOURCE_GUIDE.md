# 📱 Coffee Tycoon - Complete Native Android & iOS Mobile Source Code

This project is now structured and compiled as a **100% Native Mobile Application** using **Capacitor + React Native Web Engine + Java / Gradle Android Project**.

---

## 📂 Project Architecture

```text
📁 / (Root)
├── 📁 android/                     👈 COMPLETE NATIVE ANDROID STUDIO PROJECT (JAVA / GRADLE)
│   ├── 📁 app/
│   │   ├── 📁 src/main/
│   │   │   ├── AndroidManifest.xml 👈 Native Package Configuration, Permissions & App Launcher
│   │   │   ├── 📁 java/com/coffeetycoon/game/MainActivity.java 👈 Native Android Activity
│   │   │   └── 📁 res/             👈 Native Android Icons, Drawables & Splash Styles
│   │   └── build.gradle            👈 Android Gradle Build Script
│   ├── build.gradle
│   ├── settings.gradle
│   └── variables.gradle
│
├── 📁 src/                         👈 Mobile Core Logic
│   ├── 📁 utils/
│   │   ├── nativeMobile.ts         👈 Native StatusBar & Hardware Vibration Engine
│   │   └── audio.ts                👈 Native Haptic & WebAudio Synthesizer
│   └── ...
│
├── capacitor.config.ts             👈 Native App ID (com.coffeetycoon.game) & Plugin Configuration
└── package.json                    👈 Mobile build scripts (cap:build, cap:android)
```

---

## 🛠️ How to Generate APK / AAB (Signed Release)

### 1. Download the Full Source Code
Click **Settings** (top right) ➡️ **Export to ZIP** and extract it on your computer.

### 2. Open in Android Studio
- Open **Android Studio**.
- Click **"Open"** and select the **`/android`** folder directly.
- Android Studio will automatically sync Gradle and download all native Android libraries.

### 3. Build APK or Play Store Bundle (.AAB)
- In the top menu of Android Studio:
  - **For Direct Test APK:** `Build > Build Bundle(s) / APK(s) > Build APK(s)`
  - **For Play Store Release (.AAB):** `Build > Generate Signed Bundle / APK > Android App Bundle`
