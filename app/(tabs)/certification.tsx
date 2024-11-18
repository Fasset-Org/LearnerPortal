import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useContext } from "react";
import { Card, Icon } from "@rneui/themed";
import themeLight from "../../Theme";
import AddEditBasicEducationOverlay from "../../components/AddEditBasicEducationOverlay";
import AddEditProfessionalSkillOverlay from "../../components/AddEditProfessionalSkillOverlay";
import AddEditCertificationOverlay from "../../components/AddEditCertificationOverlay";
import AddEditAttachmentOverlay from "../../components/AddEditAttachmentOverlay";
import { AuthContext } from "../../components/AuthContext";
import DeleteCertificationModal from "../../components/DeleteCertificationModal";
import DeleteProfessionalSkillModal from "../../components/DeleteProfessionalSkillModal";
import DeleteDocumentModal from "../../components/DeleteDocumentModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../xhr/student";
import { useFocusEffect } from "expo-router";

const Certificate = () => {
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
            <View style={styles.cardHead}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>{"\u2022"}</Text>
                <Text style={styles.itemText}>
                  {item.skill} {" - "} {item.skillLevel}
                </Text>
              </View>
              <DeleteProfessionalSkillModal id={item.id} />
            </View>
          </>
        );
      }
    },

    {
      title: "Certifications",
      iconName: "certificate",
      iconType: "font-awesome",
      list: userInfo?.certificates || [],
      Overlay: <AddEditCertificationOverlay userId={userInfo?.id} />,
      renderItem: ({ item }: any) => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              width: "100%"
            }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 24, marginRight: 8 }}>{"\u2022"}</Text>
              <Text style={styles.itemText}>
                {item.course} {" - "} {item.year}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center"
              }}
            >
              {/* <TouchableOpacity>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "lightgray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: themeLight.lightColors?.primary
                  }}
                >
                  <Icon
                    name="download"
                    type="material"
                    size={20}
                    iconStyle={{ color: "#FFFFFF" }}
                  />
                </View>
              </TouchableOpacity> */}
              <DeleteCertificationModal id={item.id} />
            </View>
          </View>
        );
      }
    },

    {
      title: "Attachments",
      iconName: "file-alt",
      iconType: "font-awesome-5",
      list: userInfo?.attachments,
      Overlay: <AddEditAttachmentOverlay userId={userInfo?.id} />,
      renderItem: ({ item }: any) => {
        return (
          <View style={styles.cardHead}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <Text style={styles.itemText}>{item.documentName}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center"
              }}
            >
              {/* <TouchableOpacity>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "lightgray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: themeLight.lightColors?.primary
                  }}
                >
                  <Icon
                    name="download"
                    type="material"
                    size={20}
                    iconStyle={{ color: "#FFFFFF" }}
                  />
                </View>
              </TouchableOpacity> */}
              {/* <DeleteDocumentModal /> */}
            </View>
          </View>
        );
      }
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

                {item.Overlay}
                {/* <EditUserInfoOverlay userInfo={userInfo} /> */}
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
