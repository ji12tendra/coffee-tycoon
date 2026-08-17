# 📱 Coffee Tycoon - Direct Mobile & Android APK Setup Guide

इस गेम को बिना Play Store पर पब्लिश किए सीधे अपने मोबाइल में **APK (Android App)** की तरह इंस्टॉल करने और चलाने की पूरी विधि नीचे दी गई है:

---

## ⚡ विकल्प 1: सबसे तेज़ तरीका - 1-Click PWA Installation (बिना किसी टूल के)

यदि आप कोई कंप्यूटर या Android Studio इस्तेमाल नहीं करना चाहते:
1. अपने मोबाइल (Android/iPhone) में गेम की लिंक **Chrome** या **Safari** में खोलें।
2. ब्राउज़र के **3-Dots (मेनू)** पर टैप करें।
3. **"Add to Home Screen"** या **"Install App"** पर क्लिक करें।
4. ऐप आपके फोन की होम स्क्रीन पर एक असली ऐप (Full Screen, App Icon & Offline storage) की तरह इंस्टॉल हो जाएगा!

---

## 🛠️ विकल्प 2: Standalone `.apk` फाइल बनाना (Capacitor के ज़रिए)

हमने इस प्रोजेक्ट में **Capacitor Core, Android, Haptics और Status Bar** पहले से कंफिगर कर दिया है।

### चरण-दर-चरण निर्देश (Step-by-Step):

### 1. प्रोजेक्ट को डाउनलोड / क्लोन करें
AI Studio के मेनू से प्रोजेक्ट को **ZIP** या **GitHub** के माध्यम से अपने कंप्यूटर पर डाउनलोड करें।

### 2. पैकेज और बिल्ड तैयार करें
टर्मिनल में प्रोजेक्ट डायरेक्टरी खोलें और रन करें:
```bash
npm install
npm run build
```

### 3. Android प्रोजेक्ट फोल्डर जोड़ें
```bash
npx cap add android
```
*(यह आपके प्रोजेक्ट में एक `android/` फोल्डर बना देगा)*

### 4. वेब बिल्ड को Android में सिंक करें
```bash
npm run cap:build
```

### 5. Android Studio में खोलें और APK निकालें
```bash
npm run cap:android
```
- Android Studio खुलने के बाद, ऊपर मेनू से चुनें:
  **Build > Build Bundle(s) / APK(s) > Build APK(s)**
- कुछ ही पलों में `app-debug.apk` फाइल तैयार हो जाएगी।
- इस `.apk` फाइल को WhatsApp, USB केबल या Google Drive के ज़रिए अपने किसी भी Android फोन में भेजें और सीधे इंस्टॉल (Sideload) करें!

---

## ⚙️ Capacitor Configuration Details
- **App ID**: `com.coffeetycoon.game`
- **App Name**: `Coffee Tycoon`
- **Web Directory**: `dist`
- **Native Features**:
  - Haptic Touch Vibration on Brew & Upgrade Tap (`@capacitor/haptics`)
  - Immersive Dark/Light Status Bar (`@capacitor/status-bar`)
  - Offline Local Storage State Retention
