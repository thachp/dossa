import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { getColor } from "tailwind-rn";

import styles from "../../common/css.config";
import { RootStackParamList } from "../../common/interfaces/types.interface";
import { t } from "../../common/translate.config";
import Collapse, { CollapseItem } from "../../components/Collapse";

const questions: Array<CollapseItem> = [
    {
        id: "1",
        title: t("about.faq.faq1.question"),
        body: t("about.faq.faq1.answer")
    },
    {
        id: "2",
        title: t("about.faq.faq2.question"),
        body: t("about.faq.faq2.answer")
    },
    {
        id: "3",
        title: t("about.faq.faq3.question"),
        body: t("about.faq.faq3.answer")
    },
    {
        id: "4",
        title: t("about.faq.faq4.question"),
        body: t("about.faq.faq4.answer")
    },
    {
        id: "5",
        title: t("about.faq.faq5.question"),
        body: t("about.faq.faq5.answer")
    }
];

export default function AboutScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "About">) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: t("about.title"),
            headerStyle: {
                shadowColor: "transparent",
                backgroundColor: getColor("gray-800")
            } as any,
            headerTintColor: getColor("gray-200"),
            headerTitleStyle: {
                fontSize: 16
            }
        });
    }, [navigation]);

    return (
        <View style={styles("flex flex-col justify-start items-center ")}>
            <View style={styles("bg-gray-200 m-2 rounded-md p-2")}>
                <Text style={styles("text-base")}>{t("about.description")}</Text>
            </View>
            <Collapse title={t("about.faq.title")} items={questions} />
        </View>
    );
}
