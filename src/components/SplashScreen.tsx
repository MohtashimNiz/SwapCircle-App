import React from 'react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div
      onClick={onContinue}
      className="h-full min-h-screen w-full bg-[#fbf8fc] text-[#1b1b1e] antialiased overflow-hidden flex flex-col justify-between items-center px-5 py-10 relative cursor-pointer selection:bg-[#2d6a4f] selection:text-white"
    >
      {/* Top Spacer */}
      <div className="flex-1"></div>

      {/* Main Branding */}
      <main className="flex flex-col items-center justify-center flex-none w-full max-w-sm mx-auto z-10 transition-all duration-700 transform animate-[fadeIn_0.8s_ease-out]">
        {/* Logo Container with pulse */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
          {/* Background pulse circle */}
          <div className="absolute inset-0 bg-[#2d6a4f] rounded-full opacity-20 loading-pulse"></div>
          <div className="absolute inset-4 bg-[#2d6a4f] rounded-full opacity-40"></div>
          {/* Logo Icon */}
          <div className="relative z-10 w-20 h-20 bg-[#0f5238] text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 active:scale-95">
            <span className="material-symbols-outlined text-[48px] text-white" style={{ fontVariationSettings: "'FILL' 0" }}>
              swap_horiz
            </span>
          </div>
        </div>

        {/* App Name */}
        <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[36px] font-bold text-[#0f5238] tracking-tight mb-2 text-center">
          SwapCircle
        </h1>

        {/* Minimal Loading Bar */}
        <div className="w-24 h-1 bg-[#e4e1e5] rounded-full mt-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-[#0f5238] rounded-full w-1/3 animate-slide"></div>
        </div>

        <p className="text-xs text-[#707973] mt-6 opacity-75">Tap anywhere to enter</p>
      </main>

      {/* Bottom Tagline & Spacer */}
      <div className="flex-1 flex flex-col justify-end items-center pb-6 w-full z-10">
        <p className="font-['Plus_Jakarta_Sans'] text-[20px] font-semibold text-[#0f5238] opacity-80 tracking-wide">
          Trade. Share. Reuse.
        </p>
      </div>

      {/* Subtle Ambient Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#95d4b3] rounded-full blur-[100px] opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#bac3ff] rounded-full blur-[100px] opacity-20 z-0 pointer-events-none"></div>
    </div>
  );
};
