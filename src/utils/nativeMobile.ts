import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const initNativeMobile = async () => {
  try {
    // Configure Native Android / iOS Status Bar
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0c1017' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch (err) {
    // In browser or webview environment, safely ignored
    console.debug('StatusBar native plugin not active (running on web/preview):', err);
  }
};

// Native Vibration / Haptic Feedback Engine for buttons & taps
export const nativeHaptic = {
  light: async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(12);
      }
    }
  },
  medium: async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(25);
      }
    }
  },
  heavy: async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(45);
      }
    }
  },
  success: async () => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([20, 50, 20]);
      }
    }
  },
  warning: async () => {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([40, 100, 40]);
      }
    }
  },
};
