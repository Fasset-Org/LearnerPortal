import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import CustomHeaderTitle from "../components/CustomHeaderTitle";
import { ThemeProvider } from "@rneui/themed";
import themeLight from "../Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "../components/AuthContext";

const RootLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeLight}>
        <AuthProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerStyle: {
                  backgroundColor: themeLight.lightColors?.white
                },
                headerTitleAlign: "left",
                headerTitle: () => (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Image
                      source={require("../assets/images/fasset_horizontal_logo_rgb.jpg")}
                      style={{ width: 180, height: 40 }}
                    />
                  </View>
                )
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                headerTitleAlign: "left"
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
                headerTitleAlign: "left"
              }}
            />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
