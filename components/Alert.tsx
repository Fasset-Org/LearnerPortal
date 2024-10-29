import { Card, Icon, Text } from "@rneui/base";
import React from "react";
import { View, StyleSheet } from "react-native";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

const Alert: React.FC<AlertProps> = ({ message, type = "info" }) => {
  const iconProps = {
    success: { name: "check-circle", color: "#28a745" },
    error: { name: "error", color: "#dc3545" },
    warning: { name: "warning", color: "#ffc107" },
    info: { name: "info", color: "#17a2b8" }
  }[type];

  return (
    <Card containerStyle={[styles.card, { borderColor: iconProps.color }]}>
      <View style={styles.content}>
        <Icon name={iconProps.name} color={iconProps.color} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10
  },
  content: {
    flexDirection: "row",
    alignItems: "center"
  },
  message: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1
  }
});

export default Alert;
