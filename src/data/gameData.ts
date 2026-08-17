import {
  ShopLevel,
  StaffMember,
  StaffTrainingProgram,
  BusinessUpgrade,
  LuxuryItem,
  Stock,
  MutualFund,
  RealEstateProperty,
  SovereignBond,
  LoanPlan,
  DailyEvent,
  InteractiveDailyEvent,
  QuizQuestion,
  Achievement,
  CustomerReview,
} from '../types/game';

// 5 Progression Levels of Coffee Business with Real-Life Overheads
export const SHOP_LEVELS: ShopLevel[] = [
  {
    id: 1,
    name: { en: 'Street Thela / Tapri', hi: 'स्ट्रीट ठेला / चाय-कॉफ़ी टपरी' },
    tagline: { en: 'Humble Roadside Stand with Fresh Filter Coffee', hi: 'छोटे से ठेले से शुरुआत, ताज़ा फिल्टर कॉफ़ी' },
    description: {
      en: 'Manual hand brewing on roadside with a gas stove. Low rent, direct cash flow, high grit.',
      hi: 'सड़क किनारे गैस स्टोव और पीतल फिल्टर के साथ शुरुआत। कम खर्च और तुरंत नकद कमाई।',
    },
    costToUnlock: 0,
    minNetWorthRequired: 0,
    baseCustomerFlow: 45, // 45 customers/day
    baseCupPrice: 20, // ₹20
    imageIcon: '☕',
    gradient: ['#92400e', '#78350f'],
    perks: {
      en: ['Minimal municipality overheads', 'Direct cash customer relationships', 'Instant manual brewing'],
      hi: ['नाममात्र का किराया', 'ग्राहकों से सीधा संपर्क', 'तुरंत नकद कमाई'],
    },
    dailyRentCost: 40, // Municipal street permit fee ₹40/day
    dailyPowerCost: 35, // LPG gas cylinder + small battery bulb ₹35/day
    dailyWaterSanitationCost: 25, // 20L Water jars ₹25/day
    packagingCostPerCup: 1.5, // Simple paper cup + wooden stirrer
    dailyMachineAmcCost: 15, // Gas stove burner cleaning & filter cloth
    dailyComplianceCost: 10, // Local vendor association token fee
  },
  {
    id: 2,
    name: { en: 'Corner Shopping Kiosk', hi: 'कॉर्नर मार्केट कियोस्क एवं टेकअवे' },
    tagline: { en: 'Semi-Automatic Espresso Machine & Bakery Shelf', hi: 'सेमी-ऑटोमैटिक मशीन और स्नैक्स काउंटर' },
    description: {
      en: 'A dedicated shopping street takeaway kiosk with a commercial 2-group machine and bakery glass counter.',
      hi: 'मार्केट में पक्की दुकान, 2-ग्रुप एस्प्रेसो मशीन और मफिन्स/कुकीज़ की बिक्री।',
    },
    costToUnlock: 50000,
    minNetWorthRequired: 80000,
    baseCustomerFlow: 140,
    baseCupPrice: 60, // ₹60
    imageIcon: '🏪',
    gradient: ['#b45309', '#d97706'],
    perks: {
      en: ['High footfall takeaway traffic', 'Specialty Cold Coffee & Cappuccino', 'Food Aggregator delivery enabled'],
      hi: ['ज्यादा ग्राहक संख्या', 'कैपुचीनो और कोल्ड कॉफ़ी का विकल्प', 'ज़ोमैटो/स्वीगी डिलीवरी की सुविधा'],
    },
    dailyRentCost: 450, // Commercial retail lease ₹13,500/month (₹450/day)
    dailyPowerCost: 180, // Commercial power tariff, beverage cooler & display lighting
    dailyWaterSanitationCost: 80, // RO filter maintenance & daily jar supply
    packagingCostPerCup: 3.5, // Branded insulated takeaway cup + lid + sleeve
    dailyMachineAmcCost: 65, // Commercial espresso machine descaling & gasket upkeep
    dailyComplianceCost: 35, // Basic FSSAI registration & municipal shop license
  },
  {
    id: 3,
    name: { en: 'High-Street Cozy Cafe', hi: 'हाई-स्ट्रीट कोज़ी कैफ़े' },
    tagline: { en: 'Artisanal Brews, Fast WiFi & Velvet Seating', hi: 'आर्टिसनल ब्रू, एसी और आरामदायक सोफ़ा' },
    description: {
      en: 'A premier city cafe where youth, freelancers and professionals love to hang out, work and socialize.',
      hi: 'शहर का पसंदीदा हैंगआउट स्पॉट, जहां युवा और फ्रीलांसर काम और मुलाकातों के लिए आते हैं।',
    },
    costToUnlock: 350000,
    minNetWorthRequired: 600000,
    baseCustomerFlow: 380,
    baseCupPrice: 150, // ₹150
    imageIcon: '🛋️',
    gradient: ['#0f766e', '#115e59'],
    perks: {
      en: ['Automated POS billing & barista bar', 'High average order value (₹150 - ₹240)', 'Loyalty membership club'],
      hi: ['ऑटोमेटेड कैशियर और बरिस्ता सिस्टम', 'बड़ा बिल साइज़ (₹150 - ₹240)', 'लॉयल्टी कस्टमर क्लब'],
    },
    dailyRentCost: 2200, // Prime commercial location ₹66,000/month (₹2,200/day)
    dailyPowerCost: 750, // 3-phase commercial AC, high-wattage espresso boiler, sound system
    dailyWaterSanitationCost: 220, // Commercial RO plant, dishwashing & restroom upkeep
    packagingCostPerCup: 6.0, // Premium embossed cups, paper bags, drink holders
    dailyMachineAmcCost: 180, // Comprehensive machine AMC, water softener salt, grinder burrs
    dailyComplianceCost: 90, // FSSAI state license, fire NOC, GST accounting retainer
  },
  {
    id: 4,
    name: { en: 'Espresso Lounge & Gourmet Bakery', hi: 'लक्ज़री एस्प्रेसो लाउंज एवं बेकरी' },
    tagline: { en: 'Single-Origin Beans, French Pastries & VIP Crowd', hi: 'स्पेशलिटी अरेबिका बीन्स और फ्रेंच पेस्ट्री' },
    description: {
      en: 'Fine-dining coffee lounge in upscale district with imported Italian brass machines, rooftop seating and chef-crafted desserts.',
      hi: 'पॉश इलाके में इटालियन ब्रास मशीनों वाला प्रीमियम लाउंज और रूफटॉप डाइनिंग।',
    },
    costToUnlock: 2000000,
    minNetWorthRequired: 3500000,
    baseCustomerFlow: 950,
    baseCupPrice: 300, // ₹300
    imageIcon: '🥐',
    gradient: ['#4338ca', '#3730a3'],
    perks: {
      en: ['Corporate B2B catering contracts', 'Premium ₹300+ ticket margins', 'Fully managed staff shift structure'],
      hi: ['कॉर्पोरेट कैटरिंग कॉन्ट्रैक्ट्स', '₹300+ कप का बड़ा मार्जिन', 'पूरी तरह संगठित शिफ्ट ऑपरेशन्स'],
    },
    dailyRentCost: 6500, // Posh luxury zone ₹1,95,000/month (₹6,500/day)
    dailyPowerCost: 2200, // Multi-ton central chiller HVAC, pastry ovens, walk-in fridge
    dailyWaterSanitationCost: 550, // High-capacity commercial filtration & grease trap maintenance
    packagingCostPerCup: 10.0, // Luxury biodegradable PLA cups, gold foil sleeves & bakery boxes
    dailyMachineAmcCost: 450, // Dedicated technician visit retainer & pressure pump servicing
    dailyComplianceCost: 240, // Central FSSAI license, music copyright license (IPRS), corporate audits
  },
  {
    id: 5,
    name: { en: 'City Flagship Artisan Roastery', hi: 'सिटी फ्लैगशिप आर्टिसन रोस्टरी' },
    tagline: { en: 'In-House Roasting Plant, Live Cupping & Barista Academy', hi: 'इन-हाउस रोस्टिंग प्लांट, लाइव कपिंग व बरिस्ता स्कूल' },
    description: {
      en: 'A massive 3-story industrial heritage flagship cafe with micro-lot bean roasters, nitro cold brew taps, and coffee brewing workshops.',
      hi: '3-मंज़िला विशाल हेरिटेज कैफ़े जहां लाइव बीन्स रोस्टिंग, कोल्ड ब्रू ऑन टैप और कॉफ़ी वर्कशॉप्स चलती हैं।',
    },
    costToUnlock: 8000000, // ₹80 Lakh
    minNetWorthRequired: 15000000, // ₹1.5 Crore
    baseCustomerFlow: 2400,
    baseCupPrice: 450, // ₹450
    imageIcon: '🏭',
    gradient: ['#047857', '#065f46'],
    perks: {
      en: ['B2B roasted bean wholesale supply', 'Direct single-estate coffee farm tie-ups', 'Exclusive barista training academy revenue'],
      hi: ['कैफ़े और होटलों को थोक बीन्स सप्लाई', 'सीधे कॉफ़ी बागानों से पार्टनरशिप', 'बरिस्ता ट्रेनिंग वर्कशॉप से अतिरिक्त आय'],
    },
    dailyRentCost: 14000, // Multi-story industrial hub lease
    dailyPowerCost: 4200, // High-tonnage roasters, nitro chillers, ambient lighting
    dailyWaterSanitationCost: 950, // Industrial reverse osmosis system
    packagingCostPerCup: 12.0, // Custom valve degassing bean bags & glass bottles
    dailyMachineAmcCost: 850, // Multi-head Synesso espresso machine + industrial roaster AMC
    dailyComplianceCost: 450, // Factory pollution board clearance & commercial food laboratory testing
  },
  {
    id: 6,
    name: { en: 'State Multi-Outlet Chain (25+ Stores)', hi: 'मल्टी-आउटलेट 25+ स्टोर्स चेन' },
    tagline: { en: 'Centralized Kitchen, Uniform Standard & Rapid City Expansion', hi: 'सेंट्रलाइज्ड किचन, एक जैसी क्वालिटी और पूरे राज्य में आउटलेट्स' },
    description: {
      en: 'A state-wide network of 25 strategically placed premium outlets powered by a centralized roasting and bakery distribution hub.',
      hi: 'राज्य भर में 25 प्रीमियम आउटलेट्स का मजबूत नेटवर्क, जहां सेंट्रल किचन से रोज़ाना ताज़ा माल सप्लाई होता है।',
    },
    costToUnlock: 30000000, // ₹3 Crore
    minNetWorthRequired: 60000000, // ₹6 Crore
    baseCustomerFlow: 6500,
    baseCupPrice: 600, // ₹600
    imageIcon: '🏙️',
    gradient: ['#0369a1', '#075985'],
    perks: {
      en: ['Bulk ingredient procurement discounts (-25% raw material costs)', 'Centralized brand marketing campaigns', 'Multi-city brand equity'],
      hi: ['थोक खरीद पर 25% भारी छूट', 'टीवी और सोशल मीडिया पर ब्रांड कैंपेन', 'राज्य स्तर पर शीर्ष ब्रांड पहचान'],
    },
    dailyRentCost: 38000, // Central warehouse + 25 retail leases aggregate
    dailyPowerCost: 11500, // Heavy cold chain logistics, blast freezers & store lighting
    dailyWaterSanitationCost: 2800, // Multi-site water testing and sanitation audits
    packagingCostPerCup: 15.0, // Custom branded biodegradable tamper-proof packaging
    dailyMachineAmcCost: 2400, // Enterprise fleet maintenance technician squad
    dailyComplianceCost: 1200, // State corporate tax legal counsel & multi-district trade permits
  },
  {
    id: 7,
    name: { en: 'National Franchise & Drive-Thru Network', hi: 'राष्ट्रीय 100+ फ्रैंचाइज़ व ड्राइव-थ्रू नेटवर्क' },
    tagline: { en: '100+ Outlets, Highway Drive-Thrus & Daily Franchise Royalties', hi: '100+ आउटलेट्स, हाईवे ड्राइव-थ्रू व रोज़ाना पैसिव रॉयल्टी' },
    description: {
      en: 'Pan-India presence with bustling highway drive-thrus, airport express kiosks, and hundreds of franchise partners paying daily brand royalties.',
      hi: 'पूरे देश के नेशनल हाईवे और मॉल में ड्राइव-थ्रू सेंटर्स। सैकड़ों फ्रैंचाइजी पार्टनर्स रोज़ाना रॉयल्टी जमा करते हैं।',
    },
    costToUnlock: 120000000, // ₹12 Crore
    minNetWorthRequired: 250000000, // ₹25 Crore
    baseCustomerFlow: 18000,
    baseCupPrice: 800, // ₹800
    imageIcon: '🚗',
    gradient: ['#6d28d9', '#5b21b6'],
    perks: {
      en: ['Massive passive franchise fee & royalty cashflow', 'Highway 24/7 drive-thru automated ordering lanes', 'Zero local market volatility risk'],
      hi: ['करोड़ों की पैसिव फ्रैंचाइज़ रॉयल्टी', '24 घंटे चलने वाले ऑटोमेटेड ड्राइव-थ्रू', 'मजबूत नेशनल मोनोपोली'],
    },
    dailyRentCost: 95000, // Corporate HQ tower + nationwide logistics distribution centers
    dailyPowerCost: 28000, // 24x7 automated drive-thru screens, illuminated highway pylons & logistics fleet
    dailyWaterSanitationCost: 7500, // National quality assurance laboratory
    packagingCostPerCup: 18.0, // Double-wall thermo cups with smart spill-lock lids
    dailyMachineAmcCost: 6500, // National hardware warranty and spare parts stockpile
    dailyComplianceCost: 3500, // National corporate governance, auditor retainers & franchise disclosure filings
  },
  {
    id: 8,
    name: { en: 'International Airport & Metro Transit Hubs', hi: 'इंटरनेशनल एयरपोर्ट व मेट्रो लाउंज नेटवर्क' },
    tagline: { en: 'T3 International Terminals, High-Net-Worth Travelers & Global Prestige', hi: 'इंटरनेशनल एयरपोर्ट टर्मिनल्स, विदेशी यात्री और प्रीमियम प्रेस्टीज' },
    description: {
      en: 'Exclusive concessions at major international airport departure gates, high-speed rail lounges, and VIP executive concourses.',
      hi: 'दुनिया के बड़े अंतरराष्ट्रीय हवाई अड्डों और वीआईपी मेट्रो लाउंज में एक्सक्लूसिव 24/7 कैफ़े जहां विदेशी यात्री आते हैं।',
    },
    costToUnlock: 450000000, // ₹45 Crore
    minNetWorthRequired: 900000000, // ₹90 Crore
    baseCustomerFlow: 42000,
    baseCupPrice: 1100, // ₹1,100
    imageIcon: '✈️',
    gradient: ['#be185d', '#9d174d'],
    perks: {
      en: ['High foreign currency average spends ($8 - $15 per customer)', 'Duty-free luxury gift box retail', '24/7 uninterrupted non-stop customer footfall'],
      hi: ['विदेशी मुद्रा में ऊंचे टिकट साइज ($8 - $15 प्रति कप)', 'ड्यूटी-फ्री गिफ्ट बॉक्स बिक्री', 'दिन-रात 24 घंटे लगातार भारी ट्रैफिक'],
    },
    dailyRentCost: 240000, // Ultra-prime airport terminal airport authority revenue share lease
    dailyPowerCost: 68000, // High-security 24/7 continuous operations & rapid thermal brewers
    dailyWaterSanitationCost: 19000, // Aviation-grade ultraviolet water purification
    packagingCostPerCup: 22.0, // Luxury gold-embossed travel cups & thermal carry bags
    dailyMachineAmcCost: 16000, // Certified airport security-cleared technician fleet
    dailyComplianceCost: 8500, // Bureau of Civil Aviation Security (BCAS) permits & international aviation compliance
  },
  {
    id: 9,
    name: { en: 'Global FMCG CPG & Packaged Cold Brew Empire', hi: 'ग्लोबल पैकेज्ड बीन्स व FMCG कोल्ड ब्रू ब्रांड' },
    tagline: { en: 'Supermarket Shelves, Ready-To-Drink Cans & Coorg Plantation Ownership', hi: 'सुपरमार्केट्स, कैन्ड कोल्ड ब्रू और 500 एकड़ कॉफ़ी बगान' },
    description: {
      en: 'A vertically integrated multinational beverage empire. You own 500+ acres of organic coffee estates in Coorg and supply canned cold brew to 50,000+ retail stores.',
      hi: 'कूर्ग में 500 एकड़ के अपने कॉफ़ी बगान, ऑटोमेटेड कैनिंग फैक्ट्री और 50,000+ रिटेल सुपरमार्केट्स में डिस्ट्रीब्यूशन।',
    },
    costToUnlock: 1500000000, // ₹150 Crore
    minNetWorthRequired: 3000000000, // ₹300 Crore
    baseCustomerFlow: 95000,
    baseCupPrice: 1600, // ₹1,600
    imageIcon: '📦',
    gradient: ['#475569', '#334155'],
    perks: {
      en: ['Zero raw-bean supply shocks (self-owned plantation crop)', 'Massive FMCG supermarket shelf dominance', 'Global container exports to US, Europe & Middle East'],
      hi: ['कच्चे माल की कोई कमी नहीं (अपने खुद के बगान)', 'सुपरमार्केट्स में नंबर 1 स्थान', 'अमेरिका, यूरोप और दुबई में भारी निर्यात'],
    },
    dailyRentCost: 650000, // Automated robotics bottling plant + global logistics warehouses
    dailyPowerCost: 180000, // Heavy industrial canning lines, pasteurizers & automated sorting
    dailyWaterSanitationCost: 48000, // Industrial zero-liquid-discharge water recycling plant
    packagingCostPerCup: 28.0, // Aluminum nitrogen-dosed sleek cans & luxury gift canisters
    dailyMachineAmcCost: 42000, // German robotics canning line service contracts
    dailyComplianceCost: 22000, // US FDA, European Food Safety Authority (EFSA) & global customs compliance
  },
  {
    id: 10,
    name: { en: 'Conglomerate IPO & Global Coffee Monopoly', hi: 'कॉफ़ी साम्राज्य IPO व ग्लोबल स्टॉक एक्सचेंज लिस्टिंग' },
    tagline: { en: 'BSE/NSE/NYSE Listed Giant, Sovereign Wealth Fund Backed, Ultimate Empire', hi: 'BSE/NSE/NYSE पर लिस्टेड, सॉवरेन वेल्थ फंड पार्टनरशिप व पूर्ण साम्राज्य' },
    description: {
      en: 'The ultimate pinnacle of financial freedom. Your coffee conglomerate is listed on the stock exchange with a multi-billion dollar market cap.',
      hi: 'व्यापार का सर्वोच्च शिखर! आपकी कंपनी शेयर बाजार में लिस्टेड है, 100% आर्थिक आजादी और दुनिया भर में आपका नाम है।',
    },
    costToUnlock: 5000000000, // ₹500 Crore
    minNetWorthRequired: 10000000000, // ₹1,000 Crore
    baseCustomerFlow: 250000,
    baseCupPrice: 2500, // ₹2,500
    imageIcon: '👑',
    gradient: ['#854d0e', '#ca8a04'],
    perks: {
      en: ['Billion-dollar public market capitalization', 'Unlimited institutional credit lines at 0.5% interest', 'Absolute economic immortality & lifelong legacy'],
      hi: ['अरबों डॉलर का मार्केट कैप', 'नाममात्र ब्याज पर असीमित बैंक क्रेडिट', 'अमर आर्थिक आज़ादी व ऐतिहासिक लेगेसी'],
    },
    dailyRentCost: 1800000, // Global corporate skyscraper headquarters in Mumbai BKC & London
    dailyPowerCost: 450000, // Global server farms, AI demand forecasting & conglomerate facilities
    dailyWaterSanitationCost: 120000, // Global environmental ESG sustainability initiatives
    packagingCostPerCup: 35.0, // Zero-carbon 100% compostable nanotechnology packaging
    dailyMachineAmcCost: 95000, // Global IoT telemetry automated fleet self-diagnostics
    dailyComplianceCost: 65000, // SEBI, SEC quarterly audit governance & shareholder annual meetings
  },
];

// 7 Realistic Staff Members
export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'cleaner_dishwasher',
    name: { en: 'Hygiene Executive (Raju Bhai)', hi: 'सफाई एवं स्वच्छता प्रभारी (राजू भाई)' },
    role: 'cleaner',
    hiringCost: 2000,
    dailySalary: 220,
    autoServesPerSec: 0.2,
    happinessBoost: 12,
    icon: '🧹',
    description: {
      en: 'Cleans tables instantly, washes cups, and ensures 100% spotless kitchen hygiene. Prevents FSSAI inspection penalties.',
      hi: 'दुकान और कपों को हमेशा चमकदार रखता है। स्वच्छता की वजह से ग्राहक दोबारा आते हैं और चालान नहीं कटता।',
    },
    specialSkill: {
      en: '+15% Cleanliness Score & Zero Spillage',
      hi: '+15% स्वच्छता स्कोर और कम बर्बादी',
    },
    unlockedAtLevel: 1,
  },
  {
    id: 'trainee_barista',
    name: { en: 'Junior Barista (Amit)', hi: 'जूनियर बरिस्ता (अमित)' },
    role: 'barista',
    hiringCost: 3500,
    dailySalary: 280,
    autoServesPerSec: 0.9,
    happinessBoost: 8,
    icon: '☕',
    description: {
      en: 'Quick, energetic youth who grinds beans and brews South Indian filter coffee & hot tea rapidly.',
      hi: 'तेज़ और मेहनती लड़का जो ताज़ा फिल्टर कॉफ़ी और चाय फटाफट बनाकर सर्व करता है।',
    },
    specialSkill: {
      en: 'Brews 0.9 cups/sec manual filter coffee',
      hi: '0.9 कप/सेकंड की तेज ब्रूइंग',
    },
    unlockedAtLevel: 1,
  },
  {
    id: 'smart_cashier',
    name: { en: 'Digital POS Cashier (Priya)', hi: 'डिजिटल बिलिंग कैशियर (प्रिया)' },
    role: 'cashier',
    hiringCost: 9000,
    dailySalary: 480,
    autoServesPerSec: 1.6,
    happinessBoost: 10,
    icon: '💻',
    description: {
      en: 'Handles UPI scanner, cash register and fast queue billing with 0% cash shrinkage and accurate token receipts.',
      hi: 'फास्ट यूपीआई पेमेंट और बिलिंग संभालती है जिससे लाइन नहीं लगती और कैश में कोई हेराफेरी नहीं होती।',
    },
    specialSkill: {
      en: 'Zero billing queue delays + accurate UPI tally',
      hi: 'शून्य बिलिंग देरी और 100% सही हिसाब',
    },
    unlockedAtLevel: 2,
  },
  {
    id: 'delivery_rider',
    name: { en: 'Express Delivery Rider (Rahul)', hi: 'डिलीवरी राइडर (राहुल)' },
    role: 'rider',
    hiringCost: 6500,
    dailySalary: 380,
    autoServesPerSec: 1.2,
    happinessBoost: 8,
    icon: '🛵',
    description: {
      en: 'Dispatches online Swiggy/Zomato delivery orders quickly with thermal spill-proof bags. High customer ratings.',
      hi: 'ऑनलाइन डिलीवरी ऑर्डर्स को बिना गिराए गरम-गरम ग्राहकों तक पहुंचाता है।',
    },
    specialSkill: {
      en: 'Unlocks +25% higher online order capacity',
      hi: '+25% ज्यादा ऑनलाइन डिलीवरी क्षमता',
    },
    unlockedAtLevel: 2,
  },
  {
    id: 'master_roaster',
    name: { en: 'Master Barista & Roaster (Chef Vikram)', hi: 'मास्टर शेफ बरिस्ता (विक्रम)' },
    role: 'head_chef',
    hiringCost: 38000,
    dailySalary: 1350,
    autoServesPerSec: 4.2,
    happinessBoost: 22,
    icon: '👨‍🍳',
    description: {
      en: 'Certified SCA Roaster. Expert in Latte Art, Cold Brews and single-origin pour-overs. Customers queue for his signature brew.',
      hi: 'लाते आर्ट और कोल्ड ब्रू के माहिर शेफ। इनके हाथ की कॉफ़ी के लोग दीवाने हैं जिससे टिप और रेटिंग बढ़ती है।',
    },
    specialSkill: {
      en: '+25% customer price tolerance & 5-star reviews',
      hi: '+25% ज्यादा कप रेट सहनशीलता और 5-स्टार रेटिंग',
    },
    unlockedAtLevel: 3,
  },
  {
    id: 'floor_supervisor',
    name: { en: 'Shift Supervisor (Sunita)', hi: 'फ्लोर सुपरवाइजर (सुनीता)' },
    role: 'supervisor',
    hiringCost: 55000,
    dailySalary: 1800,
    autoServesPerSec: 5.5,
    happinessBoost: 28,
    icon: '📋',
    description: {
      en: 'Manages table turnover, resolves customer complaints on the spot, and boosts whole team morale by +30%.',
      hi: 'ग्राहकों की शिकायतों का तुरंत समाधान करती हैं और पूरे स्टाफ के मनोबल को ऊंचा रखती हैं।',
    },
    specialSkill: {
      en: '+30% Staff Morale & Prevents Resignations',
      hi: '+30% स्टाफ मनोबल और नौकरी छोड़ने का 0% खतरा',
    },
    unlockedAtLevel: 3,
  },
  {
    id: 'general_manager',
    name: { en: 'Operations GM (Ananya)', hi: 'ऑपरेशन्स जीएम (अनन्या)' },
    role: 'manager',
    hiringCost: 160000,
    dailySalary: 3800,
    autoServesPerSec: 11.0,
    happinessBoost: 40,
    icon: '👔',
    description: {
      en: 'Experienced F&B General Manager. Automatically restocks inventory, optimizes staff rosters, and handles all day-to-day hassles.',
      hi: 'इन्वेंटरी, स्टाफ और ऑपरेशन्स खुद संभालती हैं ताकि आप पूरी तरह पैसिव रहकर बिजनेस को बढ़ता देखें।',
    },
    specialSkill: {
      en: 'Full Business Autonomy & Auto-restock efficiency',
      hi: 'पूर्ण ऑटोमेशन और स्मार्ट इन्वेंटरी मैनेजमेंट',
    },
    unlockedAtLevel: 4,
  },
  {
    id: 'area_franchise_director',
    name: { en: 'Franchise Director (Rajesh Khanna)', hi: 'फ्रैंचाइज़ हेड (राजेश खन्ना)' },
    role: 'manager',
    hiringCost: 650000,
    dailySalary: 9500,
    autoServesPerSec: 28.0,
    happinessBoost: 50,
    icon: '🏢',
    description: {
      en: 'Scale master who audits partner outlets, enforces SOPs, and signs up 10+ new franchise applicants weekly.',
      hi: 'नए आउटलेट्स खोलते हैं और सभी स्टोर्स में क्वालिटी और रॉयल्टी कलेक्शन को सुचारू रखते हैं।',
    },
    specialSkill: {
      en: '+35% Franchise Revenue & Quality Compliance',
      hi: '+35% रॉयल्टी कलेक्शन व स्टैण्डर्ड क्वालिटी',
    },
    unlockedAtLevel: 5,
  },
  {
    id: 'supply_chain_vp',
    name: { en: 'VP Supply Chain (Meera Nair)', hi: 'सप्लाई चेन डायरेक्टर (मीरा नायर)' },
    role: 'supervisor',
    hiringCost: 2200000,
    dailySalary: 24000,
    autoServesPerSec: 75.0,
    happinessBoost: 60,
    icon: '🚚',
    description: {
      en: 'Procures single-estate Arabica beans directly from Coorg plantations, reducing bean costs by 30% and eliminating stockouts.',
      hi: 'सीधे बगान से कच्चा माल खरीदती हैं जिससे लागत 30% घटती है और कभी स्टॉक खत्म नहीं होता।',
    },
    specialSkill: {
      en: '-30% Raw Material Cost & 0% Spoilage',
      hi: 'कच्चे माल की लागत में 30% बचत',
    },
    unlockedAtLevel: 6,
  },
  {
    id: 'ai_robotics_barista',
    name: { en: 'AI Robotic Barista Fleet (BaristaBot)', hi: 'AI रोबोटिक बरिस्ता फ्लीट (BaristaBot)' },
    role: 'barista',
    hiringCost: 8500000,
    dailySalary: 65000,
    autoServesPerSec: 220.0,
    happinessBoost: 75,
    icon: '🤖',
    description: {
      en: 'Six-axis articulated robotic arms that brew micron-precise espresso and perfect milk froth in 12 seconds flat 24/7.',
      hi: '12 सेकंड में बिना थके दिन-रात लगातार 100% परफेक्ट लाते बनाने वाली रोबोटिक मशीनें।',
    },
    specialSkill: {
      en: '220 cups/sec non-stop precision brewing',
      hi: '220 कप/सेकंड की अल्ट्रा-फास्ट रोबोटिक ब्रूइंग',
    },
    unlockedAtLevel: 7,
  },
  {
    id: 'aviation_concessions_head',
    name: { en: 'Global Concessions Head (David Vance)', hi: 'ग्लोबल एयरपोर्ट हेड (डेविड वेंस)' },
    role: 'manager',
    hiringCost: 32000000,
    dailySalary: 180000,
    autoServesPerSec: 650.0,
    happinessBoost: 90,
    icon: '✈️',
    description: {
      en: 'Secures exclusive multi-year contracts at international airports across London, Dubai, Singapore, and New York.',
      hi: 'दुनिया के सबसे व्यस्त हवाई अड्डों पर एक्सक्लूसिव कैफ़े लाउंज लाइसेंस सुरक्षित करते हैं।',
    },
    specialSkill: {
      en: 'Unlocks Global Airport USD Cashflows',
      hi: 'ग्लोबल एयरपोर्ट फॉरेन करेंसी रेवेन्यू',
    },
    unlockedAtLevel: 8,
  },
  {
    id: 'cpg_fmcg_managing_director',
    name: { en: 'FMCG Exports Director (Dr. Alok Verma)', hi: 'FMCG एक्सपोर्ट्स डायरेक्टर (डॉ. आलोक वर्मा)' },
    role: 'manager',
    hiringCost: 110000000,
    dailySalary: 550000,
    autoServesPerSec: 1800.0,
    happinessBoost: 100,
    icon: '🌐',
    description: {
      en: 'Manages worldwide supermarket distribution of canned cold brew, instant filter decoction, and specialty roast packs.',
      hi: 'दुनिया भर के 50,000+ सुपरमार्केट्स में कोल्ड ब्रू और पैकेज्ड कॉफ़ी सप्लाई संभालते हैं।',
    },
    specialSkill: {
      en: 'Dominates 50,000+ Supermarket Shelves',
      hi: '50,000+ रिटेल सुपरमार्केट्स में दबदबा',
    },
    unlockedAtLevel: 9,
  },
  {
    id: 'board_ceo_executive',
    name: { en: 'Group CEO & IPO Chairman (Siddharth Singhania)', hi: 'ग्रुप CEO एवं चेयरमैन (सिद्धार्थ सिंघानिया)' },
    role: 'manager',
    hiringCost: 450000000,
    dailySalary: 1800000,
    autoServesPerSec: 5000.0,
    happinessBoost: 120,
    icon: '👑',
    description: {
      en: 'Veteran conglomerate chairman who directs global investor relations, billion-dollar stock buybacks, and perpetual corporate legacy.',
      hi: 'शेयरधारकों और अरबों डॉलर के ग्लोबल फंड्स को गाइड करते हैं। आपका साम्राज्य ऑटोपायलट पर रहता है।',
    },
    specialSkill: {
      en: '5,000 cups/s Global Monopoly Autopilot',
      hi: '5,000 कप/सेकंड पूर्ण ग्लोबल ऑटोपायलट',
    },
    unlockedAtLevel: 10,
  },
];

// Staff Training Programs
export const STAFF_TRAINING_PROGRAMS: StaffTrainingProgram[] = [
  {
    id: 'hygiene_zerowaste_cert',
    name: { en: 'Food Hygiene & Zero-Waste Certification', hi: 'फ़ूड हाइजीन एवं ज़ीरो-वेस्ट सर्टिफिकेशन' },
    cost: 5000,
    category: 'hygiene',
    description: {
      en: 'Professional training on milk temperature control, airtight bean storage, and sanitization protocols.',
      hi: 'दूध और कॉफी बीन्स को खराब होने से बचाने और रसोई को 100% स्वच्छ रखने की पेशेवर ट्रेनिंग।',
    },
    perkDescription: {
      en: 'Cuts daily milk & bean spoilage by 65% + Boosts Google Rating by +0.3 ⭐',
      hi: 'दूध व कच्चा माल खराब होना 65% कम + गूगल रेटिंग में +0.3 ⭐ की बढ़ोतरी',
    },
    icon: '🧼',
  },
  {
    id: 'hospitality_softskills',
    name: { en: 'Customer Hospitality & Soft Skills Training', hi: 'कस्टमर हॉस्पिटैलिटी एवं बातचीत ट्रेनिंग' },
    cost: 8500,
    category: 'hospitality',
    description: {
      en: 'Trains staff in warm greetings, handling rush-hour disputes, and upselling signature pastries with a smile.',
      hi: 'ग्राहकों का मुस्कुराकर स्वागत करने, भीड़ में धैर्य रखने और स्नैक्स सजेस्ट करने की ट्रेनिंग।',
    },
    perkDescription: {
      en: 'Boosts customer tips & average order value by +20%',
      hi: 'ग्राहकों के बिल साइज़ और टिप में +20% का इजाफा',
    },
    icon: '🤝',
  },
  {
    id: 'specialty_brewing_masterclass',
    name: { en: 'Artisanal Latte Art & Espresso Calibration', hi: 'स्पेशलिटी लाते आर्ट एवं एस्प्रेसो मास्टरक्लास' },
    cost: 18000,
    category: 'brewing',
    description: {
      en: 'Advanced milk texturing, micro-foam latte art hearts/tulips, and precise 1:2 extraction ratio science.',
      hi: 'लाते आर्ट में सुंदर डिज़ाइन बनाने और परफेक्ट क्रीमी एस्प्रेसो शॉट निकालने की एडवांस वर्कशॉप।',
    },
    perkDescription: {
      en: 'Allows charging ₹25 more per cup without losing customer footfall',
      hi: 'बिना ग्राहक खोए प्रति कप ₹25 ज्यादा रेट चार्ज करने की क्षमता',
    },
    icon: '🎨',
  },
  {
    id: 'pos_cloud_management',
    name: { en: 'Cloud ERP & Shift Leadership Training', hi: 'क्लाउड ईआरपी एवं लीडरशिप मैनेजमेंट' },
    cost: 35000,
    category: 'management',
    description: {
      en: 'Empowers supervisors to run autonomous shift audits, manage cash drops, and track daily food cost variance.',
      hi: 'सुपरवाइजरों को बिना आपकी मौजूदगी के दुकान का पूरा हिसाब-किताब और स्टॉक संभालने में सक्षम बनाता है।',
    },
    perkDescription: {
      en: 'Permanent +25% Staff Efficiency & 0% Cash Shrinkage',
      hi: 'स्टाफ की कार्यक्षमता में +25% की स्थायी वृद्धि',
    },
    icon: '📊',
  },
];

// Business Re-investment Upgrades (Assets that boost cashflow & cut real-life overheads)
export const BUSINESS_UPGRADES: BusinessUpgrade[] = [
  // --- LEVEL 1 UPGRADES ---
  {
    id: 'brass_filter',
    name: { en: 'Traditional Brass Filter Set', hi: 'पारंपरिक पीतल का कॉफ़ी फिल्टर' },
    cost: 1500,
    dailyCashflowBoost: 180,
    qualityBoost: 1,
    speedBoost: 1.1,
    type: 'equipment',
    unlockedAtLevel: 1,
    icon: '☕',
    description: {
      en: 'Extracts rich, aromatic South Indian decoction with consistent aroma.',
      hi: 'गाढ़ा और खुशबूदार पारंपरिक डिकॉक्शन तैयार करता है।',
    },
  },
  {
    id: 'burr_grinder_pro',
    name: { en: 'Precision Burr Coffee Grinder (Mahlkönig)', hi: 'प्रिसिजन बर्र कॉफ़ी ग्राइंडर मशीन' },
    cost: 8500,
    dailyCashflowBoost: 420,
    qualityBoost: 2,
    speedBoost: 1.25,
    type: 'equipment',
    unlockedAtLevel: 1,
    icon: '⚙️',
    description: {
      en: 'Uniform 200-micron bean grind for maximum Crema extraction and zero bitterness.',
      hi: 'एकसमान दानेदार पिसाई जिससे हर कप में गाढ़ी झाग और असली स्वाद मिलता है।',
    },
  },
  {
    id: 'commercial_deep_freezer',
    name: { en: 'Commercial 300L Milk Chiller & Freezer', hi: 'कमर्शियल 300L मिल्क चिलर एवं डीप फ्रीजर' },
    cost: 18000,
    dailyCashflowBoost: 650,
    qualityBoost: 1,
    speedBoost: 1.0,
    type: 'equipment',
    unlockedAtLevel: 1,
    icon: '🧊',
    description: {
      en: 'Keeps dairy milk fresh at 4°C, preventing daily milk curdling and spoilage.',
      hi: 'दूध को 4°C पर सुरक्षित रखता है जिससे रोज़ाना दूध खराब होने का नुकसान 70% घट जाता है।',
    },
    wastageReductionPercentage: 70,
  },
  {
    id: 'sheesham_wood_tables',
    name: { en: 'Solid Sheesham Wooden Tables (+15 Seating)', hi: 'शीशम की मजबूत लकड़ी की टेबल व कुर्सियां (+15 सीट)' },
    cost: 12000,
    dailyCashflowBoost: 520,
    qualityBoost: 1,
    speedBoost: 1.0,
    type: 'decor',
    unlockedAtLevel: 1,
    icon: '🪑',
    description: {
      en: 'Rustic handcrafted wooden seating increases shop seating capacity and customer dwell time.',
      hi: 'दुकान में 15 और ग्राहकों के आराम से बैठकर कॉफ़ी पीने की जगह बनती है।',
    },
  },
  {
    id: 'wifi_mesh_router',
    name: { en: 'Gigabit Wi-Fi 6 Mesh Routers (Work-From-Cafe)', hi: 'हाई-स्पीड Wi-Fi 6 मेश राउटर (वर्क-फ्रॉम-कैफे)' },
    cost: 6500,
    dailyCashflowBoost: 380,
    qualityBoost: 1,
    speedBoost: 1.0,
    type: 'tech',
    unlockedAtLevel: 1,
    icon: '📶',
    description: {
      en: 'Attracts remote software engineers, freelancers, and laptop workers during afternoon non-peak hours.',
      hi: 'दोपहर के शांत समय में लैपटॉप पर काम करने वाले प्रोफेशनल्स को आकर्षित करता है।',
    },
  },
  {
    id: 'acoustic_sound_bose',
    name: { en: 'Bose Acoustic Ceiling Audio System', hi: 'बोस एम्बिएंट कैफे साउंड एवं एकॉस्टिक्स' },
    cost: 15000,
    dailyCashflowBoost: 580,
    qualityBoost: 1,
    speedBoost: 1.0,
    type: 'decor',
    unlockedAtLevel: 1,
    icon: '🎵',
    description: {
      en: 'Plays soothing low-fi jazz and indie acoustics. Elevates customer satisfaction and tips.',
      hi: 'धीमा और सुकून भरा जैज़ संगीत ग्राहकों के मूड और अनुभव को खुशनुमा बनाता है।',
    },
  },

  // --- LEVEL 2 UPGRADES ---
  {
    id: 'italian_espresso_machine',
    name: { en: 'Commercial 2-Group Italian Espresso Machine', hi: 'कमर्शियल 2-ग्रुप इटालियन एस्प्रेसो मशीन' },
    cost: 45000,
    dailyCashflowBoost: 2200,
    qualityBoost: 2,
    speedBoost: 1.5,
    type: 'equipment',
    unlockedAtLevel: 2,
    icon: '☕',
    description: {
      en: 'High 15-bar pressure dual boiler extraction for authentic Crema Cappuccinos.',
      hi: 'असली क्रीमी कैपुचीनो और लाते बनाने की तेज़ इटालियन मशीन।',
    },
  },
  {
    id: 'ice_flaker_machine',
    name: { en: 'Commercial 120kg/day Ice Cube & Flaker Machine', hi: 'कमर्शियल 120kg ऑटोमैटिक आइस क्यूब मेकर' },
    cost: 25000,
    dailyCashflowBoost: 1100,
    qualityBoost: 1,
    speedBoost: 1.2,
    type: 'equipment',
    unlockedAtLevel: 2,
    icon: '🧊',
    description: {
      en: 'Crystal-clear gourmet ice cubes for Iced Lattes, Cold Coffees, and Frappes on demand.',
      hi: 'आइस लाते और कोल्ड कॉफ़ी के लिए क्रिस्टल क्लीयर बर्फ तुरंत तैयार करती है।',
    },
  },
  {
    id: 'pos_crm_billing_tablet',
    name: { en: 'Cloud POS Tablet & WhatsApp Loyalty CRM', hi: 'क्लाउड पीओएस बिलिंग व व्हाट्सऐप लॉयल्टी सीआरएम' },
    cost: 28000,
    dailyCashflowBoost: 1600,
    qualityBoost: 1,
    speedBoost: 1.3,
    type: 'tech',
    unlockedAtLevel: 2,
    icon: '📱',
    description: {
      en: 'Automated digital receipts, customer loyalty points and 3-second instant QR checkout.',
      hi: '3 सेकंड में बिलिंग और ग्राहकों को लॉयल्टी कैशबैक जिससे वे बार-बार आते हैं।',
    },
  },
  {
    id: 'leather_sofa_lounge',
    name: { en: 'Chesterfield Leather Sofas & Reading Nook (+25 Seating)', hi: 'चेस्टरफ़ील्ड लेदर सोफे व रीडिंग कॉर्नर (+25 सीट)' },
    cost: 55000,
    dailyCashflowBoost: 2800,
    qualityBoost: 2,
    speedBoost: 1.0,
    type: 'decor',
    unlockedAtLevel: 2,
    icon: '🛋️',
    description: {
      en: 'Plush leather couches and book shelves for premium executive comfort and longer visits.',
      hi: 'आरामदायक सोफे जहां लोग आराम से बैठकर महंगी कॉफ़ी और स्नैक्स ऑर्डर करते हैं।',
    },
  },
  {
    id: 'solar_rooftop_5kw',
    name: { en: '5kW Rooftop Solar Panel Grid', hi: '5kW रूफटॉप सोलर पैनल ग्रिड' },
    cost: 65000,
    dailyCashflowBoost: 1200,
    qualityBoost: 0,
    speedBoost: 1.0,
    type: 'tech',
    unlockedAtLevel: 2,
    icon: '☀️',
    description: {
      en: 'Powers espresso boilers and AC with clean sun energy. Slashes daily commercial electricity bill by 55%!',
      hi: 'दुकान की बिजली और एसी सोलर से चलती है जिससे रोज़ का बिजली बिल 55% कम हो जाता है।',
    },
    energySavingPercentage: 55,
  },
  {
    id: 'air_curtain_aroma',
    name: { en: 'Auto Air Curtain & Roasted Vanilla Aroma Diffuser', hi: 'ऑटो एयर कर्टेन एवं खुशबूदार वेनिला डिफ्यूज़र' },
    cost: 22000,
    dailyCashflowBoost: 950,
    qualityBoost: 1,
    speedBoost: 1.0,
    type: 'tech',
    unlockedAtLevel: 2,
    icon: '💨',
    description: {
      en: 'Invisible air door blocks street dust & heat. Diffuses rich roasted vanilla aroma across the street.',
      hi: 'धूल-मक्खियों को रोकता है और सड़क पर चलने वालों को ताज़ा कॉफ़ी की महक से खींचता है।',
    },
  },

  // --- LEVEL 3 UPGRADES ---
  {
    id: 'la_marzocco_3group',
    name: { en: 'Commercial 3-Group Volumetric Espresso Monster', hi: '3-ग्रुप ऑटोमैटिक वॉल्‍यूमीट्रिक एस्प्रेसो मॉन्स्टर' },
    cost: 125000,
    dailyCashflowBoost: 6200,
    qualityBoost: 3,
    speedBoost: 1.8,
    type: 'equipment',
    unlockedAtLevel: 3,
    icon: '☕',
    description: {
      en: 'PID dual insulated boilers brew 6 double-shots simultaneously during peak rush hour with zero temperature drop.',
      hi: 'पीक ऑवर में एक साथ 6 डबल-शॉट तैयार करती है, बिना किसी तापमान गिरावट के।',
    },
  },
  {
    id: 'nitro_cold_brew_tap',
    name: { en: 'Nitro Cold Brew 4-Tap Draft Keg Station', hi: 'नाइट्रो कोल्ड ब्रू 4-टैप ड्राफ्ट केग स्टेशन' },
    cost: 80000,
    dailyCashflowBoost: 4200,
    qualityBoost: 2,
    speedBoost: 1.4,
    type: 'equipment',
    unlockedAtLevel: 3,
    icon: '🍺',
    description: {
      en: 'Infuses nitrogen into 18-hour cold brew for a silky, Guinness-like cascading crema foam.',
      hi: 'सिल्की झागदार नाइट्रो कोल्ड ब्रू जिसे युवा वर्ग प्रीमियम दरों पर खूब पसंद करता है।',
    },
  },
  {
    id: 'vitamix_frappe_blenders',
    name: { en: 'Commercial Vitamix Sound-Enclosure Blenders', hi: 'कमर्शियल साइलेंट हाई-स्पीड फ्रैपे ब्लेंडर्स' },
    cost: 45000,
    dailyCashflowBoost: 2500,
    qualityBoost: 2,
    speedBoost: 1.5,
    type: 'equipment',
    unlockedAtLevel: 3,
    icon: '🍹',
    description: {
      en: 'Ultra-smooth Mocha Frappes, Thick Shakes, and Boba teas in 12 seconds with silent soundproofing.',
      hi: '12 सेकंड में क्रीमी मोका फ्रैपे और थिक शेक तैयार करता है बिना आवाज़ किए।',
    },
  },
  {
    id: 'ac_velvet_interiors',
    name: { en: 'Daikin Central Inverter AC & Velvet Lounge', hi: 'सेंट्रल इन्वर्टर एसी और मखमली सोफे' },
    cost: 150000,
    dailyCashflowBoost: 7500,
    qualityBoost: 2,
    speedBoost: 1.0,
    type: 'decor',
    unlockedAtLevel: 3,
    icon: '❄️',
    description: {
      en: 'Increases customer dwell time and average order value in climate-controlled luxury.',
      hi: 'कस्टमर घंटों बैठते हैं और ज्यादा ऑर्डर करते हैं।',
    },
  },
  {
    id: 'al_fresco_garden_patio',
    name: { en: 'Outdoor Al-Fresco Garden Patio & Fairy Lights (+40 Seating)', hi: 'ओपन गार्डन अल-फ्रेस्को सीटिंग एवं फेरी लाइट्स (+40 सीट)' },
    cost: 110000,
    dailyCashflowBoost: 5800,
    qualityBoost: 2,
    speedBoost: 1.0,
    type: 'decor',
    unlockedAtLevel: 3,
    icon: '🌿',
    description: {
      en: 'Enchanting evening garden seating with fairy lights, patio heaters, and botanical planters.',
      hi: 'शाम के समय युवाओं और परिवारों के लिए खूबसूरत आउटडोर गार्डन बैठने की जगह।',
    },
  },
  {
    id: 'neon_selfie_wall',
    name: { en: 'Artisanal Neon Typography & Instagram Photo Wall', hi: 'नियॉन टाइपोग्राफी व इंस्टाग्राम फोटो कॉर्नर' },
    cost: 35000,
    dailyCashflowBoost: 2100,
    qualityBoost: 1,
    speedBoost: 1.0,
    type: 'decor',
    unlockedAtLevel: 3,
    icon: '✨',
    description: {
      en: 'Custom glowing neon signs spark viral Instagram & TikTok reels, driving continuous organic footfall.',
      hi: 'सोशल मीडिया पर वायरल फोटो और रील्स से नए ग्राहकों की लाइन लग जाती है।',
    },
  },

  // --- LEVEL 4 UPGRADES ---
  {
    id: 'pastry_kitchen',
    name: { en: 'In-House Gourmet French Patisserie Oven', hi: 'इन-हाउस फ्रेंच पेस्ट्री ओवन' },
    cost: 400000,
    dailyCashflowBoost: 18000,
    qualityBoost: 3,
    speedBoost: 1.4,
    type: 'equipment',
    unlockedAtLevel: 4,
    icon: '🥐',
    description: {
      en: 'Fresh Croissants, cheesecakes and brownies boost average cart value by 60%.',
      hi: 'ताज़ा क्रोइसैन्ट और ब्राउनी से बिल साइज़ 60% बढ़ जाता है।',
    },
  },
  {
    id: 'batch_coffee_roaster',
    name: { en: 'Industrial 5kg Drum Micro-Roaster Machine', hi: 'इंडस्ट्रियल 5kg ड्रम कॉफ़ी रोस्टर मशीन' },
    cost: 320000,
    dailyCashflowBoost: 15500,
    qualityBoost: 3,
    speedBoost: 1.3,
    type: 'equipment',
    unlockedAtLevel: 4,
    icon: '🔥',
    description: {
      en: 'Roast your own green coffee beans in-house. Slashes raw bean costs and sells custom retail packs.',
      hi: 'कच्ची बीन्स खुद रोस्ट करें, जिससे कच्चा माल सस्ता पड़ता है और रिटेल पैकेट भी बिकते हैं।',
    },
  },
  {
    id: 'marble_tasting_counter',
    name: { en: 'Italian Statuario Marble Barista Tasting Bar', hi: 'इटालियन मार्बल बरिस्ता टेस्टिंग बार' },
    cost: 250000,
    dailyCashflowBoost: 12000,
    qualityBoost: 3,
    speedBoost: 1.1,
    type: 'decor',
    unlockedAtLevel: 4,
    icon: '🏛️',
    description: {
      en: 'Stunning luxury marble bar where connoisseurs sample single-origin pour-overs and siphon brews.',
      hi: 'प्रीमियम संगमरमर का भव्य बार जहां वीआईपी ग्राहक विशेष कॉफ़ी चखने आते हैं।',
    },
  },
  {
    id: 'direct_estate_sourcing',
    name: { en: 'Direct Coorg Plantation Bean Sourcing Contract', hi: 'कूर्ग बागानों से डायरेक्ट अरेबिका सप्लाई कॉन्ट्रैक्ट' },
    cost: 750000,
    dailyCashflowBoost: 38000,
    qualityBoost: 3,
    speedBoost: 1.5,
    type: 'tech',
    unlockedAtLevel: 4,
    icon: '🌲',
    description: {
      en: 'Bypasses middlemen brokers. Saves 40% wholesale bean costs across all outlets.',
      hi: 'सीधे कॉफी बागानों से खरीदारी जिससे कच्चा माल 40% सस्ता और सर्वोच्च क्वालिटी का मिलता है।',
    },
  },

  // --- LEVEL 5 UPGRADES ---
  {
    id: 'auto_sealing_kiosk',
    name: { en: 'Automated Robotic Cup Sealing & High-Speed Dispenser', hi: 'ऑटोमैटिक रोबोटिक कप सीलिंग एवं डिस्पेंसर' },
    cost: 1200000,
    dailyCashflowBoost: 60000,
    qualityBoost: 3,
    speedBoost: 2.2,
    type: 'equipment',
    unlockedAtLevel: 5,
    icon: '🤖',
    description: {
      en: 'High-speed robotic packaging seals and labels 40 cups per minute for massive online delivery dispatch.',
      hi: 'रोबोटिक पैकेजिंग जो प्रति मिनट 40 कप सील करके ऑनलाइन डिलीवरी के लिए तैयार करती है।',
    },
  },
  {
    id: 'vip_coworking_booths',
    name: { en: 'Soundproof VIP Meeting Pods & Executive Booths', hi: 'साउंडप्रूफ वीआईपी मीटिंग पॉड्स व केबिन' },
    cost: 950000,
    dailyCashflowBoost: 48000,
    qualityBoost: 3,
    speedBoost: 1.0,
    type: 'decor',
    unlockedAtLevel: 5,
    icon: '🎙️',
    description: {
      en: 'Acoustic glass meeting booths rented hourly to founders, venture capitalists, and corporate clients.',
      hi: 'कॉर्पोरेट क्लाइंट्स और फाउंडर्स के लिए प्रति घंटे किराए पर चलने वाले साउंडप्रूफ केबिन।',
    },
  },
  {
    id: 'central_roastery_hub',
    name: { en: 'Central Commercial Roastery & Nitrogen Packaging Line', hi: 'सेंट्रल कमर्शियल रोस्टरी एवं नाइट्रोजन पैकेजिंग' },
    cost: 2500000,
    dailyCashflowBoost: 135000,
    qualityBoost: 4,
    speedBoost: 2.0,
    type: 'tech',
    unlockedAtLevel: 5,
    icon: '🏭',
    description: {
      en: 'National distribution hub supplying branded beans and cold brew cans to supermarkets nationwide.',
      hi: 'सुपरमार्केट और रिटेल स्टोर्स में डिब्बाबंद कॉफ़ी सप्लाई करने वाली राष्ट्रीय फैक्ट्री।',
    },
  },

  // --- LEVEL 6 UPGRADES ---
  {
    id: 'fleet_refrigerated_trucks',
    name: { en: 'Temperature-Controlled Cold Chain Truck Fleet', hi: 'रेफ्रिजरेटेड कोल्ड-चेन ट्रक फ्लीट' },
    cost: 6500000,
    dailyCashflowBoost: 320000,
    qualityBoost: 4,
    speedBoost: 2.2,
    type: 'equipment',
    unlockedAtLevel: 6,
    icon: '🚛',
    description: {
      en: 'Daily distribution of farm-fresh organic milk and bakery items to all 25 outlets with zero spoilage.',
      hi: 'सभी 25 स्टोर्स में रोज़ाना ताज़ा दूध और बेकरी माल सप्लाई, ज़ीरो बर्बादी के साथ।',
    },
    wastageReductionPercentage: 80,
  },
  {
    id: 'central_commissary_bakery',
    name: { en: 'Industrial Central Commissary & Confectionery Hub', hi: 'सेंट्रल बेकरी व कन्फेक्शनरी प्रोडक्शन हब' },
    cost: 9500000,
    dailyCashflowBoost: 480000,
    qualityBoost: 4,
    speedBoost: 2.5,
    type: 'equipment',
    unlockedAtLevel: 6,
    icon: '🥐',
    description: {
      en: 'Produces 5,000 artisanal croissants, macarons and signature sandwiches daily at 70% lower production cost.',
      hi: 'रोज़ाना 5,000 क्रोइसैन्ट और डेसर्ट्स 70% सस्ती लागत में तैयार करता है।',
    },
  },

  // --- LEVEL 7 UPGRADES ---
  {
    id: 'drive_thru_dual_lane_ai',
    name: { en: 'AI Dual-Lane Voice Ordering Drive-Thru System', hi: 'AI वॉयस ऑर्डरिंग 2-लेन ड्राइव-थ्रू' },
    cost: 25000000,
    dailyCashflowBoost: 1250000,
    qualityBoost: 5,
    speedBoost: 3.5,
    type: 'tech',
    unlockedAtLevel: 7,
    icon: '🎙️',
    description: {
      en: 'Sub-45-second highway drive-thru turnaround with AI speech recognition and automated contactless card tap.',
      hi: '45 सेकंड में कार से ऑर्डर और पेमेंट, हाईवे ड्राइव-थ्रू पर भारी बिक्री।',
    },
  },
  {
    id: 'franchise_cloud_telemetry',
    name: { en: 'Nationwide Franchise Cloud Telemetry & ERP', hi: 'नेशनल फ्रैंचाइज़ क्लाउड ईआरपी व टेलीमेट्री' },
    cost: 38000000,
    dailyCashflowBoost: 1850000,
    qualityBoost: 5,
    speedBoost: 3.0,
    type: 'tech',
    unlockedAtLevel: 7,
    icon: '📡',
    description: {
      en: 'Live IoT telemetry across 100+ stores instantly collects franchise royalties and manages raw stock automatically.',
      hi: 'सभी 100+ स्टोर्स से ऑटोमैटिक रॉयल्टी कलेक्शन और रियल-टाइम स्टॉक बैलेंस।',
    },
  },

  // --- LEVEL 8 UPGRADES ---
  {
    id: 'aviation_rapid_superbrewers',
    name: { en: 'Aviation-Grade High-Velocity Induction Superbrewers', hi: 'एविएशन-ग्रेड सुपर-फास्ट इंडक्शन ब्रूअर्स' },
    cost: 85000000,
    dailyCashflowBoost: 4200000,
    qualityBoost: 5,
    speedBoost: 4.5,
    type: 'equipment',
    unlockedAtLevel: 8,
    icon: '⚡',
    description: {
      en: 'Engineered for airport departure gates. Extracts 12 specialty Americanos and Lattes every 30 seconds.',
      hi: 'हवाई अड्डे के गेट्स पर हर 30 सेकंड में 12 कप एस्प्रेसो और लाते निकालता है।',
    },
  },
  {
    id: 'airport_vip_executive_lounges',
    name: { en: 'First-Class Private Airport Tasting Lounges', hi: 'फर्स्ट-क्लास वीआईपी एयरपोर्ट लाउंज' },
    cost: 140000000,
    dailyCashflowBoost: 7500000,
    qualityBoost: 5,
    speedBoost: 3.0,
    type: 'decor',
    unlockedAtLevel: 8,
    icon: '🛋️',
    description: {
      en: 'Ultra-luxury gold-accented lounges frequented by global CEOs, diplomat travelers, and celebrities.',
      hi: 'ग्लोबल वीआईपी और डिप्लोमैट्स के लिए अति-लग्जरी प्राइवेट लाउंज।',
    },
  },

  // --- LEVEL 9 UPGRADES ---
  {
    id: 'automated_canning_nitrogen_factory',
    name: { en: 'High-Speed Nitro Cold Brew Canning & Bottling Plant', hi: 'हाई-स्पीड नाइट्रो कैनिंग व बॉटलिंग फैक्ट्री' },
    cost: 350000000,
    dailyCashflowBoost: 18000000,
    qualityBoost: 5,
    speedBoost: 5.0,
    type: 'equipment',
    unlockedAtLevel: 9,
    icon: '🥫',
    description: {
      en: 'Fills, nitrogen-doses, and seals 600 cans per minute for worldwide supermarket shipping.',
      hi: 'प्रति मिनट 600 कोल्ड ब्रू कैन्स पैक करके दुनिया भर में एक्सपोर्ट करता है।',
    },
  },
  {
    id: 'coorg_500acre_plantation_biomill',
    name: { en: '500-Acre Organic Coffee Estate & Wet Processing Mill', hi: '500 एकड़ कूर्ग ऑर्गेनिक बगान व वेट-प्रोसेसिंग मिल' },
    cost: 550000000,
    dailyCashflowBoost: 29000000,
    qualityBoost: 5,
    speedBoost: 4.0,
    type: 'decor',
    unlockedAtLevel: 9,
    icon: '🌴',
    description: {
      en: 'Direct plantation ownership eliminates 100% of middleman markups and produces award-winning AAA Arabica beans.',
      hi: 'खुद का 500 एकड़ का बगान जिससे कच्चा माल मुफ्त जैसा पड़ता है और विश्वस्तरीय बीन्स तैयार होती हैं।',
    },
  },

  // --- LEVEL 10 UPGRADES ---
  {
    id: 'global_satellite_supply_mesh',
    name: { en: 'Global Satellite AI Logistics & Quantum Commodity Mesh', hi: 'ग्लोबल सैटेलाइट AI लॉजिस्टिक्स व कमोडिटी मेश' },
    cost: 1200000000, // ₹1,200 Crore
    dailyCashflowBoost: 65000000,
    qualityBoost: 5,
    speedBoost: 6.0,
    type: 'tech',
    unlockedAtLevel: 10,
    icon: '🛰️',
    description: {
      en: 'Real-time global weather and satellite crop monitoring locks in bean futures at wholesale record lows.',
      hi: 'सैटेलाइट और AI से दुनिया भर में कॉफ़ी की कीमतों का पूर्वानुमान और सबसे सस्ता स्टॉक।',
    },
  },
  {
    id: 'carbon_zero_monopoly_hq',
    name: { en: 'Net-Zero Carbon Flagship Skyscraper & Global Innovation Lab', hi: 'नेट-ज़ीरो कार्बन हेडक्वार्टर स्काईस्क्रेपर व इनोवेशन लैब' },
    cost: 2500000000, // ₹2,500 Crore
    dailyCashflowBoost: 140000000,
    qualityBoost: 5,
    speedBoost: 6.0,
    type: 'decor',
    unlockedAtLevel: 10,
    icon: '🏢',
    description: {
      en: 'The crown jewel of your global empire. A monument to lifelong financial mastery and sustainable capitalism.',
      hi: 'आपके वैश्विक साम्राज्य का भव्य प्रतीक! 100% फाइनेंशियल फ्रीडम और अमर लेगेसी।',
    },
  },
];

// Luxury Traps (Liabilities)
export const LUXURY_ITEMS: LuxuryItem[] = [
  {
    id: 'superbike',
    name: { en: 'Imported 1000cc Superbike', hi: 'इम्पोर्टेड 1000cc सुपरबाइक' },
    category: 'vehicle',
    purchaseCost: 1800000, // ₹18 Lakhs
    dailyMaintenanceCost: 1200, // ₹1,200/day fuel + insurance + service
    depreciationRatePerDay: 0.0008,
    statusPoints: 40,
    financialLesson: {
      en: 'Buying a superbike before having passive income creates a ₹36,000/month liability drain on your business cash flow!',
      hi: 'पैसिव इनकम से पहले सुपरबाइक खरीदने से रोज़ ₹1,200 का मेंटेनेंस और पेट्रोल का नुकसान होता है!',
    },
    icon: '🏍️',
    imageBg: 'from-red-950 to-orange-950',
  },
  {
    id: 'luxury_watch',
    name: { en: 'Swiss Diamond Bezel Chronograph', hi: 'स्विस डायमंड क्रोनोग्राफ घड़ी' },
    category: 'gadget',
    purchaseCost: 950000, // ₹9.5 Lakhs
    dailyMaintenanceCost: 400,
    depreciationRatePerDay: 0.0004,
    statusPoints: 30,
    financialLesson: {
      en: 'A ₹9.5 Lakh watch gives social validation, but that same money in an Index Fund generates ₹1.1 Lakh/yr compound interest!',
      hi: 'महंगी घड़ी सिर्फ दिखावा देती है, जबकि यही पैसा इंडेक्स फंड में रोज़ ब्याज कमाता!',
    },
    icon: '⌚',
    imageBg: 'from-amber-950 to-yellow-950',
  },
  {
    id: 'sports_car',
    name: { en: 'Red Italian V8 Supercar', hi: 'रेड इटालियन V8 सुपरकार' },
    category: 'vehicle',
    purchaseCost: 15000000, // ₹1.5 Crore
    dailyMaintenanceCost: 8500, // ₹8,500/day EMI + Insurance + Fuel + Tyres
    depreciationRatePerDay: 0.001,
    statusPoints: 150,
    financialLesson: {
      en: 'The Ultimate Luxury Trap! Depreciates 20% the moment it leaves the showroom and drains ₹2.5 Lakhs/month in expenses.',
      hi: 'दिखावे का सबसे बड़ा जाल! शोरूम से निकलते ही कीमत घटती है और हर महीने ढाई लाख रुपये मेंटेनेंस में उड़ते हैं।',
    },
    icon: '🏎️',
    imageBg: 'from-red-900 to-rose-950',
  },
  {
    id: 'vip_club_membership',
    name: { en: 'Ultra-Exclusive Golf & Yacht Club Pass', hi: 'वीआईपी गोल्फ एवं यॉट क्लब मेंबरशिप' },
    category: 'lifestyle',
    purchaseCost: 3000000, // ₹30 Lakhs
    dailyMaintenanceCost: 2200,
    depreciationRatePerDay: 0.0005,
    statusPoints: 60,
    financialLesson: {
      en: 'Annual subscription dues and party tabs make this a recurring black hole unless you network with HNIs.',
      hi: 'सालाना फीस और पार्टियों का खर्चा आपके मुनाफे को खा जाता है।',
    },
    icon: '🍸',
    imageBg: 'from-purple-950 to-indigo-950',
  },
  {
    id: 'luxury_penthouse_rent',
    name: { en: 'Sea-Facing Sky Penthouse (Rental Lease)', hi: 'सी-फेसिंग लग्जरी पेंटहाउस (किराया)' },
    category: 'residence',
    purchaseCost: 5000000, // ₹50 Lakhs security + setup
    dailyMaintenanceCost: 12000, // ₹12,000/day high rent + staff
    depreciationRatePerDay: 0.0002,
    statusPoints: 200,
    financialLesson: {
      en: 'Living in an ultra-luxurious mansion before owning cash-flowing commercial properties is the #1 reason entrepreneurs go broke!',
      hi: 'अपनी कमाई से पहले ही बड़े बंगले का किराया और नौकर-चाकर पालना दिवालिया होने का सबसे तेज रास्ता है।',
    },
    icon: '🏰',
    imageBg: 'from-slate-900 to-zinc-950',
  },
];

// Stocks (Share Market)
export const STOCKS_DATA: Stock[] = [
  {
    id: 'brewtech',
    symbol: 'BREWAI',
    name: 'BrewTech AI Innovations',
    sector: 'Tech',
    currentPrice: 420,
    basePrice: 400,
    volatility: 0.06,
    dividendYield: 0.015,
    priceHistory: [380, 395, 410, 405, 420],
    description: { en: 'Smart IoT brewing hardware and AI ordering kiosks.', hi: 'स्मार्ट कॉफ़ी मशीन्स और एआई ऑर्डरिंग सॉफ्टवेयर बनाने वाली टेक कंपनी।' },
  },
  {
    id: 'bharat_fmcg',
    symbol: 'BHARATFMCG',
    name: 'Bharat Consumer FMCG Ltd',
    sector: 'FMCG',
    currentPrice: 2450,
    basePrice: 2400,
    volatility: 0.02,
    dividendYield: 0.038,
    priceHistory: [2380, 2400, 2415, 2430, 2450],
    description: { en: 'Steady bluechip food & beverage giant with consistent high dividends.', hi: 'लगातार डिविडेंड देने वाली मजबूत और सुरक्षित एफएमसीजी ब्लूचिप कंपनी।' },
  },
  {
    id: 'solaria_energy',
    symbol: 'SOLARIA',
    name: 'Solaria Clean Green Energy',
    sector: 'Energy',
    currentPrice: 780,
    basePrice: 750,
    volatility: 0.07,
    dividendYield: 0.01,
    priceHistory: [710, 740, 730, 765, 780],
    description: { en: 'High growth solar and hydrogen infrastructure across India.', hi: 'ग्रीन सोलर एनर्जी और हाइड्रोजन पावर में तेजी से बढ़ती कंपनी।' },
  },
  {
    id: 'urban_realties',
    symbol: 'URBANREIT',
    name: 'Urban Commercial REIT Infra',
    sector: 'Finance',
    currentPrice: 310,
    basePrice: 300,
    volatility: 0.025,
    dividendYield: 0.065,
    priceHistory: [298, 302, 305, 308, 310],
    description: { en: 'Real Estate Investment Trust distributing regular quarterly rental yields.', hi: 'कमर्शियल मॉल और आईटी पार्क्स से किराया बांटने वाला सुरक्षित आरईआईटी फंड।' },
  },
  {
    id: 'coorg_plantations',
    symbol: 'COORGCOFFEE',
    name: 'Coorg Estate Coffee Roasters',
    sector: 'Coffee Retail',
    currentPrice: 1250,
    basePrice: 1200,
    volatility: 0.045,
    dividendYield: 0.028,
    priceHistory: [1180, 1210, 1195, 1230, 1250],
    description: { en: 'India’s largest exporter of AAA grade Arabica coffee beans.', hi: 'भारत का सबसे बड़ा प्रीमियम अरेबिका कॉफी निर्यातक।' },
  },
];

// Mutual Funds
export const MUTUAL_FUNDS_DATA: MutualFund[] = [
  {
    id: 'nifty50_index',
    name: { en: 'Nifty 50 Top 50 Index Fund', hi: 'निफ्टी 50 इंडेक्स फंड (कम जोखिम)' },
    type: 'Index Fund (Large Cap)',
    riskLevel: 'Low',
    expectedAnnualReturn: 0.13, // 13% p.a.
    nav: 145.5,
    minSipAmount: 500,
    description: { en: 'Invests automatically in top 50 Indian companies (Reliance, TCS, HDFC). Ultra-low expense ratio.', hi: 'भारत की टॉप 50 दिग्गज कंपनियों में सुरक्षित निवेश। लंबी अवधि में वेल्थ कंपाउंडिंग का सबसे अच्छा साधन।' },
  },
  {
    id: 'flexicap_growth',
    name: { en: 'Bharat Flexi-Cap Multicap Fund', hi: 'भारत मल्टीकैप ग्रोथ फंड' },
    type: 'Flexi Cap Fund',
    riskLevel: 'Moderate',
    expectedAnnualReturn: 0.16, // 16% p.a.
    nav: 88.2,
    minSipAmount: 1000,
    description: { en: 'Dynamically shifts between large, mid and emerging small cap companies for high alpha.', hi: 'फंड मैनेजर मार्केट के हिसाब से बड़ी और मध्यम कंपनियों में पैसा लगाकर ज्यादा रिटर्न बनाते हैं।' },
  },
  {
    id: 'smallcap_rocket',
    name: { en: 'Emerging Titans Small-Cap Fund', hi: 'इमर्जिंग टाइटन्स स्मॉलकैप फंड (उच्च रिटर्न)' },
    type: 'Small Cap Growth Fund',
    riskLevel: 'High',
    expectedAnnualReturn: 0.22, // 22% p.a. (volatile)
    nav: 52.8,
    minSipAmount: 1500,
    description: { en: 'High risk, massive explosive growth in future industry unicorns.', hi: 'ज्यादा उतार-चढ़ाव लेकिन भविष्य की मल्टीबैगर कंपनियों में जबरदस्त ग्रोथ का मौका।' },
  },
];

// Real Estate Properties
export const REAL_ESTATE_DATA: RealEstateProperty[] = [
  {
    id: 'studio_apartment',
    name: { en: 'Metro 1BHK Rental Studio', hi: 'मेट्रो 1BHK रेंटल स्टूडियो' },
    type: 'Residential 1BHK',
    cost: 3500000, // ₹35 Lakhs
    dailyRentalIncome: 650, // ₹19,500/month
    appreciationRateDaily: 0.00015, // ~5.5% annual capital growth
    location: 'Bengaluru Tech Corridor',
    icon: '🏢',
    description: { en: 'Furnished apartment rented to IT software engineers. Guaranteed rental yield.', hi: 'आईटी प्रोफेशनल्स को किराए पर दिया गया फर्निश्ड फ्लैट। हर महीने तय पैसिव रेंट।' },
  },
  {
    id: 'commercial_showroom',
    name: { en: 'High-Street Prime Commercial Shop', hi: 'हाई-स्ट्रीट कमर्शियल शोरूम' },
    type: 'Commercial Cafe Outlet',
    cost: 12000000, // ₹1.2 Crore
    dailyRentalIncome: 2800, // ₹84,000/month
    appreciationRateDaily: 0.00022, // ~8% annual growth
    location: 'Connaught Place / MG Road',
    icon: '🏬',
    description: { en: 'Corner commercial retail space leased to multinational clothing brand on a 9-year lock-in.', hi: 'मल्टीनेशनल ब्रांड को 9 साल के लीज पर दी गई प्राइम रिटेल दुकान।' },
  },
  {
    id: 'coorg_coffee_estate',
    name: { en: '50-Acre Coorg Arabica Coffee Plantation', hi: '50-एकड़ कूर्ग अरेबिका कॉफ़ी एस्टेट' },
    type: 'Coorg Coffee Plantation',
    cost: 45000000, // ₹4.5 Crore
    dailyRentalIncome: 12500, // ₹3.75 Lakhs/month harvest cashflow
    appreciationRateDaily: 0.00028, // ~10% annual growth
    location: 'Madikeri, Coorg Western Ghats',
    icon: '🌲',
    description: { en: 'Yields 40 tons of organic coffee cherries annually and includes an eco-resort for tourist homestays.', hi: 'सालाना 40 टन ऑर्गेनिक कॉफी उत्पादन + ईको-टूरिज्म होमस्टे से भारी पैसिव आमदनी।' },
  },
];

// Sovereign Gold Bonds & 24K Gold
export const GOLD_BONDS_DATA: SovereignBond[] = [
  {
    id: 'sgb_rbi',
    name: { en: 'RBI Sovereign Gold Bond (SGB)', hi: 'आरबीआई सॉवरेन गोल्ड बॉन्ड (SGB)' },
    costPerUnit: 7600, // ₹7,600 per gram
    annualInterestRate: 0.025, // 2.5% p.a. + gold appreciation
    description: { en: 'Issued by Government of India. 2.5% guaranteed annual interest credited directly + tax-free gold appreciation on maturity.', hi: 'भारत सरकार द्वारा जारी। सोने के भाव में बढ़ोतरी के साथ-साथ सालाना 2.5% अतिरिक्त ब्याज।' },
  },
];

// Loan Plans
export const LOAN_PLANS: LoanPlan[] = [
  {
    id: 'micro_business_loan',
    title: { en: 'Mudra Micro Business Startup Loan', hi: 'मुद्रा माइक्रो बिजनेस स्टार्टअप लोन' },
    maxAmount: 100000, // ₹1 Lakh
    interestRateAnnual: 0.09, // 9%
    tenureDays: 30, // 30 game days
    minCibilRequired: 600,
    description: { en: 'Collateral-free government scheme loan for street vendors and micro cafes.', hi: 'बिना किसी गारंटी के छोटा बिजनेस लोन। समय पर चुकाने पर सिबिल स्कोर बढ़ता है।' },
  },
  {
    id: 'cafe_expansion_loan',
    title: { en: 'MSME Cafe Machinery & Expansion Loan', hi: 'एमएसएमई कैफ़े विस्तार एवं मशीनरी लोन' },
    maxAmount: 1500000, // ₹15 Lakhs
    interestRateAnnual: 0.11, // 11%
    tenureDays: 60, // 60 game days
    minCibilRequired: 700,
    description: { en: 'Fast approval for upgrading espresso machinery, seating and hiring staff.', hi: 'बड़ी मशीनें खरीदने और दुकान का रेनोवेशन करने के लिए कम ब्याज पर लोन।' },
  },
  {
    id: 'commercial_mortgage',
    title: { en: 'Commercial Property & Real Estate Mortgage', hi: 'कमर्शियल रियल एस्टेट मॉर्गेज लोन' },
    maxAmount: 20000000, // ₹2 Crore
    interestRateAnnual: 0.085, // 8.5%
    tenureDays: 120, // 120 game days
    minCibilRequired: 750,
    description: { en: 'Low-interest mortgage to acquire rental commercial shops and plantations.', hi: 'कमर्शियल प्रॉपर्टी और बागान खरीदने के लिए सबसे कम ब्याज दर वाला बड़ा लोन।' },
  },
];

// Interactive Real-Life Entrepreneurial Dilemmas
export const INTERACTIVE_DAILY_EVENTS: InteractiveDailyEvent[] = [
  {
    id: 'milk_supply_crisis',
    title: { en: 'Dairy Farmers Protest & Milk Supply Shock 🥛⚠️', hi: 'डेयरी हड़ताल एवं दूध संकट 🥛⚠️' },
    category: 'supply_chain',
    description: {
      en: 'Local dairy unions blocked highways. Milk prices skyrocketed by 25% across the city today. How will you respond as an entrepreneur?',
      hi: 'स्थानीय डेयरी हड़ताल की वजह से बाज़ार में दूध के दाम 25% बढ़ गए हैं। आप इस परिस्थिति में क्या निर्णय लेंगे?',
    },
    icon: '🥛',
    choices: [
      {
        id: 'absorb_cost',
        label: { en: 'Absorb the Cost (Keep Cup Price Same)', hi: 'लागत खुद सहें (कप का रेट वही रखें)' },
        description: { en: 'Lower profit margins for 2 days, but protects customer loyalty & trust.', hi: '2 दिन मुनाफा कम होगा लेकिन ग्राहक संतुष्ट रहेंगे।' },
        outcomeText: { en: 'Customers appreciated your fairness! Google rating boosted +0.2 ⭐.', hi: 'ग्राहकों ने आपके निर्णय की सराहना की! रेटिंग +0.2 ⭐ बढ़ी।' },
        effect: (state) => ({ googleRating: Math.min(5.0, state.googleRating + 0.2) }),
      },
      {
        id: 'hike_price_five',
        label: { en: 'Hike Price by ₹5 / cup', hi: 'प्रति कप ₹5 रेट बढ़ाएं' },
        description: { en: 'Pass cost to customers. Protects cash margin but slight pushback.', hi: 'लागत ग्राहकों पर डालें। मुनाफा सुरक्षित रहेगा।' },
        outcomeText: { en: 'Slight drop in footfall, but revenue margins remained protected.', hi: 'बिक्री में थोड़ी कमी आई, लेकिन कुल मार्जिन सुरक्षित रहा।' },
        effect: (state) => ({ cupPrice: state.cupPrice + 5 }),
      },
      {
        id: 'bulk_contract',
        label: { en: 'Sign Direct Farm Supply Contract (-₹15,000)', hi: 'सीधे फार्म से थोक अनुबंध करें (-₹15,000)' },
        costCash: 15000,
        description: { en: 'Invest upfront in direct farm procurement to lock in permanently low dairy rates.', hi: 'फार्म से सीधा टाई-अप करके दूध के दाम हमेशा के लिए कम करें।' },
        outcomeText: { en: 'Brilliant business move! You locked in 20% cheaper milk permanently.', hi: 'शानदार फैसला! अब आपको दूध हमेशा 20% सस्ता मिलेगा।' },
        effect: (state) => ({ cash: Math.max(0, state.cash - 15000) }),
      },
    ],
  },
  {
    id: 'food_safety_audit',
    title: { en: 'Surprise FSSAI Food Safety & Hygiene Audit 📋🔍', hi: 'FSSAI फ़ूड सेफ्टी विभाग का औचक निरीक्षण 📋🔍' },
    category: 'regulatory',
    description: {
      en: 'Government food safety inspectors have arrived at your cafe to inspect milk freshness, water quality, and staff hygiene.',
      hi: 'सरकारी खाद्य सुरक्षा अधिकारी दूध की ताजगी, पानी की शुद्धता और रसोई की सफाई जांचने पहुंचे हैं।',
    },
    icon: '📋',
    choices: [
      {
        id: 'cooperate_fully',
        label: { en: 'Welcome Full Audit & Show Cleanliness Logs', hi: 'पूरा सहयोग करें और सफाई रिकॉर्ड दिखाएं' },
        description: { en: 'Showcase your kitchen hygiene, RO filter logs, and staff cleanliness.', hi: 'अपनी रसोई और पानी के फिल्टर का रिकॉर्ड प्रस्तुत करें।' },
        outcomeText: { en: 'Audit passed with Flying Colors! Awarded "5-Star A+ Hygiene Badge" & ₹10,000 grant!', hi: 'जांच में 5-स्टार रेटिंग मिली! सरकार से ₹10,000 का अनुदान मिला!' },
        effect: (state) => ({
          cash: state.cash + 10000,
          cleanlinessScore: Math.min(100, state.cleanlinessScore + 15),
          googleRating: Math.min(5.0, state.googleRating + 0.3),
        }),
      },
      {
        id: 'quick_deep_clean',
        label: { en: 'Call Emergency Deep Clean Service (-₹3,500)', hi: 'तुरंत डीप क्लीनिंग सर्विस बुलाएं (-₹3,500)' },
        costCash: 3500,
        description: { en: 'Fast sanitize the entire shop and replace machine gaskets immediately.', hi: 'पूरी दुकान को तुरंत सैनिटाइज कराएं और मशीन की सर्विसिंग कराएं।' },
        outcomeText: { en: 'Audit cleared smoothly with minor commendations.', hi: 'निरीक्षण सफलतापूर्वक पास हो गया।' },
        effect: (state) => ({
          cash: Math.max(0, state.cash - 3500),
          cleanlinessScore: 100,
          machineHealthScore: 100,
        }),
      },
    ],
  },
  {
    id: 'food_influencer_visit',
    title: { en: 'Celebrity Food Influencer Visits Shop! 📱✨', hi: 'प्रसिद्ध फ़ूड व्लॉगर का आगमन! 📱✨' },
    category: 'marketing',
    description: {
      en: 'A food influencer with 2 Million followers just walked in with their camera crew. How do you host them?',
      hi: '20 लाख फॉलोअर्स वाले मशहूर फ़ूड व्लॉगर अपनी टीम के साथ आपके कैफ़े में आए हैं। आप क्या करेंगे?',
    },
    icon: '📸',
    choices: [
      {
        id: 'vip_platter',
        label: { en: 'Host VIP Artisanal Tasting Platter (-₹1,200)', hi: 'वीआईपी स्पेशल टेस्टिंग प्लेटर पेश करें (-₹1,200)' },
        costCash: 1200,
        description: { en: 'Serve your signature cold brew, latte art and freshly baked pastries on the house.', hi: 'अपने शेफ की सबसे बेहतरीन कॉफ़ी और पेस्ट्री सम्मानपूर्वक खिलाएं।' },
        outcomeText: { en: 'Their Instagram Reel went Viral (5M Views)! Customer queue is 3x long today!', hi: 'उनकी रील 50 लाख लोगों ने देखी! आज कैफ़े में 3 गुना लंबी लाइन लग गई!' },
        effect: (state) => ({
          cash: Math.max(0, state.cash - 1200),
          googleRating: Math.min(5.0, state.googleRating + 0.4),
          totalCupsSold: state.totalCupsSold + 150,
          cashWon: 25000,
        }),
      },
      {
        id: 'standard_service',
        label: { en: 'Provide Standard Authentic Customer Service', hi: 'सामान्य प्रामाणिक सेवा प्रदान करें' },
        description: { en: 'Treat them just like any regular honest customer.', hi: 'उन्हें आम ग्राहक की तरह सामान्य सेवा दें।' },
        outcomeText: { en: 'They posted a nice genuine review praising your consistency.', hi: 'उन्होंने आपके स्वाद की तारीफ करते हुए अच्छा रिव्यू पोस्ट किया।' },
        effect: (state) => ({ googleRating: Math.min(5.0, state.googleRating + 0.1) }),
      },
    ],
  },
  {
    id: 'staff_bonus_request',
    title: { en: 'Staff Festive Bonus & Festival Morale 🪔🎁', hi: 'स्टाफ दिवाली/त्योहार बोनस की मांग 🪔🎁' },
    category: 'staff_hr',
    description: {
      en: 'It is festival season! Staff has worked tirelessly during rush hours. They hope for a festive bonus or token of appreciation.',
      hi: 'त्योहारों का समय है! स्टाफ ने भीड़ में दिन-रात मेहनत की है और वे बोनस या सम्मान की उम्मीद कर रहे हैं।',
    },
    icon: '🪔',
    choices: [
      {
        id: 'give_generous_bonus',
        label: { en: 'Distribute Festive Bonus & Sweet Boxes (-₹8,000)', hi: 'दिवाली बोनस एवं मिठाई बांटें (-₹8,000)' },
        costCash: 8000,
        description: { en: 'Reward staff loyalty with cash bonus, sweets and family health gift.', hi: 'स्टाफ को नकद बोनस और मिठाई देकर उनका उत्साह बढ़ाएं।' },
        outcomeText: { en: 'Staff Morale surged to 100%! Serving speed boosted and zero attrition!', hi: 'स्टाफ का मनोबल 100% पर पहुंच गया! सर्विस स्पीड और वफादारी बढ़ी।' },
        effect: (state) => ({
          cash: Math.max(0, state.cash - 8000),
          staffMoraleScore: 100,
        }),
      },
      {
        id: 'give_tea_party',
        label: { en: 'Host Celebration Tea Party & Extra Tips (-₹1,500)', hi: 'चाय पार्टी एवं विशेष टिप्स दें (-₹1,500)' },
        costCash: 1500,
        description: { en: 'Small celebration party and heartfelt thank-you speech.', hi: 'पार्टी और बधाई देकर स्टाफ का आभार व्यक्त करें।' },
        outcomeText: { en: 'Staff appreciated the gesture. Morale boosted +15%.', hi: 'स्टाफ खुश हुआ और मनोबल +15% बढ़ा।' },
        effect: (state) => ({
          cash: Math.max(0, state.cash - 1500),
          staffMoraleScore: Math.min(100, state.staffMoraleScore + 15),
        }),
      },
      {
        id: 'postpone_bonus',
        label: { en: 'Politely Postpone & Thank the Team (₹0 Free)', hi: 'विनम्रता से टालें व टीम का धन्यवाद करें (₹0 मुफ्त)' },
        description: { en: 'Explain current working capital constraints, thank the team warmly, and promise future rewards.', hi: 'बजट की स्थिति समझाएं, टीम का आभार व्यक्त करें और आगे मुनाफा होने पर रिवॉर्ड का वादा करें।' },
        outcomeText: { en: 'Staff appreciated the transparency, though morale dipped slightly (-5%).', hi: 'स्टाफ ने स्थिति समझी, हालांकि मनोबल में -5% की मामूली गिरावट आई।' },
        effect: (state) => ({
          staffMoraleScore: Math.max(25, state.staffMoraleScore - 5),
        }),
      },
    ],
  },
  {
    id: 'rainy_day_rush',
    title: { en: 'Sudden Monsoon Downpour & Hot Coffee Rush! 🌧️☕', hi: 'अचानक मूसलाधार बारिश और गरम कॉफ़ी की भारी मांग! 🌧️☕' },
    category: 'marketing',
    description: {
      en: 'Heavy rain just hit the city! Cold breeze has caused footfall to double. Customers want piping hot South Indian filter coffee.',
      hi: 'शहर में झमाझम बारिश शुरू हो गई है! ठंडे मौसम में गरमा-गरम फिल्टर कॉफ़ी और कुल्हड़ चाय की मांग अचानक 2 गुना बढ़ गई है।',
    },
    icon: '🌧️',
    choices: [
      {
        id: 'monsoon_special_combo',
        label: { en: 'Launch "Monsoon Chai & Filter Coffee Combo" (₹0 Free)', hi: '"मानसून स्पेशल कॉफ़ी कॉम्बो" शुरू करें (₹0 मुफ्त)' },
        description: { en: 'Promote quick hot brewing and sell at standard rates for instant volume.', hi: 'तेज़ ब्रूइंग चालू रखें और भारी भीड़ को तुरंत गरमा-गरम कॉफ़ी सर्व करें।' },
        outcomeText: { en: 'Huge sales rush! Served 120 extra cups and earned +₹4,500 bonus cash!', hi: 'जबरदस्त बिक्री! 120 अतिरिक्त कप बिके और +₹4,500 का अतिरिक्त नकद मुनाफा हुआ!' },
        effect: (state) => ({
          cash: state.cash + 4500,
          totalCupsSold: state.totalCupsSold + 120,
          googleRating: Math.min(5.0, state.googleRating + 0.2),
        }),
      },
      {
        id: 'covered_patio_shelter',
        label: { en: 'Set Up Quick Rain Canopies & Seating (-₹2,200)', hi: 'वाटरप्रूफ कैनोपी शेड लगाएं (-₹2,200)' },
        costCash: 2200,
        description: { en: 'Install temporary outdoor rain shelter so 40+ people can sit comfortably dry.', hi: 'बारिश से बचने के लिए बाहर शेड लगाएं ताकि ग्राहक आराम से बैठकर कॉफ़ी पी सकें।' },
        outcomeText: { en: 'Viral cozy rain ambiance! +₹9,000 revenue earned and 5-star customer reviews!', hi: 'शानदार माहौल! ग्राहकों ने जमकर तारीफ की और +₹9,000 की कमाई हुई!' },
        effect: (state) => ({
          cash: Math.max(0, state.cash - 2200 + 9000),
          totalCupsSold: state.totalCupsSold + 180,
          googleRating: Math.min(5.0, state.googleRating + 0.3),
        }),
      },
    ],
  },
];

// Financial IQ Quizzes
export const FINANCIAL_QUIZZES: QuizQuestion[] = [
  {
    id: 'q_asset_vs_liability',
    question: {
      en: 'What is the exact definition of an "Asset" vs a "Liability" in financial freedom?',
      hi: 'आर्थिक आज़ादी (Financial Freedom) में "एसेट (Asset)" और "लायबिलिटी (Liability)" का सही अर्थ क्या है?',
    },
    options: [
      { en: 'An Asset puts money into your pocket; A Liability takes money out of your pocket.', hi: 'एसेट आपकी जेब में पैसे डालता है; लायबिलिटी आपकी जेब से पैसे निकालती है।' },
      { en: 'An Asset is something that looks expensive and gives you high social status.', hi: 'एसेट वह है जो महंगा दिखे और समाज में रुतबा दिखाए।' },
      { en: 'A car is always an asset because it is expensive.', hi: 'कार हमेशा एक एसेट होती है क्योंकि वह कीमती है।' },
      { en: 'There is no difference between assets and liabilities.', hi: 'एसेट और लायबिलिटी में कोई अंतर नहीं है।' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'Robert Kiyosaki’s core rule: An asset (like rental property, dividend stock, profitable cafe) generates cash flow. A luxury car or expensive watch takes money away in maintenance and depreciation!',
      hi: 'रॉबर्ट कियोसाकी का नियम: एसेट (जैसे रेंटल दुकान, डिविडेंड शेयर, कैफ़े) कमाई देता है। जबकि महंगी कार या लग्जरी गैजेट्स मेंटेनेंस और गिरावट में आपका पैसा खर्च कराते हैं!',
    },
    rewardCash: 5000,
  },
  {
    id: 'q_good_debt_vs_bad_debt',
    question: {
      en: 'Which of the following is considered "Good Debt" (अच्छा कर्ज़)?',
      hi: 'इनमें से किसे "अच्छा कर्ज़ (Good Debt)" माना जाता है?',
    },
    options: [
      { en: 'Taking a 16% personal loan to buy the latest flagship smartphone.', hi: 'लेटेस्ट स्मार्टफोन खरीदने के लिए 16% ब्याज पर पर्सनल लोन लेना।' },
      { en: 'Taking a 9% business loan to buy an espresso machine that increases daily cafe profit by 25%.', hi: '9% पर लोन लेकर ऐसी एस्प्रेसो मशीन लगाना जो रोज़ाना 25% ज्यादा मुनाफा दे।' },
      { en: 'Maxing out credit cards for weekend luxury parties.', hi: 'वीकेंड पार्टियों के लिए क्रेडिट कार्ड की पूरी लिमिट खर्च कर देना।' },
      { en: 'Borrowing money from friends without any repayment plan.', hi: 'बिना प्लानिंग के दोस्तों से कर्ज़ लेना।' },
    ],
    correctIndex: 1,
    explanation: {
      en: 'Good debt pays for itself and leaves a surplus profit! Bad debt drains your cash on items that lose value.',
      hi: 'अच्छा कर्ज़ वह है जिसकी ईएमआई चुकाने के बाद भी आपकी जेब में अतिरिक्त मुनाफा बचे।',
    },
    rewardCash: 8000,
  },
  {
    id: 'q_power_of_compounding',
    question: {
      en: 'Albert Einstein called "Compound Interest" the 8th wonder of the world. Why is SIP compounding so powerful?',
      hi: 'कंपाउंडिंग (चक्रवृद्धि ब्याज) को दुनिया का 8वां अजूबा क्यों कहा जाता है? एसआईपी (SIP) की क्या ताकत है?',
    },
    options: [
      { en: 'You earn interest not only on your principal, but also on the accumulated interest over time.', hi: 'आपको मूलधन के साथ-साथ पिछले मिले ब्याज पर भी लगातार ब्याज मिलता रहता है।' },
      { en: 'It doubles your money in 24 hours guaranteed.', hi: 'यह 24 घंटे में पैसा दोगुना करने की गारंटी देता है।' },
      { en: 'It only works if you already have ₹1 Crore cash.', hi: 'यह केवल तब काम करता है जब पहले से 1 करोड़ रुपये हों।' },
      { en: 'It has no real financial benefit over keeping cash under the mattress.', hi: 'घर में नकदी रखने से इसका कोई खास फायदा नहीं है।' },
    ],
    correctIndex: 0,
    explanation: {
      en: 'With compounding, regular small investments snowball into massive wealth over time as returns generate further returns exponentially!',
      hi: 'कंपाउंडिंग में समय के साथ आपका छोटा निवेश बर्फ के गोले (Snowball) की तरह तेजी से विशाल संपत्ति में बदल जाता है।',
    },
    rewardCash: 12000,
  },
  {
    id: 'q_emergency_fund',
    question: {
      en: 'How many months of living/business operating expenses should ideally be in an Emergency Fund (Liquid Cash/FD)?',
      hi: 'इमरजेंसी फंड (लिक्विड कैश / एफडी) में कितने महीनों का खर्च सुरक्षित रखना चाहिए?',
    },
    options: [
      { en: 'Zero months, invest 100% in risky meme stocks.', hi: 'शून्य महीने, सारा पैसा रिस्की पेनी स्टॉक्स में लगा दें।' },
      { en: 'At least 6 to 12 months of mandatory expenses.', hi: 'कम से कम 6 से 12 महीने के जरूरी खर्चे के बराबर।' },
      { en: 'Only 2 days of expenses.', hi: 'सिर्फ 2 दिन का खर्च।' },
      { en: 'Emergency fund is a waste of money.', hi: 'इमरजेंसी फंड बनाना पैसे की बर्बादी है।' },
    ],
    correctIndex: 1,
    explanation: {
      en: 'Having a 6-12 month emergency buffer protects your business from sudden lockdowns, medical emergencies, or market crashes without taking high-interest distress loans.',
      hi: '6-12 महीने का इमरजेंसी फंड होने से किसी भी मंदी, बीमारी या लॉकडाउन में आपको मजबूरी में महंगे कर्ज़ नहीं लेने पड़ते।',
    },
    rewardCash: 15000,
  },
];

// Random Daily Passive Events
export const DAILY_EVENTS: DailyEvent[] = [
  {
    id: 'monsoon_downpour',
    title: { en: 'Heavy Monsoon Rain Rush! 🌧️', hi: 'झमाझम मानसूनी बारिश! 🌧️' },
    description: {
      en: 'Cold pouring rain outside! Everyone is craving hot piping filter coffee and snacks. Coffee sales +60% today!',
      hi: 'बाहर रिमझिम बारिश! गर्म-गर्म फिल्टर कॉफ़ी और स्नैक्स की भारी मांग। आज कॉफ़ी बिक्री +60%!',
    },
    impactType: 'sales_boost',
    multiplier: 1.6,
    icon: '🌧️',
    durationDays: 1,
  },
  {
    id: 'stock_market_bull_run',
    title: { en: 'Stock Market Sensex Bull Rally! 📈🚀', hi: 'शेयर बाज़ार में ज़बरदस्त तेजी! 📈🚀' },
    description: {
      en: 'Foreign institutional investors pumped massive capital into Indian markets. Stock prices surged +12%!',
      hi: 'विदेशी निवेशकों की भारी खरीदारी से बाज़ार में तेजी। सभी शेयर +12% उछले!',
    },
    impactType: 'stock_rally',
    multiplier: 1.12,
    icon: '🚀',
    durationDays: 1,
  },
  {
    id: 'festive_diwali_bonus',
    title: { en: 'Festive Season Coffee Hampers Sale! 🪔✨', hi: 'त्योहारी सीजन कॉफ़ी गिफ्ट बॉक्स की धूम! 🪔✨' },
    description: {
      en: 'Corporate companies ordered bulk festive coffee gift hampers. You earned an instant cash windfall of ₹25,000!',
      hi: 'कंपनियों ने कॉफ़ी गिफ्ट पैक के थोक ऑर्डर दिए। आपको ₹25,000 का अतिरिक्त नकद बोनस मिला!',
    },
    impactType: 'cash_gift',
    cashDelta: 25000,
    icon: '🪔',
    durationDays: 1,
  },
];

// Achievements
export const ACHIEVEMENTS_LIST: Achievement[] = [
  // 1. WEALTH & FINANCIAL MILESTONES
  {
    id: 'first_lakhpati',
    title: { en: 'The First Lakh (Lakhpati)', hi: 'पहला लखपति (₹1,00,000 नेटवर्थ)' },
    description: {
      en: 'Cross your first ₹1,00,000 in total net worth across cash and assets.',
      hi: 'नकद और संपत्तियों को मिलाकर ₹1,00,000 की कुल संपत्ति का पहला पड़ाव पार करें।',
    },
    category: 'wealth',
    icon: '💰',
    rewardCash: 10000,
    rewardBadgeTitle: { en: 'Lakhpati Brewer', hi: 'लखपति बरिस्ता' },
    requirement: (_state, netWorth) => netWorth >= 100000,
    getProgress: (_state, netWorth) => ({
      current: Math.min(100000, Math.max(0, netWorth)),
      target: 100000,
      unit: '₹',
      formattedText: `₹${Math.round(netWorth).toLocaleString('en-IN')} / ₹1,00,000`,
    }),
  },
  {
    id: 'first_millionaire',
    title: { en: 'First Millionaire (₹10 Lakhs)', hi: 'फ़र्स्ट मिलियनेयर (₹10 लाख नेटवर्थ)' },
    description: {
      en: 'Amass ₹10,00,000 (1 Million INR) net worth through smart business reinvestment.',
      hi: 'स्मार्ट बिजनेस और निवेश की बदौलत ₹10,00,000 (10 लाख) की कुल नेटवर्थ बनाएं।',
    },
    category: 'wealth',
    icon: '💎',
    rewardCash: 50000,
    rewardBadgeTitle: { en: 'Self-Made Millionaire', hi: 'सेल्फ-मेड मिलियनेयर' },
    requirement: (_state, netWorth) => netWorth >= 1000000,
    getProgress: (_state, netWorth) => ({
      current: Math.min(1000000, Math.max(0, netWorth)),
      target: 1000000,
      unit: '₹',
      formattedText: `₹${Math.round(netWorth).toLocaleString('en-IN')} / ₹10,00,000`,
    }),
  },
  {
    id: 'multi_millionaire',
    title: { en: 'Multi-Millionaire (₹50 Lakhs)', hi: 'मल्टी-मिलियनेयर (₹50 लाख नेटवर्थ)' },
    description: {
      en: 'Surpass ₹50,00,000 in net worth. Compound interest is now multiplying your wealth!',
      hi: '₹50,00,000 की कुल संपत्ति हासिल करें। कंपाउंडिंग आपकी दौलत को तेज़ी से बढ़ा रही है!',
    },
    category: 'wealth',
    icon: '🚀',
    rewardCash: 150000,
    rewardBadgeTitle: { en: 'Financial Titan', hi: 'फाइनेंशियल टाइटन' },
    requirement: (_state, netWorth) => netWorth >= 5000000,
    getProgress: (_state, netWorth) => ({
      current: Math.min(5000000, Math.max(0, netWorth)),
      target: 5000000,
      unit: '₹',
      formattedText: `₹${Math.round(netWorth).toLocaleString('en-IN')} / ₹50,00,000`,
    }),
  },
  {
    id: 'coffee_crorepati',
    title: { en: 'Coffee Crorepati (₹1 Crore)', hi: 'कॉफ़ी करोड़पति (₹1 Crore क्लब)' },
    description: {
      en: 'Join the elite ₹1,00,00,000 (10 Million INR) Crorepati Club in assets and cash flow.',
      hi: 'संपत्ति, शेयर और रियल एस्टेट मिलाकर ₹1 करोड़ के प्रतिष्ठित क्लब में शामिल हों।',
    },
    category: 'wealth',
    icon: '👑',
    rewardCash: 500000,
    rewardBadgeTitle: { en: 'Crorepati Tycoon', hi: 'करोड़पति टाइकून' },
    requirement: (_state, netWorth) => netWorth >= 10000000,
    getProgress: (_state, netWorth) => ({
      current: Math.min(10000000, Math.max(0, netWorth)),
      target: 10000000,
      unit: '₹',
      formattedText: `₹${Math.round(netWorth).toLocaleString('en-IN')} / ₹1,00,00,000`,
    }),
  },
  {
    id: 'deca_crorepati',
    title: { en: 'Deca-Crorepati (₹10 Crore Empire)', hi: 'दश-करोड़पति (₹10 Crore एम्पायर)' },
    description: {
      en: 'Build a monumental ₹10 Crore empire. Complete generational wealth achieved!',
      hi: '₹10 करोड़ का विशाल साम्राज्य स्थापित करें। पीढ़ियों तक चलने वाली वित्तीय स्वतंत्रता!',
    },
    category: 'wealth',
    icon: '🏛️',
    rewardCash: 2500000,
    rewardBadgeTitle: { en: 'Generational Wealth Legend', hi: 'अमर बिज़नेस लीजेंड' },
    requirement: (_state, netWorth) => netWorth >= 100000000,
    getProgress: (_state, netWorth) => ({
      current: Math.min(100000000, Math.max(0, netWorth)),
      target: 100000000,
      unit: '₹',
      formattedText: `₹${Math.round(netWorth).toLocaleString('en-IN')} / ₹10,00,00,000`,
    }),
  },

  // 2. DEBT-FREE & CREDIT MASTERY
  {
    id: 'debt_free_hero',
    title: { en: 'Debt-Free Hero (Zero Liabilities)', hi: 'कर्ज़-मुक्त हीरो (Zero Bank Debt)' },
    description: {
      en: 'Maintain zero active bank loans and zero overdue credit card balance with CIBIL 760+.',
      hi: 'बिना किसी बैंक कर्ज़ और क्रेडिट कार्ड बकाये के 760+ का मजबूत सिबिल स्कोर बनाए रखें।',
    },
    category: 'debt',
    icon: '🛡️',
    rewardCash: 40000,
    rewardBadgeTitle: { en: 'Debt-Free Champion', hi: 'कर्ज़-मुक्त चैंपियन' },
    requirement: (state) => state.activeLoans.length === 0 && state.creditCardSpend === 0 && state.cibilScore >= 760,
    getProgress: (state) => {
      const isZeroLoans = state.activeLoans.length === 0;
      const isZeroCard = state.creditCardSpend === 0;
      const isGoodCibil = state.cibilScore >= 760;
      const score = (isZeroLoans ? 35 : 0) + (isZeroCard ? 35 : 0) + (isGoodCibil ? 30 : Math.round((state.cibilScore / 760) * 30));
      return {
        current: Math.min(100, score),
        target: 100,
        unit: '%',
        formattedText: isZeroLoans && isZeroCard && isGoodCibil ? 'Debt-Free Verified (100%)' : `CIBIL: ${state.cibilScore}/760 | Active Loans: ${state.activeLoans.length}`,
      };
    },
  },
  {
    id: 'credit_maestro_800',
    title: { en: 'Credit Maestro (CIBIL 800+)', hi: 'क्रेडिट उस्ताद (CIBIL 800+)' },
    description: {
      en: 'Achieve a stellar CIBIL score of 800+ through disciplined on-time EMI repayments.',
      hi: 'समय पर ईएमआई और बिल भरकर 800+ का शीर्ष सिबिल स्कोर प्राप्त करें।',
    },
    category: 'debt',
    icon: '💳',
    rewardCash: 30000,
    rewardBadgeTitle: { en: 'AAA Credit Rating', hi: 'AAA क्रेडिट रेटिंग' },
    requirement: (state) => state.cibilScore >= 800,
    getProgress: (state) => ({
      current: Math.min(800, state.cibilScore),
      target: 800,
      unit: 'pts',
      formattedText: `${state.cibilScore} / 800 CIBIL`,
    }),
  },
  {
    id: 'emergency_fortress',
    title: { en: 'Anti-Distress Shield (Emergency Buffer)', hi: 'इमरजेंसी सुरक्षा कवच (₹1,00,000+)' },
    description: {
      en: 'Deposit ₹1,00,000+ into your liquid Emergency Reserve Fund to survive any crisis.',
      hi: 'इमरजेंसी फंड में ₹1,00,000 जमा करें ताकि किसी भी मंदी में बिना कर्ज़ के दुकान चलती रहे।',
    },
    category: 'debt',
    icon: '🏰',
    rewardCash: 25000,
    rewardBadgeTitle: { en: 'Fortress Builder', hi: 'सुरक्षित निवेशक' },
    requirement: (state) => state.emergencyFundBalance >= 100000,
    getProgress: (state) => ({
      current: Math.min(100000, state.emergencyFundBalance),
      target: 100000,
      unit: '₹',
      formattedText: `₹${Math.round(state.emergencyFundBalance).toLocaleString('en-IN')} / ₹1,00,000`,
    }),
  },

  // 3. REAL ESTATE & ASSET MASTERY
  {
    id: 'first_landlord',
    title: { en: 'First Landlord (Rental Property)', hi: 'पहला लैंडलॉर्ड (किराये की प्रॉपर्टी)' },
    description: {
      en: 'Acquire your very first cash-flowing real estate property to start passive rent.',
      hi: 'अपनी पहली किराये की प्रॉपर्टी खरीदकर 24x7 पैसिव कैशफ्लो शुरू करें।',
    },
    category: 'real_estate',
    icon: '🏢',
    rewardCash: 50000,
    rewardBadgeTitle: { en: 'Property Investor', hi: 'प्रॉपर्टी निवेशक' },
    requirement: (state) => Object.values(state.realEstateOwned).some((p) => p && p.count > 0),
    getProgress: (state) => {
      const owned = Object.values(state.realEstateOwned).reduce((acc, p) => acc + (p?.count || 0), 0);
      return {
        current: Math.min(1, owned),
        target: 1,
        unit: 'prop',
        formattedText: `${owned} / 1 Property Owned`,
      };
    },
  },
  {
    id: 'real_estate_mogul',
    title: { en: 'Real Estate Mogul (3+ Properties)', hi: 'रियल एस्टेट मुग़ल (3+ प्रॉपर्टीज)' },
    description: {
      en: 'Own 3 or more real estate properties across residential and commercial units.',
      hi: 'दुकानें, फ्लैट्स और लक्ज़री यूनिट्स मिलाकर 3 या उससे अधिक प्रॉपर्टीज़ के मालिक बनें।',
    },
    category: 'real_estate',
    icon: '🏙️',
    rewardCash: 200000,
    rewardBadgeTitle: { en: 'Real Estate Tycoon', hi: 'रियल एस्टेट मुग़ल' },
    requirement: (state) => {
      const totalOwned = Object.values(state.realEstateOwned).reduce((acc, p) => acc + (p?.count || 0), 0);
      return totalOwned >= 3;
    },
    getProgress: (state) => {
      const owned = Object.values(state.realEstateOwned).reduce((acc, p) => acc + (p?.count || 0), 0);
      return {
        current: Math.min(3, owned),
        target: 3,
        unit: 'props',
        formattedText: `${owned} / 3 Properties Owned`,
      };
    },
  },
  {
    id: 'coorg_plantation_baron',
    title: { en: 'Coorg Plantation Baron', hi: 'कूर्ग कॉफ़ी बागान के मालिक' },
    description: {
      en: 'Acquire the majestic Coorg 50-Acre Coffee Plantation for ultimate vertical integration.',
      hi: 'कूर्ग का 50 एकड़ का कॉफ़ी बागान खरीदें और खुद की अरेबिका बीन्स का उत्पादन करें।',
    },
    category: 'real_estate',
    icon: '🌱',
    rewardCash: 500000,
    rewardBadgeTitle: { en: 'Plantation Lord', hi: 'बागान स्वामी' },
    requirement: (state) => (state.realEstateOwned['re_coorg_estate']?.count || 0) >= 1,
    getProgress: (state) => {
      const owned = state.realEstateOwned['re_coorg_estate']?.count || 0;
      return {
        current: Math.min(1, owned),
        target: 1,
        unit: 'estate',
        formattedText: owned >= 1 ? '1 / 1 Coorg Estate Owned' : '0 / 1 Coorg Estate Owned',
      };
    },
  },
  {
    id: 'passive_income_king',
    title: { en: 'Financial Freedom King (Passive > Expenses)', hi: 'फाइनेंशियल फ्रीडम किंग (पैसिव > खर्च)' },
    description: {
      en: 'Generate more daily passive income from real estate, dividends & interest than all expenses combined.',
      hi: 'रियल एस्टेट, डिविडेंड और ब्याज से रोज़ाना होने वाली पैसिव कमाई आपके कुल खर्च से ज्यादा हो जाए।',
    },
    category: 'real_estate',
    icon: '🌴',
    rewardCash: 100000,
    rewardBadgeTitle: { en: 'FIRE Master', hi: 'फाइनेंशियली फ्री' },
    requirement: (state) => {
      let passive = 0;
      Object.entries(state.realEstateOwned).forEach(([id, data]) => {
        const prop = REAL_ESTATE_DATA.find((p) => p.id === id);
        if (prop && data && data.count > 0) passive += prop.dailyRentalIncome * data.count;
      });
      return passive >= 3000;
    },
    getProgress: (state) => {
      let passive = 0;
      Object.entries(state.realEstateOwned).forEach(([id, data]) => {
        const prop = REAL_ESTATE_DATA.find((p) => p.id === id);
        if (prop && data && data.count > 0) passive += prop.dailyRentalIncome * data.count;
      });
      return {
        current: Math.min(3000, Math.round(passive)),
        target: 3000,
        unit: '₹/day',
        formattedText: `₹${Math.round(passive)} / ₹3,000 daily passive rent`,
      };
    },
  },

  // 4. CAFE & BUSINESS MASTERY
  {
    id: 'first_100_cups',
    title: { en: 'Brewmaster Apprentice (100 Cups)', hi: 'पहला कदम: 100 कप कॉफ़ी' },
    description: {
      en: 'Serve your first 100 cups of freshly brewed artisanal coffee to happy customers.',
      hi: 'अपने कैफ़े से पहले 100 कप ताज़ा कॉफ़ी सर्व करके ग्राहकों का दिल जीतें।',
    },
    category: 'business',
    icon: '☕',
    rewardCash: 5000,
    rewardBadgeTitle: { en: 'Barista Rookie', hi: 'बरिस्ता रूकी' },
    requirement: (state) => state.totalCupsSold >= 100,
    getProgress: (state) => ({
      current: Math.min(100, state.totalCupsSold),
      target: 100,
      unit: 'cups',
      formattedText: `${state.totalCupsSold} / 100 Cups Sold`,
    }),
  },
  {
    id: 'barista_legend_5000',
    title: { en: 'Brewmaster Titan (5,000 Cups)', hi: 'ब्रूमास्टर टाइटन (5,000 कप)' },
    description: {
      en: 'Serve 5,000 cups of coffee. Your cafe has become the city’s favorite heartbeat.',
      hi: '5,000 कप कॉफ़ी की बिक्री पूरी करें। आपका कैफ़े शहर की पहली पसंद बन चुका है।',
    },
    category: 'business',
    icon: '🔥',
    rewardCash: 75000,
    rewardBadgeTitle: { en: 'Master Roaster', hi: 'मास्टर रोस्टर' },
    requirement: (state) => state.totalCupsSold >= 5000,
    getProgress: (state) => ({
      current: Math.min(5000, state.totalCupsSold),
      target: 5000,
      unit: 'cups',
      formattedText: `${state.totalCupsSold} / 5,000 Cups Sold`,
    }),
  },
  {
    id: 'national_chain_tycoon',
    title: { en: 'National Franchise Empire (Level 5)', hi: 'नेशनल कॉफ़ी फ्रैंचाइज़ (Level 5)' },
    description: {
      en: 'Upgrade your business to Level 5: Luxury Coffee Franchise across 20+ metro locations.',
      hi: 'अपने ब्रांड को लेवल 5: 20+ मेट्रो शहरों में फैली लक्ज़री कॉफ़ी फ्रैंचाइज़ में अपग्रेड करें।',
    },
    category: 'business',
    icon: '🏆',
    rewardCash: 1000000,
    rewardBadgeTitle: { en: 'Franchise Kingpin', hi: 'फ्रैंचाइज़ किंगपिन' },
    requirement: (state) => state.shopLevel >= 5,
    getProgress: (state) => ({
      current: Math.min(5, state.shopLevel),
      target: 5,
      unit: 'lvl',
      formattedText: `Level ${state.shopLevel} / Level 5`,
    }),
  },
  {
    id: 'five_star_hospitality',
    title: { en: '5-Star Hospitality Legend (Rating 4.85+)', hi: '5-स्टार हॉस्पिटैलिटी लीजेंड (4.85+ रेटिंग)' },
    description: {
      en: 'Attain a stellar 4.85+ Google Maps rating with spotless hygiene and trained baristas.',
      hi: 'शानदार सर्विस और सफाई से 4.85+ की गूगल रेटिंग हासिल करें।',
    },
    category: 'business',
    icon: '⭐',
    rewardCash: 60000,
    rewardBadgeTitle: { en: 'Michelin Standard', hi: 'मिशेलिन स्टैंडर्ड' },
    requirement: (state) => state.googleRating >= 4.85 && state.cleanlinessScore >= 95,
    getProgress: (state) => ({
      current: Math.min(4.85, +state.googleRating.toFixed(2)),
      target: 4.85,
      unit: '★',
      formattedText: `Rating: ${state.googleRating.toFixed(2)} / 4.85 ★ | Cleanliness: ${Math.round(state.cleanlinessScore)}%`,
    }),
  },
  {
    id: 'responsible_taxpayer',
    title: { en: 'Tax-Compliant Titan (₹1 Lakh+ GST & Advance Tax)', hi: 'ईमानदार टैक्सपेयर टाइटन (₹1 Lakh+ टैक्स)' },
    description: {
      en: 'Pay ₹1,00,000+ in GST & Advance Income Tax lifetime. Real business leaders build the nation!',
      hi: '₹1,00,000 से अधिक का जीएसटी और एडवांस टैक्स चुकाकर राष्ट्र निर्माण में योगदान दें।',
    },
    category: 'business',
    icon: '🇮🇳',
    rewardCash: 50000,
    rewardBadgeTitle: { en: 'Nation Builder', hi: 'राष्ट्र निर्माता' },
    requirement: (state) => (state.gstCollectedLifetime + state.advanceTaxPaidLifetime) >= 100000,
    getProgress: (state) => {
      const totalTax = state.gstCollectedLifetime + state.advanceTaxPaidLifetime;
      return {
        current: Math.min(100000, Math.round(totalTax)),
        target: 100000,
        unit: '₹',
        formattedText: `₹${Math.round(totalTax).toLocaleString('en-IN')} / ₹1,00,000 Tax Paid`,
      };
    },
  },
];

export const SECONDS_PER_GAME_DAY = 24;

