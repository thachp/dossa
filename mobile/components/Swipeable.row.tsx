import React, { Component } from "react";
import { Animated, I18nManager, StyleSheet, Text, View } from "react-native";
import { RectButton, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { getColor } from "tailwind-rn";

interface SwipeableRowProps {
    id: string;
    children: React.ReactNode;
    onRightAction: (id: string, action: string) => void;
}

const SwipeableRow = ({ id, children, onRightAction }: SwipeableRowProps) => {
    let swipeableRow: Swipeable | undefined;

    const updateRef = (ref: Swipeable) => {
        swipeableRow = ref;
    };

    const openRight = () => {
        swipeableRow?.openRight();
    };

    const close = () => {
        swipeableRow?.close();
    };

    const renderRightAction = (text: string, color: string, x: number, progress: Animated.AnimatedInterpolation) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0]
        });
        const pressHandler = () => {
            close();
            onRightAction(id, text);
        };

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (
        progress: Animated.AnimatedInterpolation,
        _dragAnimatedValue: Animated.AnimatedInterpolation
    ) => (
        <View
            style={{
                width: 70,
                flexDirection: I18nManager.isRTL ? "row-reverse" : "row"
            }}
        >
            {renderRightAction("Remove", getColor("gray-400"), 60, progress)}
        </View>
    );

    return (
        <Swipeable
            ref={updateRef}
            friction={2}
            enableTrackpadTwoFingerGesture
            leftThreshold={30}
            rightThreshold={40}
            renderRightActions={renderRightActions}
        >
            <TouchableWithoutFeedback onPress={() => openRight()}>{children}</TouchableWithoutFeedback>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    actionText: {
        color: "white",
        fontSize: 16,
        backgroundColor: "transparent",
        padding: 10
    },
    rightAction: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    }
});

export default SwipeableRow;
