import React from 'react';
import { ItemListing, UserInventoryItem } from '../types';

interface PotentialMatchModalProps {
  onClose: () => void;
  onProposeSwap: (targetItem: ItemListing) => void;
  targetItem: ItemListing;
  myOfferItem: UserInventoryItem;
}

export const PotentialMatchModal: React.FC<PotentialMatchModalProps> = ({
  onClose,
  onProposeSwap,
  targetItem,
  myOfferItem,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#fbf8fc] text-[#1b1b1e] w-full max-w-sm rounded-[28px] overflow-hidden shadow-2xl border border-white/40 p-5 space-y-4 relative animate-[scaleUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#707973] hover:text-[#1b1b1e] transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Top Celebration */}
        <div className="text-center pt-2 space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#b1f0ce] text-[#0f5238] rounded-full mb-1">
            <span className="material-symbols-outlined text-2xl filled">auto_awesome</span>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#1b1b1e]">
            We found a potential swap!
          </h2>
          <p className="text-xs text-[#404943] max-w-[260px] mx-auto leading-relaxed">
            Based on what you have and what you're looking for, this is an exceptional trade match.
          </p>
        </div>

        {/* Glowing Match Badge */}
        <div className="flex justify-center">
          <span className="bg-[#0f5238] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_16px_rgba(15,82,56,0.4)] flex items-center gap-1.5 match-glow">
            <span className="material-symbols-outlined text-[16px] filled text-[#a8e7c5]">
              favorite
            </span>
            <span>94% Swap Compatibility</span>
          </span>
        </div>

        {/* 2-Item Visualizer */}
        <div className="bg-white rounded-2xl p-3 border border-[#e4e1e5] shadow-sm flex items-center justify-between gap-2">
          {/* You Have */}
          <div className="flex-1 flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#707973] mb-1">
              You Have
            </span>
            <img
              className="w-16 h-16 rounded-xl object-cover border border-[#e4e1e5] mb-1.5"
              src={myOfferItem.image}
              alt={myOfferItem.title}
            />
            <p className="text-xs font-bold text-[#1b1b1e] truncate w-full">
              {myOfferItem.title}
            </p>
          </div>

          {/* Swap arrows */}
          <div className="w-9 h-9 rounded-full bg-[#0f5238] text-white flex items-center justify-center shadow-md shrink-0">
            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
          </div>

          {/* They Have */}
          <div className="flex-1 flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#707973] mb-1">
              They Have
            </span>
            <img
              className="w-16 h-16 rounded-xl object-cover border border-[#e4e1e5] mb-1.5"
              src={targetItem.images[0]}
              alt={targetItem.title}
            />
            <p className="text-xs font-bold text-[#1b1b1e] truncate w-full">
              {targetItem.title}
            </p>
          </div>
        </div>

        {/* Match Breakdown Checklist */}
        <div className="space-y-2 bg-[#f6f2f7] p-3.5 rounded-xl text-xs text-[#404943]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0f5238] text-[16px] filled">check_circle</span>
            <span>You have something they want ({myOfferItem.title})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0f5238] text-[16px] filled">check_circle</span>
            <span>They have something you want ({targetItem.category})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0f5238] text-[16px] filled">check_circle</span>
            <span>Close distance ({targetItem.distance})</span>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-[#e4e1e5]">
          <div className="flex items-center gap-2.5">
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={targetItem.owner.avatar}
              alt={targetItem.owner.name}
            />
            <div>
              <p className="text-xs font-bold text-[#1b1b1e]">{targetItem.owner.name}</p>
              <p className="text-[11px] text-[#707973] flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] filled text-[#ff8c00]">star</span>
                <span>{targetItem.owner.rating} ({targetItem.owner.swapsCount} swaps)</span>
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-[#0f5238]">{targetItem.distance}</span>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onProposeSwap(targetItem);
            }}
            className="w-full bg-[#0f5238] hover:bg-[#0e5138] text-white font-['Plus_Jakarta_Sans'] font-semibold text-sm py-3.5 rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Propose Swap</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={onClose}
            className="w-full text-xs font-semibold text-[#707973] hover:text-[#1b1b1e] py-1.5 text-center transition-colors"
          >
            Keep Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
