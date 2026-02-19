import { Tabs } from "expo-router";
import { View, Text, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import BatBall from "@/assets/icons/bottom_tab_bat_ball.svg";
import BatBallActive from "@/assets/icons/bottom_tab_bat_ball_active.svg";
import Bell from "@/assets/icons/bottom_tab_bell.svg";
import BellActive from "@/assets/icons/bottom_tab_bell_active.svg";
import Home from "@/assets/icons/bottom_tab_home.svg";
import HomeActive from "@/assets/icons/bottom_tab_home_active.svg";
import ProfileIcon from "@/assets/icons/bottom_tab_profile.svg";
import ProfileIconActive from "@/assets/icons/bottom_tab_profile_active.svg";

// ── Custom Tab Bar Component ───────────────────────────────────────────────────
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="flex-row items-center justify-around bg-white border-t border-gray-200 shadow-sm"
            style={{
                paddingBottom: Platform.OS === "ios" ? insets.bottom : 8,
                paddingTop: 8,
                height: Platform.OS === "ios" ? 49 + insets.bottom : 64,
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                // Get label
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                // Handle press
                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                // Icon selection
                let IconComponent;
                if (route.name === "index") {
                    IconComponent = isFocused ? HomeActive : Home;
                } else if (route.name === "myCricket") {
                    IconComponent = isFocused ? BatBallActive : BatBall;
                } else if (route.name === "announcements") {
                    IconComponent = isFocused ? BellActive : Bell;
                } else if (route.name === "profile") {
                    IconComponent = isFocused ? ProfileIconActive : ProfileIcon;
                }

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        className="flex-1 items-center justify-center"
                    >
                        {IconComponent && (
                            <IconComponent width={24} height={24} />
                        )}
                        <Text
                            className={`mt-1 text-[10px] font-medium ${isFocused
                                    ? "text-[#007AFF]"
                                    : "text-[#8A8A8E]"
                                }`}
                        >
                            {/* @ts-ignore */}
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

// ── App Layout ─────────────────────────────────────────────────────────────────
export default function AppLayout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="myCricket"
                options={{
                    title: "My Cricket",
                }}
            />
            <Tabs.Screen
                name="announcements"
                options={{
                    title: "Announcements",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                }}
            />
        </Tabs>
    );
}
