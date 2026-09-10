import React, { useState } from 'react';
import { ItemListing, ListingType, ItemCondition } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface CreateListingScreenProps {
  onCancel: () => void;
  onPostSuccess: (newListing: ItemListing) => void;
}

export const CreateListingScreen: React.FC<CreateListingScreenProps> = ({
  onCancel,
  onPostSuccess,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 Form States
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [listingType, setListingType] = useState<ListingType>('barter');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCF5SoAWNWxgyW1rZlnac6Wig0wiQVs2uLEFKi1sYY-MoBts6Gwb8W-LeLngmVeHHqza2-77mmuGoyUlrJ3tQkqnk44ui24aHJaqrYJoaWqYNi8lk83SvBojt5PkJUi966dqGMjCih0e4DxG5goKv1QpxVhJwx6ZRcEe-qvTvMDYsL_t8zfvu1Q2MN-6wU_NTscv0xuZnJNtEnZ5tMF5icSL-3n1S2iITbvz6MjwFiNQkT08NySuxQFbw'
  );

  // Sample photo options for demo convenience
  const samplePhotos = [
    {
      name: 'Camera',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF5SoAWNWxgyW1rZlnac6Wig0wiQVs2uLEFKi1sYY-MoBts6Gwb8W-LeLngmVeHHqza2-77mmuGoyUlrJ3tQkqnk44ui24aHJaqrYJoaWqYNi8lk83SvBojt5PkJUi966dqGMjCih0e4DxG5goKv1QpxVhJwx6ZRcEe-qvTvMDYsL_t8zfvu1Q2MN-6wU_NTscv0xuZnJNtEnZ5tMF5icSL-3n1S2iITbvz6MjwFiNQkT08NySuxQFbw',
    },
    {
      name: 'Keyboard',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnSYkDvHDonN0zWyE1LKNqkocWld_Hp0kfbMxNjVF9C-dt65zbSVlYbWX-6oOJbv9UJyudTr1_bobNtu9MiCIw8fBtVjc2F7JkmNk4qhAqE9URo2xdGpLlZGtywRKUjBlscu69kX2P5eFuZoneefK9WNO4qzazc0h-5S3c8EOsvRs0Rgc-z2oBI3K86S9N1Ya2cX7qvFRuIynU4tQMBezfE-3DykbXaGaQZnYm4NMjKypcb36oCa5Ezw',
    },
    {
      name: 'Books',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLjhHylop92u_kAU57WkVa2HB9LfmD9aAXeEkUrv0cUWmZN9bRp7naY1iJ6D2DDi3KY3YC7NFlCLax8S2MeUMcXdXFf-b1tLOduIvNGVfu3Y8f-I3zIvi0cBUeuqkqs5_jRRcDhRXiGV5fivGmhPW65uykkly485_vwSMUfGIOqh2MDjkHxZvwQ27TTLRWsO2jNQjKHFS-Xw74pAc_lvgcWCqLyDhWIyuc-ZBM5v4NpRAdMgOUbwVwpA',
    },
    {
      name: 'Plant',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7HopS7CQ98Cen4i0Ol29VAvrafHvLApAmGTrZitpnApAuFq24PZvNrQl3fgVnKFodVeVJYha6vvioYxIrqpT-WJiZjtazlACilQeLDdRgGi7PVLt3LvT-9arqIyBeLttA0uvo_SgvIKiTVOlWxhcTPdFILOItJmAQSiEk14q5ZpL0OFexx0-kFUzIEBwS1-rrUJ610klvUiJyGWj9EAkEKohMyhuJyyKx8sgIrsVXzZaK7q9gER7jbQ',
    },
  ];

  // Step 2 Form States
  const [specificWants, setSpecificWants] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Plants', 'Home Goods']);
  const [openToOffers, setOpenToOffers] = useState<boolean>(true);
  const [handoverPreference, setHandoverPreference] = useState('Pick up or public meetup');

  const exchangeCategoriesList = [
    { name: 'Electronics', icon: 'devices' },
    { name: 'Gaming', icon: 'sports_esports' },
    { name: 'Plants', icon: 'local_florist' },
    { name: 'Books', icon: 'book' },
    { name: 'Clothing', icon: 'checkroom' },
    { name: 'Home Goods', icon: 'home' },
    { name: 'Art & Craft', icon: 'brush' },
    { name: 'Music', icon: 'music_note' },
    { name: 'Others', icon: 'category' },
  ];

  const handleToggleCategory = (catName: string) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catName));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, catName]);
      }
    }
  };

  const handleContinueStep1 = () => {
    if (!itemName.trim()) {
      alert('Please enter an item name to continue.');
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = () => {
    const newListing: ItemListing = {
      id: `listing_${Date.now()}`,
      title: itemName || 'Vintage Road Bike',
      description:
        description ||
        'Great condition, well cared for and stored indoors. Ready to be passed to a good home.',
      category: category || 'Electronics',
      listingType: listingType,
      condition: condition,
      distance: '0.2 km away',
      distanceKm: 0.2,
      locationName: 'My Neighborhood',
      estValue: listingType === 'barter' ? 85 : 0,
      wants: listingType === 'barter' ? specificWants || 'Open to offers' : undefined,
      wantsCategories: listingType === 'barter' ? selectedCategories : undefined,
      openToOffers: openToOffers,
      handover: handoverPreference,
      postedAgo: 'Just now',
      images: [selectedPhoto],
      owner: CURRENT_USER,
    };

    onPostSuccess(newListing);
  };

  return (
    <div className="bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] min-h-screen flex flex-col pb-28 max-w-md mx-auto antialiased">
      {/* Top App Bar */}
      {step === 1 ? (
        <header className="bg-[#fbf8fc] text-[#0f5238] flex justify-between items-center w-full px-5 py-3 sticky top-0 z-40 border-b border-[#e4e1e5]">
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              aria-label="Close"
              className="p-2 rounded-full hover:bg-[#f0edf1] transition-colors text-[#404943]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="font-['Plus_Jakarta_Sans'] text-lg text-[#0f5238] font-bold">SwapCircle</div>
          <div className="w-8"></div>
        </header>
      ) : (
        <header className="flex justify-between items-center w-full px-5 py-3 bg-[#fbf8fc] shadow-sm z-40 sticky top-0 border-b border-[#e4e1e5]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(1)}
              aria-label="Go back"
              className="p-2 -ml-2 rounded-full hover:bg-[#f0edf1] transition-colors text-[#1b1b1e]"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#1b1b1e]">Create Listing</h1>
          </div>
          <span className="text-xs font-semibold text-[#404943]">Step 2 of 2</span>
        </header>
      )}

      {/* Content Container */}
      <main className="px-5 pt-4 flex-grow">
        {step === 1 ? (
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-[26px] font-bold text-[#1b1b1e] mb-4">
              What would you like to share?
            </h1>

            <div className="space-y-4">
              {/* Photos Area */}
              <section>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-[#404943] uppercase tracking-wider">
                    Photos
                  </label>
                  <span className="text-xs text-[#707973]">Click to switch sample</span>
                </div>

                <div
                  onClick={() => {
                    const nextIdx =
                      (samplePhotos.findIndex((p) => p.url === selectedPhoto) + 1) %
                      samplePhotos.length;
                    setSelectedPhoto(samplePhotos[nextIdx].url);
                  }}
                  className="w-full aspect-video border-2 border-dashed border-[#bfc9c1] rounded-2xl flex flex-col items-center justify-center bg-white hover:bg-[#f6f2f7] transition-all cursor-pointer group relative overflow-hidden shadow-sm"
                >
                  {selectedPhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        className="w-full h-full object-cover rounded-2xl"
                        src={selectedPhoto}
                        alt="Uploaded preview"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold">
                        Tap to change photo
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-[#2d6a4f] p-3.5 rounded-full mb-2.5 group-active:scale-95 transition-transform text-[#a8e7c5]">
                        <span className="material-symbols-outlined text-2xl filled">add_photo_alternate</span>
                      </div>
                      <span className="text-xs font-bold text-[#0f5238]">Upload photos</span>
                      <span className="text-xs text-[#707973] mt-0.5">Up to 5 images</span>
                    </>
                  )}
                </div>

                {/* Quick Photo Presets */}
                <div className="flex gap-2 mt-2">
                  {samplePhotos.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setSelectedPhoto(p.url)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        selectedPhoto === p.url
                          ? 'border-[#0f5238] bg-[#b1f0ce]/50 text-[#0f5238] font-bold'
                          : 'border-[#e4e1e5] bg-white text-[#404943]'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* Input Fields */}
              <section className="space-y-3.5">
                <div>
                  <label
                    className="block text-xs font-semibold text-[#404943] uppercase tracking-wider mb-1.5"
                    htmlFor="itemName"
                  >
                    Item Name
                  </label>
                  <input
                    className="w-full bg-[#F1F3F5] text-[#1b1b1e] border-0 border-b-2 border-transparent focus:border-[#0f5238] focus:ring-0 rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                    id="itemName"
                    placeholder="e.g. Vintage Road Bike"
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-[#404943] uppercase tracking-wider mb-1.5"
                    htmlFor="itemDescription"
                  >
                    Description
                  </label>
                  <textarea
                    className="w-full bg-[#F1F3F5] text-[#1b1b1e] border-0 border-b-2 border-transparent focus:border-[#0f5238] focus:ring-0 rounded-xl px-4 py-3 text-sm resize-none transition-colors outline-none"
                    id="itemDescription"
                    placeholder="Describe condition, size, or what you're looking for..."
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#404943] uppercase tracking-wider mb-1.5"
                      htmlFor="itemCategory"
                    >
                      Category
                    </label>
                    <select
                      className="w-full bg-[#F1F3F5] text-[#1b1b1e] border-0 border-b-2 border-transparent focus:border-[#0f5238] focus:ring-0 rounded-xl px-3 py-3 text-sm transition-colors outline-none"
                      id="itemCategory"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Books">Books & Media</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Plants">Plants & Garden</option>
                      <option value="Home Goods">Home Goods</option>
                      <option value="Tools">Tools</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-[#404943] uppercase tracking-wider mb-1.5"
                      htmlFor="itemCondition"
                    >
                      Condition
                    </label>
                    <select
                      className="w-full bg-[#F1F3F5] text-[#1b1b1e] border-0 border-b-2 border-transparent focus:border-[#0f5238] focus:ring-0 rounded-xl px-3 py-3 text-sm transition-colors outline-none"
                      id="itemCondition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as ItemCondition)}
                    >
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Well Loved">Well Loved</option>
                      <option value="Used">Used</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Listing Type Cards */}
              <section className="pt-1">
                <label className="block text-xs font-semibold text-[#404943] uppercase tracking-wider mb-2">
                  Listing Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {/* Barter Card */}
                  <div
                    onClick={() => setListingType('barter')}
                    className={`cursor-pointer rounded-2xl p-4 transition-all flex items-start gap-3.5 border-2 ${
                      listingType === 'barter'
                        ? 'border-[#2b4cda] bg-[#dee1ff]/60 shadow-sm'
                        : 'border-transparent bg-white ambient-shadow hover:bg-[#f6f2f7]'
                    }`}
                  >
                    <div className="bg-[#2b4cda] text-white rounded-full p-2.5 mt-0.5 shadow-sm">
                      <span className="material-symbols-outlined text-xl filled">swap_horiz</span>
                    </div>
                    <div>
                      <span className="block font-['Plus_Jakarta_Sans'] font-bold text-base text-[#1b1b1e] mb-0.5">
                        BARTER
                      </span>
                      <span className="block text-xs text-[#404943] leading-relaxed">
                        Exchange this item for something else you need from the community.
                      </span>
                    </div>
                  </div>

                  {/* Give For Free Card */}
                  <div
                    onClick={() => setListingType('free')}
                    className={`cursor-pointer rounded-2xl p-4 transition-all flex items-start gap-3.5 border-2 ${
                      listingType === 'free'
                        ? 'border-[#006b63] bg-[#70f8e8]/20 shadow-sm'
                        : 'border-transparent bg-white ambient-shadow hover:bg-[#f6f2f7]'
                    }`}
                  >
                    <div className="bg-[#006b63] text-[#66efe0] rounded-full p-2.5 mt-0.5 shadow-sm">
                      <span className="material-symbols-outlined text-xl filled">volunteer_activism</span>
                    </div>
                    <div>
                      <span className="block font-['Plus_Jakarta_Sans'] font-bold text-base text-[#1b1b1e] mb-0.5">
                        GIVE FOR FREE
                      </span>
                      <span className="block text-xs text-[#404943] leading-relaxed">
                        Offer this item to someone in the community who might need it.
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          /* Step 2 Screen */
          <div className="space-y-5">
            {/* Header Section */}
            <section className="flex flex-col gap-1">
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#0f5238] tracking-tight leading-tight">
                {listingType === 'barter'
                  ? 'What would you like in exchange?'
                  : 'Handover and Pickup Details'}
              </h2>
              <p className="text-sm text-[#404943]">
                {listingType === 'barter'
                  ? "Tell the community what you're looking for to find the perfect swap."
                  : 'Let recipients know how and where to collect this free item.'}
              </p>
            </section>

            {listingType === 'barter' ? (
              <>
                {/* Specific Item Input */}
                <section className="flex flex-col gap-1.5">
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#1b1b1e]" htmlFor="specificItem">
                    Specific Item
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#707973] text-[20px]">search</span>
                    </div>
                    <input
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F1F3F5] border-0 border-b-2 border-transparent focus:border-[#0f5238] focus:ring-0 rounded-xl text-sm text-[#1b1b1e] placeholder-[#707973]/70 transition-colors shadow-sm outline-none"
                      id="specificItem"
                      placeholder="e.g. Headphones, Vinyl Records, Plant Cuttings"
                      type="text"
                      value={specificWants}
                      onChange={(e) => setSpecificWants(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-[#707973] mt-0.5">
                    If you have a direct swap in mind, list it here.
                  </p>
                </section>

                {/* Categories Selection */}
                <section className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#1b1b1e]">
                      Or select categories
                    </h3>
                    <span className="text-xs text-[#707973]">Select up to 3</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {exchangeCategoriesList.map((cat) => {
                      const isSelected = selectedCategories.includes(cat.name);
                      return (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => handleToggleCategory(cat.name)}
                          className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 border shadow-sm ${
                            isSelected
                              ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                              : 'bg-white text-[#1b1b1e] border-[#bfc9c1] hover:bg-[#f6f2f7]'
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            {cat.icon}
                          </span>
                          <span>{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Open to Offers Toggle */}
                <section className="mt-2 bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(43,76,218,0.03)] border border-[#e4e1e5] flex items-center justify-between">
                  <div className="flex flex-col pr-4">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#1b1b1e]">
                      I'm open to other offers
                    </span>
                    <span className="text-xs text-[#404943] mt-0.5">
                      Allow users to suggest items not listed above.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenToOffers(!openToOffers)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      openToOffers ? 'bg-[#0f5238]' : 'bg-[#e4e1e5]'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        openToOffers ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </section>
              </>
            ) : (
              /* Free item pickup details */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#404943] uppercase tracking-wider mb-1.5">
                    Handover Method
                  </label>
                  <div className="space-y-2">
                    {['Pick up only', 'Porch pickup (contactless)', 'Public meetup'].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          handoverPreference === opt
                            ? 'border-[#006b63] bg-[#70f8e8]/15 font-semibold text-[#00514a]'
                            : 'border-[#e4e1e5] bg-white text-[#404943]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="handover"
                          checked={handoverPreference === opt}
                          onChange={() => setHandoverPreference(opt)}
                          className="accent-[#006b63]"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-[#b1f0ce]/30 border border-[#b1f0ce] rounded-xl p-3.5 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0f5238] filled">eco</span>
                  <p className="text-xs text-[#0e5138] leading-relaxed">
                    Thank you for gifting! Giving away items directly helps divert usable goods from landfills and fosters local community kindness.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Area */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-4 z-40 border-t border-[#e4e1e5] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] max-w-md mx-auto right-0">
        {step === 1 ? (
          <button
            onClick={handleContinueStep1}
            className="w-full bg-[#0f5238] text-white font-['Plus_Jakarta_Sans'] font-semibold text-base h-14 rounded-full flex items-center justify-center hover:opacity-95 active:scale-98 transition-all shadow-md"
            type="button"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleFinalSubmit}
            className="w-full bg-[#0f5238] text-white font-['Plus_Jakarta_Sans'] font-semibold text-base py-4 rounded-full shadow-md hover:bg-[#0e5138] active:scale-98 transition-all flex items-center justify-center gap-2"
            type="button"
          >
            <span>Post Listing</span>
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </button>
        )}
      </div>
    </div>
  );
};
