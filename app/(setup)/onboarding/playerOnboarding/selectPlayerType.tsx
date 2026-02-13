import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, ScrollView, TouchableOpacity } from "react-native";

import Batter from "@/assets/images/bat.svg";
import Bowler from "@/assets/images/ball.svg";
import Keeper from "@/assets/images/cap.svg";
import AllRounder from "@/assets/images/bat_ball.svg";
import AppSelect from "@/components/common/AppSelect";

type PlayerRole = "batter" | "bowler" | "keeper" | "allrounder";

type RoleCard = {
    key: PlayerRole;
    label: string;
    Icon: React.FC<{ width: number; height: number }>;
};

const roles: RoleCard[] = [
    { key: "batter", label: "I'm a Batter", Icon: Batter },
    { key: "bowler", label: "I'm a Bowler", Icon: Bowler },
    { key: "keeper", label: "I'm a Keeper", Icon: Keeper },
    { key: "allrounder", label: "I'm an All Rounder", Icon: AllRounder },
];

const battingTypeOptions = [
    { label: "Right Hand", value: "right_hand" },
    { label: "Left Hand", value: "left_hand" },
];

const battingOrderOptions = [
    { label: "Top Order", value: "top_order" },
    { label: "Middle Order", value: "middle_order" },
    { label: "Lower Order", value: "lower_order" },
];

const bowlingTypeOptions = [
    { label: "Right Hand", value: "right_hand" },
    { label: "Left Hand", value: "left_hand" },
];

const bowlingStyleOptions = [
    { label: "Fast", value: "fast" },
    { label: "Medium", value: "medium" },
    { label: "Spin", value: "spin" },
];

// Determine which form sections to show per role
const showBattingFields = (role: PlayerRole) =>
    role === "batter" || role === "allrounder";

const showBowlingFields = (role: PlayerRole) =>
    role === "bowler" || role === "keeper" || role === "allrounder";

export default function SelectPlayerType() {
    const router = useRouter();

    const [selectedRole, setSelectedRole] = useState<PlayerRole | null>(null);
    const [battingType, setBattingType] = useState<string | undefined>();
    const [battingOrder, setBattingOrder] = useState<string | undefined>();
    const [bowlingType, setBowlingType] = useState<string | undefined>();
    const [bowlingStyle, setBowlingStyle] = useState<string | undefined>();

    const handleRoleSelect = (role: PlayerRole) => {
        setSelectedRole(role);
        // Reset form fields on role change
        setBattingType(undefined);
        setBattingOrder(undefined);
        setBowlingType(undefined);
        setBowlingStyle(undefined);
    };

    // Validate: role must be selected + all required fields for that role filled
    const isFormValid = (() => {
        if (!selectedRole) return false;

        if (showBattingFields(selectedRole)) {
            if (!battingType || !battingOrder) return false;
        }
        if (showBowlingFields(selectedRole)) {
            if (!bowlingType || !bowlingStyle) return false;
        }

        return true;
    })();

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
                            Create Your Player Profile
                        </Text>
                        <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                            Set up your player profile so your coach and academy can guide your progress effectively.
                        </Text>
                    </View>

                    {/* Role Selection Grid */}
                    <View className="flex-row flex-wrap justify-between mb-6">
                        {roles.map((role) => {
                            const isSelected = selectedRole === role.key;
                            return (
                                <Pressable
                                    key={role.key}
                                    onPress={() => handleRoleSelect(role.key)}
                                    className={`w-[48%] items-center justify-center py-5 rounded-2xl mb-3 border-2 ${isSelected
                                        ? "border-primary bg-white"
                                        : "border-stroke_grey_1 bg-white"
                                        }`}
                                >
                                    <role.Icon width={56} height={56} />
                                    <Text
                                        className={`text-sm font-semibold mt-2 ${isSelected
                                            ? "text-black_1"
                                            : "text-black_1"
                                            }`}
                                    >
                                        {role.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    {/* Conditional Form Fields */}
                    {selectedRole && (
                        <View className="gap-5">
                            {/* Batting fields — Batter & All Rounder */}
                            {showBattingFields(selectedRole) && (
                                <>
                                    <View>
                                        <Text className="text-grey_1 text-xs font-medium mb-2">
                                            Batting Type
                                        </Text>
                                        <AppSelect
                                            options={battingTypeOptions}
                                            value={battingType}
                                            placeholder="Select batting type"
                                            onChange={setBattingType}
                                        />
                                    </View>

                                    <View>
                                        <Text className="text-grey_1 text-xs font-medium mb-2">
                                            Batting Order Preference
                                        </Text>
                                        <AppSelect
                                            options={battingOrderOptions}
                                            value={battingOrder}
                                            placeholder="Select batting order"
                                            onChange={setBattingOrder}
                                        />
                                    </View>
                                </>
                            )}

                            {/* Bowling fields — Bowler, Keeper & All Rounder */}
                            {showBowlingFields(selectedRole) && (
                                <>
                                    <View>
                                        <Text className="text-grey_1 text-xs font-medium mb-2">
                                            Bowling Type
                                        </Text>
                                        <AppSelect
                                            options={bowlingTypeOptions}
                                            value={bowlingType}
                                            placeholder="Select bowling type"
                                            onChange={setBowlingType}
                                        />
                                    </View>

                                    <View>
                                        <Text className="text-grey_1 text-xs font-medium mb-2">
                                            Bowling Style
                                        </Text>
                                        <AppSelect
                                            options={bowlingStyleOptions}
                                            value={bowlingStyle}
                                            placeholder="Select bowling style"
                                            onChange={setBowlingStyle}
                                        />
                                    </View>
                                </>
                            )}
                        </View>
                    )}
                </ScrollView>

                {/* Continue Button — pinned to bottom */}
                <View className="px-8 pb-8 pt-3 bg-white">
                    <TouchableOpacity
                        onPress={() => {
                            // Handle continue action
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