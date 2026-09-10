import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
  onSkip: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSkip }) => {
  const [email, setEmail] = useState('alex.green@swapcircle.org');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email || 'Alex');
  };

  return (
    <div className="bg-[#fbf8fc] min-h-screen flex flex-col font-['Inter'] text-[#1b1b1e] antialiased selection:bg-[#2d6a4f] selection:text-white relative">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-[#95d4b3]/30 to-[#4fdbcc]/20 rounded-b-[60%] blur-3xl -z-10 transform -translate-y-1/4 scale-150"></div>

      <main className="flex-grow flex flex-col justify-center px-5 py-8 relative z-10 max-w-md mx-auto w-full">
        {/* Header Section */}
        <div className="text-center space-y-3 mb-6">
          {/* App Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2d6a4f] rounded-full mb-2 shadow-[0_4px_12px_rgba(45,106,79,0.2)]">
            <span
              className="material-symbols-outlined text-[40px] text-[#a8e7c5]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              swap_horiz
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-[28px] font-bold text-[#1b1b1e]">
            Welcome back
          </h1>
          <p className="text-[15px] text-[#404943] max-w-xs mx-auto">
            Log in to continue sharing and swapping with your community.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#e4e1e5]"
        >
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1b1b1e]" htmlFor="email">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#707973] group-focus-within:text-[#0f5238] transition-colors">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </span>
              <input
                className="w-full h-[52px] pl-11 pr-4 bg-[#f6f2f7] border-b-2 border-transparent focus:border-[#0f5238] rounded-xl text-base text-[#1b1b1e] placeholder-[#707973]/60 focus:bg-[#eae7eb] focus:ring-0 transition-all outline-none"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1b1b1e]" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to demo email!')}
                className="text-xs font-medium text-[#0f5238] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#707973] group-focus-within:text-[#0f5238] transition-colors">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </span>
              <input
                className="w-full h-[52px] pl-11 pr-12 bg-[#f6f2f7] border-b-2 border-transparent focus:border-[#0f5238] rounded-xl text-base text-[#1b1b1e] placeholder-[#707973]/60 focus:bg-[#eae7eb] focus:ring-0 transition-all outline-none"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#707973] hover:text-[#1b1b1e] transition-colors"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="w-full h-[52px] flex items-center justify-center bg-[#0f5238] text-white font-['Plus_Jakarta_Sans'] font-semibold text-base rounded-full shadow-[0_4px_12px_rgba(15,82,56,0.2)] active:scale-95 transition-all hover:bg-[#0e5138]"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="w-full h-[52px] flex items-center justify-center bg-[#eae7eb] text-[#1b1b1e] font-['Plus_Jakarta_Sans'] font-semibold text-base rounded-full active:scale-95 transition-all hover:bg-[#e4e1e5]"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="text-center pt-5">
          <p className="text-xs text-[#707973] mb-3 font-medium">Or continue with</p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onSkip}
              className="w-12 h-12 rounded-full border border-[#bfc9c1] flex items-center justify-center bg-white hover:bg-[#f6f2f7] transition-all shadow-sm active:scale-95"
              aria-label="Continue with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="w-12 h-12 rounded-full border border-[#bfc9c1] flex items-center justify-center bg-white hover:bg-[#f6f2f7] transition-all shadow-sm active:scale-95"
              aria-label="Continue with GitHub"
            >
              <svg className="w-5 h-5 text-[#1b1b1e]" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={onSkip}
            className="mt-6 text-sm text-[#0f5238] font-semibold hover:underline"
          >
            Explore marketplace as guest →
          </button>
        </div>
      </main>
    </div>
  );
};
