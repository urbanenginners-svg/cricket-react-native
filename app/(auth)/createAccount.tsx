import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import AppSelect from "@/components/common/AppSelect";

export default function CricketCricketAccount() {
    const [gender, setGender] = useState("");
    return <View className="flex-1">
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

        <View className="mb-4 flex-1">
            <Text className="text-grey_1 text-xs font-medium mb-2">Gender</Text>
            <AppSelect
                options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                ]}
                value={gender}
                onChange={setGender}
            />
        </View>

    </View>
}