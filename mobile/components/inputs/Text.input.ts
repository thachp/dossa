import * as React from "react";
import { Controller } from "react-hook-form";
import { TextInput, View } from "react-native";

import { styles } from "../../common/css.config";

interface TextInputProps {
    name: string;
    control: any;
    placeholder: string;
}

const TextInputController = ({ name, control, placeholder }: TextInputProps) => {
    return (
        <View>
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
                        placeholder={placeholder}
                    />
                )}
                name={name}
            />
        </View>
    );
};
