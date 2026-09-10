package com.swapcircle.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddAPhoto
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.swapcircle.app.model.ListingType
import com.swapcircle.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateListingScreen(
    onListingCreated: () -> Unit
) {
    var listingType by remember { mutableStateOf(ListingType.BARTER) }
    var title by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("Others") }
    var condition by remember { mutableStateOf("Like New") }
    var wants by remember { mutableStateOf("") }
    var estValue by remember { mutableStateOf("") }
    var isSubmitting by remember { mutableStateOf(false) }

    val categories = listOf("Plants", "Home Goods", "Electronics", "Clothing", "Books", "Tools", "Others")
    val conditions = listOf("Like New", "Good", "Fair", "Used")

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .padding(horizontal = 20.dp),
        contentPadding = PaddingValues(top = 20.dp, bottom = 100.dp)
    ) {
        item {
            Text(
                text = "Post an Item",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = TextPrimary
            )
            Text(
                text = "Give items a second life in your neighborhood.",
                fontSize = 13.sp,
                color = TextMuted
            )
            Spacer(modifier = Modifier.height(20.dp))
        }

        // Toggle: Barter vs Giveaway
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(BorderLight.copy(alpha = 0.5f))
                    .padding(4.dp)
            ) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (listingType == ListingType.BARTER) ForestGreen else Color.Transparent)
                        .clickable { listingType = ListingType.BARTER }
                        .padding(vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "Barter / Trade",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (listingType == ListingType.BARTER) Color.White else TextPrimary
                    )
                }

                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (listingType == ListingType.FREE) ForestGreen else Color.Transparent)
                        .clickable { listingType = ListingType.FREE }
                        .padding(vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "100% Free Giveaway",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (listingType == ListingType.FREE) Color.White else TextPrimary
                    )
                }
            }
            Spacer(modifier = Modifier.height(20.dp))
        }

        // Photo Upload Box
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(140.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .border(1.dp, ForestGreen.copy(alpha = 0.4f), RoundedCornerShape(12.dp))
                    .background(MintSoft.copy(alpha = 0.25f))
                    .clickable { /* Select photo */ },
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.AddAPhoto,
                        contentDescription = "Upload Photos",
                        tint = ForestGreen,
                        modifier = Modifier.size(36.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Tap to add photos",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = ForestGreen
                    )
                    Text(
                        text = "JPEG or PNG up to 10MB",
                        fontSize = 11.sp,
                        color = TextMuted
                    )
                }
            }
            Spacer(modifier = Modifier.height(20.dp))
        }

        // Title Input
        item {
            Text(
                text = "Item Title",
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = title,
                onValueChange = { title = it },
                placeholder = { Text("e.g. Handmade Ceramic Planters") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(10.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = ForestGreen,
                    unfocusedBorderColor = BorderLight
                )
            )
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Category Selector (including "Others")
        item {
            Text(
                text = "Category",
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            Spacer(modifier = Modifier.height(6.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                categories.take(4).forEach { cat ->
                    val isSel = selectedCategory == cat
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (isSel) MintSoft else SurfaceWhite)
                            .border(1.dp, if (isSel) ForestGreen else BorderLight, RoundedCornerShape(8.dp))
                            .clickable { selectedCategory = cat }
                            .padding(vertical = 8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = cat,
                            fontSize = 11.sp,
                            fontWeight = if (isSel) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSel) ForestGreen else TextPrimary
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.height(6.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                categories.drop(4).forEach { cat ->
                    val isSel = selectedCategory == cat
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (isSel) MintSoft else SurfaceWhite)
                            .border(1.dp, if (isSel) ForestGreen else BorderLight, RoundedCornerShape(8.dp))
                            .clickable { selectedCategory = cat }
                            .padding(vertical = 8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = cat,
                            fontSize = 11.sp,
                            fontWeight = if (isSel) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSel) ForestGreen else TextPrimary
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Description
        item {
            Text(
                text = "Description & Condition",
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            Spacer(modifier = Modifier.height(6.dp))
            OutlinedTextField(
                value = description,
                onValueChange = { description = it },
                placeholder = { Text("Details on history, dimensions, reason for swapping...") },
                modifier = Modifier.fillMaxWidth().height(100.dp),
                shape = RoundedCornerShape(10.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = ForestGreen,
                    unfocusedBorderColor = BorderLight
                )
            )
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Wants (if Barter)
        if (listingType == ListingType.BARTER) {
            item {
                Text(
                    text = "What would you like in return?",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary
                )
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = wants,
                    onValueChange = { wants = it },
                    placeholder = { Text("e.g. Coffee grinder, art supplies, or kitchen tools") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = ForestGreen,
                        unfocusedBorderColor = BorderLight
                    )
                )
                Spacer(modifier = Modifier.height(16.dp))
            }
        }

        // Publish Button
        item {
            Spacer(modifier = Modifier.height(10.dp))
            Button(
                onClick = {
                    isSubmitting = true
                    onListingCreated()
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(containerColor = ForestGreen),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = if (listingType == ListingType.BARTER) "Publish Barter Listing" else "Publish Free Giveaway",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            }
        }
    }
}
