import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    Image,
} from "react-native";

import Info from "@/assets/icons/info_red.svg";
import Location from "@/assets/icons/location_grey.svg";




type Academy = {
    id: string;
    name: string;
    invitedBy: string;
    invitedRole: string;
    address: string;
    established: string;
    timings: string;
    invitationRequired: boolean;
    imageUri: string;
};

const academies: Academy[] = [
    {
        id: "1",
        name: "Vidya Jain Cricket Academy",
        invitedBy: "Naresh Jain",
        invitedRole: "Coach",
        address: "VJCA, Rohini Sector 6, Near Pitampura, New Delhi - 110085",
        established: "Established 1998",
        timings: "7:00 AM - 10:00 AM | 4:00 PM - 8:00 PM",
        invitationRequired: false,
        imageUri:
            "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=200&h=200&fit=crop",
    },
    {
        id: "2",
        name: "Vidya Jain Cricket Academy",
        invitedBy: "Naresh Jain",
        invitedRole: "Coach",
        address: "VJCA, Rohini Sector 6, Near Pitampura, New Delhi - 110085",
        established: "Established 1998",
        timings: "7:00 AM - 10:00 AM | 4:00 PM - 8:00 PM",
        invitationRequired: true,
        imageUri:
            "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=200&h=200&fit=crop",
    },
    {
        id: "3",
        name: "Vidya Jain Cricket Academy",
        invitedBy: "Naresh Jain",
        invitedRole: "Coach",
        address: "VJCA, Rohini Sector 6, Near Pitampura, New Delhi - 110085",
        established: "Established 1998",
        timings: "7:00 AM - 10:00 AM | 4:00 PM - 8:00 PM",
        invitationRequired: false,
        imageUri:
            "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=200&h=200&fit=crop",
    },
];

export default function SelectAcademy() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAcademyId, setSelectedAcademyId] = useState<string | null>(
        null
    );
    const router = useRouter();

    const filteredAcademies = academies.filter(
        (academy) =>
            academy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            academy.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            academy.invitedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
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
                            Find your cricket home. Request to join and we'll
                            confirm your spot.
                        </Text>
                    </View>

                    {/* Search Bar */}
                    <View className="mb-5">
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search by academy name, city, or coach name"
                            placeholderTextColor="#9CA3AF"
                            className="border border-gray-200 rounded-xl px-4 py-4 bg-white text-sm text-black"
                        />
                    </View>

                    {/* Academy List */}
                    <View className="gap-4">
                        {filteredAcademies.map((academy) => {
                            const isSelected =
                                selectedAcademyId === academy.id;
                            return (
                                <Pressable
                                    key={academy.id}
                                    onPress={() =>
                                        setSelectedAcademyId(academy.id)
                                    }
                                    className={`rounded-2xl border-2 px-4 py-4 ${isSelected
                                        ? "border-primary bg-white"
                                        : "border-stroke_grey_2 bg-white"
                                        }`}
                                >
                                    {/* Academy Header: Image + Name */}
                                    <View className="flex-row items-center mb-3">
                                        {/* Profile Image */}
                                        <View className="w-[52px] h-[52px] rounded-full overflow-hidden mr-3">
                                            <Image
                                                source={{
                                                    uri: academy.imageUri,
                                                }}
                                                className="w-full h-full"
                                                resizeMode="cover"
                                            />
                                        </View>

                                        {/* Name & Invited By */}
                                        <View className="flex-1">
                                            <Text className="text-black_1 text-lg font-bold mb-[5px]">
                                                {academy.name}
                                            </Text>
                                            <Text className="text-grey_1 text-xs font-medium">
                                                Invited by
                                                <Text className="text-grey_1 text-xs font-bold">
                                                    {academy.invitedBy} (
                                                    {academy.invitedRole})
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Details */}
                                    <View className="gap-[5px]">
                                        {/* Address */}
                                        <View className="flex-row items-start gap-1">
                                            <Location />
                                            <Text className="text-grey_1 text-xs font-medium flex-1">
                                                {academy.address}
                                            </Text>
                                        </View>

                                        {/* Established */}
                                        <View className="flex-row items-center gap-1">

                                            <Location />
                                            <Text className="text-grey_1 text-xs font-medium">
                                                {academy.established}
                                            </Text>
                                        </View>

                                        {/* Timings */}
                                        <View className="flex-row items-center gap-1">
                                            <Location />
                                            <Text className="text-grey_1 text-xs font-medium">
                                                {academy.timings}
                                            </Text>
                                        </View>

                                        {/* Invitation Required */}
                                        {academy.invitationRequired && (
                                            <View className="flex-row items-center mt-1 gap-1">
                                                <Info />
                                                <Text className="text-red-500 text-xs font-semibold">
                                                    Invitation Required
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Request to Join Button — pinned to bottom */}
                <View className="px-8 pb-8 pt-3 bg-white">
                    <TouchableOpacity
                        onPress={() => {
                            // Handle request to join
                            router.push("/profile");
                        }}
                        disabled={!selectedAcademyId}
                        activeOpacity={0.8}
                        className={`w-full py-4 rounded-xl items-center ${selectedAcademyId
                            ? "bg-primary"
                            : "bg-stroke_grey_1"
                            }`}
                    >
                        <Text
                            className={`text-base font-semibold ${selectedAcademyId
                                ? "text-white"
                                : "text-[#999999]"
                                }`}
                        >
                            Request to Join
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}