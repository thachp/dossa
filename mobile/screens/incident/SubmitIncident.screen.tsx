import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "@hookstate/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DocumentResult } from "expo-document-picker";
import React, { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { HomeIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";
import * as yup from "yup";

import { ATTACHMENTS_MAX, DESCRIPTION_MAX, INSTITUTIONS_MAX } from "../../common/constants/settings.constant";
import styles from "../../common/css.config";
import { globalState } from "../../common/global.state";
import { Attachment } from "../../common/interfaces/attachment.interface";
import { RootStackParamList } from "../../common/interfaces/types.interface";
import { t } from "../../common/translate.config";
import FormEditor from "./IncidentEditor.form";

interface Incident {
    caseType: any;
    description: string;
    attachments: Array<DocumentResult>;
    institutions: Array<any>;
    hashtags: string;
}

const schema = yup
    .object()
    .shape({
        caseType: yup.object().required().label(t("incident.title")),
        institutions: yup.array().required().min(1).max(INSTITUTIONS_MAX).label(t("institution.title")),
        description: yup.string().min(5).max(DESCRIPTION_MAX).required().label(t("create.description"))
    })
    .required();

export default function SubmitIncidentScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Submit">) {
    // get the incidents
    const global = useState(globalState);
    const { institutions: _institutions, attachments: _attachments, caseType: _caseType } = global.get();
    const institutions = _institutions.map((item) => JSON.parse(item));
    const caseType = _caseType && JSON.parse(_caseType);
    const attachments = _attachments.map((item) => JSON.parse(item));

    const formRef = useForm<Incident>({
        resolver: yupResolver(schema),
        defaultValues: {
            caseType: {},
            institutions: [],
            attachments: [],
            description: "",
            hashtags: ""
        }
    });

    const onSubmit = (data: Incident) => {
        global.description.set(data.description);
        global.hashtags.set(data.hashtags);

        navigation.reset({
            index: 0,
            routes: [{ name: "ProcessingIncident" }]
        });
    };

    const onRemove = (id: string, type: "institution" | "attachment") => {
        if (type === "institution") {
            const findIndex = institutions.findIndex((institution) => institution.id === id);
            global.institutions.set(_institutions.filter((elem, i) => i !== findIndex));
        }

        if (type === "attachment") {
            const findIndex = attachments.findIndex((attachment) => attachment.name === id);
            global.attachments.set(_attachments.filter((elem, i) => i !== findIndex));
        }
    };

    const onAdd = (document: Attachment) => {
        // validate if the list is full
        if (attachments.length >= ATTACHMENTS_MAX) {
            return Alert.alert(
                t("attachment.error.max", {
                    max: ATTACHMENTS_MAX
                })
            );
        }

        // find index
        const findIndex = attachments.findIndex((attachment) => attachment.name === document.name);
        // if the institution is not found, add it
        if (findIndex === -1) {
            global.attachments.merge([JSON.stringify(document)]);
        }
    };

    useEffect(() => {
        formRef.setValue("institutions", institutions);
        formRef.setValue("attachments", attachments);
        formRef.setValue("caseType", caseType);
    }, [formRef, caseType, institutions, attachments]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t("create.title"),
            headerStyle: {
                shadowColor: "transparent",
                backgroundColor: getColor("gray-800")
            } as {
                shadowColor: string;
                backgroundColor: string;
            },
            headerTintColor: getColor("gray-200"),
            headerTitleStyle: {
                fontSize: 16
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <View style={styles("flex flex-row justify-center items-center")}>
                        <HomeIcon size={24} fill={getColor("gray-200")} />
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={formRef.handleSubmit(onSubmit)}>
                    <View style={styles("rounded-md p-2 bg-gray-500")}>
                        <Text style={{ ...styles("font-bold"), color: "white" }}>{t("general.submit")}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={styles("flex flex-col justify-start items-stretch ")}>
            <FormEditor navigation={navigation} formRef={formRef as any} onAdd={onAdd} onRemove={onRemove} />
        </View>
    );
}
