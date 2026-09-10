import React, { useState } from 'react';
import { ItemListing, UserProfile, UserInventoryItem } from '../types';
import { USER_INVENTORY } from '../data/mockData';

interface ProposeSwapScreenProps {
  targetItem: ItemListing;
  currentUser: UserProfile;
  onBack: () => void;
  onSubmitProposal: (offeredItem: UserInventoryItem, note: string) => void;
}

export const ProposeSwapScreen: React.FC<ProposeSwapScreenProps> = ({
  targetItem,
  currentUser,
  onBack,
  onSubmitProposal,
}) => {
  const [selectedOfferItem, setSelectedOfferItem] = useState<UserInventoryItem>(
    USER_INVENTORY[0]
  );
  const [note, setNote] = useState(
    "Hey! I'd love to swap my controller for your item. It's in mint condition with all original accessories."
  );
  const [showItemPicker, setShowItemPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProposal(selectedOfferItem, note);
  };

  return (
    <div className="bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] min-h-screen flex flex-col pb-28 max-w-md mx-auto antialiased">
      {/* Top Header */}
      <header className="px-5 py-3.5 bg-[#fbf8fc] sticky top-0 z-30 border-b border-[#e4e1e5] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-[#f0edf1] transition-colors text-[#1b1b1e]"
            aria-label="Back"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1b1b1e]">
            Propose a Swap
          </h1>
        </div>
        <span className="text-xs text-[#0f5238] font-bold bg-[#b1f0ce]/40 px-2.5 py-1 rounded-full">
          Fair Trade
        </span>
      </header>

      <main className="px-5 pt-4 flex-grow space-y-4">
        {/* You Receive Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#e4e1e5] shadow-sm relative">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707973] block mb-2">
            You Receive
          </span>
          <div className="flex gap-3.5 items-center">
            <img
              className="w-16 h-16 rounded-xl object-cover border border-[#e4e1e5] bg-[#f0edf1]"
              src={targetItem.images[0]}
              alt={targetItem.title}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] truncate">
                {targetItem.title}
              </h3>
              <p className="text-xs text-[#404943] mt-0.5">
                From <span className="font-semibold text-[#0f5238]">{targetItem.owner.name}</span>
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#707973]">
                <span>{targetItem.condition}</span>
                {targetItem.estValue && <span>• Est. ${targetItem.estValue}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Swap Divider */}
        <div className="flex items-center justify-center -my-2 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#0f5238] text-white flex items-center justify-center shadow-md border-2 border-[#fbf8fc]">
            <span className="material-symbols-outlined text-[20px]">swap_vert</span>
          </div>
        </div>

        {/* You Offer Card */}
        <div className="bg-white rounded-2xl p-4 border-2 border-[#0f5238]/30 shadow-sm relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f5238]">
              You Offer
            </span>
            <button
              type="button"
              onClick={() => setShowItemPicker(!showItemPicker)}
              className="text-xs font-semibold text-[#0f5238] hover:underline flex items-center gap-0.5"
            >
              <span>Switch Item</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
          </div>

          <div className="flex gap-3.5 items-center">
            <img
              className="w-16 h-16 rounded-xl object-cover border border-[#e4e1e5] bg-[#f0edf1]"
              src={selectedOfferItem.image}
              alt={selectedOfferItem.title}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] truncate">
                {selectedOfferItem.title}
              </h3>
              <p className="text-xs text-[#404943] mt-0.5">{selectedOfferItem.subtitle}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#707973]">
                <span>Like New</span>
                {selectedOfferItem.estValue && <span>• Est. ${selectedOfferItem.estValue}</span>}
              </div>
            </div>
          </div>

          {/* Quick Item Picker Dropdown */}
          {showItemPicker && (
            <div className="mt-3 pt-3 border-t border-[#e4e1e5] space-y-2">
              <span className="text-xs text-[#707973] font-medium block">
                Choose which item to offer:
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {USER_INVENTORY.map((invItem) => (
                  <div
                    key={invItem.id}
                    onClick={() => {
                      setSelectedOfferItem(invItem);
                      setShowItemPicker(false);
                    }}
                    className={`p-2 rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors ${
                      selectedOfferItem.id === invItem.id
                        ? 'bg-[#b1f0ce]/40 border border-[#0f5238]'
                        : 'hover:bg-[#f6f2f7] border border-transparent'
                    }`}
                  >
                    <img
                      className="w-10 h-10 rounded-lg object-cover"
                      src={invItem.image}
                      alt={invItem.title}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1b1b1e] truncate">{invItem.title}</p>
                      <p className="text-[11px] text-[#707973]">Est. ${invItem.estValue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Note to Receiver */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#404943] uppercase tracking-wider">
            Add a note to {targetItem.owner.name} (Optional)
          </label>
          <textarea
            className="w-full bg-white border border-[#e4e1e5] rounded-xl p-3.5 text-sm text-[#1b1b1e] placeholder-[#707973] focus:border-[#0f5238] focus:ring-1 focus:ring-[#0f5238] outline-none resize-none transition-all shadow-sm"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Introduce yourself and share meeting preferences..."
          />
        </div>

        {/* Safety Tip */}
        <div className="bg-[#b1f0ce]/20 border border-[#b1f0ce] rounded-xl p-3.5 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[#0f5238] text-[20px] mt-0.5 filled">
            verified_user
          </span>
          <div className="text-xs text-[#0e5138] leading-relaxed">
            <span className="font-bold block">Safe Swapping Guarantee</span>
            Communicate through SwapCircle messenger. Always arrange item handovers in visible, public daylight spots.
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-4 z-40 border-t border-[#e4e1e5] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] max-w-md mx-auto right-0">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#0f5238] hover:bg-[#0e5138] text-white font-['Plus_Jakarta_Sans'] font-semibold text-base py-4 rounded-full shadow-[0_4px_12px_rgba(15,82,56,0.25)] active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Send Swap Proposal</span>
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </div>
    </div>
  );
};
