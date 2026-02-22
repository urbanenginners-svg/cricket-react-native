import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

import BackArrow from "@/assets/icons/back_angle.svg";

export default function ProfileScreensLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: "white",
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#1A1C1E",
                },
                headerLeft: () => (
                    <Pressable
                        onPress={() => router.back()}
                        className="pl-[2px]"
                    >
                        <BackArrow />
                    </Pressable>
                ),
            }}
        >
            <Stack.Screen
                name="updateProfile"
                options={{ headerTitle: "Personal Details" }}
            />
            <Stack.Screen
                name="playerCricketProfile"
                options={{ headerTitle: "My Cricket Profile" }}
            />
            <Stack.Screen
                name="coachCricketProfile"
                options={{ headerTitle: "My Cricket Profile" }}
            />
            <Stack.Screen
                name="notifications"
                options={{ headerTitle: "Notifications" }}
            />
        </Stack>
    );
}
