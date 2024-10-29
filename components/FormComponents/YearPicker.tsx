// YearPicker.tsx
import React, { useState } from "react";
import { Button, View, Text, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface YearPickerProps {
  selectedYear: string | null;
  onSelectYear: (year: string) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({
  selectedYear,
  onSelectYear
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event: any, date?: Date) => {
    if (date) {
      const year = date.getFullYear().toString();
      onSelectYear(year);
    }
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Show Year Picker" onPress={showDatePicker} />
      {isDatePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          maximumDate={new Date()}
          onChange={handleConfirm}
        />
      )}
      <Text style={styles.selectedText}>
        Selected Year: {selectedYear || "None"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedText: {
    marginTop: 20,
    fontSize: 18
  }
});

export default YearPicker;
