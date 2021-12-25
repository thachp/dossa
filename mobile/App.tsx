import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { gclient } from "./common/graphql.config";
import useCachedResources from "./common/hooks/useCachedResources";
import useColorScheme from "./common/hooks/useColorScheme";
import Navigation from "./screens/Navigation";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ApolloProvider client={gclient}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </ApolloProvider>
        );
    }
}
