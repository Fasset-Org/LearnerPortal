import React from "react";
import { useField } from "formik";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker"; // You might need to install this package
import { useTheme } from "@rneui/themed";

type PropType = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
};

const SelectInputWrapper = ({ name, label, options }: PropType) => {
  const [field, meta, helpers] = useField(name);
  const { theme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: "#85929e", fontWeight: 500 }]}>
        {label}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={field.value}
          onValueChange={(itemValue: any) => helpers.setValue(itemValue)}
          style={styles.picker}
        >
          {options.map((option, i) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              style={i === 0 && { color: "#aeb6bf", fontWeight: "bold" }}
            />
          ))}
        </Picker>
      </View>
      {meta.touched && meta.error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: 15,
    padding: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden"
  },
  picker: {
    height: 50,
    backgroundColor: "white" // Match your Input background
  },
  errorText: {
    fontSize: 12,
    marginTop: 5
  }
});

export default SelectInputWrapper;
