
import { Text, View } from "react-native";
import { useEffect } from "react";

import CricketLogo from "../assets/svg/cricket_logo.svg";
import { router } from "expo-router";

export default function HomeScreen() {

    useEffect(() => {
        setTimeout(() => {
            router.replace("/(auth)/login");
        }, 2500);
    }, []);

    return (
        <View className="flex-1 bg-blue_dark justify-center items-center">
            <CricketLogo />
        </View>
    );
}