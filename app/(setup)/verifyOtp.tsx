import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function VerifyOtp() {
    const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(59);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const { handleVerifyOtp, handleResendOtp, loading, error } = useAuth();

    // Countdown timer
    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (text: string, index: number) => {
        // Only allow digits
        const digit = text.replace(/[^0-9]/g, "");
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Auto-focus next input
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
        }
    };

    const handleResend = () => {
        if (!canResend) return;
        setTimer(59);
        setCanResend(false);
        if (phoneNumber) {
            handleResendOtp(phoneNumber);
        }
    };

    const handleConfirm = async () => {
        try {
            if (otp.some((digit) => digit === "")) {
                alert("Please enter the complete OTP.");
                return;
            }
            if (otp.length !== 6) {
                alert("OTP must be 6 digits.");
                return;
            }
            if (!phoneNumber) {
                alert("Phone number is missing.");
                return;
            }
            const otpCode = otp.join("");
            await handleVerifyOtp({ phoneNumber, otp: otpCode });
            router.replace("/(setup)/onboarding/selectRole");
        } catch (err) {
            console.log("OTP verification failed:", err);
        }

    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    return (
        <>
            {/* Hide header title for this screen */}
            <Stack.Screen options={{ headerTitle: "" }} />

            <View className="flex-1 bg-white px-8 pt-4 ">
                {/* Header */}
                <View className="mb-5">
                    <Text className="text-black_1 text-2xl font-bold">
                        Verify Your Number
                    </Text>
                    <Text className="text-grey_1 text-xs font-medium mt-[10px]">
                        A verification code has been sent to{" "}
                        <Text className="text-black_1 font-bold">
                            {phoneNumber || "your number"}
                        </Text>
                        .
                    </Text>
                </View>

                {/* OTP Input Boxes */}
                <View className="flex-row justify-between mb-5" style={{ gap: 10 }}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputRefs.current[index] = ref;
                            }}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            className="flex-1 border border-stroke_grey_1 rounded-xl bg-white text-center text-xl font-semibold text-black_1"
                            style={{
                                height: 50,
                                textAlignVertical: "center",
                                textAlign: "center",
                                padding: 0,
                            }}
                        />
                    ))}
                </View>

                {error && (
                    <Text className="text-red-500 text-xs text-center mb-4">
                        {error}
                    </Text>
                )}

                {/* Resend Timer */}
                <View className="mb-5">
                    <Text className="text-grey_1 text-xs font-medium">
                        Didn't get the code?{" "}
                        {canResend ? (
                            <Text
                                className="text-primary font-semibold"
                                onPress={handleResend}
                            >
                                Resend
                            </Text>
                        ) : (
                            <Text>
                                Resend in{" "}
                                <Text className="text-primary font-semibold">
                                    {formatTime(timer)}
                                </Text>
                            </Text>
                        )}
                    </Text>
                </View>

                {/* Confirm Button */}
                <Pressable
                    onPress={handleConfirm}
                    disabled={loading}
                    className="py-[10px]  rounded-[10px] bg-primary"
                >
                    <Text className="text-white text-center text-sm font-medium">
                        Confirm
                    </Text>
                </Pressable>
            </View>
        </>
    );
}