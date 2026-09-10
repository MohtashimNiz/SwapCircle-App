package com.swapcircle.app.ui.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Explore : Screen("explore")
    object Post : Screen("post")
    object Exchanges : Screen("exchanges")
    object Profile : Screen("profile")
    object Detail : Screen("detail/{listingId}") {
        fun createRoute(listingId: String) = "detail/$listingId"
    }
    object Chat : Screen("chat/{exchangeId}") {
        fun createRoute(exchangeId: String) = "chat/$exchangeId"
    }
}
