import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { CardTitle } from "@rneui/base/dist/Card/Card.Title";
import themeLight from "../../Theme";

const TabRootLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Card>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Personal Information</Text>
            <View style={styles.iconContainer}>
              <Icon
                name="pencil-square-o"
                size={30}
                type="font-awesome"
                style={styles.iconStyle}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.cardDetail}>
            <View style={styles.cardDetailAvatar}>
              <Text style={styles.cardDetailAvatarTitle}>TM</Text>
            </View>
            <Text>Tiyisela Themba Makamu</Text>
            <View style={styles.row}>
              <Text style={styles.boldText}>ID Number:</Text>
              <Text>9804046210080</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.boldText}>Email:</Text>
              <Text>kamzen1994@gmail.com</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>Contact:</Text>
              <Text>+27 797126016</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>Occupation:</Text>
              <Text>I obtained a matric certificate</Text>
            </View>
          </View>
          <Card.Divider />
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardHeaderText}>Address Information</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                name="pencil-square-o"
                size={30}
                type="font-awesome"
                style={styles.iconStyle}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.cardDetail}>
            <Text>1386, Mthimunye Street</Text>
            <View style={styles.row}>
              <Text>Ga-Rankuwa Unit 23</Text>
            </View>
            <View style={styles.row}>
              <Text>Ga-Rankuwa</Text>
            </View>
            <View style={styles.row}>
              <Text>Gauteng</Text>
            </View>
            <View style={styles.row}>
              <Text>0208</Text>
            </View>

            <View style={styles.row}>
              <Text>City of Tshwane Metropolitan Municipality</Text>
            </View>

            <Text style={styles.dangerText}>
              Please note that your address will determine where you will be
              placed.
            </Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default TabRootLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    rowGap: 10
  },
  cardHeader: {
    // borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    padding: 2,
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: themeLight.lightColors?.primary
  },
  cardDetail: {
    // borderWidth: 1,
    marginTop: 10,
    padding: 10,
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10
  },
  cardDetailAvatar: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: 100,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  cardDetailAvatarTitle: {
    fontSize: 50,
    color: themeLight.lightColors?.primary
  },
  row: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10
  },
  boldText: {
    fontWeight: "bold"
  },
  dangerText: {
    color: themeLight.lightColors?.error
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeLight.lightColors?.primary
  },
  iconStyle: {
    color: "#FFFFFF"
  }
});
