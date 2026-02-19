import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1C1C1E",
    },
});
