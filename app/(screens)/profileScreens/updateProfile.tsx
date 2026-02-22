import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import AppSelect from "@/components/common/AppSelect";

export default function UpdateProfile() {
    const [fullName, setFullName] = useState("Lois Becket");
    const [gender, setGender] = useState("male");
    const [phoneNumber, setPhoneNumber] = useState("(454) 726-0592");
    const [selectedCountry, setSelectedCountry] = useState<ICountry>();
    const [date, setDate] = useState(new Date(2024, 2, 18)); // 18/03/2024
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [placeOfBirth, setPlaceOfBirth] = useState("Haryana");

    const onDateChange = (_event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === "ios");
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formatDate = (d: Date) => {
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* ── Profile Avatar ─────────────────────────────── */}
                <View className="items-center pt-6 pb-8">
                    <View className="w-[120px] h-[120px] rounded-full overflow-hidden border-[3px] border-stroke_grey_1">
                        <Image
                            source={{
                                uri: "https://ui-avatars.com/api/?name=Lois+Becket&size=240&background=E8F0FE&color=1D61E7&bold=true",
                            }}
                            className="w-full h-full"
                        />
                    </View>
                </View>

                {/* ── Form Fields ─────────────────────────────────── */}
                <View className="px-6">
                    {/* Full Name */}
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Full Name
                        </Text>
                        <TextInput
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Enter your full name"
                            placeholderTextColor="#9CA3AF"
                            className="bg-white border border-stroke_grey_1 rounded-xl px-4 py-4 text-black text-base"
                        />
                    </View>

                    {/* Gender */}
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Gender
                        </Text>
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

                    {/* Phone Number */}
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Phone Number
                        </Text>
                        <PhoneInput
                            value={phoneNumber}
                            onChangePhoneNumber={setPhoneNumber}
                            selectedCountry={selectedCountry}
                            onChangeSelectedCountry={setSelectedCountry}
                            placeholder="9999 9999 99"
                            phoneInputStyles={{
                                flagContainer: { backgroundColor: "white" },
                                container: { borderColor: "#EDF1F3" },
                            }}
                        />
                    </View>

                    {/* Date of Birth */}
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Birth of date
                        </Text>
                        <Pressable
                            onPress={() => setShowDatePicker(true)}
                            className="border border-stroke_grey_1 rounded-xl px-4 py-4 bg-white flex-row justify-between items-center"
                        >
                            <Text className="text-base text-black">
                                {formatDate(date)}
                            </Text>
                            <Ionicons
                                name="calendar-outline"
                                size={20}
                                color="#9CA3AF"
                            />
                        </Pressable>

                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display={
                                    Platform.OS === "ios" ? "spinner" : "default"
                                }
                                onChange={onDateChange}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>

                    {/* Place of Birth */}
                    <View className="mb-5">
                        <Text className="text-grey_1 text-xs font-medium mb-2">
                            Place of Birth
                        </Text>
                        <TextInput
                            value={placeOfBirth}
                            onChangeText={setPlaceOfBirth}
                            placeholder="Enter your place of birth"
                            placeholderTextColor="#9CA3AF"
                            className="bg-white border border-stroke_grey_1 rounded-xl px-4 py-4 text-black text-base"
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
        </KeyboardAvoidingView>
    );
}