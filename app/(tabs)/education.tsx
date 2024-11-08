import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useContext } from "react";
import { Card, Icon } from "@rneui/themed";
import themeLight from "../../Theme";
import AddEditBasicEducationOverlay from "../../components/AddEditBasicEducationOverlay";
import { AuthContext } from "../../components/AuthContext";
import Alert from "../../components/Alert";
import AddEditTertiaryEducationOverlay from "../../components/AddEditTertiaryEducationOverlay";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../xhr/student";
import { useFocusEffect } from "expo-router";

const Education = () => {
  const queryClient: any = useQueryClient();

  const userInfoQuery: any = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  const userInfo = userInfoQuery?.data?.user;

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries(["userInfo"]);
    }, [])
  );
  const list: any = [
    {
      school: "Rantailane Secondary School",
      grade: "12",
      city: "Pretoria",
      province: "Gauteng"
    }
  ];

  const tertiaryEducationList: any = [
    {
      educationLevel: "BSc Degree",
      fieldOfStufy: "Mathematical Science",
      institution: "Sefako Makgatho Health Sciences University",
      startYear: 2017,
      endYear: 2019,
      status: "Completed"
    },
    {
      educationLevel: "Honours Degree",
      fieldOfStufy: "Computer Science & Information Technology",
      institution: "Sefako Makgatho Health Sciences University",
      startYear: 2020,
      endYear: 2021,
      status: "Completed"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Basic Education */}
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.cardHead}>
          <View style={styles.cardHeader}>
            <Icon
              name="book-open"
              size={30}
              color={themeLight.lightColors?.primary}
              type="font-awesome-5"
            />
            <Text style={[styles.cardHeaderText, styles.wrapText]}>
              Basic Education
            </Text>
          </View>

          {!userInfo?.basicEducation && (
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
              <AddEditBasicEducationOverlay userId={userInfo?.id} />
            </View>
          )}
        </View>

        {userInfo?.basicEducation ? (
          <View style={styles.cardHead}>
            <FlatList
              data={list}
              renderItem={({ item }) => {
                return (
                  <View style={styles.listItem}>
                    <Text style={styles.bullet}>{"\u2022"}</Text>
                    <Text style={styles.itemText}>
                      {userInfo?.basicEducation?.school} {" - "}{" "}
                      {"Grade " + userInfo?.basicEducation?.grade}
                      {" - "} {userInfo?.basicEducation?.city}
                      {" - "} {userInfo?.basicEducation?.province}
                    </Text>
                  </View>
                );
              }}
              // keyExtractor={(item) => item}
            />
            <AddEditBasicEducationOverlay
              education={userInfo?.basicEducation}
              userId={userInfo?.id}
            />
          </View>
        ) : (
          <Alert message="Basic education is required" type="error" />
        )}
      </Card>

      {/* Tertiary Education */}

      <Card containerStyle={styles.cardContainer}>
        <View style={styles.cardHead}>
          <View style={styles.cardHeader}>
            <Icon
              name="graduation-cap"
              size={30}
              color={themeLight.lightColors?.primary}
              type="font-awesome"
            />
            <Text style={[styles.cardHeaderText, styles.wrapText]}>
              Tertiary Education
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
            <AddEditTertiaryEducationOverlay userId={userInfo?.id} />
          </View>
        </View>

        {userInfo?.tertiaryEducation ? (
          <FlatList
            data={userInfo?.tertiaryEducation}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.cardHead}>
                  <View style={styles.listItem}>
                    <Text style={styles.bullet}>{"\u2022"}</Text>
                    <Text style={styles.itemText}>
                      {item.institution} {"\u2022"} {item.educationLevel}
                      {" in "} {item.fieldOfStufy}
                      {"  \u2022"} {item.startYear}
                      {" - "} {item.endYear}
                      {"  \u2022"} {item.status}
                    </Text>
                  </View>
                  <AddEditTertiaryEducationOverlay
                    education={userInfo?.tertiaryEducation[index]}
                    userId={userInfo?.id}
                  />
                </View>
              );
            }}
            // keyExtractor={(item) => item}
          />
        ) : (
          <Alert message="Tertiary education is optional" type="info" />
        )}
      </Card>
    </SafeAreaView>
  );
};

export default Education;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF"
  },

  cardContainer: {
    borderWidth: 1,
    borderColor: themeLight.lightColors?.primary,
    borderRadius: 10,

    // iOS Shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4.65, // Shadow blur radius

    // Android Elevation
    elevation: 8 // Elevation for Android shadow
  },
  cardHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
    // borderWidth: 1
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10
    // borderWidth: 1
  },
  wrapText: {
    flexShrink: 1
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: themeLight.lightColors?.primary
  },
  listItem: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  bullet: {
    fontSize: 24,
    marginRight: 8
  },
  itemText: {
    // fontSize: 18,
    flexShrink: 1
  }
});

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//     flex: 1,
//     rowGap: 10,
//     padding: 10
//   },
//   cardHeader: {
//     // borderWidth: 1,
//     display: "flex",
//     flexDirection: "row",
//     padding: 2,
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   cardHeaderText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: themeLight.lightColors?.primary
//   },
//   cardDetail: {
//     // borderWidth: 1,
//     marginTop: 10,
//     padding: 10,
//     display: "flex",
//     // flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     rowGap: 10
//   },
//   cardDetailAvatar: {
//     borderWidth: 1,
//     borderColor: "lightgray",
//     width: 100,
//     height: 100,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50
//   },
//   cardDetailAvatarTitle: {
//     fontSize: 50,
//     color: themeLight.lightColors?.primary
//   },
//   row: {
//     display: "flex",
//     flexDirection: "row",
//     columnGap: 10
//   },
//   boldText: {
//     fontWeight: "bold"
//   },
//   dangerText: {
//     color: themeLight.lightColors?.error
//   },
//   iconContainer: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "lightgray",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: themeLight.lightColors?.primary
//   },
//   iconStyle: {
//     color: "#FFFFFF"
//   }
// });
