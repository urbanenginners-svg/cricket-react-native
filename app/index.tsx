
import { View } from "react-native";
import { useEffect } from "react";

import CricketLogo from "../assets/svg/cricket_logo.svg";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { RoleEnum } from "@/types/enums/roleEnum";

export default function HomeScreen() {
    const { isAuthenticated, user } = useAuthStore((state) => state);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                console.log(user, ">>>>> user in home screen");
                if (user && user.isOnboardingCompleted) {
                    router.replace("/(app)");
                } else {
                    if (user && user.roles && user.roles.length > 0) {
                        if (user.roles.some(role => role.name === RoleEnum.PLAYER)) {
                            router.replace("/(setup)/onboarding/playerOnboarding/selectPlayerType");
                        } else if (user.roles.some(role => role.name === RoleEnum.COACH)) {
                            router.replace("/(setup)/onboarding/coachOnboarding/coachProfile");
                        } else {
                            router.replace("/(setup)/onboarding/selectRole");
                        }
                    } else {
                        router.replace("/(setup)/onboarding/selectRole");
                    }
                }
            } else {
                router.replace("/(auth)/login");
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    return (
        <View className="flex-1 bg-blue_dark justify-center items-center">
            <CricketLogo />
        </View>
    );
}