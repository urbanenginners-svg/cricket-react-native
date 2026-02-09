
import { Text, View } from "react-native";

import CricketLogo from "../assets/svg/cricket_logo.svg";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-blue_dark justify-center items-center">
            <CricketLogo />
        </View>
    );
}