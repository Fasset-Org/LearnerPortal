import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useContext } from "react";
import { Card, Icon } from "@rneui/themed";
import themeLight from "../../Theme";
import AddEditBasicEducationOverlay from "../../components/AddEditBasicEducationOverlay";
import AddEditProfessionalSkillOverlay from "../../components/AddEditProfessionalSkillOverlay";
import AddEditCertificationOverlay from "../../components/AddEditCertificationOverlay";
import AddEditAttachmentOverlay from "../../components/AddEditAttachmentOverlay";
import { AuthContext } from "../../components/AuthContext";

const Certificate = () => {
  const { userInfo } = useContext(AuthContext);
  console.log("Certificate", userInfo?.skills);
  const data = [
    {
      title: "Professional Skills",
      iconName: "cog",
      iconType: "font-awesome",
      list: userInfo?.skills || [],
      Overlay: <AddEditProfessionalSkillOverlay userId={userInfo?.id} />,
      renderItem: ({ item }: any) => {
        return (
          <>
            {userInfo?.skills?.length > 0 ? (
              <View style={styles.cardHead}>
                <View style={styles.listItem}>
                  <Text style={styles.bullet}>{"\u2022"}</Text>
                  <Text style={styles.itemText}>
                    {item.skill} {" - "} {item.skillLevel}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </>
        );
      }
    },

    {
      title: "Certifications",
      iconName: "certificate",
      iconType: "font-awesome",
      list: [
        {
          skill: "HTML & CSS",
          skillLevel: "Expert"
        },
        {
          skill: "JavaScript",
          skillLevel: "Expert"
        },
        {
          skill: "Vue JS",
          skillLevel: "Intermediate"
        },
        {
          skill: "Microsoft Excel, Word, Access, Power Point, Outlook",
          skillLevel: "Intermediate"
        }
      ],
      Overlay: <AddEditCertificationOverlay />,
      renderItem: ({ item }: any) => {
        return (
          <View style={styles.cardHead}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <Text style={styles.itemText}>
                {item.skill} {" - "} {item.skillLevel}
              </Text>
            </View>
          </View>
        );
      }
    },

    {
      title: "Attachments",
      iconName: "file-alt",
      iconType: "font-awesome-5",
      list: [
        {
          skill: "HTML & CSS",
          skillLevel: "Expert"
        },
        {
          skill: "JavaScript",
          skillLevel: "Expert"
        },
        {
          skill: "Vue JS",
          skillLevel: "Intermediate"
        },
        {
          skill: "Microsoft Excel, Word, Access, Power Point, Outlook",
          skillLevel: "Intermediate"
        }
      ],
      Overlay: <AddEditAttachmentOverlay />,
      renderItem: ({ item }: any) => {
        return (
          <View style={styles.cardHead}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <Text style={styles.itemText}>
                {item.skill} {" - "} {item.skillLevel}
              </Text>
            </View>
            <AddEditBasicEducationOverlay />
          </View>
        );
      }
    }
  ];

  const professionalSkills: any = [
    {
      skill: "HTML & CSS",
      skillLevel: "Expert"
    },
    {
      skill: "JavaScript",
      skillLevel: "Expert"
    },
    {
      skill: "Vue JS",
      skillLevel: "Intermediate"
    },
    {
      skill: "Microsoft Excel, Word, Access, Power Point, Outlook",
      skillLevel: "Intermediate"
    }
  ];

  const certifications: any = [
    {
      course: "AZ-900 Microsoft Azure Fundamental",
      year: "2020"
    },
    {
      course: "AZ-900 Microsoft Azure Fundamental",
      year: "2020"
    },
    {
      course: "AZ-900 Microsoft Azure Fundamental",
      year: "2020"
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
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
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
                    name={item.iconName}
                    type={item.iconType}
                    size={30}
                    color={themeLight.lightColors?.primary}
                  />
                  <Text style={[styles.cardHeaderText, styles.wrapText]}>
                    {item.title}
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
                  {item.Overlay}
                  {/* <EditUserInfoOverlay userInfo={userInfo} /> */}
                </View>
              </View>

              <FlatList
                data={item.list}
                renderItem={({ item: innerItem }) => {
                  return (
                    <>
                      <item.renderItem item={innerItem} />
                    </>
                  );
                }}
              />
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Certificate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    overflow: "scroll"
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: themeLight.lightColors?.primary,

    // iOS Shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4.65, // Shadow blur radius

    // Android Elevation
    elevation: 8 // Elevation for Android shadow
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    transform: [{ rotate: "180deg" }]
  },
  cardHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
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
  },
  bigText: {
    flexShrink: 1,
    fontSize: 20
  },
  downloadCardContainer: {
    borderRadius: 10
  }
});
