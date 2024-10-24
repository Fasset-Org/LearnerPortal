import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { Card } from "@rneui/themed";
import themeLight from "../../Theme";
import EditUserAddressOverlay from "../../components/EditUserAddressOverlay";
import EditUserInfoOverlay from "../../components/EditUserInfoOverlay";
import { AuthContext } from "../../components/AuthContext";
import { Icon } from "@rneui/base";
const TabRootLayout = () => {
  let { userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#FFFFFF", flex: 1, rowGap: 10, padding: 10 }}
    >
      <View
        style={{ backgroundColor: "#FFFFFF", flex: 1, rowGap: 10, padding: 10 }}
      >
        <Card containerStyle={{ borderRadius: 10, margin: 0 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: 10
              }}
            >
              <Icon
                name="user"
                size={30}
                type="font-awesome"
                // style={styles.iconStyle}
                color={themeLight.lightColors?.primary}
              />
              <Text style={[styles.cardHeaderText, styles.wrapText]}>
                Personal Information
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: themeLight.lightColors?.primary
              }}
            >
              <EditUserInfoOverlay userInfo={userInfo} />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              rowGap: 10
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", columnGap: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>
                Full Name
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={{ flexShrink: 1 }}>
                {userInfo?.firstName} {userInfo?.middleName}{" "}
                {userInfo?.lastName}
              </Text>
            </View>

            <View
              style={{ display: "flex", flexDirection: "row", columnGap: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>
                ID Number
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={{ flexShrink: 1 }}>
                {userInfo?.studentInformation?.identificationNumber}
              </Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", columnGap: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>
                Email
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>{userInfo?.email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Contact
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>
                {userInfo?.studentInformation?.mobileNumber}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.boldText}>
                Occupation
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </Text>
              <Text style={styles.wrapText}>
                {userInfo?.studentInformation?.careerStatus}
              </Text>
            </View>
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: 10
              }}
            >
              <Icon
                name="map-marker"
                size={30}
                type="font-awesome"
                // style={styles.iconStyle}
                color={themeLight.lightColors?.primary}
              />
              <Text style={[styles.cardHeaderText, styles.wrapText]}>
                Address Information
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: themeLight.lightColors?.primary
              }}
            >
              <EditUserAddressOverlay
                studentAddress={userInfo?.studentAddress}
              />
            </View>
          </View>

          <View style={styles.cardDetail}>
            {userInfo?.studentAddress && (
              <>
                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    Street Number/Name &nbsp;:
                  </Text>
                  <Text style={styles.wrapText}>
                    {userInfo?.studentAddress?.streetNumber},{" "}
                    {userInfo?.studentAddress?.streetName}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    Suburb/Town
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </Text>
                  <Text style={styles.wrapText}>
                    {userInfo?.studentAddress?.suburb}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    City
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </Text>
                  <Text style={styles.wrapText}>
                    {userInfo?.studentAddress?.city}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    Province
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </Text>
                  <Text style={styles.wrapText}>
                    {userInfo?.studentAddress?.province}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    Postal Code
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </Text>
                  <Text style={styles.wrapText}>
                    {userInfo?.studentAddress?.postalCode}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    Manicipality
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                  </Text>
                  <Text style={styles.wrapText}>
                    {userInfo?.studentAddress?.manicipality}
                  </Text>
                </View>
              </>
            )}

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
