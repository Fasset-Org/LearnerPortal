import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import themeLight from "../../Theme";
import { Icon } from "@rneui/themed";

const RootLayout = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerStyle: { backgroundColor: themeLight.lightColors?.primary },
            headerTitleStyle: { color: "#FFFFFF" },
            headerTitle: "Login",
            headerTintColor: "#FFFFFF",
            headerTitleAlign: "left",
            headerLeft: () => (
              <Icon
                name="arrow-back"
                type="material"
                color="#fff"
                onPress={() => router.back()} // Go back to the previous screen
                size={30}
                containerStyle={{ marginRight: 5 }}
              />
            )
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerStyle: { backgroundColor: themeLight.lightColors?.primary },
            headerTitleStyle: { color: "#FFFFFF" },
            headerTitle: "Register",
            headerTintColor: "#FFFFFF",
            headerTitleAlign: "left",
            headerLeft: () => (
              <Icon
                name="arrow-back"
                type="material"
                color="#fff"
                onPress={() => router.back()} // Go back to the previous screen
                size={30}
                containerStyle={{ marginRight: 5 }}
              />
            )
          }}
        />
      </Stack>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
