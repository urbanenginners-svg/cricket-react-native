import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View, Platform } from "react-native";
import PhoneInput, { ICountry, isValidPhoneNumber } from "react-native-international-phone-number";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import AppSelect from "@/components/common/AppSelect";

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------
const createAccountSchema = z.object({
    fullName: z
        .string({ required_error: "Full name is required." })
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .regex(/^[a-zA-Z\s''-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes."),

    gender: z
        .string({ required_error: "Please select a gender." })
        .min(1, "Please select a gender."),

    phoneNumber: z
        .string({ required_error: "Phone number is required." })
        .min(1, "Phone number is required."),

    dateOfBirth: z
        .date({ required_error: "Date of birth is required.", invalid_type_error: "Please select a valid date." }),

    placeOfBirth: z
        .string({ required_error: "Place of birth is required." })
        .trim()
        .min(2, "Please enter a valid place of birth."),
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function CreateCricketAccount() {
    const [selectedCountry, setSelectedCountry] = useState<ICountry>();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            fullName: "",
            gender: "",
            phoneNumber: "",
            placeOfBirth: "",
        },
    });

    const selectedDate = watch("dateOfBirth");

    const onDateChange = (event: DateTimePickerEvent, pickedDate?: Date) => {
        if (Platform.OS === "android") setShowDatePicker(false);
        if (event.type === "set" && pickedDate) {
            setValue("dateOfBirth", pickedDate, { shouldValidate: true });
        }
    };

    const getMinDate = () => { const d = new Date(); d.setFullYear(d.getFullYear() - 80); return d; };
    const getMaxDate = () => { const d = new Date(); d.setFullYear(d.getFullYear() - 5); return d; };

    const onSubmit = (data: CreateAccountFormData) => {
        console.log("Form Data:", data);
        router.push("/(setup)/verifyOtp");
    };

    const displayDate = selectedDate
        ? selectedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : "Select Date of Birth";

    // Shared styles
    const inputClass = (hasError: boolean) =>
        `bg-white border rounded-xl px-4 py-4 text-black text-sm ${hasError ? "border-red-400" : "border-stroke_grey_1"}`;

    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View>
                {/* ── Header ─────────────────────────────────────────── */}
                <View className="mb-5">
                    <Text className="text-black_1 text-2xl font-bold">Create Your Cricket Account</Text>
                    <Text className="text-grey_1 text-xs font-medium pt-[10px]">
                        Join your academy or set up your own. Whether you're a player or a coach. Your journey begins here.
                    </Text>
                </View>

                {/* ── Full Name ───────────────────────────────────────── */}
                <View className="mb-4">
                    <Text className="text-grey_1 text-xs font-medium mb-2">
                        Full Name <Text className="text-red-500">*</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="fullName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="Enter your full name"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="words"
                                returnKeyType="next"
                                className={inputClass(!!errors.fullName)}
                            />
                        )}
                    />
                    {errors.fullName && (
                        <Text className="text-red-500 text-xs mt-1">{errors.fullName.message}</Text>
                    )}
                </View>

                {/* ── Gender ──────────────────────────────────────────── */}
                <View className="mb-4">
                    <Text className="text-grey_1 text-xs font-medium mb-2">
                        Gender <Text className="text-red-500">*</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field: { value, onChange } }) => (
                            <AppSelect
                                options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                    { label: "Other", value: "other" },
                                ]}
                                value={value}
                                onChange={onChange}
                                hasError={!!errors.gender}
                            />
                        )}
                    />
                    {errors.gender && (
                        <Text className="text-red-500 text-xs mt-1">{errors.gender.message}</Text>
                    )}
                </View>

                {/* ── Phone Number ─────────────────────────────────────── */}
                <View className="mb-4">
                    <Text className="text-grey_1 text-xs font-medium mb-2">
                        Phone Number <Text className="text-red-500">*</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="phoneNumber"
                        rules={{
                            validate: (value) => {
                                if (!value) return "Phone number is required.";
                                if (selectedCountry && !isValidPhoneNumber(value, selectedCountry)) {
                                    return "Please enter a valid phone number.";
                                }
                                return true;
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <PhoneInput
                                value={value}
                                onChangePhoneNumber={onChange}
                                selectedCountry={selectedCountry}
                                onChangeSelectedCountry={setSelectedCountry}
                                onBlur={onBlur}
                                placeholder="9999 9999 99"
                                phoneInputStyles={{
                                    flagContainer: { backgroundColor: "white" },
                                    container: {
                                        borderColor: errors.phoneNumber ? "#f87171" : "#EDF1F3",
                                    },
                                }}
                            />
                        )}
                    />
                    {errors.phoneNumber && (
                        <Text className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</Text>
                    )}
                </View>

                {/* ── Date of Birth ────────────────────────────────────── */}
                <View className="mb-4">
                    <Text className="text-grey_1 text-xs font-medium mb-2">
                        Date of Birth <Text className="text-red-500">*</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="dateOfBirth"
                        render={() => (
                            <Pressable
                                onPress={() => setShowDatePicker(true)}
                                className={`border rounded-xl px-4 py-4 bg-white flex-row justify-between items-center ${errors.dateOfBirth ? "border-red-400" : "border-gray-200"}`}
                            >
                                <Text className={`text-sm ${selectedDate ? "text-black" : "text-gray-400"}`}>
                                    {displayDate}
                                </Text>
                                <Text className="text-gray-400">▼</Text>
                            </Pressable>
                        )}
                    />
                    {errors.dateOfBirth && (
                        <Text className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</Text>
                    )}
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate ?? new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={onDateChange}
                            maximumDate={getMaxDate()}
                            minimumDate={getMinDate()}
                        />
                    )}
                </View>

                {/* ── Place of Birth ───────────────────────────────────── */}
                <View className="mb-4">
                    <Text className="text-grey_1 text-xs font-medium mb-2">
                        Place of Birth <Text className="text-red-500">*</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="placeOfBirth"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="Enter your place of birth"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="words"
                                returnKeyType="done"
                                className={inputClass(!!errors.placeOfBirth)}
                            />
                        )}
                    />
                    {errors.placeOfBirth && (
                        <Text className="text-red-500 text-xs mt-1">{errors.placeOfBirth.message}</Text>
                    )}
                </View>

                {/* ── Register Button ──────────────────────────────────── */}
                <View className="mb-6">
                    <Pressable
                        className="py-[14px] rounded-[10px] bg-primary mt-6"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-white text-center text-sm font-medium">Register</Text>
                    </Pressable>
                </View>
            </View>

            {/* ── Footer ─────────────────────────────────────────────── */}
            <View className="flex-row items-center justify-center gap-2 mb-12">
                <Text className="text-grey_1 text-xs font-medium">Already have an account? </Text>
                <Pressable onPress={() => router.replace("/(auth)/login")}>
                    <Text className="text-primary text-xs font-semibold">Login</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}