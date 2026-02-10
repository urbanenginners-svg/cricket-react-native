import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
    return <SafeAreaView className="flex-1 bg-white">
        {/* Content */}
        <View className="flex-1 px-8 pt-12">
            <Slot />
        </View>
    </SafeAreaView>
}
