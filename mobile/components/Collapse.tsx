import React, { useState } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import { styles } from "../common/css.config";

export interface CollapseItem {
    id: string;
    title: string;
    body: string;
}

interface CollapseItemProps extends CollapseItem {
    isOpen?: boolean;
    height?: number;
    classes?: string;
    onItemClick?: (id: string) => void;
}

interface CollapseProps {
    title?: string;
    description?: string;
    items: CollapseItemProps[];
}

export const CollapseItem = ({ id, title, body, isOpen = false, onItemClick }: CollapseItemProps) => {
    const onToggle = () => {
        onItemClick && onItemClick(id);
    };

    const selectStyles = {
        ...styles("bg-white px-3 mt-3 rounded-md bg-gray-300 flex flex-row justify-between items-center", {
            "bg-gray-100": isOpen,
            "rounded-b-none mb-0 border-b border-gray-200": isOpen
        }),
        height: 40
    };

    return (
        <>
            <TouchableOpacity onPress={onToggle}>
                <View style={selectStyles}>
                    <Text style={styles("font-bold")}>{title}</Text>
                    {isOpen ? (
                        <ChevronUpIcon size={20} fill={getColor("gray-600")} />
                    ) : (
                        <ChevronDownIcon size={20} fill={getColor("gray-600")} />
                    )}
                </View>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles("bg-gray-100 p-3 rounded-md rounded-t-none ")}>
                    <Text>{body}</Text>
                </View>
            )}
        </>
    );
};

const Collapse = ({ title, items }: CollapseProps) => {
    const [openIndex, setOpenIndex] = useState<string>(items[0].id || "");

    return (
        <>
            {title && (
                <View style={styles("my-2")}>
                    <Text style={styles("text-lg text-white")}>{title}</Text>
                </View>
            )}

            <ScrollView style={styles("flex flex-col px-2 bg-gray-800")}>
                {items.map((item) => (
                    <CollapseItem
                        key={item.id}
                        {...item}
                        isOpen={item.id === openIndex}
                        onItemClick={(id) => setOpenIndex(id)}
                    />
                ))}
            </ScrollView>
        </>
    );
};

export default Collapse;
