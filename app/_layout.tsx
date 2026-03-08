// app/_layout.tsx
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css"; // 👈 MUST be first import

import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout() {
    const hydrateFromStorage = useAuthStore((state) => state.hydrateFromStorage);

    // Restore auth session from SecureStore on every app boot
    useEffect(() => {
        hydrateFromStorage();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
