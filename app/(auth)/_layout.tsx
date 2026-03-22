import { Slot, Redirect } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";

export default function AuthLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // Already logged in — send to the app
    if (isAuthenticated) {
        return <Redirect href="/(app)" />;
    }

    return <SafeAreaView className="flex-1 bg-white">
        {/* Content */}
        <View className="flex-1 px-8 pt-12">
            <Slot />
        </View>
    </SafeAreaView>
}
