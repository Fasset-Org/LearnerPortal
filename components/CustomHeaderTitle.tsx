import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomHeaderTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/images/fasset_horizontal_logo_rgb.jpg")}
        style={styles.headerImage}
      />
    </View>
  );
};

export default CustomHeaderTitle;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row"
  },
  headerImage: {
    width: 190,
    height: 40,
    marginRight: 10
  },
  headerTextContainer: {
    flexDirection: "column"
  },

  titleText: {
    color: "#FFFFFF"
  },
  bigText: {
    letterSpacing: 10,
    fontWeight: "bold"
  },
  smallText: {
    fontSize: 10,
    fontWeight: "bold",
    fontStyle: "italic"
  }
});
