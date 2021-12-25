import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { getColor } from "tailwind-rn";

export const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        primary: "rgb(255, 45, 85)",
        background: "rgb(31, 41, 55)",
        card: "rgb(255, 255, 255)",
        text: "rgb(28, 28, 30)",
        border: "rgb(199, 199, 204)",
        notification: "rgb(255, 69, 58)"
    }
};

export const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
        primary: getColor("gray-100"),
        background: "rgb(31, 41, 55)",
        card: getColor("gray-800"),
        text: "rgb(28, 28, 30)",
        border: "rgb(199, 199, 204)",
        notification: "rgb(255, 69, 58)"
    }
};
