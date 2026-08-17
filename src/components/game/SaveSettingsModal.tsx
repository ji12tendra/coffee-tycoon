import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Save,
  Volume2,
  VolumeX,
  Globe,
  RotateCcw,
  Download,
  Upload,
  Check,
  X,
  ShieldCheck,
  Sun,
  Moon,
} from 'lucide-react';

interface SaveSettingsModalProps {
  state: GameState;
  isHi: boolean;
  onClose: () => void;
  onToggleSound: () => void;
  onToggleLanguage: () => void;
  onToggleTheme?: () => void;
  onResetGame: () => void;
  onExportSave: () => string;
  onImportSave: (json: string) => boolean;
}

export const SaveSettingsModal: React.FC<SaveSettingsModalProps> = ({
  state,
  isHi,
  onClose,
  onToggleSound,
  onToggleLanguage,
  onToggleTheme,
  onResetGame,
  onExportSave,
  onImportSave,
}) => {
  const isDark = state.theme === 'dark';
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    const json = onExportSave();
    navigator.clipboard?.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = onImportSave(importText.trim());
    if (success) {
      setImportStatus(isHi ? '✅ गेम डेटा सफलतापूर्वक लोड हुआ!' : '✅ Save loaded successfully!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setImportStatus(isHi ? '❌ अमान्य डेटा (Invalid JSON)' : '❌ Invalid save file');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div
        className={`border rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-amber-950/10'
        }`}
      >
        
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
          <div className="flex items-center gap-2">
            <Save className="w-5 h-5 text-amber-500" />
            <h3 className={`text-base font-black ${isDark ? 'text-amber-200' : 'text-stone-900'}`}>
              {isHi ? 'गेम सेटिंग्स व सेव बैकअप' : 'Game Settings & Cloud Save'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl transition cursor-pointer border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border-stone-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Toggles */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
              state.soundEnabled
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300'
                : isDark
                ? 'bg-slate-950 border-slate-800 text-slate-500'
                : 'bg-stone-100 border-stone-200 text-stone-400'
            }`}
          >
            {state.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-[11px]">{state.soundEnabled ? (isHi ? 'ध्वनि चालू' : 'Sound ON') : (isHi ? 'ध्वनि बंद' : 'Muted')}</span>
          </button>

          <button
            onClick={() => {
              onToggleLanguage();
              sound.playClick();
            }}
            className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
              isDark
                ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                : 'bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-800'
            }`}
          >
            <Globe className="w-5 h-5 text-indigo-500" />
            <span className="text-[11px]">{isHi ? 'हिन्दी' : 'English'}</span>
          </button>

          <button
            onClick={() => {
              onToggleTheme?.();
              sound.playClick();
            }}
            className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
              !isDark
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-700'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            {isDark ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-600" />}
            <span className="text-[11px]">{isDark ? (isHi ? 'डार्क मोड' : 'Dark Mode') : (isHi ? 'लाइट मोड' : 'Lite Mode')}</span>
          </button>
        </div>

        {/* Backup / Export Save Data */}
        <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
          <div className="flex justify-between items-center text-xs">
            <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
              {isHi ? 'सेव डेटा बैकअप (Export)' : 'Export Save Data'}
            </span>
            <button
              onClick={handleExport}
              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition shadow-sm"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Download className="w-3 h-3" />}
              <span>{copied ? (isHi ? 'कॉपी हो गया!' : 'Copied!') : (isHi ? 'क्लिपबोर्ड में कॉपी' : 'Copy Save')}</span>
            </button>
          </div>
          <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            {isHi
              ? 'अपना प्रोग्रेस कोड कॉपी करके किसी भी दूसरे मोबाइल या कंप्यूटर में पेस्ट करके खेल सकते हैं।'
              : 'Copy your save progress JSON to play seamlessly across devices.'}
          </p>
        </div>

        {/* Restore / Import Save Data */}
        <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
          <span className={`font-bold text-xs block ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            {isHi ? 'सेव डेटा लोड करें (Import)' : 'Import / Restore Save'}
          </span>
          <textarea
            rows={2}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={isHi ? 'सेव JSON टेक्स्ट यहाँ पेस्ट करें...' : 'Paste save JSON string here...'}
            className={`w-full border rounded-xl p-2 text-xs font-mono focus:outline-none ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600'
                : 'bg-white border-stone-300 text-stone-800 placeholder:text-stone-400'
            }`}
          />
          {importStatus && <p className="text-xs font-bold text-amber-600 dark:text-amber-300">{importStatus}</p>}
          <button
            onClick={handleImport}
            className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isHi ? 'डेटा लोड करें' : 'Import Save'}</span>
          </button>
        </div>

        {/* Reset Progress */}
        <div className={`pt-2 border-t ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isHi ? 'शुरू से नया गेम रीसेट करें' : 'Reset All Progress (New Game)'}</span>
            </button>
          ) : (
            <div className={`p-3 border rounded-xl text-center space-y-2 ${
              isDark ? 'bg-rose-950/30 border-rose-500/40 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <p className="text-xs font-bold">
                {isHi ? 'क्या आप सच में नया गेम शुरू करना चाहते हैं?' : 'Are you sure you want to reset everything?'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-stone-200 text-stone-800'
                  }`}
                >
                  {isHi ? 'नहीं' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    onResetGame();
                    setShowResetConfirm(false);
                    onClose();
                  }}
                  className="flex-1 py-1 rounded-lg bg-rose-600 text-xs font-bold text-white hover:bg-rose-500 cursor-pointer shadow-sm"
                >
                  {isHi ? 'हाँ, रीसेट करें' : 'Confirm Reset'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
