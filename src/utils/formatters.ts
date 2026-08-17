// Format currency according to Indian numbering system (Lakhs, Crores)
export function formatINR(val: number, compact: boolean = false): string {
  if (isNaN(val)) return '₹0';
  const isNegative = val < 0;
  const absVal = Math.abs(val);

  if (compact) {
    if (absVal >= 10000000) {
      return `${isNegative ? '-' : ''}₹${(absVal / 10000000).toFixed(2)} Cr`;
    }
    if (absVal >= 100000) {
      return `${isNegative ? '-' : ''}₹${(absVal / 100000).toFixed(2)} L`;
    }
    if (absVal >= 1000) {
      return `${isNegative ? '-' : ''}₹${(absVal / 1000).toFixed(1)} K`;
    }
    return `${isNegative ? '-' : ''}₹${Math.round(absVal)}`;
  }

  // Full Indian number format with comma grouping: e.g. ₹1,23,45,678
  const rounded = Math.round(absVal);
  const str = rounded.toString();
  let result = '';

  if (str.length <= 3) {
    result = str;
  } else {
    const lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }

  return `${isNegative ? '-' : ''}₹${result}`;
}

export function formatPercent(val: number, decimals: number = 1): string {
  const sign = val > 0 ? '+' : '';
  return `${sign}${(val * 100).toFixed(decimals)}%`;
}

// CIBIL Rating Label & Color
export function getCibilTier(score: number): { labelEn: string; labelHi: string; colorClass: string; badgeBg: string } {
  if (score >= 780) {
    return {
      labelEn: 'Excellent (Prime)',
      labelHi: 'उत्कृष्ट (शानदार क्रेडिट)',
      colorClass: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    };
  }
  if (score >= 700) {
    return {
      labelEn: 'Good',
      labelHi: 'अच्छा (गुड स्कोर)',
      colorClass: 'text-green-400',
      badgeBg: 'bg-green-500/20 text-green-300 border-green-500/40',
    };
  }
  if (score >= 600) {
    return {
      labelEn: 'Fair',
      labelHi: 'औसत (सुधार की जरूरत)',
      colorClass: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    };
  }
  return {
    labelEn: 'Poor (High Risk)',
    labelHi: 'खराब (कर्ज़ मिलना मुश्किल)',
    colorClass: 'text-red-400',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
  };
}

// FIRE Status & Quadrant Tier
export function getFireStatus(passiveIncomePerDay: number, totalExpensesPerDay: number) {
  const monthlyPassive = passiveIncomePerDay * 30;
  const monthlyExpenses = Math.max(1, totalExpensesPerDay * 30);
  const ratio = (monthlyPassive / monthlyExpenses) * 100;

  let quadrant = 'Self-Employed (S)';
  let quadrantHi = 'सेल्फ-एम्प्लॉयड (टपरी/दुकान मालिक)';
  let levelName = 'Active Hustler';
  let levelNameHi = 'सक्रिय मेहनती';

  if (ratio >= 200) {
    quadrant = 'Ultimate Investor (I)';
    quadrantHi = 'अल्टीमेट इन्वेस्टर (संपत्ति साम्राज्य)';
    levelName = 'Abundant Wealth (FIRE Pro)';
    levelNameHi = 'संपन्न आर्थिक आज़ादी';
  } else if (ratio >= 100) {
    quadrant = 'Business Owner & Investor (B/I)';
    quadrantHi = 'बिजनेस ओनर व निवेशक (B/I)';
    levelName = 'Financially Free!';
    levelNameHi = 'आर्थिक रूप से आज़ाद!';
  } else if (ratio >= 50) {
    quadrant = 'Growing Business (B)';
    quadrantHi = 'बढ़ता हुआ बिजनेस (B)';
    levelName = 'Semi-Independent';
    levelNameHi = 'आधा रास्ता तय';
  } else if (ratio >= 20) {
    quadrant = 'Self-Employed (S)';
    quadrantHi = 'सेल्फ-एम्प्लॉयड (S)';
    levelName = 'Asset Builder';
    levelNameHi = 'एसेट निर्माणकर्ता';
  }

  return {
    firePercentage: Math.min(1000, ratio),
    monthlyPassive,
    monthlyExpenses,
    isFireAchieved: ratio >= 100,
    quadrant,
    quadrantHi,
    levelName,
    levelNameHi,
  };
}
