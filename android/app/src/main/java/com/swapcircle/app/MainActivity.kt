package com.swapcircle.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.swapcircle.app.ui.navigation.Screen
import com.swapcircle.app.ui.screens.*
import com.swapcircle.app.ui.theme.ForestGreen
import com.swapcircle.app.ui.theme.SwapCircleTheme

data class BottomNavItem(
    val title: String,
    val route: String,
    val icon: ImageVector
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SwapCircleTheme {
                MainApp()
            }
        }
    }
}

@Composable
fun MainApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val bottomNavItems = listOf(
        BottomNavItem("Home", Screen.Home.route, Icons.Default.Home),
        BottomNavItem("Explore", Screen.Explore.route, Icons.Default.Explore),
        BottomNavItem("Post", Screen.Post.route, Icons.Default.AddCircleOutline),
        BottomNavItem("Exchanges", Screen.Exchanges.route, Icons.Default.SwapHoriz),
        BottomNavItem("Profile", Screen.Profile.route, Icons.Default.Person)
    )

    val showBottomBar = currentRoute in bottomNavItems.map { it.route }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface,
                    tonalElevation = 6.dp
                ) {
                    bottomNavItems.forEach { item ->
                        val isSelected = currentRoute == item.route
                        NavigationBarItem(
                            selected = isSelected,
                            onClick = {
                                navController.navigate(item.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            icon = {
                                Icon(
                                    imageVector = item.icon,
                                    contentDescription = item.title,
                                    modifier = Modifier.size(24.dp)
                                )
                            },
                            label = { Text(item.title) },
                            colors = NavigationBarItemDefaults.colors(
                                selectedIconColor = ForestGreen,
                                selectedTextColor = ForestGreen,
                                indicatorColor = ForestGreen.copy(alpha = 0.15f)
                            )
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    onListingClick = { listingId ->
                        navController.navigate(Screen.Detail.createRoute(listingId))
                    },
                    onExploreClick = {
                        navController.navigate(Screen.Explore.route)
                    }
                )
            }

            composable(Screen.Explore.route) {
                ExploreScreen(
                    onListingClick = { listingId ->
                        navController.navigate(Screen.Detail.createRoute(listingId))
                    }
                )
            }

            composable(Screen.Post.route) {
                CreateListingScreen(
                    onListingCreated = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Home.route) { inclusive = true }
                        }
                    }
                )
            }

            composable(Screen.Exchanges.route) {
                ExchangesScreen(
                    onOpenChat = { exchangeId ->
                        navController.navigate(Screen.Chat.createRoute(exchangeId))
                    }
                )
            }

            composable(Screen.Profile.route) {
                ProfileScreen()
            }

            composable(
                route = Screen.Detail.route,
                arguments = listOf(navArgument("listingId") { type = NavType.StringType })
            ) { backStackEntry ->
                val listingId = backStackEntry.arguments?.getString("listingId") ?: ""
                ItemDetailScreen(
                    listingId = listingId,
                    onBack = { navController.popBackStack() },
                    onStartExchange = { id ->
                        navController.navigate(Screen.Chat.createRoute("ex_1"))
                    }
                )
            }

            composable(
                route = Screen.Chat.route,
                arguments = listOf(navArgument("exchangeId") { type = NavType.StringType })
            ) { backStackEntry ->
                val exchangeId = backStackEntry.arguments?.getString("exchangeId") ?: ""
                MessagingScreen(
                    exchangeId = exchangeId,
                    onBack = { navController.popBackStack() }
                )
            }
        }
    }
}
