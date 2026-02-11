// app/_layout.tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css"; // 👈 MUST be first import

import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
