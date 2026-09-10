import React, { useState } from 'react';
import { ItemListing, ListingType } from '../types';

interface ExploreScreenProps {
  listings: ItemListing[];
  onSelectItem: (item: ItemListing) => void;
  initialFilter?: string;
  initialCategory?: string;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  listings,
  onSelectItem,
  initialFilter = 'all',
  initialCategory,
}) => {
  const [filterType, setFilterType] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [sortBy, setSortBy] = useState<'closest' | 'newest'>('closest');

  // Filter listings
  const filtered = listings.filter((item) => {
    // Type filter
    if (filterType !== 'all' && item.listingType !== filterType) return false;

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    // Distance filter
    if (item.distanceKm > maxDistance) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'closest') return a.distanceKm - b.distanceKm;
    return 0; // default initial order
  });

  const categories = ['all', 'Electronics', 'Books', 'Clothing', 'Plants', 'Home Goods', 'Tools', 'Others'];

  return (
    <div className="min-h-screen relative pb-[110px] flex flex-col max-w-md mx-auto bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] antialiased">
      {/* Search & Filter Header */}
      <header className="px-5 pt-4 pb-3 bg-[#fbf8fc] sticky top-0 z-20 border-b border-[#e4e1e5]">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707973]">
              search
            </span>
            <input
              className="w-full bg-[#F1F3F5] border-none rounded-xl py-3 pl-10 pr-4 text-sm text-[#1b1b1e] placeholder:text-[#707973] focus:ring-2 focus:ring-[#0f5238] focus:bg-white transition-colors outline-none"
              placeholder="Search for items..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707973] hover:text-[#1b1b1e]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
              showFilterDrawer || maxDistance < 10 || selectedCategory !== 'all'
                ? 'bg-[#0f5238] text-white'
                : 'bg-[#f0edf1] text-[#1b1b1e] hover:bg-[#eae7eb]'
            }`}
            aria-label="Toggle filters"
          >
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto gap-2 mt-3 no-scrollbar py-1">
          <button
            onClick={() => setFilterType('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
              filterType === 'all'
                ? 'bg-[#0f5238] text-white shadow-sm'
                : 'bg-[#f0edf1] text-[#404943] hover:bg-[#eae7eb]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('barter')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
              filterType === 'barter'
                ? 'bg-[#2b4cda] text-white shadow-sm'
                : 'bg-[#f0edf1] text-[#404943] hover:bg-[#eae7eb]'
            }`}
          >
            Barter
          </button>
          <button
            onClick={() => setFilterType('free')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
              filterType === 'free'
                ? 'bg-[#008080] text-white shadow-sm'
                : 'bg-[#f0edf1] text-[#404943] hover:bg-[#eae7eb]'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setFilterType('wanted')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
              filterType === 'wanted'
                ? 'bg-[#ff8c00] text-white shadow-sm'
                : 'bg-[#f0edf1] text-[#404943] hover:bg-[#eae7eb]'
            }`}
          >
            Wanted
          </button>
        </div>

        {/* Extended Filter Panel */}
        {showFilterDrawer && (
          <div className="mt-3 pt-3 border-t border-[#e4e1e5] space-y-3 animate-[fadeIn_0.2s_ease-out]">
            {/* Category filter */}
            <div>
              <span className="text-xs font-semibold text-[#707973] uppercase tracking-wider block mb-1.5">
                Category
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#2d6a4f] text-[#a8e7c5]'
                        : 'bg-[#f6f2f7] text-[#404943] hover:bg-[#eae7eb]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#404943] mb-1 font-medium">
                <span>Maximum Distance</span>
                <span className="text-[#0f5238] font-bold">Within {maxDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-[#0f5238]"
              />
            </div>

            {/* Sort options */}
            <div className="flex justify-between items-center pt-1 text-xs">
              <span className="text-[#707973]">Sort by:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('closest')}
                  className={`px-2.5 py-1 rounded-md ${
                    sortBy === 'closest' ? 'bg-[#0f5238] text-white' : 'bg-[#f0edf1] text-[#404943]'
                  }`}
                >
                  Closest
                </button>
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-2.5 py-1 rounded-md ${
                    sortBy === 'newest' ? 'bg-[#0f5238] text-white' : 'bg-[#f0edf1] text-[#404943]'
                  }`}
                >
                  Newest
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Grid Content */}
      <main className="flex-1 px-5 py-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs text-[#707973] font-medium">
            Showing {sorted.length} {sorted.length === 1 ? 'item' : 'items'}
          </p>
          {(filterType !== 'all' || selectedCategory !== 'all' || maxDistance < 10) && (
            <button
              onClick={() => {
                setFilterType('all');
                setSelectedCategory('all');
                setMaxDistance(25);
              }}
              className="text-xs text-[#0f5238] font-semibold hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl p-6 border border-[#e4e1e5]">
            <span className="material-symbols-outlined text-4xl text-[#707973] mb-2">swap_calls</span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#1b1b1e]">No items found</h3>
            <p className="text-xs text-[#707973] mt-1 max-w-xs mx-auto">
              No items match your active filters. Try expanding your search distance or removing category limits.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {sorted.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-white rounded-xl soft-shadow card-interaction overflow-hidden flex flex-col cursor-pointer border border-[#e4e1e5]"
              >
                <div className="relative aspect-square bg-[#e4e1e5]">
                  <img
                    className="w-full h-full object-cover"
                    src={item.images[0]}
                    alt={item.title}
                  />
                  <div
                    className={`absolute top-2 left-2 text-white px-2 py-0.5 rounded font-['Inter'] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${
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

                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#1b1b1e] truncate mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#404943] line-clamp-2 leading-relaxed">
                      {item.listingType === 'wanted' && item.wants
                        ? `Wants: ${item.wants}`
                        : item.description}
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1 text-[#707973] text-xs">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                    <span>{item.distance}</span>
                    <span className="mx-0.5">•</span>
                    <span>{item.condition}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
