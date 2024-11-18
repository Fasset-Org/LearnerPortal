import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Icon, useTheme } from "@rneui/themed";
import themeLight from "../../Theme";
import SignoutModal from "../../components/SignoutModal";

const DashBoardTabs = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarStyle: {
              borderWidth: 1,
              borderColor: theme.colors.primary
            },
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
            tabBarInactiveTintColor: theme.colors.primary,
            headerRight: () => <SignoutModal />
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: (colors) => (
                <Icon
                  name="user"
                  size={20}
                  type="font-awesome"
                  color={theme.colors.primary}
                />
              ),
              title: "Profile",
              headerTitle: "Profile",
              headerTitleAlign: "left",
              headerStyle: { borderBottomWidth: 1 }
            }}
          />
          <Tabs.Screen
            name="education"
            options={{
              tabBarIcon: (colors) => (
                <Icon
                  name="graduation-cap"
                  size={20}
                  type="font-awesome"
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
                <Icon
                  name="pencil-square-o"
                  size={20}
                  type="font-awesome"
                  color={theme.colors.primary}
                />
              ),
              title: "Skills & Attachments",
              headerTitleAlign: "left",
              headerStyle: { borderBottomWidth: 1 }
            }}
          />
          <Tabs.Screen
            name="learnerprogramme"
            options={{
              tabBarIcon: (colors) => (
                <Icon
                  name="profile"
                  size={20}
                  type="antdesign"
                  color={theme.colors.primary}
                />
              ),
              title: "Programmes",
              headerTitleAlign: "left",
              headerStyle: { borderBottomWidth: 1 },
              headerTitle: "Learner Interventions"
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
};

export default DashBoardTabs;

const styles = StyleSheet.create({
  icon: {
    color: themeLight.lightColors?.primary
  }
});
