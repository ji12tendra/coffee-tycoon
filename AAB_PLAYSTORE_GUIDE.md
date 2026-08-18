# 📦 Coffee Tycoon - Google Play Store .AAB File Generation Guide

यह गाइड आपको **.aab (Android App Bundle)** फाइल तैयार करने के 2 सबसे आसान और 100% वर्किंग तरीके सिखाता है:

---

## ⚡ तरीका 1: 1-Click Online .AAB Generator (बिना किसी सॉफ्टवेयर के - 2 मिनट में)

अगर आपके पास Android Studio नहीं है या आप तुरंत बिना किसी कोडिंग के Play Store वाली `.aab` फाइल डाउनलोड करना चाहते हैं:

1. **लाइव URL कॉपी करें:**
   ```
   https://ais-pre-k72fyrw5tmowjbq5pdrk4s-163574742836.asia-southeast1.run.app
   ```
2. [PWABuilder.com](https://www.pwabuilder.com/) खोलें।
3. ऊपर दिए गए URL को बॉक्स में पेस्ट करें और **"Start"** दबाएं।
4. **"Package For Stores"** बटन पर क्लिक करके **Android** चुनें।
5. **Options:**
   - **Package ID**: `com.coffeetycoon.game`
   - **App Name**: `Coffee Tycoon`
   - **Signing key**: **"Generate new key"** चुनें (इस चाबी को डाउनलोड करके संभाल लें)।
6. **"Download Package"** पर क्लिक करें। 
   - आपको एक `.zip` फाइल मिलेगी जिसमें आपकी रेडी-टू-अपलोड **`app-release.aab`** फाइल होगी!

---

## 💻 तरीका 2: Android Studio और Capacitor (ऑफिशियल डेवलपर तरीका)

प्रोजेक्ट में Capacitor Android पहले से पूरी तरह कंफिगर किया गया है।

### स्टेप 1: प्रोजेक्ट डाउनलोड करें
- AI Studio के टॉप-राइट मेनू से **"Export to ZIP"** दबाकर प्रोजेक्ट को अपने कंप्यूटर में एक्सट्रैक्ट करें।

### स्टेप 2: टर्मिनल में कमांड चलाएं
```bash
# 1. सभी डिपेंडेंसी इंस्टॉल करें
npm install

# 2. प्रोडक्शन बिल्ड बनाएं
npm run build

# 3. एंड्राइड प्रोजेक्ट जोड़ें और सिंक करें
npx cap add android
npx cap sync android

# 4. Android Studio खोलें
npx cap open android
```

### स्टेप 3: Android Studio में Signed Bundle (.aab) बनाएं
1. Android Studio के मेनू बार में जाएं:
   👉 **Build > Generate Signed Bundle / APK...**
2. **Android App Bundle (.aab)** चुनें और **Next** पर क्लिक करें।
3. **Keystore Path**: "Create new..." दबाएं, अपना पासवर्ड और नाम भरें।
4. **Build Variant**: **`release`** चुनें।
5. **Create** दबाएं।
6. बिल्ड पूरा होते ही स्क्रीन पर **"Locate"** का विकल्प आएगा। उस पर क्लिक करते ही आपकी **`app-release.aab`** फाइल आपके सामने होगी!

---

## 📤 Google Play Console पर अपलोड करने का तरीका

1. [Google Play Console](https://play.google.com/console) पर जाएं और अपने ऐप में जाएं।
2. बायीं तरफ के मेनू से **Production** (या Closed Testing) पर क्लिक करें।
3. **"Create New Release"** दबाएं।
4. अपनी **`.aab` फाइल को ड्रैग & ड्रॉप (Upload)** करें।
5. **Release Notes** में लिखें: *"Coffee Tycoon v1.0.0 Initial Launch"*.
6. **Save & Review Release** दबाकर सबमिट कर दें!
