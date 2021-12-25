import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { ArrowCircleRightIcon } from "react-native-heroicons/solid";

import styles from "../../common/css.config";

interface ConnectButtonProps {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
}

export const ConnectButton = ({ label, onPress }: ConnectButtonProps) => {
    return (
        <TouchableOpacity style={styles("rounded-md bg-gray-200 w-2/3 py-2")} onPress={onPress}>
            <View
                style={{
                    ...styles("bg-transparent px-3 rounded-md flex flex-row justify-between items-center")
                }}
            >
                <Text style={styles("text-center font-bold")}>{label}</Text>
                <ArrowCircleRightIcon fill="black" />
            </View>
        </TouchableOpacity>
    );
};

export default ConnectButton;
