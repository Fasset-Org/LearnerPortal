import { AppState, AppStateStatus, Platform, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import CustomHeaderTitle from "../components/CustomHeaderTitle";
import { ThemeProvider } from "@rneui/themed";
import themeLight from "../Theme";
import {
  focusManager,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const RootLayout = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeLight}>
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
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
