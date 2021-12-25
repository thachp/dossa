import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../Themed";

interface SaveButtonProps {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
}

export const ConnectButton = ({ label, onPress }: SaveButtonProps) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

export default ConnectButton;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 10,
        elevation: 3,
        paddingHorizontal: 60,
        marginBottom: 20,
        backgroundColor: "#f2f2f2",
        padding: 10
    },
    label: {
        alignSelf: "center",
        textAlign: "center",
        color: "black",
        fontSize: 15,
        fontWeight: "bold"
    }
});
