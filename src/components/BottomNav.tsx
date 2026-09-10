import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadExchangesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadExchangesCount = 1,
}) => {
  return (
    <nav className="bg-[#fbf8fc] border-t border-[#e4e1e5] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-3 pb-4 pt-2 rounded-t-2xl max-w-md mx-auto right-0">
      {/* Home */}
      <button
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'home'
            ? 'bg-[#2d6a4f] text-[#a8e7c5] rounded-full px-3.5 py-1 shadow-sm'
            : 'text-[#404943] hover:text-[#0f5238] p-2'
        }`}
      >
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
        >
          home
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Home</span>
      </button>

      {/* Explore */}
      <button
        onClick={() => onTabChange('explore')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'explore'
            ? 'bg-[#2d6a4f] text-[#a8e7c5] rounded-full px-3.5 py-1 shadow-sm'
            : 'text-[#404943] hover:text-[#0f5238] p-2'
        }`}
      >
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: activeTab === 'explore' ? "'FILL' 1" : "'FILL' 0" }}
        >
          explore
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Explore</span>
      </button>

      {/* FAB for Post */}
      <div className="relative -top-5 flex flex-col items-center justify-center cursor-pointer group">
        <button
          onClick={() => onTabChange('post')}
          className="w-14 h-14 bg-[#0f5238] rounded-full flex items-center justify-center text-white shadow-[0_6px_18px_rgba(15,82,56,0.35)] group-hover:scale-95 group-active:scale-90 transition-transform duration-200 border-2 border-white"
          aria-label="Post an item for barter or free"
        >
          <span className="material-symbols-outlined text-[32px]">add</span>
        </button>
        <span className={`text-[11px] font-semibold mt-1 ${activeTab === 'post' ? 'text-[#0f5238]' : 'text-[#404943]'}`}>
          Post
        </span>
      </div>

      {/* Exchanges */}
      <button
        onClick={() => onTabChange('exchanges')}
        className={`flex flex-col items-center justify-center relative transition-all ${
          activeTab === 'exchanges'
            ? 'bg-[#2d6a4f] text-[#a8e7c5] rounded-full px-3.5 py-1 shadow-sm'
            : 'text-[#404943] hover:text-[#0f5238] p-2'
        }`}
      >
        <div className="relative">
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'exchanges' ? "'FILL' 1" : "'FILL' 0" }}
          >
            swap_horiz
          </span>
          {unreadExchangesCount > 0 && activeTab !== 'exchanges' && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#2b4cda] rounded-full ring-2 ring-white"></span>
          )}
        </div>
        <span className="text-[11px] font-semibold mt-0.5">Exchanges</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'profile'
            ? 'bg-[#2d6a4f] text-[#a8e7c5] rounded-full px-3.5 py-1 shadow-sm'
            : 'text-[#404943] hover:text-[#0f5238] p-2'
        }`}
      >
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
        >
          person
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
