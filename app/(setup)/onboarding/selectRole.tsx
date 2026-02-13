import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function SelectRole() {
    return (
        <>
            <Stack.Screen options={{ headerTitle: "" }} />

            <View className="flex-1 bg-white px-8 pt-4">
                <View className="mb-5">
                    <Text className="text-black_1 text-2xl font-bold">
                        Select How You’ll Use the App
                    </Text>
                    <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                        Choose your role to unlock the features designed for players, coaches, and academies.
                    </Text>
                </View>
            </View>
        </>
    )
}