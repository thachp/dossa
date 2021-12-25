import React, { ReactNode, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import styles from "../common/css.config";

export interface ListItem {
    id: string;
    title: string;
    subtitle: string;
    image?: string;
}

export interface ListItemProps extends ListItem {
    isSelected?: boolean;
    onItemPress: (item: ListItem) => void;
}

export interface ListProps {
    items: Array<ListItem>;
    selectedItems?: Array<string>;
    onItemPress: (item: ListItem) => void;
}

const Item = ({ id, title, subtitle, image, onItemPress, isSelected = false }: ListItemProps) => {
    const [toggle, setToggle] = useState<boolean>(true);

    let textIcon = title
        .replace(/-/g, "")
        .split(" ")
        .map((item) => item[0])
        .slice(0, 2)
        .join("");

    return (
        <TouchableOpacity
            onPress={() => onItemPress({ id, title, subtitle, image })}
            onLongPress={() => setToggle(!toggle)}
            style={styles("py-4 flex flex-row bg-white border-b border-gray-300")}
        >
            {image && <Image style={styles("h-10 w-10 rounded-full")} source={{ uri: image }} />}
            {!image && (
                <View
                    style={styles(
                        "h-10 w-10 rounded-full items-center bg-gray-400 border-2 border-gray-200 justify-center"
                    )}
                >
                    <Text style={styles("text-white font-bold uppercase tracking-wider text-lg")}>{textIcon}</Text>
                </View>
            )}
            <View style={styles("ml-3 flex-1")}>
                <Text style={styles("text-sm font-medium text-gray-900")}>{title}</Text>
                <Text style={styles("text-sm text-gray-500")} numberOfLines={toggle ? 2 : 0}>
                    {subtitle}
                </Text>
            </View>
            <View style={styles("mr-2")}>{isSelected && <CheckIcon fill={getColor("gray-400")} size={25} />}</View>
        </TouchableOpacity>
    );
};

export const ListItems = ({ items = [], selectedItems = [], onItemPress }: ListProps) => {
    return (
        <ScrollView style={styles("flex")}>
            {items.map((item) => (
                <Item key={item.id} {...item} isSelected={selectedItems.includes(item.id)} onItemPress={onItemPress} />
            ))}
        </ScrollView>
    );
};

export default ListItems;
