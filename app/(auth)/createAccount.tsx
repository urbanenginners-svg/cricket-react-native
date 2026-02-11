import { Pressable, Text, TextInput, View } from "react-native";

export default function CricketCricketAccount() {
    return <View>
        <View className="mb-5">
            <Text className="text-black_1 text-2xl font-bold">Create Your Cricket Account</Text>
            <Text className="text-grey_1 text-xs font-medium pt-[10px]">Join your academy or set up your own. Whether you’re a player or a coach. Your journey begins here.</Text>
        </View>

        <View className="mb-4">
            <Text className="text-grey_1 text-xs font-medium mb-2">Full Name</Text>
            <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                className="bg-white shadow-sm border border-stroke_grey_1 rounded-lg px-4 py-3 text-black"
            />
        </View>

        <View className="mb-4">
            <Text className="text-grey_1 text-xs font-medium mb-2">Gender</Text>

        </View>

    </View>
}