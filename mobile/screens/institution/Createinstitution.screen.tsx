import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { getColor } from "tailwind-rn";

import { styles } from "../../common/css.config";
import { RootStackParamList } from "../../common/interfaces/types.interface";

export default function CreateInstitutionScreen({
    navigation
}: NativeStackScreenProps<RootStackParamList, "CreateInstitution">) {
    //
    const onSearchText = (values: any) => {
        navigation.navigate("Submit");
    };

    //
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerStyle: {
                borderBottomWidth: 0,
                backgroundColor: getColor("gray-800")
            } as any,
            headerTintColor: getColor("gray-200"),
            headerTitleStyle: styles("text-lg")
        });
    }, [navigation]);

    return (
        <View style={styles("flex m-2")}>
            <Text>Create </Text>
        </View>
    );
}
