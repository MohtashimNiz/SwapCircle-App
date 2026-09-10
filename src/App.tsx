/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  NavTab,
  ItemListing,
  Exchange,
  ExchangeStatus,
  UserProfile,
  UserInventoryItem,
} from './types';
import {
  CURRENT_USER,
  INITIAL_LISTINGS,
  INITIAL_EXCHANGES,
  USER_INVENTORY,
} from './data/mockData';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { CreateListingScreen } from './components/CreateListingScreen';
import { ItemDetailScreen } from './components/ItemDetailScreen';
import { ProposeSwapScreen } from './components/ProposeSwapScreen';
import { PotentialMatchModal } from './components/PotentialMatchModal';
import { ExchangesScreen } from './components/ExchangesScreen';
import { MessagingScreen } from './components/MessagingScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';

type FlowScreen = 'splash' | 'onboarding' | 'login' | 'app';

export default function App() {
  const [currentFlow, setCurrentFlow] = useState<FlowScreen>('app');
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Core Data State
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [listings, setListings] = useState<ItemListing[]>(INITIAL_LISTINGS);
  const [exchanges, setExchanges] = useState<Exchange[]>(INITIAL_EXCHANGES);

  // Modal / Navigation Overlays
  const [selectedItem, setSelectedItem] = useState<ItemListing | null>(null);
  const [proposingItem, setProposingItem] = useState<ItemListing | null>(null);
  const [activeChatExchange, setActiveChatExchange] = useState<Exchange | null>(null);
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);

  // Explore Filters preset from other views
  const [exploreCategory, setExploreCategory] = useState<string | undefined>(undefined);
  const [exploreFilter, setExploreFilter] = useState<string>('all');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Handlers
  const handleNavigateExplore = (category?: string, filterType: string = 'all') => {
    setExploreCategory(category);
    setExploreFilter(filterType);
    setActiveTab('explore');
    setSelectedItem(null);
    setProposingItem(null);
  };

  const handlePostSuccess = (newListing: ItemListing) => {
    setListings((prev) => [newListing, ...prev]);
    setActiveTab('home');
    showToast(
      newListing.listingType === 'free'
        ? '🎁 Free item listed! Your community can now request it.'
        : '✨ Barter listing published! We are scanning for swap matches.'
    );
  };

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    showToast('Listing removed successfully.');
  };

  const handleProposeSwap = (targetItem: ItemListing) => {
    setProposingItem(targetItem);
  };

  const handleSubmitProposal = (offeredItem: UserInventoryItem, note: string) => {
    if (!proposingItem) return;

    const newExchange: Exchange = {
      id: `ex_${Date.now()}`,
      otherUser: proposingItem.owner,
      status: 'waiting',
      youOffer: {
        title: offeredItem.title,
        image: offeredItem.image,
        estValue: offeredItem.estValue,
      },
      theyOffer: {
        title: proposingItem.title,
        image: proposingItem.images[0],
        estValue: proposingItem.estValue,
      },
      type: 'barter',
      lastMessage: note,
      updatedAgo: 'Just now',
      note: note,
    };

    setExchanges((prev) => [newExchange, ...prev]);
    setProposingItem(null);
    setSelectedItem(null);
    setActiveTab('exchanges');
    showToast(`Swap proposal sent to ${proposingItem.owner.name}!`);
  };

  const handleRequestFreeItem = (targetItem: ItemListing, message: string) => {
    const newExchange: Exchange = {
      id: `ex_free_${Date.now()}`,
      otherUser: targetItem.owner,
      status: 'waiting',
      youOffer: {
        title: 'Free Pickup Request',
        isFree: true,
        emoji: '🎁',
      },
      theyOffer: {
        title: targetItem.title,
        image: targetItem.images[0],
        isFree: true,
      },
      type: 'free',
      lastMessage: message || 'Hi! I would love to pick up this item.',
      updatedAgo: 'Just now',
      note: message,
    };

    setExchanges((prev) => [newExchange, ...prev]);
    setSelectedItem(null);
    setActiveChatExchange(newExchange);
    showToast(`Request sent to ${targetItem.owner.name}! Opening chat.`);
  };

  const handleOpenOwnerChat = (owner: UserProfile, item: ItemListing) => {
    let existing = exchanges.find((ex) => ex.otherUser.id === owner.id);
    if (!existing) {
      existing = {
        id: `ex_chat_${Date.now()}`,
        otherUser: owner,
        status: 'waiting',
        youOffer: {
          title: 'Inquiry / Chat',
          emoji: '💬',
        },
        theyOffer: {
          title: item.title,
          image: item.images[0],
        },
        type: item.listingType,
        lastMessage: `Inquiring about ${item.title}`,
        updatedAgo: 'Just now',
        note: `Inquiring about ${item.title}`,
      };
      setExchanges((prev) => [existing!, ...prev]);
    }
    setActiveChatExchange(existing);
    setSelectedItem(null);
  };

  const handleUpdateExchangeStatus = (exchangeId: string, newStatus: ExchangeStatus) => {
    setExchanges((prev) =>
      prev.map((ex) => (ex.id === exchangeId ? { ...ex, status: newStatus } : ex))
    );
    showToast(`Exchange status updated to ${newStatus}.`);
  };

  // Unread pending exchanges badge count
  const pendingCount = exchanges.filter((e) => e.status === 'waiting').length;

  // Render Flows
  if (currentFlow === 'splash') {
    return <SplashScreen onContinue={() => setCurrentFlow('onboarding')} />;
  }

  if (currentFlow === 'onboarding') {
    return (
      <Onboarding
        onComplete={() => setCurrentFlow('login')}
        onSkip={() => setCurrentFlow('app')}
      />
    );
  }

  if (currentFlow === 'login') {
    return (
      <LoginScreen
        onLogin={() => {
          setCurrentFlow('app');
          showToast(`Welcome back, ${currentUser.name}!`);
        }}
        onSkip={() => setCurrentFlow('app')}
      />
    );
  }

  // Potential match target item & offer
  const bestTargetItem = listings.find((item) => item.matchPercentage) || listings[0];
  const userOfferItem = USER_INVENTORY[0];

  return (
    <div className="bg-[#fbf8fc] min-h-screen text-[#1b1b1e] relative selection:bg-[#2d6a4f] selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 inset-x-4 max-w-sm mx-auto z-50 animate-[slideDown_0.3s_ease-out]">
          <div className="bg-[#0f5238] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-[#a8e7c5]/30">
            <span className="material-symbols-outlined text-[18px] filled text-[#a8e7c5]">
              check_circle
            </span>
            <span className="flex-1">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Overlays / Modals */}
      {activeChatExchange ? (
        <MessagingScreen
          exchange={activeChatExchange}
          currentUser={currentUser}
          onBack={() => setActiveChatExchange(null)}
        />
      ) : proposingItem ? (
        <ProposeSwapScreen
          targetItem={proposingItem}
          currentUser={currentUser}
          onBack={() => setProposingItem(null)}
          onSubmitProposal={handleSubmitProposal}
        />
      ) : selectedItem ? (
        <ItemDetailScreen
          item={selectedItem}
          currentUser={currentUser}
          onBack={() => setSelectedItem(null)}
          onProposeSwap={handleProposeSwap}
          onRequestFreeItem={handleRequestFreeItem}
          onOpenOwnerChat={handleOpenOwnerChat}
        />
      ) : activeTab === 'post' ? (
        <CreateListingScreen
          onCancel={() => setActiveTab('home')}
          onPostSuccess={handlePostSuccess}
        />
      ) : (
        /* Main Tabs */
        <>
          {activeTab === 'home' && (
            <HomeScreen
              user={currentUser}
              listings={listings}
              onSelectItem={(item) => setSelectedItem(item)}
              onOpenMatchModal={() => setShowMatchModal(true)}
              onNavigateExplore={handleNavigateExplore}
              onOpenProfile={() => setActiveTab('profile')}
            />
          )}

          {activeTab === 'explore' && (
            <ExploreScreen
              listings={listings}
              onSelectItem={(item) => setSelectedItem(item)}
              initialCategory={exploreCategory}
              initialFilter={exploreFilter}
            />
          )}

          {activeTab === 'exchanges' && (
            <ExchangesScreen
              exchanges={exchanges}
              currentUser={currentUser}
              onOpenChat={(exchange) => setActiveChatExchange(exchange)}
              onUpdateExchangeStatus={handleUpdateExchangeStatus}
              onOpenProfile={() => setActiveTab('profile')}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              user={currentUser}
              myListings={listings.filter((item) => item.owner.id === currentUser.id)}
              onSelectItem={(item) => setSelectedItem(item)}
              onDeleteListing={handleDeleteListing}
              onOpenOnboarding={() => setCurrentFlow('onboarding')}
              onOpenSplash={() => setCurrentFlow('splash')}
              onLogout={() => setCurrentFlow('login')}
            />
          )}

          {/* Bottom Navigation */}
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedItem(null);
              setProposingItem(null);
              setActiveChatExchange(null);
            }}
            unreadExchangesCount={pendingCount}
          />
        </>
      )}

      {/* Potential Match Celebration Modal */}
      {showMatchModal && (
        <PotentialMatchModal
          targetItem={bestTargetItem}
          myOfferItem={userOfferItem}
          onClose={() => setShowMatchModal(false)}
          onProposeSwap={(item) => {
            setShowMatchModal(false);
            setProposingItem(item);
          }}
        />
      )}
    </div>
  );
}
