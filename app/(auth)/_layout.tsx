import { Platform, StyleSheet, Text, View } from "react-native";
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
            headerStyle: { backgroundColor: themeLight.lightColors?.white },
            headerBackVisible: false,
            headerTitleAlign: "left",
            title: "Login",
            // headerTitle: (props: any) => (
            //   <View
            //     style={{
            //       flexDirection: "column",
            //       flex: 1
            //     }}
            //   >
            //     <Text
            //       style={{ color: "#000", fontSize: 19, fontWeight: "bold" }}
            //     >
            //       Login
            //     </Text>
            //   </View>
            // ),
            headerLeft: () => (
              <Icon
                name="arrow-back"
                type="material"
                color="#000"
                onPress={() => router.back()} // Go back to the previous screen
                containerStyle={{ marginRight: 5 }}
              />
            )
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerStyle: { backgroundColor: themeLight.lightColors?.white },
            headerBackVisible: false,
            headerTitleAlign: "left",
            title: "Register",
            // headerTitle: (props: any) => (
            //   <View
            //     style={{
            //       flexDirection: "column",
            //       flex: 1
            //     }}
            //   >
            //     <Text
            //       style={{ color: "#000", fontSize: 19, fontWeight: "bold" }}
            //     >
            //       Register
            //     </Text>
            //   </View>
            // ),
            headerLeft: () => (
              <Icon
                name="arrow-back"
                type="material"
                color="#000"
                onPress={() => router.back()} // Go back to the previous screen
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
