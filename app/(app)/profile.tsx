import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// ── Types ──────────────────────────────────────────────────────────────────────
type MenuItemProps = {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    showDivider?: boolean;
};

// ── Reusable Menu Row Component ────────────────────────────────────────────────
function MenuItem({ icon, label, onPress, showDivider }: MenuItemProps) {
    return (
        <View>
            <Pressable
                onPress={onPress}
                className="flex-row items-center justify-between py-[14px] px-4 active:bg-gray-50 bg-white"
            >
                <View className="flex-row items-center gap-3.5">
                    {icon}
                    <Text className="text-base text-[#1C1C1E] font-normal">
                        {label}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </Pressable>
            {showDivider && (
                <View className="h-[0.5px] bg-[#E5E5EA] ml-[54px]" />
            )}
        </View>
    );
}

// ── Main Profile Screen ────────────────────────────────────────────────────────
export default function ProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#F2F2F7]">
            {/* ── Header ─────────────────────────────────────────── */}
            <View className="flex-row items-center justify-between px-5 py-3 bg-white">
                <Text className="text-[28px] font-bold text-[#1C1C1E] tracking-tight">
                    Profile
                </Text>
                <Pressable hitSlop={8}>
                    <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={24}
                        color="#1C1C1E"
                    />
                </Pressable>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Profile Avatar & Info ───────────────────────── */}
                <View className="items-center py-7 bg-white">
                    <View className="w-[110px] h-[110px] rounded-full overflow-hidden mb-3.5 border-2 border-[#E8E8ED]">
                        <Image
                            source={{
                                uri: "https://ui-avatars.com/api/?name=Biff+Tannen&size=240&background=E8F0FE&color=1D61E7&bold=true",
                            }}
                            className="w-full h-full"
                        />
                    </View>
                    <Text className="text-[22px] font-semibold text-[#1C1C1E] tracking-tight">
                        Biff Tannen
                    </Text>
                    <Text className="text-sm text-[#8A8A8E] mt-1">
                        Right Hand Batter
                    </Text>
                </View>

                {/* ── Menu Section 1: Cricket & Academy ───────────── */}
                <View className="bg-white rounded-xl mx-4 mt-4 overflow-hidden">
                    <MenuItem
                        icon={
                            <Ionicons
                                name="person-circle-outline"
                                size={24}
                                color="#1C1C1E"
                            />
                        }
                        label="My Cricket Profile"
                        showDivider
                    />
                    <MenuItem
                        icon={
                            <Ionicons
                                name="star-outline"
                                size={24}
                                color="#1C1C1E"
                            />
                        }
                        label="Academy Details"
                    />
                </View>

                {/* ── Menu Section 2: General ─────────────────────── */}
                <View className="bg-white rounded-xl mx-4 mt-4 overflow-hidden">
                    <MenuItem
                        icon={
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color="#1C1C1E"
                            />
                        }
                        label="Notifications"
                        showDivider
                    />
                    <MenuItem
                        icon={
                            <Ionicons
                                name="help-circle-outline"
                                size={24}
                                color="#1C1C1E"
                            />
                        }
                        label="Help and Support"
                        showDivider
                    />
                    <MenuItem
                        icon={
                            <Ionicons
                                name="document-text-outline"
                                size={24}
                                color="#1C1C1E"
                            />
                        }
                        label="Terms and Conditions"
                        showDivider
                    />
                    <MenuItem
                        icon={
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={24}
                                color="#1C1C1E"
                            />
                        }
                        label="Privacy Policy"
                    />
                </View>

                {/* ── Logout ──────────────────────────────────────── */}
                <View className="bg-white rounded-xl mx-4 mt-4 overflow-hidden">
                    <Pressable className="py-[14px] px-4 active:bg-[#FFF0F0] bg-white">
                        <Text className="text-base font-medium text-[#FF3B30]">
                            Logout
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
