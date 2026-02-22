import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
    FlatList,
    Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import LocationIcon from "@/assets/icons/location_grey.svg";

// ── Screen width for image sizing ───────────────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH * 0.62;
const IMAGE_HEIGHT = 140;

// ── Types ───────────────────────────────────────────────────────────────────────
type Tab = "about" | "players";

type Player = {
    id: string;
    name: string;
    role: string;
    avatar: string;
};

type Facility = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

// ── Sample Data ─────────────────────────────────────────────────────────────────
const academyImages = [
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
    "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&q=80",
];

const players: Player[] = [
    { id: "1", name: "Priyanshi Jain", role: "All-Rounder", avatar: "https://ui-avatars.com/api/?name=Priyanshi+Jain&size=100&background=E8F0FE&color=1D61E7&bold=true" },
    { id: "2", name: "Priyanshi Jain", role: "All-Rounder", avatar: "https://ui-avatars.com/api/?name=Priyanshi+Jain&size=100&background=E8F0FE&color=1D61E7&bold=true" },
    { id: "3", name: "Priyanshi Jain", role: "All-Rounder", avatar: "https://ui-avatars.com/api/?name=Priyanshi+Jain&size=100&background=E8F0FE&color=1D61E7&bold=true" },
    { id: "4", name: "Priyanshi Jain", role: "All-Rounder", avatar: "https://ui-avatars.com/api/?name=Priyanshi+Jain&size=100&background=E8F0FE&color=1D61E7&bold=true" },
    { id: "5", name: "Priyanshi Jain", role: "All-Rounder", avatar: "https://ui-avatars.com/api/?name=Priyanshi+Jain&size=100&background=E8F0FE&color=1D61E7&bold=true" },
];

const availableTurfs = ["Turf", "Cement", "Astroturf"];

const facilities: Facility[] = [
    { id: "1", label: "Umpires", icon: <MaterialCommunityIcons name="whistle-outline" size={26} color="#4B5563" /> },
    { id: "2", label: "Scorers", icon: <MaterialCommunityIcons name="scoreboard-outline" size={26} color="#4B5563" /> },
    { id: "3", label: "Drinking Water", icon: <Ionicons name="water-outline" size={26} color="#4B5563" /> },
    { id: "4", label: "Practice Nets", icon: <MaterialCommunityIcons name="tennis" size={26} color="#4B5563" /> },
    { id: "5", label: "Flood Lights", icon: <MaterialCommunityIcons name="lightbulb-on-outline" size={26} color="#4B5563" /> },
    { id: "6", label: "Balls", icon: <Ionicons name="baseball-outline" size={26} color="#4B5563" /> },
    { id: "7", label: "Washrooms", icon: <MaterialCommunityIcons name="human-male-female" size={26} color="#4B5563" /> },
    { id: "8", label: "Pavilion", icon: <MaterialIcons name="holiday-village" size={26} color="#4B5563" /> },
    { id: "9", label: "Sight Screen", icon: <MaterialCommunityIcons name="monitor" size={26} color="#4B5563" /> },
    { id: "10", label: "Cafeteria", icon: <MaterialIcons name="local-cafe" size={26} color="#4B5563" /> },
];

// ── Section Header with Blue Underline ──────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
    return (
        <View className="mb-3">
            <Text className="text-[15px] font-semibold text-primary mb-1.5">
                {title}
            </Text>
            <View className="h-[2px] bg-primary w-10 rounded-full" />
        </View>
    );
}

// ── Turf Chip ───────────────────────────────────────────────────────────────────
function TurfChip({ label }: { label: string }) {
    return (
        <View className="border border-[#D1D5DB] rounded-lg px-4 py-1.5 mr-2">
            <Text className="text-[13px] text-[#374151] font-medium">{label}</Text>
        </View>
    );
}

// ── Facility Item ───────────────────────────────────────────────────────────────
function FacilityItem({ facility }: { facility: Facility }) {
    return (
        <View className="items-center justify-center w-[25%] mb-5">
            <View className="w-12 h-12 rounded-xl bg-[#F3F4F6] items-center justify-center mb-1.5">
                {facility.icon}
            </View>
            <Text
                className="text-[11px] text-[#6B7280] text-center font-medium"
                numberOfLines={1}
            >
                {facility.label}
            </Text>
        </View>
    );
}

// ── Player Card ─────────────────────────────────────────────────────────────────
function PlayerCard({ player }: { player: Player }) {
    return (
        <Pressable className="flex-row items-center mx-4 py-3.5 px-4 bg-white rounded-xl border border-[#F0F0F0] mb-3 active:opacity-80">
            <View className="w-11 h-11 rounded-full overflow-hidden mr-3 bg-[#E8F0FE]">
                <Image
                    source={{ uri: player.avatar }}
                    className="w-full h-full"
                />
            </View>
            <View className="flex-1">
                <Text className="text-[15px] font-semibold text-[#1C1C1E]">
                    {player.name}
                </Text>
                <Text className="text-[13px] text-grey_1 mt-0.5">
                    {player.role}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </Pressable>
    );
}

// ── Main Component ──────────────────────────────────────────────────────────────
export default function MyAcademy() {
    const [activeTab, setActiveTab] = useState<Tab>("about");

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Image Gallery ────────────────────────────────── */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
                    className="mt-4"
                >
                    {academyImages.map((uri, index) => (
                        <View
                            key={index}
                            className="rounded-xl overflow-hidden"
                            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
                        >
                            <Image
                                source={{ uri }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* ── Academy Name & Location ──────────────────────── */}
                <View className="px-4 mt-5">
                    <Text className="text-[20px] font-bold text-[#1C1C1E] tracking-tight">
                        Vidya Jain Cricket Academy
                    </Text>
                    <View className="flex-row items-center mt-2 gap-1.5">
                        <LocationIcon />
                        <Text className="text-[13px] text-grey_1 flex-1">
                            Rohini Sector 6, Near Pitampura, New Delhi - 110085
                        </Text>
                    </View>
                </View>

                {/* ── Tabs ─────────────────────────────────────────── */}
                <View className="flex-row mt-5 mx-4 border-b border-[#E5E7EB]">
                    <Pressable
                        onPress={() => setActiveTab("about")}
                        className="flex-1 items-center pb-3"
                    >
                        <Text
                            className={`text-[15px] font-semibold ${activeTab === "about"
                                    ? "text-[#1C1C1E]"
                                    : "text-grey_1"
                                }`}
                        >
                            About
                        </Text>
                        {activeTab === "about" && (
                            <View className="absolute bottom-0 w-16 h-[2.5px] bg-primary rounded-full" />
                        )}
                    </Pressable>
                    <Pressable
                        onPress={() => setActiveTab("players")}
                        className="flex-1 items-center pb-3"
                    >
                        <Text
                            className={`text-[15px] font-semibold ${activeTab === "players"
                                    ? "text-[#1C1C1E]"
                                    : "text-grey_1"
                                }`}
                        >
                            Players
                        </Text>
                        {activeTab === "players" && (
                            <View className="absolute bottom-0 w-16 h-[2.5px] bg-primary rounded-full" />
                        )}
                    </Pressable>
                </View>

                {/* ── Tab Content ──────────────────────────────────── */}
                {activeTab === "about" ? (
                    <AboutTab />
                ) : (
                    <PlayersTab />
                )}
            </ScrollView>
        </View>
    );
}

// ── About Tab Content ───────────────────────────────────────────────────────────
function AboutTab() {
    return (
        <View className="px-4 pt-5">
            {/* ── General ──────────────────────────────────────── */}
            <SectionHeader title="General" />
            <View className="mt-2">
                <InfoRow label="Head Coach:" value="Mr. Rakesh Kumar" />
                <InfoRow label="Timings:" value="9:00 A.M. to 7:00 P.M." />
                <InfoRow label="Established:" value="1988" />
            </View>

            {/* ── Ground ───────────────────────────────────────── */}
            <View className="mt-7">
                <SectionHeader title="Ground" />
                <View className="flex-row items-center mt-3">
                    {/* Cricket Ground Icon */}
                    <View className="w-[70px] h-[70px] rounded-full bg-[#E8F5E9] items-center justify-center mr-4">
                        <View className="w-[50px] h-[50px] rounded-full bg-[#4CAF50] items-center justify-center">
                            <View className="w-[4px] h-[30px] bg-[#FFFFFF99] rounded-full" />
                        </View>
                    </View>

                    {/* Turf Details */}
                    <View className="flex-1">
                        <Text className="text-[12px] text-grey_1 mb-2">
                            Available Turfs:
                        </Text>
                        <View className="flex-row flex-wrap">
                            {availableTurfs.map((turf) => (
                                <TurfChip key={turf} label={turf} />
                            ))}
                        </View>
                        <Text className="text-[12px] text-grey_1 mt-3">
                            Boundary Length (Meters)
                        </Text>
                        <Text className="text-[14px] font-semibold text-[#1C1C1E] mt-0.5">
                            60-65 Meters Approx
                        </Text>
                    </View>
                </View>
            </View>

            {/* ── Facilities ───────────────────────────────────── */}
            <View className="mt-7">
                <SectionHeader title="Facilities" />
                <View className="flex-row flex-wrap mt-3">
                    {facilities.map((facility) => (
                        <FacilityItem key={facility.id} facility={facility} />
                    ))}
                </View>
            </View>
        </View>
    );
}

// ── Info Row (for General section) ──────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row justify-between items-center py-2">
            <Text className="text-[14px] text-grey_1">{label}</Text>
            <Text className="text-[14px] text-[#1C1C1E] font-medium">
                {value}
            </Text>
        </View>
    );
}

// ── Players Tab Content ─────────────────────────────────────────────────────────
function PlayersTab() {
    return (
        <View className="pt-4">
            {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
            ))}
        </View>
    );
}