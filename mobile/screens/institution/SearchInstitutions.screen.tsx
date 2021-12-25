import { useState } from "@hookstate/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import Svg, { Path } from "react-native-svg";
import { getColor } from "tailwind-rn";

import { INSTITUTIONS_MAX } from "../../common/constants/settings.constant";
import { styles } from "../../common/css.config";
import { globalState } from "../../common/global.state";
import { useLazyQuery, useQuery } from "../../common/hooks/useApollo.hook";
import { RootStackParamList } from "../../common/interfaces/types.interface";
import t from "../../common/translate.config";
import SearchInput from "../../components/inputs/Search.input";
import ListItems, { ListItem } from "../../components/ListItems";
import { GET_INSTITUTIONS_LIST, SEARCH_INSTITUTIONS_LIST } from "./institution.constant";

export default function SearchInstitutionsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Tabs">) {
    // set a list of institutions
    const [records, setRecords] = React.useState<Array<ListItem>>([]);

    // get the incidents
    const global = useState(globalState);
    const { institutions: _institutions = [] } = global.get();
    const institutions = _institutions.map((item) => JSON.parse(item));

    // on completed search
    const onCompleted = (data: {
        institutions: {
            edges: [
                {
                    node: {
                        id: string;
                        name: string;
                        description: string;
                    };
                }
            ];
        };
    }) => {
        if (data) {
            const items = data.institutions.edges.map(
                (edge: { node: { id: string; name: string; description: string } }) => {
                    return {
                        id: edge.node.id,
                        title: edge.node.name,
                        subtitle: edge.node.description
                    };
                }
            );
            setRecords(items);
        }
    };

    // query the institutions
    const { loading, error } = useQuery(GET_INSTITUTIONS_LIST, { onCompleted });
    const [searchInstitutions] = useLazyQuery(SEARCH_INSTITUTIONS_LIST, { onCompleted });

    const onSearchInstitutions = (value: string) => {
        searchInstitutions({
            variables: {
                where: {
                    name: {
                        matchesRegex: value,
                        options: "i"
                    }
                }
            }
        });
    };

    const onItemPress = (item: ListItem) => {
        const findIndex = institutions.findIndex((institution) => institution.id === item.id);

        if (findIndex > -1) {
            return global.institutions.set(_institutions.filter((elem, i) => i !== findIndex));
        }

        // if the institution is not found, add it
        if (findIndex === -1) {
            global.institutions.merge([
                JSON.stringify({
                    id: item.id,
                    name: item.title
                })
            ]);
        }

        // validate if the list is full
        if (_institutions.length + 1 == INSTITUTIONS_MAX) {
            return navigation.navigate("Submit");
        }
    };

    // fetch institutions
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles("flex flex-row items-center")}>
                        <ChevronLeftIcon size={36} fill={getColor("gray-200")} />
                    </View>
                </TouchableOpacity>
            ),
            title: t("create.institutions"),
            headerTintColor: getColor("gray-200"),
            headerStyle: {
                backgroundColor: getColor("gray-800"),
                shadowColor: "transparent"
            } as {
                backgroundColor: string;
                shadowColor: string;
            }
        });
    }, [navigation]);

    if (error) {
        Alert.alert(t("general.error"), error?.message);
    }

    if (loading) {
        return (
            <View style={styles("flex-1 m-2")}>
                <Text style={styles("text-white")}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles("flex-1 m-2")}>
            <SearchInput
                searchLabel={t("institution.search")}
                searchSublabel={(records.length > 0 && t("institution.subtitle")) || undefined}
                onSearch={onSearchInstitutions}
            />

            {records.length > 0 && (
                <ListItems items={records} selectedItems={institutions?.map((i) => i.id)} onItemPress={onItemPress} />
            )}

            {records.length === 0 && (
                <View style={styles("flex-1 flex justify-center items-center")}>
                    <Svg style={styles("h-10 w-10")} viewBox="0 0 20 20" fill={getColor("gray-400")}>
                        <Path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <Path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <Path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </Svg>
                    <Text style={styles("text-center text-gray-500 mt-2")}>{t("institution.empty")}</Text>
                </View>
            )}
        </View>
    );
}
