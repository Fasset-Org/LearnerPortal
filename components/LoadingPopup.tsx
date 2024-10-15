import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";

interface Props {
  visible: boolean;
}

export default function LoadingPopup({ visible }: Props) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      // onRequestClose={toggleLoading}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}
        >
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      </View>
    </Modal>
  );
}
