import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState<number>(0);

  const slides = [
    {
      title: 'Turn what you have into what you need.',
      description: 'Join a community built on trust and sustainability. Swap your unused items for something new to you.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd-aiEfJ_FvMTJRNcKehFm7yXaDAyXRa2V6Q0Tm5lWpQSENhQ4s-ZwXfVZ4453HuYxaCSxa1GW_XtGAbdmlNzPNeIQ4cfZm_BJi21GZdapPprWNqNTnnz1JdmpUzG8Dl0ltRjA-HCG7mzjyFV8XMRN8dbl70kAO53Z_KjaWtc78X86nDBvmii9m8R7dKSLz_EnXN083Oys2YV8wVursLRYXFikX-XzbTZmt6IPvjPtQzUlfVPkCxMl9Q',
      alt: 'Two people exchanging a plant for a guitar',
      isCardComposition: false,
    },
    {
      title: 'Give things a second life.',
      description: 'Pass on items you no longer need and find joy in offering them to your local community.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARTW8j3kwncd4ZP2eUlxpy1YeBl2eXM1NcBQTeYRT0CkaIaaNW5s7DD-lPrN_eNrYCvUAn7h8HL4m2p-AeePX8s6UexXOFOpSdSLuREzNIAudx4In8L43W4_kDZk5CQHnn-rx1zhdWrcKa5GSwMusozCE5r2o6U0heG15rcuYaOs9SDuz6JziOacI7KO6xu16YczP5PjUDC-mCYrmbYO85EIDHGAw9VGclqM6-EpAwvcYkrw9uAdTp6g',
      alt: 'Two people exchanging a box of books',
      isCardComposition: false,
    },
    {
      title: 'Find your perfect swap.',
      description: "Discover items you'll love from people in your local community.",
      image: '',
      alt: 'Matched items with 98% match badge',
      isCardComposition: true,
    },
  ];

  const currentSlide = slides[step];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8fc] text-[#1b1b1e] flex flex-col antialiased max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Header Actions */}
      <header className="w-full px-5 py-6 flex justify-end items-center z-10 relative">
        <button
          onClick={onSkip}
          className="font-['Inter'] text-sm font-semibold text-[#404943] hover:text-[#0f5238] transition-colors py-2 px-4 rounded-full hover:bg-[#eae7eb] focus:outline-none"
        >
          Skip
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col justify-center px-5 pb-8 z-10 relative">
        {/* Illustration Container */}
        <div className="w-full flex-grow flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-[#b1f0ce] opacity-20 rounded-full blur-3xl transform -translate-y-8 scale-110"></div>

          {!currentSlide.isCardComposition ? (
            <div className="relative w-full max-w-[300px] aspect-square rounded-[2rem] overflow-hidden shadow-[0_8px_24px_rgba(45,106,79,0.12)] border border-[#e4e1e5] bg-white/70 backdrop-blur-sm p-4 transition-all duration-500">
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#f0edf1]">
                <img
                  className="object-cover w-full h-full absolute inset-0"
                  src={currentSlide.image}
                  alt={currentSlide.alt}
                />
              </div>
            </div>
          ) : (
            /* Slide 3: Card Composition with 98% Match badge */
            <div className="w-full max-w-[320px] aspect-square bg-[#f6f2f7] rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-4 border border-[#e4e1e5] shadow-md">
              {/* Item 1: Camera */}
              <div className="absolute left-3 top-3 w-[140px] bg-white rounded-2xl p-2 ambient-shadow transform -rotate-6 z-10 transition-transform hover:scale-105 duration-300">
                <div
                  className="w-full h-24 bg-cover bg-center rounded-xl bg-[#f0edf1]"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCF5SoAWNWxgyW1rZlnac6Wig0wiQVs2uLEFKi1sYY-MoBts6Gwb8W-LeLngmVeHHqza2-77mmuGoyUlrJ3tQkqnk44ui24aHJaqrYJoaWqYNi8lk83SvBojt5PkJUi966dqGMjCih0e4DxG5goKv1QpxVhJwx6ZRcEe-qvTvMDYsL_t8zfvu1Q2MN-6wU_NTscv0xuZnJNtEnZ5tMF5icSL-3n1S2iITbvz6MjwFiNQkT08NySuxQFbw')`,
                  }}
                ></div>
                <div className="mt-3 px-1 pb-1">
                  <div className="h-3 w-16 bg-[#e4e1e5] rounded-full mb-2"></div>
                  <div className="h-2 w-10 bg-[#e4e1e5] rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Item 2: Monstera */}
              <div className="absolute right-3 bottom-3 w-[140px] bg-white rounded-2xl p-2 ambient-shadow transform rotate-3 z-10 transition-transform hover:scale-105 duration-300">
                <div
                  className="w-full h-24 bg-cover bg-center rounded-xl bg-[#f0edf1]"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUvfN1qOGvyT1U_LjWp869iOC78oyTTVWv6onEbyUXgfs8Ghu4xum44HDLNu3sd_aD8xKyKDlEaf6kSvtP6MMoN4d36VfU70DAID1ziu9-04psFYPAe0T9eSvysOfwFTfXcA6759LL6HwTKVclOaEk0jE321ij2GsYDs6OT9E0l063XUGtzhWuOLg1vtZKEofc_-x1rlow4sSlpN_vzqZtnSKoATeAiahDxywLQMU6Pv90Q7NFToYH6Q')`,
                  }}
                ></div>
                <div className="mt-3 px-1 pb-1">
                  <div className="h-3 w-20 bg-[#e4e1e5] rounded-full mb-2"></div>
                  <div className="h-2 w-12 bg-[#e4e1e5] rounded-full opacity-60"></div>
                </div>
              </div>

              {/* 98% Match Connector Badge */}
              <div className="absolute z-20 bg-[#0f5238] text-white font-['Inter'] text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 transform scale-105 border-2 border-white">
                <span className="material-symbols-outlined text-[16px] text-white filled">favorite</span>
                <span>98% Match</span>
              </div>
            </div>
          )}
        </div>

        {/* Typography & Story */}
        <div className="text-center px-4">
          <h1 className="font-['Plus_Jakarta_Sans'] text-[26px] md:text-[28px] font-bold text-[#1b1b1e] mb-3 tracking-tight leading-tight">
            {currentSlide.title}
          </h1>
          <p className="font-['Inter'] text-[15px] leading-relaxed text-[#404943] max-w-sm mx-auto">
            {currentSlide.description}
          </p>
        </div>
      </main>

      {/* Footer / Navigation */}
      <footer className="w-full px-5 py-6 flex justify-between items-center z-10 relative bg-[#fbf8fc]">
        {/* Progress Indicators */}
        <div className="flex space-x-2 items-center pl-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              step === 0 ? 'w-8 bg-[#0f5238]' : 'w-2 bg-[#e4e1e5]'
            }`}
          ></div>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              step === 1 ? 'w-8 bg-[#0f5238]' : 'w-2 bg-[#e4e1e5]'
            }`}
          ></div>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              step === 2 ? 'w-8 bg-[#0f5238]' : 'w-2 bg-[#e4e1e5]'
            }`}
          ></div>
        </div>

        {/* Next Action */}
        <button
          onClick={handleNext}
          className="bg-[#0f5238] hover:bg-[#0e5138] text-white font-['Inter'] font-semibold text-sm px-6 py-3.5 rounded-full flex items-center gap-2 shadow-[0_4px_12px_rgba(15,82,56,0.2)] active:scale-95 transition-all min-h-[50px]"
        >
          <span>{step === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};
