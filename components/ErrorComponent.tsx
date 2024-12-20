import { View, Text, Image } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

interface Props {
  title?: string;
  errMessage?: string;
}

export default function ErrorComponent({ title, errMessage }: Props) {
  const onRetry = () => {};
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20
      }}
    >
      <Image
        source={require("../assets/images/blueLogo-transparentBg.png")}
        style={{ width: 100, height: 100, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#ff0000",
          marginBottom: 10
        }}
      >
        {title || "Something went wrong."}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#333",
          textAlign: "center",
          marginBottom: 20
        }}
      >
        {errMessage ||
          "Please try again or contact support if the problem persists."}
      </Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}
