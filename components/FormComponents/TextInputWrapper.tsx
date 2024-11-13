import { StyleSheet } from "react-native";
import React from "react";
import { useField } from "formik";
import { Input } from "@rneui/base";
import { useTheme } from "@rneui/themed";

type PropType = {
  name: string;
  label: string;
  secureTextEntry: boolean;
  disable?: boolean;
};

const TextInputWrapper = ({
  name,
  label,
  secureTextEntry,
  disable
}: PropType) => {
  const [field, meta] = useField(name);
  const { theme } = useTheme();

  return (
    <Input
      label={label}
      placeholder={`Enter your ${label.toLowerCase()}`}
      value={field.value}
      onChangeText={field.onChange(name)}
      onBlur={field.onBlur(name)}
      errorStyle={{ color: theme.colors.error }}
      errorMessage={meta.touched && meta.error ? meta.error : ""}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      inputContainerStyle={{
        borderBottomWidth: 0,
        marginTop: 5
      }}
      disabled={disable || false}
      labelStyle={{ fontSize: 13 }}
      placeholderTextColor={"#aeb6bf"}
      inputStyle={{ fontSize: 13, fontWeight: "bold" }}
      containerStyle={{ margin: 0 }}
    />
  );
};

export default TextInputWrapper;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: `#d6dbdf`,
    borderRadius: 5,
    width: "100%"
  }
});
