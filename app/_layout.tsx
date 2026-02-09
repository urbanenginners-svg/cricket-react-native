// app/_layout.tsx
import "../global.css"; // 👈 MUST be first import

import { Stack } from "expo-router";

export default function RootLayout() {
    return <Stack screenOptions={{ headerShown: false }} />;
}
