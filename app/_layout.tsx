import { StyleSheet } from "react-native";
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
                  backgroundColor: themeLight.lightColors?.primary
                },
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
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false
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
