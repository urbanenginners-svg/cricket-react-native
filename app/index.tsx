
import { Text, View } from "react-native";

import CricketLogo from "../assets/svg/cricket_logo.svg";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-blue-600 justify-center items-center">
            <Text className="text-red-600 text-2xl">Home</Text>
            <CricketLogo width={140} height={140} />
        </View>
    );
}