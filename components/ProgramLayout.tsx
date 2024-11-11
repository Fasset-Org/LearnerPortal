import { View, Text } from "react-native";
import React, { useState } from "react";
import { CheckBox, useTheme } from "@rneui/themed";

interface ProgramLayoutProps {
  program?: any;
  setLeanerProgrammes?: any;
  learnerProgrammes?: [];
}

const ProgramLayout = ({
  program,
  setLeanerProgrammes,
  learnerProgrammes
}: ProgramLayoutProps) => {
  const { theme } = useTheme();
  const [checked, setChecked] = useState(() => {
    return learnerProgrammes?.find((p: any) => p.id === program.id)
      ? true
      : false;
  });
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
            checked={checked}
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
              margin: 0,
              padding: 0
            }}
            onPress={() => {
              if (setLeanerProgrammes) {
                setLeanerProgrammes((prev: any[]) => {
                  if (checked) {
                    setChecked(!checked);
                    return [...prev, program];
                  } else {
                    setChecked(!checked);
                    return prev.filter((p) => p.id !== program.id);
                  }
                });
              }
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
        {/* <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
          <Button
            title="Save"
            color="primary"
            containerStyle={{ width: 110 }}
          />
        </View> */}
      </View>
    </View>
  );
};

export default ProgramLayout;
