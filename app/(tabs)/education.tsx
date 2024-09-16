import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import themeLight from "../../Theme";

const Education = () => {
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
        <View style={styles.cardHeader}>
          <Icon
            name="graduation-cap"
            size={30}
            color="#000"
            type="font-awesome"
          />
          <Text style={[styles.cardHeaderText, styles.wrapText]}>
            Basic Education
          </Text>
        </View>

        <FlatList
          data={list}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <Text style={styles.bullet}>{"\u2022"}</Text>
                <Text style={styles.itemText}>
                  {item.school} {" - "} {"Grade " + item.grade}
                  {" - "} {item.city}
                  {" - "} {item.province}
                </Text>
              </View>
            );
          }}
          // keyExtractor={(item) => item}
        />
      </Card>

      {/* Tertiary Education */}

      <Card containerStyle={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Icon
            name="graduation-cap"
            size={30}
            color="#000"
            type="font-awesome"
          />
          <Text style={[styles.cardHeaderText, styles.wrapText]}>
            Tertiary Education
          </Text>
        </View>

        <FlatList
          data={tertiaryEducationList}
          renderItem={({ item }) => {
            return (
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
            );
          }}
          // keyExtractor={(item) => item}
        />
      </Card>

      {/* <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Basic Education</Text>
          <View style={styles.iconContainer}>
            <Icon
              name="pencil-square-o"
              size={20}
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
            <Text style={styles.cardHeaderText}>Tertiary Education</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon
              name="pencil-square-o"
              size={20}
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
      </View> */}
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
    borderColor: "lightgray",
    shadowColor: "lightgray",
    borderRadius: 10
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10
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
