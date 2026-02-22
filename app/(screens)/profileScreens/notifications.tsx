import { useState } from "react";
import {
    View,
    Text,
    Switch,
    ScrollView,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ── Types ───────────────────────────────────────────────────────────────────────
type NotificationSetting = {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    enabled: boolean;
};

// ── Component ───────────────────────────────────────────────────────────────────
export default function Notifications() {
    const [settings, setSettings] = useState<NotificationSetting[]>([
        { id: "email", label: "Email", icon: "mail-outline", enabled: true },
        {
            id: "phone",
            label: "Phone",
            icon: "call-outline",
            enabled: true,
        },
        {
            id: "in_app",
            label: "In App Notifications",
            icon: "notifications-outline",
            enabled: true,
        },
    ]);

    // ── Toggle Handler ──────────────────────────────────────────────────────────
    const toggleSetting = (id: string) => {
        setSettings((prev) =>
            prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
        );
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Notification Toggles ──────────────────────── */}
                <View className="mx-6 mt-6 rounded-2xl bg-[#F6F6F6] overflow-hidden">
                    {settings.map((setting, index) => (
                        <View key={setting.id}>
                            <View className="flex-row items-center justify-between px-5 py-3">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-5 h-5 rounded-full items-center justify-center">
                                        <Ionicons
                                            name={setting.icon}
                                            size={18}
                                            color="#6C7278"
                                        />
                                    </View>
                                    <Text className="text-black_1 text-[16px] font-medium">
                                        {setting.label}
                                    </Text>
                                </View>
                                <Switch
                                    trackColor={{
                                        false: "#E5E7EB",
                                        true: "#34C759",
                                    }}
                                    thumbColor="#FFFFFF"
                                    ios_backgroundColor="#E5E7EB"
                                    onValueChange={() =>
                                        toggleSetting(setting.id)
                                    }
                                    value={setting.enabled}
                                />
                            </View>
                            {/* Divider (except after last item) */}
                            {index < settings.length - 1 && (
                                <View className="h-[1px] bg-[#00000033] mx-5" />
                            )}
                        </View>
                    ))}
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