import React, { useLayoutEffect, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SearchIcon, XCircleIcon } from "react-native-heroicons/solid";
import { getColor } from "tailwind-rn";

import { styles } from "../../common/css.config";
import t from "../../common/translate.config";

interface SearchInputProps {
    searchLabel?: string;
    canCancel?: boolean;
    searchSublabel?: string;
    isBusy?: boolean;
    value?: string;
}

interface SearchInputDispatchProps {
    onSearch: (search: string) => void;
}

export const SearchInput = ({
    searchLabel = "Search",
    onSearch,
    canCancel = false,
    searchSublabel
}: SearchInputProps & SearchInputDispatchProps) => {
    const [search, setSearch] = React.useState("");
    const searchRef = useRef(null);

    // styling
    const searchStypes = { ...styles("bg-white flex-1 px-2 py-2 rounded-md"), fontSize: 18 };
    const placeholderStyles = styles("text-sm py-2 font-medium text-gray-200");

    // state
    const onChangeText = (text: string) => {
        setSearch(text);
        onSearch(text);
    };

    return (
        <View style={styles("flex mb-2")}>
            <View style={styles("flex flex-row items-center justify-center")}>
                <View style={styles("flex-1 flex-row items-center bg-white rounded-md justify-center")}>
                    <TouchableOpacity style={styles("rounded-md ml-1")}>
                        <SearchIcon size={28} fill={getColor("gray-500")} />
                    </TouchableOpacity>
                    <TextInput
                        maxLength={40}
                        ref={searchRef}
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        onChangeText={onChangeText}
                        value={search}
                        placeholderTextColor={getColor("gray-400")}
                        style={searchStypes}
                        placeholder={searchLabel}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity style={styles("text-center pr-2")} onPress={() => onChangeText("")}>
                            <XCircleIcon size={28} fill={getColor("gray-400")} />
                        </TouchableOpacity>
                    )}
                </View>
                {canCancel && (
                    <TouchableOpacity style={styles("px-2")}>
                        <Text style={styles("text-lg text-white font-medium")}>{t("general.cancel")}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {searchSublabel && <Text style={placeholderStyles}>{searchSublabel}</Text>}
        </View>
    );
};

export default SearchInput;
