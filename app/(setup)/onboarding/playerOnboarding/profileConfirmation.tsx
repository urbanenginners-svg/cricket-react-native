import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function ProfileConfirmation() {
    return (
        <>
            <Stack.Screen options={{ headerTitle: "" }} />
            <View className="flex-1 bg-white px-8 pt-4">
                <View className="mb-5">
                    <Text className="text-black_1 text-2xl font-bold">
                        Your Cricket Profile is Ready!
                    </Text>
                    <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                        You’re all set to join academies, track your matches, and showcase your performance.
                    </Text>
                </View>
            </View>
        </>
    );
}