import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomHeaderTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/images/square-logo.jpeg")}
        style={styles.headerImage}
      />
      <View>
        <Text style={[styles.titleText, styles.bigText]}>FASSET</Text>
        <Text style={[styles.titleText, styles.smallText]}>
          Make the future count
        </Text>
      </View>
    </View>
  );
};

export default CustomHeaderTitle;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row"
  },
  headerImage: {
    width: 40,
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
