import { router, Slot, Stack, useSegments } from "expo-router";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

import BackArrow from "@/assets/icons/back_angle.svg"
import Logout from "@/assets/icons/logout.svg"

export default function SetupLayout() {
    const segments = useSegments() as string[];
    const isOnboarding = segments.includes("onboarding");

console.log(segments, ">>>>> segments in setup layout")
    const handleLogout = async () => {
        await AsyncStorage.clear();
        router.replace("/(auth)/login");
    };

    const handleBack = () => {
        if((segments.includes("(setup)") && segments.includes("selectPlayerType")) || (segments.includes("(setup)") && segments.includes("coachProfile"))){
            router.replace("/(setup)/onboarding/selectRole")
            return;
        }
        router.back();
    }


    return <Stack
        screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: "white",
            },
            headerLeft: () => (
                <Pressable
                    onPress={handleBack}
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
                        <Logout />
                    </Pressable>
                ) : null,
        }}
    >
        <Slot />
    </Stack>
}