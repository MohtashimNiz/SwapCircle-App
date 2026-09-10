import React, { useState } from 'react';
import { ItemListing, UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  listings: ItemListing[];
  onSelectItem: (item: ItemListing) => void;
  onOpenMatchModal: () => void;
  onNavigateExplore: (category?: string, filterType?: string) => void;
  onOpenProfile: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  listings,
  onSelectItem,
  onOpenMatchModal,
  onNavigateExplore,
  onOpenProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Electronics', icon: 'devices' },
    { name: 'Books', icon: 'menu_book' },
    { name: 'Clothing', icon: 'styler' },
    { name: 'Tools', icon: 'home_repair_service' },
    { name: 'Gaming', icon: 'sports_esports' },
    { name: 'Others', icon: 'category' },
  ];

  // Best match item
  const bestMatch = listings.find((item) => item.matchPercentage) || listings[0];

  // Nearby items (excluding free items)
  const nearbyItems = listings.filter((item) => item.listingType !== 'free').slice(0, 4);

  // Free items
  const freeItems = listings.filter((item) => item.listingType === 'free');

  // Filtered if searching
  const isSearching = searchQuery.trim().length > 0;
  const filteredListings = listings.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] min-h-screen flex flex-col pb-[110px] antialiased max-w-md mx-auto">
      {/* Header Section */}
      <header className="px-5 pt-6 pb-3 sticky top-0 bg-[#fbf8fc]/90 backdrop-blur-md z-30 border-b border-[#e4e1e5]/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-[#404943]">Good morning,</p>
            <h1 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#1b1b1e] flex items-center gap-1.5">
              <span>{user.name}</span>
              <span>👋</span>
            </h1>
          </div>
          <button
            onClick={onOpenProfile}
            className="w-12 h-12 rounded-full overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-2 border-white focus:outline-none ring-2 ring-[#0f5238]/20 transition-transform active:scale-95"
            aria-label="View user profile"
          >
            <img
              className="w-full h-full object-cover"
              src={user.avatar}
              alt="Alex profile avatar"
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707973] pointer-events-none">
            search
          </span>
          <input
            className="w-full bg-[#F1F3F5] text-[#1b1b1e] placeholder:text-[#707973] text-sm rounded-xl pl-12 pr-10 py-3.5 border-none focus:ring-2 focus:ring-[#0f5238] focus:bg-white transition-all shadow-inner outline-none"
            placeholder="Search for something..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707973] hover:text-[#1b1b1e] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </header>

      {/* If searching, show live filtered results */}
      {isSearching ? (
        <main className="px-5 py-4 flex-grow">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#1b1b1e]">
              Search Results ({filteredListings.length})
            </h2>
            <button
              onClick={() => onNavigateExplore()}
              className="text-xs font-semibold text-[#0f5238] hover:underline"
            >
              Open in Explore
            </button>
          </div>
          {filteredListings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl p-6 border border-[#e4e1e5]">
              <span className="material-symbols-outlined text-4xl text-[#707973] mb-2">search_off</span>
              <p className="font-medium text-[#1b1b1e]">No items matched "{searchQuery}"</p>
              <p className="text-xs text-[#707973] mt-1">Try another keyword or post what you're looking for!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(15,82,56,0.05)] active:scale-[0.98] transition-transform cursor-pointer border border-[#e4e1e5]"
                >
                  <div className="relative aspect-square">
                    <img className="w-full h-full object-cover" src={item.images[0]} alt={item.title} />
                    <div
                      className={`absolute top-2 left-2 text-white text-[11px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 ${
                        item.listingType === 'barter'
                          ? 'bg-[#2b4cda]'
                          : item.listingType === 'free'
                          ? 'bg-[#008080]'
                          : 'bg-[#ff8c00]'
                      }`}
                    >
                      {item.listingType}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-[#1b1b1e] truncate">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-xs text-[#707973]">
                      <span>{item.distance}</span>
                      <span>{item.condition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      ) : (
        <main className="flex-grow flex flex-col gap-6 pt-2">
          {/* Categories */}
          <section className="pl-5 py-1">
            <div className="flex gap-3.5 overflow-x-auto pr-5 no-scrollbar snap-x">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCategory(null);
                      } else {
                        setSelectedCategory(cat.name);
                        onNavigateExplore(cat.name);
                      }
                    }}
                    className="flex flex-col items-center gap-1.5 min-w-[70px] snap-start shrink-0 cursor-pointer group focus:outline-none"
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#e4e1e5]/60 ${
                        isSelected
                          ? 'bg-[#2d6a4f] text-[#a8e7c5]'
                          : 'bg-[#f6f2f7] text-[#1b1b1e] group-hover:bg-[#2d6a4f] group-hover:text-[#a8e7c5]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                    </div>
                    <span className="font-['Inter'] text-xs font-medium text-[#404943]">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Best Matches */}
          <section className="px-5">
            <div className="flex justify-between items-center mb-2.5">
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1b1b1e] flex items-center gap-1.5">
                <span>✨ Best matches for you</span>
              </h2>
              <button
                onClick={onOpenMatchModal}
                className="text-xs font-semibold text-[#0f5238] bg-[#b1f0ce]/40 px-2.5 py-1 rounded-full hover:bg-[#b1f0ce] transition-colors"
              >
                Match Radar
              </button>
            </div>
            <div
              onClick={() => onSelectItem(bestMatch)}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(15,82,56,0.08)] flex active:scale-[0.98] transition-transform cursor-pointer border border-[#e4e1e5] hover:border-[#0f5238]/40"
            >
              <img
                className="w-1/3 object-cover min-h-[110px]"
                src={bestMatch.images[0]}
                alt={bestMatch.title}
              />
              <div className="p-3.5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#1b1b1e]">
                    {bestMatch.title}
                  </h3>
                  <p className="text-xs text-[#404943] mt-0.5">
                    Wants: <span className="font-medium text-[#0f5238]">{bestMatch.wants || 'Headphones'}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="bg-[#2d6a4f]/15 text-[#0f5238] font-['Inter'] text-xs font-bold px-2 py-0.5 rounded-md">
                    {bestMatch.matchPercentage || 92}% Match
                  </span>
                  <span className="text-xs text-[#707973] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                    {bestMatch.distance}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Nearby items Grid */}
          <section className="px-5">
            <div className="flex justify-between items-end mb-2.5">
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1b1b1e]">
                Nearby items
              </h2>
              <button
                onClick={() => onNavigateExplore()}
                className="text-xs font-semibold text-[#0f5238] hover:underline"
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {nearbyItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(15,82,56,0.06)] active:scale-[0.98] transition-transform cursor-pointer border border-[#e4e1e5]"
                >
                  <div className="relative aspect-square">
                    <img className="w-full h-full object-cover" src={item.images[0]} alt={item.title} />
                    <div
                      className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-sm ${
                        item.listingType === 'barter' ? 'bg-[#2b4cda]' : 'bg-[#ff8c00]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {item.listingType === 'barter' ? 'sync' : 'search'}
                      </span>
                      <span>{item.listingType}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-['Inter'] text-sm font-semibold text-[#1b1b1e] truncate">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center mt-2 text-xs text-[#707973]">
                      <span>{item.distance}</span>
                      <span>{item.condition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Free Near You */}
          <section className="px-5 pb-6">
            <div className="flex justify-between items-center mb-2.5">
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1b1b1e] flex items-center gap-1.5">
                <span>🎁 Free near you</span>
              </h2>
              <button
                onClick={() => onNavigateExplore(undefined, 'free')}
                className="text-xs font-semibold text-[#0f5238] hover:underline"
              >
                View all free
              </button>
            </div>
            <div className="flex gap-3.5 overflow-x-auto pb-2 no-scrollbar snap-x">
              {freeItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="min-w-[170px] max-w-[190px] bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(15,82,56,0.06)] snap-start active:scale-[0.98] transition-transform cursor-pointer border border-[#e4e1e5] shrink-0"
                >
                  <div className="relative h-32">
                    <img className="w-full h-full object-cover" src={item.images[0]} alt={item.title} />
                    <div className="absolute top-2 left-2 bg-[#008080] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      FREE
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-['Inter'] text-sm font-semibold text-[#1b1b1e] truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#707973] mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      {item.distance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
};
