// app/_layout.tsx
import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { COLORS } from "../constants/theme";
import "react-native-url-polyfill/auto";

export default function Layout() {
  useAuth(); // initialize auth subscription

  const router = useRouter();
  const segments = useSegments(); // current route segments
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    // Only run logic once loading is complete
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup) {
      // User is not logged in AND is not in the auth group -> Redirect to login
      router.replace("/auth/login");
    } else if (user && inAuthGroup) {
      // User is logged in AND is trying to access an auth route -> Redirect to home
      router.replace("/home");
    }
    // NOTE: The condition below is what addresses the "email not verified" flicker.
    // If the user state is updated (e.g., after successful login) but the email
    // is not verified, the user will still be logged in, and this logic will
    // correctly transition them away from the auth screen. The verification check
    // is then handled within the `login.tsx` component.
  }, [user, loading, segments, router]); // Added router to dependency array (best practice)

  if (loading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.background,
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
