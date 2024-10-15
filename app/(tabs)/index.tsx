import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import themeLight from "../../Theme";
import EditUserAddressOverlay from "../../components/EditUserAddressOverlay";
import EditUserInfoOverlay from "../../components/EditUserInfoOverlay";
import { getItem } from "expo-secure-store";

const TabRootLayout = () => {
  const token = getItem("userToken");

  console.log(token);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardHeaderText, styles.wrapText]}>
              Personal Information
            </Text>
            <View style={styles.iconContainer}>
              {/* <Icon
                name="pencil-square-o"
                size={20}
                type="font-awesome"
                style={styles.iconStyle}
                color="#FFFFFF"
              /> */}
              <EditUserInfoOverlay />
            </View>
          </View>

          <View style={styles.cardDetail}>
            {/* <View style={styles.cardDetailAvatar}>
              <Text style={styles.cardDetailAvatarTitle}>TM</Text>
            </View> */}
            <View style={styles.row}>
              <Text style={styles.boldText}>
                Full Name
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>Tiyisela Themba Makamu</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                ID Number
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>9804046210080</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.boldText}>
                Email
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>kamzen1994@gmail.com</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Contact
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>+27 797126016</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Occupation
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>
                I obtained a matric certificate
              </Text>
            </View>
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardHeaderText, styles.wrapText]}>
                Address Information
              </Text>
            </View>
            <View style={styles.iconContainer}>
              {/* <Icon
                name="pencil-square-o"
                size={20}
                type="font-awesome"
                style={styles.iconStyle}
                color="#FFFFFF"
              /> */}
              <EditUserAddressOverlay />
            </View>
          </View>

          <View style={styles.cardDetail}>
            <View style={styles.row}>
              <Text style={styles.boldText}>Street Number/Name &nbsp;:</Text>
              <Text style={styles.wrapText}>1386, Mthimunye Street</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Suburb/Town
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>Ga-Rankuwa Unit 23</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                City
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>Ga-Rankuwa</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Province
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>Gauteng</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Postal Code
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>0208</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Manicipality
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>
                City of Tshwane Metropolitan Municipality
              </Text>
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
    rowGap: 10,
    padding: 10
  },
  cardContainer: {
    borderRadius: 10,
    margin: 0
  },
  cardHeader: {
    // borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: themeLight.lightColors?.primary
  },
  cardDetail: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
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
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeLight.lightColors?.primary
  },
  iconStyle: {
    color: "#FFFFFF"
  },
  wrapText: {
    flexShrink: 1
  }
});
