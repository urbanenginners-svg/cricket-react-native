import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, Platform } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import DateTimePicker from '@react-native-community/datetimepicker';

import AppSelect from "@/components/common/AppSelect";
import { router } from "expo-router";

export default function CricketCricketAccount() {
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<ICountry>();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            router.replace("/(setup)/verifyOtp");
        }, 2500);
    }, []);

    return <View className="flex-1 justify-between">
        <View className="">
            <View className="mb-5">
                <Text className="text-black_1 text-2xl font-bold">Create Your Cricket Account</Text>
                <Text className="text-grey_1 text-xs font-medium pt-[10px]">Join your academy or set up your own. Whether you’re a player or a coach. Your journey begins here.</Text>
            </View>

            <View className="mb-4">
                <Text className="text-grey_1 text-xs font-medium mb-2">Full Name</Text>
                <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    className="bg-white shadow-sm border border-stroke_grey_1 rounded-lg px-4 py-4 text-black"
                />
            </View>

            <View className="mb-4 ">
                <Text className="text-grey_1 text-xs font-medium mb-2">Gender</Text>
                <AppSelect
                    options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Other", value: "other" },
                    ]}
                    value={gender}
                    onChange={setGender}
                />
            </View>

            <View className="mb-4">
                <Text className="text-grey_1 text-xs font-medium mb-2">Phone Number</Text>
                <PhoneInput
                    value={phoneNumber}
                    onChangePhoneNumber={setPhoneNumber}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={setSelectedCountry}
                    placeholder="9999 9999 99"
                    phoneInputStyles={{ flagContainer: { backgroundColor: "white" }, container: { borderColor: "#EDF1F3" } }}
                />
            </View>

            <View className="mb-4">
                <Text className="text-grey_1 text-xs font-medium mb-2">Date of Birth</Text>
                <Pressable
                    onPress={() => {
                        setShow(true);
                    }}
                    className="border border-gray-200 rounded-xl px-4 py-4 bg-white flex-row justify-between items-center"
                >
                    <Text
                        className={`text-base ${show ? "text-black" : "text-gray-400"
                            }`}
                    >
                        {show ? date.toLocaleDateString() : "Select Date of Birth"}
                    </Text>

                    <Text className="text-gray-400">▼</Text>
                </Pressable>

                {show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        // onChange={onChange}
                        maximumDate={new Date()} // Prevent future dates
                    />
                )}
            </View>

            <View className="mb-4">
                <Text className="text-grey_1 text-xs font-medium mb-2">Place of Birth</Text>
                <TextInput
                    placeholder="Enter your place of birth"
                    placeholderTextColor="#9CA3AF"
                    className="bg-white shadow-sm border border-stroke_grey_1 rounded-lg px-4 py-4 text-black"
                />
            </View>

            <View className="mb-6">
                <Pressable className="py-[14px] rounded-[10px] bg-primary text-white text-center text-sm font-medium mt-6">
                    <Text className="text-white text-center text-sm font-medium">Register</Text>
                </Pressable>
            </View>

        </View>
        <View className="flex-row items-center justify-center gap-2 mb-12">
            <Text className="text-grey_1 text-xs font-medium">Already have an account? </Text>
            <Pressable onPress={() => router.replace("/(auth)/login")}>
                <Text className="text-primary text-xs font-semibold">Login</Text>
            </Pressable>
        </View>
    </View>
}