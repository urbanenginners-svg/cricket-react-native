
import React, { useCallback, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import {
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";

type Option = {
    label: string;
    value: string;
};

type AppSelectProps = {
    options: Option[];
    value?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    hasError?: boolean;
};

export default function AppSelect({
    options,
    value,
    placeholder = "Select option",
    onChange,
    hasError = false,
}: AppSelectProps) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const openSheet = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <>
            <Pressable
                onPress={() => {
                    openSheet();
                }}
                className={`border rounded-xl px-4 py-4 bg-white flex-row justify-between items-center ${hasError ? "border-red-400" : "border-gray-200"}`}
            >
                <Text
                    className={`text-base ${selectedOption ? "text-black" : "text-gray-400"
                        }`}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>

                <Text className="text-gray-400">▼</Text>
            </Pressable>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                enableDynamicSizing
                enablePanDownToClose
            >
                <BottomSheetView>
                    <View className="px-4 pb-8">
                        {options.map((item) => {
                            const isSelected = item.value === value;

                            return (
                                <Pressable
                                    key={item.value}
                                    onPress={() => {
                                        onChange(item.value);
                                        bottomSheetModalRef.current?.dismiss();
                                    }}
                                    className="py-4 border-b border-gray-100"
                                >
                                    <Text
                                        className={`text-base ${isSelected
                                            ? "font-semibold text-blue-600"
                                            : "text-black"
                                            }`}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    );
}
