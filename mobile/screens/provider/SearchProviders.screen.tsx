import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import { styles } from "../../common/css.config";
import { RootStackParamList } from "../../common/interfaces/types.interface";
import t from "../../common/translate.config";
import SearchInput from "../../components/inputs/Search.input";
import ListItems from "../../components/ListItems";

export default function SearchProvidersScreen({
    navigation
}: NativeStackScreenProps<RootStackParamList, "SearchProviders">) {
    const onSearchText = (values: any) => {
        navigation.navigate("Submit");
    };

    const people = [
        {
            id: "a",
            title: "Calvin Hawkins",
            subtitle: "calvin.hawkins@example.com",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: "b",
            title: "Kristen Ramos",
            subtitle: "kristen.ramos@example.com",
            image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: "c",
            title: "Ted Fox",
            subtitle: "ted.fox@example.com",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: "d",
            title: "Calvin Hawkins",
            subtitle: "calvin.hawkins@example.com",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: "e",
            title: "Kristen Ramos",
            subtitle: "kristen.ramos@example.com",
            image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: "i",
            title: "Calvin Hawkins",
            subtitle: "calvin.hawkins@example.com",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: "j",
            title: "Calvin Hawkins",
            subtitle: "calvin.hawkins@example.com",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: "k",
            title: "Calvin Hawkins",
            subtitle: "calvin.hawkins@example.com",
            image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles("flex flex-row items-center")}>
                        <ChevronLeftIcon size={36} fill={getColor("gray-200")} />
                    </View>
                </TouchableOpacity>
            ),
            title: t("provider.title"),
            headerTintColor: getColor("gray-200"),
            headerStyle: {
                backgroundColor: getColor("gray-800"),
                shadowColor: "transparent"
            } as any
        });
    }, [navigation]);

    return (
        <View style={styles("flex-1 m-2")}>
            <SearchInput
                searchLabel={t("provider.search")}
                searchSublabel={t("provider.subtitle")}
                onSearch={(value: string) => console.log("search", value)}
            />
            <ListItems items={people} onItemPress={() => console.log("got here")} />
        </View>
    );
}
