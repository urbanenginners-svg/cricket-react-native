import { Stack, router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, Pressable } from "react-native";

import PlayerIcon from "@/assets/images/bat_ball.svg";
import CoachIcon from "@/assets/images/cap.svg";
import { selectRole } from "@/services/authService";
import { RoleEnum } from "@/types/enums/roleEnum";


export default function SelectRole() {
    const [selectedRole, setSelectedRole] = useState<RoleEnum | "">("");

    const handleContinue = async () => {

        try{
            const response = await selectRole({role: selectedRole as RoleEnum})
                console.log(response, ">>>>> response")
            if (selectedRole === "player") {
                router.push("/(setup)/onboarding/playerOnboarding/selectPlayerType");
            } else if (selectedRole === "coach") {
                router.push("/(setup)/onboarding/coachOnboarding/coachProfile");
            }
        }catch (error: any){
            alert(error?.response?.data?.message ?? error?.message ?? "Something went wrong")
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: "", headerLeft: () => <></> }} />

            <View className="flex-1 bg-white px-8 pt-4">
                <View className="mb-5">
                    <Text className="text-black_1 text-2xl font-bold">
                        Select How You'll Use the App
                    </Text>
                    <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                        Choose your role to unlock the features designed for players, coaches, and academies.
                    </Text>
                </View>

                {/* Role Selection Cards */}
                <View className="flex-row gap-4">
                    {/* Player Card */}
                    <Pressable
                        onPress={() => setSelectedRole(RoleEnum.PLAYER)}
                        className={`flex-1 items-center justify-center py-5 px-3 rounded-2xl border-2 ${selectedRole === "player"
                            ? "border-primary bg-blue-50"
                            : "border-stroke_grey_1 bg-white"
                            }`}
                    >
                        <PlayerIcon width={80} height={80} />
                        <Text
                            className={`text-sm font-semibold mt-2 ${selectedRole === "player"
                                ? "text-primary"
                                : "text-black_1"
                                }`}
                        >
                            I'm a Player
                        </Text>
                    </Pressable>

                    {/* Coach Card */}
                    <Pressable
                        onPress={() => setSelectedRole(RoleEnum.COACH)}
                        className={`flex-1 items-center justify-center py-5 px-3 rounded-2xl border-2 ${selectedRole === "coach"
                            ? "border-primary bg-blue-50"
                            : "border-stroke_grey_1 bg-white"
                            }`}
                    >
                        <CoachIcon width={80} height={80} />
                        <Text
                            className={`text-sm font-semibold mt-2 ${selectedRole === "coach"
                                ? "text-primary"
                                : "text-black_1"
                                }`}
                        >
                            I'm a Coach
                        </Text>
                    </Pressable>
                </View>

                {/* Continue Button - pushed to bottom */}
                <View className="flex-1 justify-end pb-10">
                    <TouchableOpacity
                        onPress={handleContinue}
                        disabled={!selectedRole}
                        activeOpacity={0.8}
                        className={`w-full py-4 rounded-xl items-center ${selectedRole
                            ? "bg-primary"
                            : "bg-stroke_grey_1"
                            }`}
                    >
                        <Text
                            className={`text-base font-semibold ${selectedRole
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