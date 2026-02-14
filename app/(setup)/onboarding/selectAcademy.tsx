import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function SelectAcademy() {
    return (<>
        <Stack.Screen options={{ headerTitle: "" }} />

        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1 px-8 pt-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-5">
                    <Text className="text-black_1 text-2xl font-bold">
                        Find Your Cricket Academy
                    </Text>
                    <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                        Find your cricket home. Request to join and we’ll confirm your spot.
                    </Text>
                </View>


            </ScrollView>
        </View>
    </>
    );
}