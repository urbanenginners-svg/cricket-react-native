import { Text, TextInput, View } from "react-native"

export default function Login() {
    return <View className="">
        <View className="mb-5">
            <Text className="text-black_1 text-2xl font-bold">Welcome to Your Cricket Space</Text>
            <Text className="text-grey_1 text-xs font-medium pt-[10px]">Sign in to manage sessions, track progress, and stay connected with your academy.</Text>
        </View>
        <View>
            <Text>Phone Number</Text>
            <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 focus:border-primary focus:ring-primary"
            />
        </View>


    </View>
}