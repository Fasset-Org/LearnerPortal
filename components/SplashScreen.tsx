import { View, Text, Image, ActivityIndicator, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

interface Props {
  loading: boolean;
}

export default function SplashScreen({ loading }: Props) {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  // useEffect(() => {

  // }, [scaleValue, opacityValue]);

  if (loading) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2, // Scale up to 1.2
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(scaleValue, {
          toValue: 0.8, // Scale down to 0.8
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
      }}
    >
      <Animated.Image
        source={require("../assets/images/blueLogo-transparentBg.png")}
        style={{
          width: 150,
          height: 150,
          marginBottom: 20,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue
        }}
        resizeMode="contain"
      />
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ position: "absolute", bottom: 50 }}
      />
    </View>
  );
}
