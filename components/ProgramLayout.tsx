import { View, Text } from "react-native";
import React from "react";
import { Button, CheckBox, useTheme } from "@rneui/themed";

interface ProgramLayoutProps {
  program?: any;
}

const ProgramLayout = ({ program }: ProgramLayoutProps) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "lightgray",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
      }}
    >
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          padding: 10
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
          {program.title}
        </Text>
      </View>

      <View style={{ width: "100%", padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            checked={false}
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
              margin: 0,
              padding: 0
            }}
          />
          <View style={{ flexShrink: 1 }}>
            <Text style={{ textAlign: "justify", fontSize: 12, flexShrink: 1 }}>
              {program.description}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Duration: </Text>
              <Text>{program.duration}</Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
          <Button
            title="Save"
            color="primary"
            containerStyle={{ width: 110 }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProgramLayout;
