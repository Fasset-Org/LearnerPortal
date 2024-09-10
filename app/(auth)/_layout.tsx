import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import themeLight from "../../Theme";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerStyle: { backgroundColor: themeLight.lightColors?.primary },
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitle: "Login",
          headerTintColor: "#FFFFFF"
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerStyle: { backgroundColor: themeLight.lightColors?.primary },
          headerTitleStyle: { color: "#FFFFFF" },
          headerTitle: "Register",
          headerTintColor: "#FFFFFF"
        }}
      />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
