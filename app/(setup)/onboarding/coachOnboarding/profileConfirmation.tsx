import { Stack, useRouter } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";

type ProfileDetail = {
    label: string;
    value: string;
};

const profileDetails: ProfileDetail[] = [
    { label: "Experience", value: "8 years" },
    { label: "Specialization", value: "Batting Techniques" },
    { label: "Preferred Age Group", value: "Senior" },
    { label: "Current City", value: "Panipat, Haryana" },
    { label: "Visibility", value: "Public" },
];

export default function ProfileConfirmation() {
    const router = useRouter();

    const handleNext = () => {

        // Navigate to the next screen or complete onboarding
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: "" }} />

            <View className="flex-1 bg-white">
                <ScrollView
                    className="flex-1 px-8 pt-4"
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View className="mb-5">
                        <Text className="text-black_1 text-2xl font-bold">
                            Your Cricket Profile is Ready!
                        </Text>
                        <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                            You're all set to join academies, track your matches, and showcase your performance.
                        </Text>
                    </View>

                    {/* Profile Card */}
                    <View
                        className="bg-white rounded-2xl border border-stroke_grey_2 px-5 py-6"

                    >
                        {/* Profile Photo & Name */}
                        <View className="flex-row items-center mb-6">
                            {/* Profile Image */}
                            <View
                                className="w-[72px] h-[72px] rounded-full border-[0px] overflow-hidden mr-4"
                            >
                                <Image
                                    source={{
                                        uri: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=200&h=200&fit=crop",
                                    }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>

                            {/* Name & Role */}
                            <View>
                                <Text className="text-black_1 text-lg font-bold">
                                    Ramesh Iyer
                                </Text>
                                <Text className="text-grey_1 text-sm font-medium">
                                    Head Coach
                                </Text>
                            </View>
                        </View>



                        {/* Details */}
                        <View className="gap-1">
                            {profileDetails.map((detail, index) => (
                                <View key={index} className="flex-row gap-2">
                                    <Text className="text-grey_1 text-sm font-bold mr-2 ">
                                        {detail.label}:
                                    </Text>
                                    <Text className="text-grey_1 text-sm font-medium flex-1 flex-shrink">
                                        {detail.value}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Next Button — pinned to bottom */}
                <View className="px-8 pb-8 pt-3 bg-white">
                    <TouchableOpacity
                        onPress={handleNext}
                        activeOpacity={0.8}
                        className="w-full py-4 rounded-xl items-center bg-primary"
                    >
                        <Text className="text-white text-base font-semibold">
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}