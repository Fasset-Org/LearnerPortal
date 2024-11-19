import { StyleSheet } from "react-native";
import React from "react";
import { useField } from "formik";
import { Input } from "@rneui/themed";
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
      errorStyle={{ color: theme.colors.error, marginBottom: 5 }}
      errorMessage={meta.touched && meta.error ? meta.error : ""}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      inputContainerStyle={{
        borderBottomWidth: 0,
        // borderWidth: 1,

        margin: 0,
        padding: 0
        // borderColor: "lightgray"
      }}
      disabled={disable || false}
      labelStyle={{ fontSize: 13, marginBottom: 5, marginTop: 0, padding: 0 }}
      placeholderTextColor={"#aeb6bf"}
      inputStyle={{ fontSize: 13, fontWeight: "bold", margin: 0, padding: 0 }}
      containerStyle={{ margin: 0, padding: 0, height: 70, marginBottom: 30 }}
    />
  );
};

export default TextInputWrapper;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    // padding: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: `#d6dbdf`,
    borderRadius: 5,
    width: "100%"
  }
});
