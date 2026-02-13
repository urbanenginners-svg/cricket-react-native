import { useState } from "react";
import { Pressable, Text, View } from "react-native"
import PhoneInput, { ICountry, isValidPhoneNumber } from 'react-native-international-phone-number';
import { router } from "expo-router";

import Google from "@/assets/svg/google.svg";
import Facebook from "@/assets/svg/facebook.svg";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<ICountry>();

    return <View className="flex-1 justify-between">
        <View>
            <View className="mb-5">
                <Text className="text-black_1 text-2xl font-bold">Welcome to Your Cricket Space</Text>
                <Text className="text-grey_1 text-xs font-medium pt-[10px]">Sign in to manage sessions, track progress, and stay connected with your academy.</Text>
            </View>

            <View>
                <Text className="text-grey_1 text-xs font-medium mb-2">Phone Number</Text>
                <PhoneInput
                    value={phoneNumber}
                    onChangePhoneNumber={setPhoneNumber}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={setSelectedCountry}
                    placeholder="9999 9999 99"
                    phoneInputStyles={{ flagContainer: { backgroundColor: "white" } }}
                />

                <Pressable className="py-[14px] rounded-[10px] bg-primary text-white text-center text-sm font-medium mt-6">
                    <Text className="text-white text-center text-sm font-medium">Log In</Text>
                </Pressable>

            </View>

            <View className="mt-6">
                <View className="flex-row items-center mb-6">
                    <View className="flex-1  border border-stroke_grey_1"></View>
                    <Text className="text-grey_1 text-xs font-medium mx-2">Or</Text>
                    <View className="flex-1  border border-stroke_grey_1"></View>
                </View>

                <View>
                    <Pressable className="py-[14px] rounded-[10px] bg-white border border-[#EFF0F6] text-center text-sm font-medium flex-row items-center justify-center gap-5">
                        <Google />
                        <Text className="text-black_1 text-center text-sm font-semibold">Continue with Google</Text>
                    </Pressable>

                    <Pressable className="py-[14px] rounded-[10px] bg-white border border-[#EFF0F6] text-center text-sm font-medium mt-6 flex-row items-center justify-center gap-5">
                        <Facebook />
                        <Text className="text-black_1 text-center text-sm font-semibold">Continue with Apple</Text>
                    </Pressable>
                </View>

            </View>
        </View>
        <View className="flex-row items-center justify-center gap-2 mb-12">
            <Text className="text-grey_1 text-xs font-medium">Don't have an account? </Text>
            <Pressable onPress={() => router.replace("/(auth)/createAccount")}>
                <Text className="text-primary text-xs font-semibold">Sign Up</Text>
            </Pressable>
        </View>

    </View>
}