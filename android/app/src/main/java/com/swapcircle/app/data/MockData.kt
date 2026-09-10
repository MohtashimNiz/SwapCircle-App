package com.swapcircle.app.data

import com.swapcircle.app.model.*

object MockData {
    val currentUser = UserProfile(
        id = "user_me",
        name = "Alex Green",
        avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        rating = 4.9,
        swapsCount = 14,
        location = "Mission District, SF",
        ecoScore = 94,
        itemsDiverted = 18,
        co2SavedKg = 42,
        moneySaved = 840,
        joinedDate = "Member since Mar 2023"
    )

    val sarahUser = UserProfile(
        id = "user_sarah_m",
        name = "Sarah Miller",
        avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        rating = 4.9,
        swapsCount = 28,
        location = "Mission District",
        ecoScore = 96
    )

    val davidUser = UserProfile(
        id = "user_david_r",
        name = "David R.",
        avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating = 5.0,
        swapsCount = 42,
        location = "Hayes Valley",
        ecoScore = 99
    )

    val mayaUser = UserProfile(
        id = "user_maya_k",
        name = "Maya K.",
        avatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        rating = 5.0,
        swapsCount = 19,
        location = "East Village",
        ecoScore = 95
    )

    val listings = listOf(
        ItemListing(
            id = "listing_monstera",
            title = "Healthy Monstera Deliciosa (3ft)",
            description = "Rooted in organic soil with terra cotta pot included. Gorgeous fenestrations on upper leaves. Looking to swap for kitchen herbs, ceramic planters, or vintage kitchenware!",
            category = "Plants",
            listingType = ListingType.BARTER,
            condition = ItemCondition.LIKE_NEW,
            distance = "0.8 km away",
            distanceKm = 0.8,
            locationName = "Mission District",
            estValue = 35,
            wants = "Kitchen herbs or pottery",
            wantsCategories = listOf("Plants", "Home Goods", "Others"),
            postedAgo = "Posted 2 hours ago",
            images = listOf("https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80"),
            owner = sarahUser,
            matchPercentage = 95
        ),
        ItemListing(
            id = "listing_pourover",
            title = "Ceramic Pour-Over & Glass Server",
            description = "Hario V60 style ceramic dripper plus 600ml heatproof glass decanter. Excellent condition, only used a handful of times.",
            category = "Home Goods",
            listingType = ListingType.BARTER,
            condition = ItemCondition.GOOD,
            distance = "1.2 km away",
            distanceKm = 1.2,
            locationName = "Hayes Valley",
            estValue = 28,
            wants = "French press or coffee grinder",
            wantsCategories = listOf("Home Goods", "Others"),
            postedAgo = "Posted 4 hours ago",
            images = listOf("https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80"),
            owner = davidUser,
            matchPercentage = 88
        ),
        ItemListing(
            id = "listing_dracaena_free",
            title = "Dracaena Marginata Cutting (Rooted)",
            description = "Giving away to a good plant home! Ready to plant in fresh soil, about 14 inches tall with active roots in water.",
            category = "Plants",
            listingType = ListingType.FREE,
            condition = ItemCondition.LIKE_NEW,
            distance = "0.4 km away",
            distanceKm = 0.4,
            locationName = "Mission District",
            postedAgo = "Posted 30 mins ago",
            images = listOf("https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80"),
            owner = sarahUser
        ),
        ItemListing(
            id = "listing_acoustic_craft",
            title = "Handmade Ceramic Planters & Stand",
            description = "Set of 2 handcrafted speckled ceramic planters with a custom bamboo floor stand. Never used, made at local pottery workshop. Looking to swap for kitchenware or give away to plant lovers!",
            category = "Others",
            listingType = ListingType.BARTER,
            condition = ItemCondition.LIKE_NEW,
            distance = "1.5 km away",
            distanceKm = 1.5,
            locationName = "East Village",
            estValue = 40,
            wants = "Coffee grinder or kitchen supplies",
            wantsCategories = listOf("Others", "Home Goods"),
            postedAgo = "Posted 3 hours ago",
            images = listOf("https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80"),
            owner = mayaUser
        )
    )

    val userInventory = listOf(
        UserInventoryItem("my_1", "Fujifilm Instax Mini 9", "Mint condition with pastel case", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300", 65),
        UserInventoryItem("my_2", "Le Creuset Mini Cocotte Set", "Cerise Red, 3-piece set", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=300", 50),
        UserInventoryItem("my_3", "Vintage Stanley Thermos 1L", "Classic hammertone green finish", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300", 35)
    )

    val exchanges = listOf(
        Exchange(
            id = "ex_1",
            otherUser = sarahUser,
            status = ExchangeStatus.WAITING,
            youOffer = OfferItem("Vintage Stanley Thermos 1L", "$35 estimated value", estValue = 35),
            theyOffer = OfferItem("Healthy Monstera Deliciosa", "$35 estimated value", estValue = 35),
            type = ListingType.BARTER,
            lastMessage = "Hey Alex! Would love to meet by the park cafe tomorrow?",
            updatedAgo = "10 mins ago"
        ),
        Exchange(
            id = "ex_2",
            otherUser = davidUser,
            status = ExchangeStatus.ACCEPTED,
            youOffer = OfferItem("Fujifilm Instax Mini 9", "$65 estimated value", estValue = 65),
            theyOffer = OfferItem("Ceramic Pour-Over & Glass Server", "$28 estimated value", estValue = 28),
            type = ListingType.BARTER,
            lastMessage = "Deal confirmed! Pick up scheduled for Saturday 2 PM.",
            updatedAgo = "2 hours ago"
        )
    )

    val sampleChatMessages = listOf(
        ChatMessage("m1", "user_sarah_m", "Hi Alex! Thanks for offering the Stanley Thermos. It looks in great shape!", "10:14 AM"),
        ChatMessage("m2", "me", "Hey Sarah! Yes, it keeps drinks piping hot for 24 hours. Does the Monstera come with the saucer?", "10:18 AM", isFromMe = true),
        ChatMessage("m3", "user_sarah_m", "Yes it does, matching terracotta saucer included! Are you free to swap near Dolores Park tomorrow around 3 PM?", "10:22 AM"),
        ChatMessage("m4", "me", "Perfect! See you by the north playground bench at 3 PM.", "10:25 AM", isFromMe = true)
    )
}
