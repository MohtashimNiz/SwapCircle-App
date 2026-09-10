import React, { useState } from 'react';
import { ItemListing, UserProfile } from '../types';

interface ItemDetailScreenProps {
  item: ItemListing;
  currentUser: UserProfile;
  onBack: () => void;
  onProposeSwap: (item: ItemListing) => void;
  onRequestFreeItem: (item: ItemListing, message: string) => void;
  onOpenOwnerChat: (owner: UserProfile, item: ItemListing) => void;
}

export const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({
  item,
  currentUser,
  onBack,
  onProposeSwap,
  onRequestFreeItem,
  onOpenOwnerChat,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [freeRequestMessage, setFreeRequestMessage] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const isFree = item.listingType === 'free';
  const isMine = item.owner.id === currentUser.id;

  return (
    <div className="bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] min-h-screen flex flex-col pb-28 max-w-md mx-auto antialiased">
      {/* Top Floating Controls Over Hero Image */}
      <div className="relative w-full aspect-square bg-[#e4e1e5]">
        <img
          className="w-full h-full object-cover"
          src={item.images[activeImageIdx] || item.images[0]}
          alt={item.title}
        />
        {/* Gradients for readability */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>

        {/* Floating Top Nav */}
        <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1b1b1e] shadow-md hover:bg-white active:scale-95 transition-all"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: item.title, text: item.description, url: window.location.href });
                } else {
                  alert('Listing link copied to clipboard!');
                }
              }}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1b1b1e] shadow-md hover:bg-white active:scale-95 transition-all"
              aria-label="Share listing"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>

        {/* Listing Type Tag Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <span
            className={`text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 ${
              isFree
                ? 'bg-[#008080]'
                : item.listingType === 'barter'
                ? 'bg-[#2b4cda]'
                : 'bg-[#ff8c00]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] filled">
              {isFree ? 'volunteer_activism' : item.listingType === 'barter' ? 'swap_horiz' : 'search'}
            </span>
            <span>{item.listingType}</span>
          </span>
        </div>

        {/* Multi-image indicators if present */}
        {item.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
            {item.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeImageIdx ? 'bg-white w-5' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Details Body */}
      <main className="px-5 pt-4 space-y-4 flex-grow">
        {/* Title & Posted time */}
        <div>
          <div className="flex justify-between items-start gap-2">
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#1b1b1e] leading-snug">
              {item.title}
            </h1>
          </div>
          <p className="text-xs text-[#707973] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>Posted {item.postedAgo}</span>
            <span className="mx-1">•</span>
            <span className="material-symbols-outlined text-[15px]">location_on</span>
            <span>{item.distance}</span>
          </p>
        </div>

        {/* Owner Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#e4e1e5] shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full object-cover border border-[#bfc9c1]"
              src={item.owner.avatar}
              alt={item.owner.name}
            />
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                {item.owner.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#404943]">
                <span className="flex items-center text-[#ff8c00]">
                  <span className="material-symbols-outlined text-[14px] filled">star</span>
                  <span className="font-bold ml-0.5">{item.owner.rating}</span>
                </span>
                <span>({item.owner.swapsCount} swaps)</span>
                <span className="text-[#0f5238] font-medium flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px] filled">verified</span>
                  Verified
                </span>
              </div>
            </div>
          </div>

          {!isMine && (
            <button
              onClick={() => onOpenOwnerChat(item.owner, item)}
              className="p-2.5 rounded-full bg-[#f6f2f7] hover:bg-[#eae7eb] text-[#0f5238] transition-colors"
              aria-label="Direct message owner"
            >
              <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
            </button>
          )}
        </div>

        {/* Condition & Est Value Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-[#e4e1e5] shadow-sm">
            <span className="text-xs text-[#707973] uppercase tracking-wider font-semibold block mb-1">
              Condition
            </span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#1b1b1e]">
              <span className="material-symbols-outlined text-[#0f5238] text-[18px]">check_circle</span>
              <span>{item.condition}</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#e4e1e5] shadow-sm">
            <span className="text-xs text-[#707973] uppercase tracking-wider font-semibold block mb-1">
              {isFree ? 'Handover' : 'Est. Value'}
            </span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#1b1b1e]">
              <span className="material-symbols-outlined text-[#0f5238] text-[18px]">
                {isFree ? 'local_shipping' : 'payments'}
              </span>
              <span>{isFree ? item.handover || 'Pick up' : `$${item.estValue || '100'}`}</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-1.5">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] uppercase tracking-wider">
            About this item
          </h2>
          <p className="text-sm text-[#404943] leading-relaxed bg-white p-4 rounded-xl border border-[#e4e1e5]">
            {item.description}
          </p>
        </div>

        {/* Looking To Swap For (Barter items) */}
        {!isFree && (
          <div className="bg-[#f0edf1]/60 p-4 rounded-2xl border border-[#e4e1e5] space-y-2.5">
            <div className="flex justify-between items-center">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#2b4cda] text-[18px]">swap_horiz</span>
                <span>Looking to Swap For</span>
              </h2>
              {item.openToOffers && (
                <span className="text-[11px] bg-[#b1f0ce]/60 text-[#0e5138] px-2 py-0.5 rounded-full font-semibold">
                  Open to offers
                </span>
              )}
            </div>

            <p className="text-sm text-[#1b1b1e] font-medium bg-white p-3 rounded-xl border border-[#e4e1e5]">
              {item.wants || 'Mechanical keyboard, Audio gear, or vintage tech'}
            </p>

            {item.wantsCategories && item.wantsCategories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.wantsCategories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs bg-white text-[#404943] px-2.5 py-1 rounded-full border border-[#e4e1e5] font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Friendly Message Input for Free Items */}
        {isFree && !isMine && (
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold text-[#404943] uppercase tracking-wider">
              Add a friendly note (Optional)
            </label>
            <textarea
              className="w-full bg-white border border-[#e4e1e5] rounded-xl p-3 text-sm text-[#1b1b1e] placeholder-[#707973] focus:border-[#008080] focus:ring-1 focus:ring-[#008080] outline-none resize-none transition-all"
              placeholder="Hi! I'd love this for my home office setup. I can pick it up tomorrow afternoon!"
              rows={3}
              value={freeRequestMessage}
              onChange={(e) => setFreeRequestMessage(e.target.value)}
            />
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-4 z-40 border-t border-[#e4e1e5] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] max-w-md mx-auto right-0 flex items-center gap-3">
        {/* Heart Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all shrink-0 ${
            isFavorited
              ? 'border-red-300 bg-red-50 text-red-500'
              : 'border-[#bfc9c1] bg-white text-[#404943] hover:bg-[#f6f2f7]'
          }`}
          aria-label="Save to favorites"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Main CTA */}
        {isMine ? (
          <div className="flex-1 bg-[#f0edf1] text-[#404943] font-semibold py-4 rounded-full text-center text-sm">
            This is your active listing
          </div>
        ) : isFree ? (
          <button
            onClick={() => onRequestFreeItem(item, freeRequestMessage)}
            className="flex-1 bg-[#008080] hover:bg-[#006b63] text-white font-['Plus_Jakarta_Sans'] font-semibold text-base py-4 rounded-full shadow-[0_4px_12px_rgba(0,128,128,0.25)] active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
            <span>Request this item</span>
          </button>
        ) : (
          <button
            onClick={() => onProposeSwap(item)}
            className="flex-1 bg-[#0f5238] hover:bg-[#0e5138] text-white font-['Plus_Jakarta_Sans'] font-semibold text-base py-4 rounded-full shadow-[0_4px_12px_rgba(15,82,56,0.25)] active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
            <span>Propose a Swap</span>
          </button>
        )}
      </div>
    </div>
  );
};
