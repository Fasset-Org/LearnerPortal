import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Icon, useTheme } from "@rneui/themed";
import themeLight from "../../Theme";

const DashBoardTabs = () => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { paddingBottom: 5 },
        tabBarLabelStyle: {
          color: theme.colors.primary,
          fontWeight: "bold",
          textAlign: "center"
        },

        tabBarIconStyle: {
          color: theme.colors.primary,
          backgroundColor: theme.colors.primary
        },
        headerStyle: {
          borderWidth: 3
        },

        headerTitleStyle: {
          color: theme.colors.primary
        },
        tabBarInactiveTintColor: theme.colors.primary
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: (colors) => {
            return (
              <Icon
                name="user"
                size={20}
                type="font-awesome"
                style={styles.icon}
              />
            );
          },
          title: "Profile",
          headerTitle: "Profile",
          headerStyle: {
            borderBottomWidth: 1
          }
        }}
      />

      <Tabs.Screen
        name="education"
        options={{
          tabBarIcon: (colors) => {
            return <Icon name="graduation-cap" size={20} type="font-awesome" />;
          },
          title: "Education",
          headerStyle: { borderBottomWidth: 1 }
        }}
      />

      <Tabs.Screen
        name="certification"
        options={{
          tabBarIcon: (colors) => {
            return (
              <Icon name="pencil-square-o" size={20} type="font-awesome" />
            );
          },
          title: "Skills & Attachments",
          headerStyle: { borderBottomWidth: 1 }
        }}
      />

      <Tabs.Screen
        name="learnerprogramme"
        options={{
          tabBarIcon: (colors) => {
            return <Icon name="profile" size={20} type="antdesign" />;
          },
          title: "Programmes",
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
