import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Icon, Text, useTheme } from "@rneui/themed";
import themeLight from "../../Theme";
import SignoutModal from "../../components/SignoutModal";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const DashBoardTabs = () => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderColor: theme.colors.primary,
          borderWidth: 1
        },

        tabBarLabelStyle: {
          color: theme.colors.primary
        },

        headerTitleStyle: {
          color: theme.colors.primary
        },
        headerRight: () => <SignoutModal />
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: (colors) => (
            <FontAwesome name="user" size={28} color={theme.colors.primary} />
          ),
          title: "Profile",
          headerTitleAlign: "left",
          headerStyle: { borderBottomWidth: 1 }
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          tabBarIcon: (colors) => (
            <FontAwesome
              name="graduation-cap"
              size={28}
              color={theme.colors.primary}
            />
          ),
          title: "Education",
          headerTitleAlign: "left",
          headerStyle: { borderBottomWidth: 1 }
        }}
      />
      <Tabs.Screen
        name="certification"
        options={{
          tabBarIcon: (colors) => (
            <FontAwesome
              name="pencil-square-o"
              size={28}
              color={theme.colors.primary}
            />
          ),
          title: "Attachments",
          headerTitleAlign: "left",
          headerStyle: { borderBottomWidth: 1 }
        }}
      />
      <Tabs.Screen
        name="learnerprogramme"
        options={{
          tabBarIcon: (colors) => (
            <AntDesign name="profile" size={28} color={theme.colors.primary} />
          ),
          title: "Programmes",
          headerTitleAlign: "left",
          headerStyle: { borderBottomWidth: 1 }
        }}
      />
    </Tabs>
  );
};

export default DashBoardTabs;

const styles = StyleSheet.create({
  icon: {
    color: themeLight.lightColors?.primary
  }
});
