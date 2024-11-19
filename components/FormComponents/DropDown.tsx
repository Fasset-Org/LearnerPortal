import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useField } from "formik";
import { useTheme } from "@rneui/themed";

// type OptionItem = {
//   value: string;
//   label: string;
// };

// interface DropDownProps {
//   data: OptionItem[];
//   onChange?: (item: OptionItem) => void;
//   placeholder: string;
// }

export default function Dropdown({ name, data, placeholder }: any) {
  const [expanded, setExpanded] = useState(false);
  const [field, meta, helpers] = useField(name);
  const { theme } = useTheme();

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const [value, setValue] = useState(field.value || "");

  const buttonRef = useRef<View>(null);

  const [top, setTop] = useState(0);

  const onSelect = useCallback((item: any) => {
    helpers.setValue(item.value);
    setValue(item.label);
    setExpanded(false);
  }, []);
  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;

        const finalValue =
          topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);

        setTop(finalValue);
      }}
      style={{ paddingHorizontal: 10, marginBottom: 20 }}
    >
      <Text style={{ color: "#85929e", fontWeight: 500, marginBottom: 3 }}>
        {placeholder}
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top
                  }
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}

      {meta.touched && meta.error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {meta.error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  optionItem: {
    height: 40,
    justifyContent: "center"
  },
  separator: {
    height: 4
  },
  options: {
    position: "absolute",
    // top: 53,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 6,
    maxHeight: 550,
    borderWidth: 1,
    borderColor: "lightgray"
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
    color: "#85929e"
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgray"
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5
  }
});
