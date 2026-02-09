import { Text, View } from "react-native";

import CricketLogo from "../assets/svg/cricket_logo.svg";


export default function HomeScreen() {
    return (
        <View className="">
            <CricketLogo width={140} height={140} />
            <Text>Home</Text>
        </View>
    );
}