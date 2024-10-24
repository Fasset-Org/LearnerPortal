import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
}
