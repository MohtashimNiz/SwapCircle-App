package com.swapcircle.app.model

enum class ListingType(val label: String) {
    BARTER("For Barter"),
    FREE("Giveaway / Free"),
    WANTED("Wanted")
}

enum class ItemCondition(val label: String) {
    LIKE_NEW("Like New"),
    GOOD("Good"),
    FAIR("Fair"),
    USED("Used"),
    WELL_LOVED("Well Loved")
}

data class UserProfile(
    val id: String,
    val name: String,
    val avatar: String,
    val rating: Double,
    val swapsCount: Int,
    val location: String,
    val ecoScore: Int = 94,
    val itemsDiverted: Int = 18,
    val co2SavedKg: Int = 42,
    val moneySaved: Int = 840,
    val joinedDate: String = "2023"
)

data class LookingForItem(
    val title: String,
    val subtitle: String,
    val iconName: String = "sports_esports"
)

data class ItemListing(
    val id: String,
    val title: String,
    val description: String,
    val category: String, // Electronics, Books, Clothing, Plants, Home Goods, Tools, Others
    val listingType: ListingType,
    val condition: ItemCondition,
    val distance: String,
    val distanceKm: Double,
    val locationName: String,
    val estValue: Int? = null,
    val wants: String? = null,
    val wantsCategories: List<String> = emptyList(),
    val lookingForItems: List<LookingForItem> = emptyList(),
    val handover: String = "Pick up or meetup",
    val postedAgo: String,
    val images: List<String>,
    val owner: UserProfile,
    val matchPercentage: Int? = null
)

enum class ExchangeStatus(val label: String) {
    WAITING("Waiting"),
    ACCEPTED("Accepted"),
    COMPLETED("Completed"),
    DECLINED("Declined")
}

data class OfferItem(
    val title: String,
    val subtitle: String? = null,
    val image: String? = null,
    val isFree: Boolean = false,
    val estValue: Int? = null
)

data class Exchange(
    val id: String,
    val otherUser: UserProfile,
    val status: ExchangeStatus,
    val youOffer: OfferItem,
    val theyOffer: OfferItem,
    val type: ListingType,
    val lastMessage: String? = null,
    val updatedAgo: String = "Just now",
    val note: String? = null
)

data class ChatMessage(
    val id: String,
    val senderId: String, // "me" or other
    val text: String,
    val time: String,
    val image: String? = null,
    val isFromMe: Boolean = false
)

data class UserInventoryItem(
    val id: String,
    val title: String,
    val subtitle: String,
    val image: String,
    val estValue: Int
)
