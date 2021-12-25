import React, { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import styles from "../../common/css.config";

interface SelectButtonProps extends TouchableOpacityProps {
    label: string;
    height?: number;
    icon?: ReactNode;
    classes?: string;
    children?: ReactNode;
}

export const SelectButton = ({ label, children, classes = "my-2", height = 40, icon, ...rest }: SelectButtonProps) => {
    const Icon = icon || <ChevronRightIcon fill={getColor("gray-500")} />;

    const selectStyles = {
        ...styles("bg-white px-2 rounded-md  flex flex-row justify-between items-center", classes),
        height
    };

    return (
        <>
            <TouchableOpacity {...rest}>
                <View style={selectStyles}>
                    <Text style={{ fontSize: 16 }}>{label}</Text>
                    {Icon}
                </View>
            </TouchableOpacity>
            {children}
        </>
    );
};

export default SelectButton;
