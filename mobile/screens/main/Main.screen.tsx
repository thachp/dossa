import { useState } from "@hookstate/core";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useLayoutEffect } from "react";
import { Alert, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { HOSTNAME } from "../../common/constants/settings.constant";
import { styles } from "../../common/css.config";
import { globalState } from "../../common/global.state";
import { useLogin, useRegister } from "../../common/hooks/useAccount.hook";
import { RootStackParamList } from "../../common/interfaces/types.interface";
import t from "../../common/translate.config";
import generateKeypair from "../../common/wireguard";
import Button from "../../components/buttons/Connect.button";
import Logo from "../../components/Logo";

export default function MainScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Main">) {
    const global = useState(globalState);
    const { getItem, setItem } = useAsyncStorage("@token");

    // get the wireguard key from global state
    const wireguardKey = global.winguardKey.get();

    // read wireguard key
    const readWireguardKeyFromStorage = async () => {
        const item = await getItem();

        // if does not exist in storage, generate new keypair
        if (item == null) {
            const keypair = generateKeypair();
            const privateKeyHash = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                keypair.privateKey
            );

            const keys = JSON.stringify({
                ...keypair,
                privateKeyHash
            });

            // save to storage
            await setItem(keys);

            // update global state
            global.winguardKey.set(keys);

            return keys;
        }

        // set keypair to global state
        if (item) {
            global.winguardKey.set(item);
            return item;
        }
    };

    // do login
    const [doLogin] = useLogin(global);
    const [doRegister, { error }] = useRegister(global);

    const linkItems: Array<{ label: string; route: keyof RootStackParamList }> = [
        {
            label: t("about.title"),
            route: "About"
        },
        {
            label: t("about.terms"),
            route: "Terms"
        },
        {
            label: t("about.privacy"),
            route: "Privacy"
        },
        {
            label: t("about.credits"),
            route: "Credits"
        }
    ];

    const LinkText = ({ label, route }: { label: string; route: keyof RootStackParamList }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (route === "About") {
                        return navigation.navigate(route);
                    }
                    WebBrowser.openBrowserAsync(`${HOSTNAME}/${route.toLocaleLowerCase()}`);
                }}
            >
                <Text style={styles("text-gray-400 px-1 py-3 text-center mx-1 underline")}>{label}</Text>
            </TouchableOpacity>
        );
    };

    const loginOrRegister = async () => {
        const wireguardKey = await readWireguardKeyFromStorage();
        const wireguard = wireguardKey && JSON.parse(wireguardKey);

        const { data } = await doLogin({
            variables: {
                input: {
                    username: wireguard.publicKey,
                    password: wireguard.privateKeyHash
                }
            }
        });

        if (!data) {
            await doRegister({
                variables: {
                    input: {
                        fields: {
                            username: wireguard.publicKey,
                            password: wireguard.privateKeyHash
                        }
                    }
                }
            });
        }
    };

    useEffect(() => {
        loginOrRegister();
    }, [navigation, wireguardKey]);

    // if there is an error, show it
    if (error) {
        Alert.alert(t("general.error"), error.message);
    }

    return (
        <View style={styles("flex-1 flex-col justify-evenly items-center bg-gray-800")}>
            <Logo name={t("name")} description={t("description")} />
            <Button
                label={t("main.title")}
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Submit" }]
                    })
                }
            />
            <View>
                <View style={styles("flex flex-row justify-center")}>
                    {linkItems.map((item) => (
                        <LinkText key={item.label} {...item} />
                    ))}
                </View>
                <Text style={styles("text-gray-400")}>{t("copyright", { year: new Date().getFullYear() })}</Text>
            </View>
        </View>
    );
}
