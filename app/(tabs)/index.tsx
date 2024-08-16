import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";

const TabRootLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card>
          <Card.Title>Personal Information</Card.Title>
        </Card>

        <Card>
          <Card.Title>Address Information</Card.Title>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default TabRootLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1
  }
});
