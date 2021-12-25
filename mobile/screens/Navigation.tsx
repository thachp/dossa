import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity } from "react-native";
import { PlusCircleIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import styles from "../common/css.config";
import { RootStackParamList, TabsParamList } from "../common/interfaces/types.interface";
import { CustomDarkTheme, CustomDefaultTheme } from "../common/theme.config";
import { t } from "../common/translate.config";
import AboutScreen from "./about/About.screen";
import ProcessingIncidentsScreen from "./incident/ProcessingIncident.screen";
import SearchIncidentsScreen from "./incident/SearchIncidents.screen";
import SubmitScreen from "./incident/SubmitIncident.screen";
import SearchInstitutionScreen from "./institution/SearchInstitutions.screen";
import MainScreen from "./main/Main.screen";
import SearchProvidersScreen from "./provider/SearchProviders.screen";

/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="SearchInstitutions"
                component={SearchInstitutionScreen}
                options={{
                    tabBarStyle: styles("border-0 bg-gray-800"),
                    tabBarIconStyle: styles("p-4"),
                    tabBarLabelStyle: styles("text-white"),
                    tabBarIcon: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Submit")}
                            style={styles("border rounded-full bg-gray-800 border-gray-800")}
                        >
                            <PlusCircleIcon size={60} fill={getColor("gray-200")} />
                        </TouchableOpacity>
                    ),
                    tabBarLabel: t("institution.select")
                }}
            />
        </Tab.Navigator>
    );
};

const RootNavigator = () => (
    <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Submit" component={SubmitScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="SearchIncidents" component={SearchIncidentsScreen} />
        <Stack.Screen name="SearchProviders" component={SearchProvidersScreen} />
        <Stack.Screen name="ProcessingIncident" component={ProcessingIncidentsScreen} />
        <Stack.Screen
            name="Tabs"
            component={TabsNavigator}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
);

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer theme={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}
