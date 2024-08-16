import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import CustomHeaderTitle from "../components/CustomHeaderTitle";
import { ThemeProvider, useTheme } from "@rneui/themed";
import themeLight from "../Theme";

const RootLayout = () => {
  return (
    <ThemeProvider theme={themeLight}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: themeLight.lightColors?.primary },
            headerTitleStyle: { color: "#FFFFFF" },
            headerTitle: () => <CustomHeaderTitle />
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
