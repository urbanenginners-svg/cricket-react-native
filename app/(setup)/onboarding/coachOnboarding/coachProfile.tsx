import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import AppSelect from "@/components/common/AppSelect";

const coachingRoleOptions = [
    { label: "Head Coach", value: "head_coach" },
    { label: "Assistant Coach", value: "assistant_coach" },
    { label: "Batting Coach", value: "batting_coach" },
    { label: "Bowling Coach", value: "bowling_coach" },
    { label: "Fielding Coach", value: "fielding_coach" },
    { label: "Fitness Coach", value: "fitness_coach" },
];

const specializationOptions = [
    { label: "Batting Technique", value: "batting_technique" },
    { label: "Bowling Technique", value: "bowling_technique" },
    { label: "Fielding & Catching", value: "fielding_catching" },
    { label: "Wicketkeeping", value: "wicketkeeping" },
    { label: "Fitness & Conditioning", value: "fitness_conditioning" },
    { label: "Mental Coaching", value: "mental_coaching" },
];

const ageGroupOptions = [
    { label: "Junior (Under 13)", value: "junior" },
    { label: "Youth (Under 16)", value: "youth" },
    { label: "Sub-Junior (Under 19)", value: "sub_junior" },
    { label: "Senior", value: "senior" },
    { label: "All Age Groups", value: "all" },
];

const cityOptions = [
    { label: "Panipat, Haryana", value: "panipat_haryana" },
    { label: "Delhi, Delhi", value: "delhi_delhi" },
    { label: "Mumbai, Maharashtra", value: "mumbai_maharashtra" },
    { label: "Bangalore, Karnataka", value: "bangalore_karnataka" },
    { label: "Chennai, Tamil Nadu", value: "chennai_tamilnadu" },
    { label: "Kolkata, West Bengal", value: "kolkata_westbengal" },
    { label: "Hyderabad, Telangana", value: "hyderabad_telangana" },
];

const visibilityOptions = [
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
    { label: "Academy Only", value: "academy_only" },
];

export default function CoachProfile() {
    const router = useRouter();

    const [coachingRole, setCoachingRole] = useState<string | undefined>();
    const [experience, setExperience] = useState("");
    const [certifications, setCertifications] = useState("");
    const [specialization, setSpecialization] = useState<string | undefined>();
    const [ageGroup, setAgeGroup] = useState<string | undefined>();
    const [city, setCity] = useState<string | undefined>();
    const [visibility, setVisibility] = useState<string | undefined>();

    const isFormValid =
        !!coachingRole &&
        experience.trim().length > 0 &&
        certifications.trim().length > 0 &&
        !!specialization &&
        !!ageGroup &&
        !!city &&
        !!visibility;

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
                            Build Your Coach Profile
                        </Text>
                        <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                            Completing your profile allows you to manage academies, track players, and run tournaments effectively.
                        </Text>
                    </View>

                    {/* Profile Form */}
                    <View className="gap-5">
                        {/* Preferred Coaching Role */}
                        <View>
                            <Text className="text-grey_1 text-xs font-medium mb-2">
                                Preferred Coaching Role
                            </Text>
                            <AppSelect
                                options={coachingRoleOptions}
                                value={coachingRole}
                                placeholder="Select coaching role"
                                onChange={setCoachingRole}
                            />
                        </View>

                        {/* Experience (in years) */}
                        <View>
                            <Text className="text-grey_1 text-xs font-medium mb-2">
                                Experience (in years)
                            </Text>
                            <TextInput
                                value={experience}
                                onChangeText={setExperience}
                                placeholder="Enter experience in years"
                                keyboardType="numeric"
                                className="border border-gray-200 rounded-xl px-4 py-4 bg-white text-base text-black"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        {/* Coaching Certifications */}
                        <View>
                            <Text className="text-grey_1 text-xs font-medium mb-2">
                                Coaching Certifications
                            </Text>
                            <TextInput
                                value={certifications}
                                onChangeText={setCertifications}
                                placeholder="Enter certifications"
                                className="border border-gray-200 rounded-xl px-4 py-4 bg-white text-base text-black"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        {/* Specialization */}
                        <View>
                            <Text className="text-grey_1 text-xs font-medium mb-2">
                                Specialization
                            </Text>
                            <AppSelect
                                options={specializationOptions}
                                value={specialization}
                                placeholder="Select specialization"
                                onChange={setSpecialization}
                            />
                        </View>

                        {/* Preferred Age Group to Coach */}
                        <View>
                            <Text className="text-grey_1 text-xs font-medium mb-2">
                                Preferred Age Group to Coach
                            </Text>
                            <AppSelect
                                options={ageGroupOptions}
                                value={ageGroup}
                                placeholder="Select age group"
                                onChange={setAgeGroup}
                            />
                        </View>

                        {/* Current City */}
                        <View>
                            <Text className="text-grey_1 text-xs font-medium mb-2">
                                Current City
                            </Text>
                            <AppSelect
                                options={cityOptions}
                                value={city}
                                placeholder="Select city"
                                onChange={setCity}
                            />
                        </View>

                        {/* Visibility Preference */}
                        <View>
                            <Text className="text-grey_1 text-xs font-medium mb-2">
                                Visibility Preference
                            </Text>
                            <AppSelect
                                options={visibilityOptions}
                                value={visibility}
                                placeholder="Select visibility"
                                onChange={setVisibility}
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Continue Button — pinned to bottom */}
                <View className="px-8 pb-8 pt-3 bg-white">
                    <TouchableOpacity
                        onPress={() => {
                            router.push("/onboarding/coachOnboarding/profileConfirmation");
                        }}
                        disabled={!isFormValid}
                        activeOpacity={0.8}
                        className={`w-full py-4 rounded-xl items-center ${isFormValid
                            ? "bg-primary"
                            : "bg-stroke_grey_1"
                            }`}
                    >
                        <Text
                            className={`text-base font-semibold ${isFormValid
                                ? "text-white"
                                : "text-[#999999]"
                                }`}
                        >
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}