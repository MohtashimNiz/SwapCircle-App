export type ListingType = 'barter' | 'free' | 'wanted';

export type ItemCondition = 'Like New' | 'Good' | 'Fair' | 'Used' | 'Well Loved';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  swapsCount: number;
  location: string;
  ecoScore?: number;
  itemsDiverted?: number;
  co2SavedKg?: number;
  moneySaved?: number;
  joinedDate?: string;
}

export interface LookingForItem {
  title: string;
  subtitle: string;
  icon: string;
}

export interface ItemListing {
  id: string;
  title: string;
  description: string;
  category: string;
  listingType: ListingType;
  condition: ItemCondition;
  distance: string;
  distanceKm: number;
  locationName: string;
  estValue?: number;
  wants?: string;
  wantsCategories?: string[];
  lookingForItems?: LookingForItem[];
  handover?: string;
  postedAgo: string;
  images: string[];
  owner: UserProfile;
  matchPercentage?: number;
  openToOffers?: boolean;
}

export type ExchangeStatus = 'accepted' | 'waiting' | 'declined' | 'completed';

export interface ExchangeOfferItem {
  title: string;
  icon?: string;
  emoji?: string;
  image?: string;
  isFree?: boolean;
  estValue?: number;
}

export interface Exchange {
  id: string;
  otherUser: UserProfile;
  status: ExchangeStatus;
  youOffer: ExchangeOfferItem;
  theyOffer: ExchangeOfferItem;
  type: ListingType;
  lastMessage?: string;
  updatedAgo: string;
  note?: string;
}

export interface ChatMessage {
  id: string;
  senderId: 'me' | 'other' | string;
  text: string;
  time?: string;
  timestamp?: string;
  image?: string;
  status?: 'sent' | 'delivered' | 'read';
  exchangeId?: string;
}

export interface UserInventoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: string;
  estValue: number;
}

export type NavTab = 'home' | 'explore' | 'post' | 'exchanges' | 'profile';
