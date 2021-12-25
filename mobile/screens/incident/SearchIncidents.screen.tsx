import { useState } from "@hookstate/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import { styles } from "../../common/css.config";
import { globalState } from "../../common/global.state";
import { useQuery } from "../../common/hooks/useApollo.hook";
import { RootStackParamList } from "../../common/interfaces/types.interface";
import t from "../../common/translate.config";
import ListItems, { ListItem } from "../../components/ListItems";
import { GETINCIDENTTYPES_LIST } from "./incident.constant";

export default function SearchIncidentsScreen({
    navigation
}: NativeStackScreenProps<RootStackParamList, "SearchIncidents">) {
    // set a list of incidents
    const [incidents, setIncidents] = React.useState<Array<ListItem>>([]);

    // get the incidents
    const global = useState(globalState);
    const { caseType: _caseType } = global.get();
    const caseTypeState = _caseType && JSON.parse(_caseType);

    // query the incidents
    const { loading, error } = useQuery(GETINCIDENTTYPES_LIST, {
        onCompleted: (data) => {
            if (data) {
                const items = data.incidentTypes.edges.map(
                    (edge: { node: { id: string; name: string; description: string } }) => {
                        return {
                            id: edge.node.id,
                            title: edge.node.name,
                            subtitle: edge.node.description
                        };
                    }
                );
                setIncidents(items);
            }
        }
    });

    const onItemPress = (item: ListItem) => {
        // set case type
        global.caseType.set(
            JSON.stringify({
                id: item.id,
                name: item.title
            })
        );

        // navigate to the submit screen
        navigation.navigate("Submit");
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles("flex flex-row items-center")}>
                        <ChevronLeftIcon size={36} fill={getColor("gray-200")} />
                    </View>
                </TouchableOpacity>
            ),
            title: t("incident.title"),
            headerTintColor: getColor("gray-200"),
            headerStyle: {
                backgroundColor: getColor("gray-800"),
                shadowColor: "transparent"
            } as any
        });
    }, [navigation]);

    if (error) {
        Alert.alert(t("general.error"), error.message);
    }

    if (loading) {
        return (
            <View style={styles("flex-1 m-2")}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles("flex-1 m-2")}>
            <ListItems
                items={incidents}
                selectedItems={caseTypeState && [caseTypeState?.id]}
                onItemPress={onItemPress}
            />
        </View>
    );
}
