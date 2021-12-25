import * as DocumentPicker from "expo-document-picker";
import * as React from "react";
import { Controller, FieldValues, UseFormReturn, useWatch } from "react-hook-form";
import { ScrollView, Text, TextInput, View } from "react-native";
import { OfficeBuildingIcon, PaperClipIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import { ATTACHMENTS_MAX, DESCRIPTION_MAX, INSTITUTIONS_MAX } from "../../common/constants/settings.constant";
import { styles } from "../../common/css.config";
import { Attachment } from "../../common/interfaces/attachment.interface";
import t from "../../common/translate.config";
import SelectButton from "../../components/buttons/Select.button";
import SwipeableRow from "../../components/Swipeable.row";

const pretty = require("prettysize");

export interface IncidentEditorFormProps {
    formRef: UseFormReturn<FieldValues>;
    onRemove: (id: string, type: "institution" | "attachment") => void;
    onAdd: (document: Attachment) => void;
    navigation: any;
}

export default ({ formRef, navigation, onRemove, onAdd }: IncidentEditorFormProps) => {
    const {
        control,
        formState: { errors }
    } = formRef;

    const { description, caseType, institutions, attachments } = useWatch({
        control
    });

    const remainingLength = DESCRIPTION_MAX - description.length;

    const swapStyles = styles("pl-2 border-t border-gray-200 h-9 bg-gray-100", "items-start justify-center");
    const lastSwapStyles = styles(
        "pl-2 rounded-3xl rounded-t-none border-t",
        "border-gray-100 bg-gray-100 items-start",
        "justify-center"
    );

    const onPickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ["image/*", "audio/*", "video/*", "application/pdf", "text/plain"]
        });

        if (result.type === "success") {
            return onAdd(result);
        }
    };

    return (
        <ScrollView style={styles("flex flex-col px-2 pt-2 bg-gray-800")}>
            <SelectButton
                classes="rounded-b-none"
                label={t("incident.title")}
                onPress={() => navigation.navigate("SearchIncidents")}
            >
                {caseType && caseType.name && (
                    <View style={styles("border-t bg-gray-100  border-gray-300")}>
                        <Text style={styles("text-xs font-medium text-gray-400 px-2 py-1.5")} numberOfLines={2}>
                            {caseType.name}
                        </Text>
                    </View>
                )}
                {errors.caseType && (
                    <View style={styles("flex items-start justify-center bg-yellow-500 p-1")}>
                        <Text style={styles("text-gray-100 text-sm")}>{errors.caseType.message}</Text>
                    </View>
                )}

                {errors.description && (
                    <View style={styles("flex items-start justify-center bg-yellow-500 p-1")}>
                        <Text style={styles("text-gray-100 text-sm")}>{errors.description.message}</Text>
                    </View>
                )}
                {errors.institutions && (
                    <View style={styles("flex items-start justify-center bg-yellow-500 p-1")}>
                        <Text style={styles("text-gray-100 text-sm")}>{errors.institutions.message}</Text>
                    </View>
                )}
            </SelectButton>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        autoCapitalize="sentences"
                        autoFocus
                        returnKeyType="next"
                        style={{
                            ...styles("w-full bg-white p-2 my-0 border-gray-200 border-t border-b"),
                            height: 150,
                            fontSize: 16
                        }}
                        editable={true}
                        multiline
                        placeholderTextColor={getColor("gray-400")}
                        placeholder={t("create.placeholder")}
                        maxLength={DESCRIPTION_MAX}
                        numberOfLines={8}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="description"
            />

            <Controller
                control={control}
                rules={{
                    maxLength: 40
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        maxLength={40}
                        placeholderTextColor={getColor("gray-400")}
                        style={{
                            ...styles("rounded-md rounded-t-none w-full bg-white px-2"),
                            height: 40,
                            fontSize: 16
                        }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={t("create.hashtags")}
                    />
                )}
                name="hashtags"
            />

            <Text
                style={{
                    ...styles("text-right m-2 mt-1 mb-2"),
                    fontSize: 12,
                    color: remainingLength < 0 ? "red" : "white"
                }}
            >
                {t("create.remaining", { count: remainingLength })}
            </Text>

            <SelectButton
                classes={(institutions.length > 0 && "rounded-b-none mt-2") || "mt-2"}
                label={t("create.institutions")}
                icon={
                    <OfficeBuildingIcon
                        fill={institutions.length >= INSTITUTIONS_MAX ? getColor("gray-200") : getColor("gray-500")}
                    />
                }
                onPress={
                    institutions.length >= INSTITUTIONS_MAX
                        ? () => {}
                        : () =>
                              navigation.navigate("Tabs", {
                                  screen: "Institution"
                              })
                }
            >
                {institutions?.map((institution: { id: string; name: string }, index: number) => (
                    <SwipeableRow
                        key={institution.id}
                        id={institution.id}
                        onRightAction={(id: string) => onRemove(id, "institution")}
                    >
                        <View style={swapStyles}>
                            <Text>{institution.name}</Text>
                        </View>
                    </SwipeableRow>
                ))}
                {institutions.length > 0 && <View style={{ ...lastSwapStyles, height: 5 }} />}
            </SelectButton>

            <SelectButton
                classes={(attachments.length > 0 && "rounded-b-none mt-3") || "mt-3"}
                label={t("create.attachments")}
                icon={
                    <PaperClipIcon
                        fill={attachments.length >= ATTACHMENTS_MAX ? getColor("gray-200") : getColor("gray-500")}
                    />
                }
                onPress={attachments.length >= ATTACHMENTS_MAX ? () => {} : onPickDocument}
            >
                {attachments?.map((attachment: Attachment, index: number) => (
                    <SwipeableRow
                        key={attachment.name}
                        id={attachment.name}
                        onRightAction={(id: string) => onRemove(id, "attachment")}
                    >
                        <View style={swapStyles}>
                            <Text>
                                {attachment.name} ({pretty(attachment.size)})
                            </Text>
                        </View>
                    </SwipeableRow>
                ))}
                {attachments.length > 0 && <View style={{ ...lastSwapStyles, height: 5 }} />}
            </SelectButton>
        </ScrollView>
    );
};
