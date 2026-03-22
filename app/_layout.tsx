// app/_layout.tsx
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css"; // 👈 MUST be first import

import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAuthStore } from "@/store/authStore";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
    const hydrateFromStorage = useAuthStore((state) => state.hydrateFromStorage);
    const isHydrated = useAuthStore((state) => state.isHydrated);

    // Restore auth session from SecureStore on every app boot
    useEffect(() => {
        hydrateFromStorage();
    }, []);

    // Block rendering until token hydration is complete to prevent auth flash
    if (!isHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
