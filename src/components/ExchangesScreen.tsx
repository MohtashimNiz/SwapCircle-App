import React, { useState } from 'react';
import { Exchange, ExchangeStatus, UserProfile } from '../types';

interface ExchangesScreenProps {
  exchanges: Exchange[];
  currentUser: UserProfile;
  onOpenChat: (exchange: Exchange) => void;
  onUpdateExchangeStatus: (exchangeId: string, newStatus: ExchangeStatus) => void;
  onOpenProfile: () => void;
}

export const ExchangesScreen: React.FC<ExchangesScreenProps> = ({
  exchanges,
  currentUser,
  onOpenChat,
  onUpdateExchangeStatus,
  onOpenProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'requests' | 'offers' | 'completed'>('active');

  // Tab filtering
  const filteredExchanges = exchanges.filter((ex) => {
    if (activeTab === 'active') {
      return ex.status === 'accepted' || ex.status === 'waiting';
    }
    if (activeTab === 'requests') {
      return ex.status === 'waiting';
    }
    if (activeTab === 'offers') {
      return ex.status === 'accepted';
    }
    if (activeTab === 'completed') {
      return ex.status === 'completed' || ex.status === 'declined';
    }
    return true;
  });

  const getStatusBadge = (status: ExchangeStatus) => {
    switch (status) {
      case 'accepted':
        return {
          label: 'Accepted',
          className: 'bg-[#b1f0ce] text-[#0e5138] border border-[#0f5238]/20',
          icon: 'check_circle',
        };
      case 'waiting':
        return {
          label: 'Waiting',
          className: 'bg-[#ffdea8] text-[#784400] border border-[#ffdea8]',
          icon: 'hourglass_empty',
        };
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-[#dee1ff] text-[#2b4cda] border border-[#dee1ff]',
          icon: 'task_alt',
        };
      case 'declined':
        return {
          label: 'Declined',
          className: 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6]',
          icon: 'cancel',
        };
    }
  };

  return (
    <div className="bg-[#fbf8fc] text-[#1b1b1e] font-['Inter'] min-h-screen flex flex-col pb-[110px] max-w-md mx-auto antialiased">
      {/* Top Header */}
      <header className="px-5 pt-4 pb-2 bg-[#fbf8fc] sticky top-0 z-20 border-b border-[#e4e1e5]/60 flex items-center justify-between">
        <button
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-full overflow-hidden border border-[#bfc9c1] hover:opacity-90 active:scale-95 transition-all"
        >
          <img
            className="w-full h-full object-cover"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </button>

        <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#0f5238]">
          SwapCircle
        </span>

        <div className="w-10 h-10 flex items-center justify-center text-[#404943] hover:text-[#1b1b1e]">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </div>
      </header>

      {/* Main Title & Search */}
      <main className="px-5 pt-4 flex-grow space-y-4">
        <div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#1b1b1e]">
            My Exchanges
          </h1>
          <p className="text-xs text-[#404943] mt-0.5">
            Manage your active barter agreements and free gifting requests
          </p>
        </div>

        {/* Status Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'active', label: 'Active' },
            { id: 'requests', label: 'Requests' },
            { id: 'offers', label: 'Offers' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#2d6a4f] text-[#a8e7c5] shadow-sm'
                    : 'bg-[#f0edf1] text-[#404943] hover:bg-[#eae7eb]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Exchanges List */}
        <div className="space-y-3.5 pt-1">
          {filteredExchanges.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-2xl p-6 border border-[#e4e1e5]">
              <span className="material-symbols-outlined text-4xl text-[#707973] mb-2">swap_horiz</span>
              <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#1b1b1e]">No {activeTab} exchanges</h3>
              <p className="text-xs text-[#707973] mt-1 max-w-xs mx-auto">
                Explore items in the community to propose a swap or give an item away for free.
              </p>
            </div>
          ) : (
            filteredExchanges.map((exchange) => {
              const badge = getStatusBadge(exchange.status);
              const otherUser = exchange.otherUser;

              return (
                <div
                  key={exchange.id}
                  className="bg-white rounded-2xl p-4 border border-[#e4e1e5] shadow-[0_4px_12px_rgba(0,0,0,0.03)] space-y-3 transition-all hover:border-[#0f5238]/30"
                >
                  {/* Top Bar: User & Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {otherUser.avatar ? (
                        <img
                          className="w-9 h-9 rounded-full object-cover border border-[#bfc9c1]"
                          src={otherUser.avatar}
                          alt={otherUser.name}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#f0edf1] text-[#0f5238] font-bold flex items-center justify-center text-xs">
                          {otherUser.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#1b1b1e]">
                          {otherUser.name}
                        </h4>
                        <span className="text-[11px] text-[#707973] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {exchange.updatedAgo}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${badge.className}`}
                    >
                      <span className="material-symbols-outlined text-[13px]">{badge.icon}</span>
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {/* Items Visual Row */}
                  <div className="bg-[#f6f2f7] p-3 rounded-xl flex items-center justify-between gap-3">
                    {/* Item 1: You Offer */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {exchange.youOffer.image ? (
                        <img
                          className="w-11 h-11 rounded-lg object-cover border border-[#e4e1e5] bg-white shrink-0"
                          src={exchange.youOffer.image}
                          alt={exchange.youOffer.title}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg bg-white border border-[#e4e1e5] flex items-center justify-center text-lg shrink-0">
                          {exchange.youOffer.emoji || '🎁'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1b1b1e] truncate">
                          {exchange.youOffer.title}
                        </p>
                        <span className="text-[10px] text-[#707973] uppercase font-semibold">
                          You Offer
                        </span>
                      </div>
                    </div>

                    {/* Swap or Gift Icon */}
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0f5238] shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-[18px]">
                        {exchange.type === 'barter' ? 'swap_horiz' : 'volunteer_activism'}
                      </span>
                    </div>

                    {/* Item 2: They Offer */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {exchange.theyOffer.image ? (
                        <img
                          className="w-11 h-11 rounded-lg object-cover border border-[#e4e1e5] bg-white shrink-0"
                          src={exchange.theyOffer.image}
                          alt={exchange.theyOffer.title}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-lg bg-white border border-[#e4e1e5] flex items-center justify-center text-lg shrink-0">
                          {exchange.theyOffer.emoji || '📦'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1b1b1e] truncate">
                          {exchange.theyOffer.title}
                        </p>
                        <span className="text-[10px] text-[#707973] uppercase font-semibold">
                          {exchange.theyOffer.isFree ? 'Free Gift' : 'They Offer'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Last Message if any */}
                  {exchange.lastMessage && (
                    <p className="text-xs text-[#404943] bg-white p-2.5 rounded-lg border border-[#e4e1e5] italic">
                      "{exchange.lastMessage}"
                    </p>
                  )}

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenChat(exchange)}
                      className="flex-1 bg-[#0f5238] hover:bg-[#0e5138] text-white font-['Plus_Jakarta_Sans'] font-semibold text-xs py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>Message</span>
                    </button>

                    {exchange.status === 'waiting' && (
                      <>
                        <button
                          onClick={() => onUpdateExchangeStatus(exchange.id, 'accepted')}
                          className="bg-[#b1f0ce] text-[#0e5138] hover:bg-[#a0ebc2] font-semibold text-xs py-2.5 px-3 rounded-full flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-[15px]">check</span>
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => onUpdateExchangeStatus(exchange.id, 'declined')}
                          className="bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffc8c2] font-semibold text-xs py-2.5 px-3 rounded-full flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-[15px]">close</span>
                          <span>Decline</span>
                        </button>
                      </>
                    )}

                    {exchange.status === 'accepted' && (
                      <button
                        onClick={() => onUpdateExchangeStatus(exchange.id, 'completed')}
                        className="bg-[#dee1ff] text-[#2b4cda] hover:bg-[#cdd3ff] font-semibold text-xs py-2.5 px-3 rounded-full flex items-center gap-1 active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-[15px]">task_alt</span>
                        <span>Complete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};
