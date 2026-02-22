import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import AppSelect from "@/components/common/AppSelect";

// ── Types ──────────────────────────────────────────────────────────────────────
type PlayerRole = "batter" | "bowler" | "keeper" | "allrounder";

// ── Dropdown Options ───────────────────────────────────────────────────────────
const roleOptions = [
    { label: "Batsman", value: "batter" },
    { label: "Bowler", value: "bowler" },
    { label: "Wicket Keeper", value: "keeper" },
    { label: "All Rounder", value: "allrounder" },
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

// ── Helpers: decide which field groups to render per role ───────────────────────
const showBattingFields = (role: PlayerRole) =>
    role === "batter" || role === "allrounder";

const showBowlingFields = (role: PlayerRole) =>
    role === "bowler" || role === "keeper" || role === "allrounder";

// ── Component ──────────────────────────────────────────────────────────────────
export default function PlayerCricketProfile() {
    const [role, setRole] = useState<string | undefined>();
    const [battingType, setBattingType] = useState<string | undefined>();
    const [battingOrder, setBattingOrder] = useState<string | undefined>();
    const [bowlingType, setBowlingType] = useState<string | undefined>();
    const [bowlingStyle, setBowlingStyle] = useState<string | undefined>();

    // Reset dependent fields whenever the role changes
    const handleRoleChange = (value: string) => {
        setRole(value);
        setBattingType(undefined);
        setBattingOrder(undefined);
        setBowlingType(undefined);
        setBowlingStyle(undefined);
    };

    const selectedRole = role as PlayerRole | undefined;

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Form Fields ─────────────────────────────────── */}
                <View className="px-6 pt-6">
                    {/* Role */}
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Role
                        </Text>
                        <AppSelect
                            options={roleOptions}
                            value={role}
                            placeholder="Select role"
                            onChange={handleRoleChange}
                        />
                    </View>

                    {/* ── Dynamic fields based on selected role ──── */}
                    {selectedRole && showBattingFields(selectedRole) && (
                        <>
                            {/* Batting Type */}
                            <View className="mb-5">
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

                            {/* Batting Order Preference */}
                            <View className="mb-5">
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

                    {selectedRole && showBowlingFields(selectedRole) && (
                        <>
                            {/* Bowling Type */}
                            <View className="mb-5">
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

                            {/* Bowling Style */}
                            <View className="mb-5">
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