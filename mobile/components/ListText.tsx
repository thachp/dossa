import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { MinusSmIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import { styles } from "../common/css.config";

export interface TextItem {
    id: string;
    label: string;
    icon?: ReactNode;
}

export interface TextProps extends TextItem {
    isSelected?: boolean;
}

export interface ListProps {
    items: Array<TextItem>;
    icon?: ReactNode;
    selectedItems?: Array<string>;
}

const Item = ({ label, isSelected, icon }: TextProps) => {
    return (
        <View style={styles("flex flex-row")}>
            {isSelected && <View style={styles("m-1")}>{icon}</View>}
            <Text style={styles("text-white text-lg")}>{label}</Text>
        </View>
    );
};

export const ListText = ({ items = [], selectedItems = [], icon: _icon }: ListProps) => {
    return (
        <View style={styles("flex justify-evenly items-start")}>
            {items.map((item) => {
                let isSelected = selectedItems.includes(item.id);
                const icon = isSelected ? _icon : <MinusSmIcon size={20} fill={getColor("gray-200")} />;
                return <Item key={item.id} {...item} icon={icon} isSelected />;
            })}
        </View>
    );
};

export default ListText;
