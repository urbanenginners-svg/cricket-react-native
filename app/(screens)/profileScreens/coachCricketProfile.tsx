import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Pressable,
} from "react-native";

import AppSelect from "@/components/common/AppSelect";

// ── Dropdown Options ────────────────────────────────────────────────────────────
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
    { label: "Wicket Keeping", value: "wicket_keeping" },
    { label: "Fitness & Conditioning", value: "fitness_conditioning" },
    { label: "Mental Conditioning", value: "mental_conditioning" },
    { label: "Match Strategy", value: "match_strategy" },
];

const ageGroupOptions = [
    { label: "Under 14", value: "u14" },
    { label: "Under 16", value: "u16" },
    { label: "Under 19", value: "u19" },
    { label: "Senior", value: "senior" },
    { label: "All Age Groups", value: "all" },
];

const cityOptions = [
    { label: "Panipat, Haryana", value: "panipat" },
    { label: "Delhi, NCR", value: "delhi" },
    { label: "Mumbai, Maharashtra", value: "mumbai" },
    { label: "Bengaluru, Karnataka", value: "bengaluru" },
    { label: "Chennai, Tamil Nadu", value: "chennai" },
    { label: "Kolkata, West Bengal", value: "kolkata" },
    { label: "Hyderabad, Telangana", value: "hyderabad" },
];

const visibilityOptions = [
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
    { label: "Connections Only", value: "connections_only" },
];

// ── Component ───────────────────────────────────────────────────────────────────
export default function CoachCricketProfile() {
    const [coachingRole, setCoachingRole] = useState<string | undefined>(
        "head_coach",
    );
    const [experience, setExperience] = useState("10");
    const [certifications, setCertifications] = useState("BCCI Certified");
    const [specialization, setSpecialization] = useState<string | undefined>(
        "batting_technique",
    );
    const [ageGroup, setAgeGroup] = useState<string | undefined>("senior");
    const [city, setCity] = useState<string | undefined>("panipat");
    const [visibility, setVisibility] = useState<string | undefined>("public");


    return (
        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* ── Form Fields ─────────────────────────────────── */}
                <View className="px-6 pt-6">
                    {/* Preferred Coaching Role */}
                    <View className="mb-5">
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
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Experience (in years)
                        </Text>
                        <TextInput
                            value={experience}
                            onChangeText={setExperience}
                            placeholder="Enter experience in years"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            className="bg-white border border-stroke_grey_1 rounded-xl px-4 py-4 text-black text-base"
                        />
                    </View>

                    {/* Coaching Certifications */}
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Coaching Certifications
                        </Text>
                        <TextInput
                            value={certifications}
                            onChangeText={setCertifications}
                            placeholder="e.g. BCCI Level 2, NCA Certified"
                            placeholderTextColor="#9CA3AF"
                            className="bg-white border border-stroke_grey_1 rounded-xl px-4 py-4 text-black text-base"
                        />
                    </View>

                    {/* Specialization */}
                    <View className="mb-5">
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
                    <View className="mb-5">
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
                    <View className="mb-5">
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
                    <View className="mb-5">
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

            {/* ── Save Button (sticky at bottom) ──────────────── */}
            <View className="px-6 pb-8 pt-4 bg-white">
                <Pressable className="py-[14px] rounded-xl bg-primary active:opacity-80">
                    <Text className="text-white text-center text-base font-semibold">
                        Save
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}