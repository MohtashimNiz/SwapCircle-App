import React from 'react';
import { UserProfile, ItemListing } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  myListings: ItemListing[];
  onSelectItem: (item: ItemListing) => void;
  onDeleteListing: (id: string) => void;
  onOpenOnboarding: () => void;
  onOpenSplash: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  myListings,
  onSelectItem,
  onDeleteListing,
  onOpenOnboarding,
  onOpenSplash,
  onLogout,
}) => {
  return (
    <div className="bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] min-h-screen flex flex-col pb-[110px] max-w-md mx-auto antialiased">
      {/* Profile Header */}
      <header className="px-5 pt-6 pb-4 bg-white border-b border-[#e4e1e5] shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex gap-3.5 items-center">
            <div className="relative">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0f5238] shadow-sm"
                src={user.avatar}
                alt={user.name}
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#0f5238] text-white rounded-full flex items-center justify-center border-2 border-white">
                <span className="material-symbols-outlined text-[13px] filled">eco</span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#1b1b1e]">
                  {user.name}
                </h1>
                <span className="material-symbols-outlined text-[#0f5238] text-[16px] filled">
                  verified
                </span>
              </div>
              <p className="text-xs text-[#707973] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                <span>{user.location}</span>
                <span>• Member since {user.joinedDate}</span>
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-bold text-[#ff8c00] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px] filled">star</span>
                  {user.rating}
                </span>
                <span className="text-xs text-[#404943]">
                  ({user.swapsCount} swaps completed)
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 pt-4 space-y-5 flex-grow">
        {/* Eco Impact Stats */}
        <section>
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] uppercase tracking-wider mb-2.5">
            Sustainability Impact 🌱
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-white p-3 rounded-xl border border-[#e4e1e5] shadow-sm text-center">
              <span className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#0f5238] block">
                {user.itemsDiverted || 18}
              </span>
              <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold block mt-0.5">
                Items Diverted
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e4e1e5] shadow-sm text-center">
              <span className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#008080] block">
                {user.co2SavedKg || 42} kg
              </span>
              <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold block mt-0.5">
                CO₂ Avoided
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e4e1e5] shadow-sm text-center">
              <span className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#2b4cda] block">
                ${user.moneySaved || 840}
              </span>
              <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold block mt-0.5">
                Community Value
              </span>
            </div>
          </div>
        </section>

        {/* My Active Listings */}
        <section>
          <div className="flex justify-between items-center mb-2.5">
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e] uppercase tracking-wider">
              My Active Listings ({myListings.length})
            </h2>
          </div>

          <div className="space-y-2.5">
            {myListings.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl text-center border border-[#e4e1e5]">
                <p className="text-xs text-[#707973]">You have no active listings.</p>
              </div>
            ) : (
              myListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-xl border border-[#e4e1e5] shadow-sm flex items-center justify-between gap-3"
                >
                  <img
                    onClick={() => onSelectItem(item)}
                    className="w-12 h-12 rounded-lg object-cover cursor-pointer"
                    src={item.images[0]}
                    alt={item.title}
                  />

                  <div onClick={() => onSelectItem(item)} className="flex-1 min-w-0 cursor-pointer">
                    <h3 className="font-bold text-xs text-[#1b1b1e] truncate">{item.title}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.listingType === 'free'
                            ? 'bg-[#008080] text-white'
                            : 'bg-[#2b4cda] text-white'
                        }`}
                      >
                        {item.listingType}
                      </span>
                      <span className="text-[11px] text-[#707973]">{item.condition}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteListing(item.id)}
                    className="p-2 text-[#707973] hover:text-[#ba1a1a] rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Delete listing"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Community Trust Badges */}
        <section className="bg-white p-4 rounded-2xl border border-[#e4e1e5] shadow-sm space-y-3">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
            Badges & Accolades
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f6f2f7]">
              <span className="material-symbols-outlined text-2xl text-[#0f5238] filled mb-1">
                workspace_premium
              </span>
              <span className="text-[11px] font-bold text-[#1b1b1e]">Eco Leader</span>
              <span className="text-[9px] text-[#707973]">15+ items recycled</span>
            </div>

            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f6f2f7]">
              <span className="material-symbols-outlined text-2xl text-[#2b4cda] filled mb-1">
                handshake
              </span>
              <span className="text-[11px] font-bold text-[#1b1b1e]">Trusted Swapper</span>
              <span className="text-[9px] text-[#707973]">100% 5★ reviews</span>
            </div>

            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f6f2f7]">
              <span className="material-symbols-outlined text-2xl text-[#008080] filled mb-1">
                volunteer_activism
              </span>
              <span className="text-[11px] font-bold text-[#1b1b1e]">Generous Heart</span>
              <span className="text-[9px] text-[#707973]">Gifted 5+ free items</span>
            </div>
          </div>
        </section>

        {/* Quick Demo Controls */}
        <section className="bg-white p-4 rounded-2xl border border-[#e4e1e5] shadow-sm space-y-2.5">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#707973] uppercase tracking-wider">
            App Demos & Settings
          </h2>
          <div className="space-y-1.5 text-xs">
            <button
              onClick={onOpenSplash}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f6f2f7] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0f5238]">water_drop</span>
                <span className="font-medium text-[#1b1b1e]">Preview Splash Screen</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#707973]">chevron_right</span>
            </button>

            <button
              onClick={onOpenOnboarding}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f6f2f7] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0f5238]">slideshow</span>
                <span className="font-medium text-[#1b1b1e]">View 3-Step Onboarding</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#707973]">chevron_right</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span className="font-medium">Sign Out / Switch User</span>
              </div>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
