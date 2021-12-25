import { ApolloError } from "@apollo/client";
import { useState } from "@hookstate/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNativeFile } from "apollo-upload-client";
import LottieView from "lottie-react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import { styles } from "../../common/css.config";
import { globalState } from "../../common/global.state";
import { useMutation } from "../../common/hooks/useApollo.hook";
import { RootStackParamList } from "../../common/interfaces/types.interface";
import t from "../../common/translate.config";
import { ListText } from "../../components/ListText";
import { CHECK_VPN, CREATE_ASSET, CREATE_FILE, CREATE_INCIDENT } from "./incident.constant";

const textItems = [
    {
        id: "connected",
        label: t("submitting.states.connecting")
    },
    {
        id: "uploaded",
        label: t("submitting.states.uploading")
    },
    {
        id: "created",
        label: t("submitting.states.creating")
    },
    {
        id: "submitted",
        label: t("submitting.states.submitting")
    },

    {
        id: "done",
        label: t("submitting.states.done")
    }
];

interface LocalState {
    states: Array<"connected" | "uploaded" | "created" | "submitted" | "done">;
    files: Array<{
        name: string;
        url: string;
    }>;
    assets: Array<string>;
}

export default function ProcessingIncidentsScreen({
    navigation
}: NativeStackScreenProps<RootStackParamList, "ProcessingIncident">) {
    const global = useState(globalState);
    const local = useState<LocalState>({
        states: [],
        files: [],
        assets: []
    });

    // get states from global state
    const {
        institutions: _institutions,
        attachments: _attachments,
        caseType: _caseType,
        user: _user,
        description,
        hashtags: _hashtags
    } = global.get();

    const institutions = _institutions.map((institution) => JSON.parse(institution));
    const attachments = _attachments.map((attachment) => JSON.parse(attachment)) || [];
    const caseType = _caseType && JSON.parse(_caseType);
    const user = _user && JSON.parse(_user);
    const hashtags = (_hashtags && _hashtags.split(",").map((hashtag) => hashtag.trim())) || [];

    const { assets } = local.get();

    // check vpn and set states
    const [checkVPN] = useMutation(CHECK_VPN, {
        onError: (error: ApolloError) => {
            Alert.alert(t("error.title"), error.message);
        },
        onCompleted: (data: { hasVPN: string }) => {
            if (data.hasVPN === "ok") {
                local.states.merge(["connected"]);
            }
        }
    });

    const [createFile] = useMutation(CREATE_FILE, {
        onError: (error: ApolloError) => {
            Alert.alert(t("error.title"), error.message);
        },
        onCompleted: (data: { createFile: { fileInfo: { name: string; url: string } } }) => {
            local.files.merge([data.createFile.fileInfo]);
            if (local.files.get().length === _attachments.length) {
                local.states.merge(["uploaded"]);
            }
        }
    });

    const [createAsset] = useMutation(CREATE_ASSET, {
        onError: (error: ApolloError) => {
            Alert.alert(t("error.title"), error.message);
        },
        onCompleted: (data: { createAsset: { asset: { id: string } } }) => {
            local.assets.merge([data.createAsset.asset.id]);
            if (local.assets.get().length === _attachments.length) {
                local.states.merge(["created"]);
            }
        }
    });

    // create incident and set states
    const [createIncident] = useMutation(CREATE_INCIDENT, {
        onError: (error: ApolloError) => {
            Alert.alert(t("error.title"), error.message);
        },
        onCompleted: () => {
            local.states.merge(["submitted"]);
            local.states.merge(["done"]);
        }
    });

    const processIncident = async () => {
        // check vpn
        await checkVPN();

        // upload attachments
        if (attachments.length > 0) {
            await Promise.all(
                attachments.map(async (attachment) => {
                    const { data } = await createFile({
                        variables: {
                            input: {
                                upload: new ReactNativeFile({
                                    uri: attachment.uri,
                                    type: attachment.mimeType || "text/html",
                                    name: attachment.name
                                })
                            }
                        }
                    });

                    const { name: filename } = data.createFile.fileInfo;

                    // create asset
                    const { data: dataAsset } = await createAsset({
                        variables: {
                            input: {
                                fields: {
                                    caption: attachment.name,
                                    filename
                                }
                            }
                        }
                    });

                    return dataAsset;
                })
            );
        } else {
            local.states.merge(["uploaded", "created"]);
        }

        const variables: any = {
            incidentType: caseType.id,
            description,
            institutions: institutions.map((institution) => institution.id.toString())
        };

        if (hashtags?.length > 0) {
            variables.tags = {
                createAndAdd: hashtags.map((hashtag) => ({ keyword: hashtag }))
            };
        }

        if (assets?.length > 0) {
            variables.assets = { add: assets };
        }

        // create incident
        await createIncident({ variables });
    };

    // the user is exiting, so reset the global state
    const onExit = () => {
        // reset state
        global.set({
            provider: undefined,
            caseType: undefined,
            description: undefined,
            hashtags: undefined,
            institutions: [],
            attachments: []
        });

        // navigate to the home screen
        navigation.navigate("Main");
    };

    useLayoutEffect(() => {
        // redirect to main screen if no user
        if (!user) {
            navigation.navigate("Main");
        }

        // create incident
        processIncident();

        // set navigation options
        navigation.setOptions({
            title: t("submitting.title"),
            headerTintColor: getColor("gray-200"),
            headerStyle: {
                backgroundColor: getColor("gray-800"),
                shadowColor: "transparent"
            } as { backgroundColor: string; shadowColor: string },
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        if (local.states.get().includes("done")) {
                            return onExit();
                        }

                        Alert.alert(t("submitting.exit.title"), t("submitting.exit.message"), [
                            {
                                text: t("general.cancel")
                            },
                            {
                                onPress: onExit,
                                text: t("general.confirm")
                            }
                        ]);
                    }}
                >
                    <View style={styles("rounded-md p-2 bg-gray-500")}>
                        <Text style={{ ...styles("font-bold"), color: "white" }}>{t("general.exit")}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={styles("flex-1 flex-col justify-evenly my-20 items-center bg-gray-800")}>
            <View>
                <Text style={styles("text-white text-center text-lg")}>{t("submitting.subtitle")}</Text>
                <Text style={styles("text-white text-center text-lg font-bold")}>{t("submitting.exit.anytime")}</Text>
            </View>
            <LottieView
                style={{
                    width: 180,
                    height: 180
                }}
                autoPlay
                source={require("../../assets/84716-loading.json")}
            />
            <ListText
                items={textItems}
                icon={<CheckIcon height={20} fill={getColor("green-200")} />}
                selectedItems={local.states.get()}
            />
        </View>
    );
}
