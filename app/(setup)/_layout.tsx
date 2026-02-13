import { router, Slot, Stack, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

import BackArrow from "@/assets/icons/back_angle.svg"

export default function SetupLayout() {
    const segments = useSegments() as string[];
    const isOnboarding = segments.includes("onboarding");

    const handleLogout = async () => {
        await AsyncStorage.clear();
        router.replace("/(auth)/login");
    };

    return <Stack
        screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: "white",
            },
            headerLeft: () => (
                <Pressable
                    onPress={() => router.back()}
                    // style={{ paddingHorizontal: 12 }}
                    className="pl-[2px]"
                >
                    <BackArrow />
                </Pressable>
            ),

            // RIGHT SIDE (Logout only for onboarding)
            headerRight: () =>
                isOnboarding ? (
                    <Pressable
                        onPress={handleLogout}
                        style={{ paddingHorizontal: 12 }}
                    >
                        <Ionicons name="power-outline" size={22} color="red" />
                    </Pressable>
                ) : null,
        }}
    >
        <View className="flex-1 px-8 pt-12">
            <Slot />
        </View>
    </Stack>
}