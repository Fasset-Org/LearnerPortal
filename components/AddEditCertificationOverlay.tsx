import React, { useState } from "react";
import { Button, Overlay, Icon, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import themeLight from "../Theme";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import TextInputWrapper from "./FormComponents/TextInputWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import { showToast } from "../utils/showToast";
import Toast from "react-native-toast-message";
import * as DocumentPicker from "expo-document-picker";

type AddEditCertificationOverlay = {
  education?: any;
  userId?: string | any;
};

interface DocumentPickerResult {
  uri?: string;
  name?: string;
  mimeType?: string;
  size?: number;
}

const AddEditCertificationOverlay: React.FunctionComponent<
  AddEditCertificationOverlay
> = ({ education, userId }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const queryClient: any = useQueryClient();

  // console.log("user id", userId);

  const addCertificationMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.addCertification(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (err: any) => {
      console.log("error", err);
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleDocumentPick = async (setFieldValue: any) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allows all file types
        copyToCacheDirectory: false
      });

      if (!result.canceled) {
        setFieldValue("certificateFile", {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          type: result.assets[0].mimeType || "application/octet-stream",
          size: result.assets[0].size,
          lastModified: result.assets[0].lastModified
        });
      } else {
        console.log("Document picking canceled");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <View>
      {education ? (
        <Icon
          name="pencil-square-o"
          size={20}
          type="font-awesome"
          // style={styles.iconStyle}
          color={themeLight.lightColors?.primary}
          onPress={toggleOverlay}
        />
      ) : (
        <Icon
          name="add"
          size={20}
          type="material"
          // style={styles.iconStyle}
          color={themeLight.lightColors?.white}
          onPress={toggleOverlay}
        />
      )}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.fullScreenOverlay}
      >
        <View style={styles.overlayHeader}>
          <Text style={styles.textPrimary}>
            {education ? "Edit Certification" : "Add Certification"}
          </Text>
          <Icon
            name="close"
            type="material"
            color="white"
            size={30}
            onPress={toggleOverlay}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Formik
            initialValues={{
              userId: userId || "",
              certificateId: "",
              course: "",
              year: "",
              certificateFile: null
            }}
            validationSchema={Yup.object().shape({
              course: Yup.string().required("Course required"),
              year: Yup.string().required("Year completed required"),
              certificateFile: Yup.object().required("Please select a file")
            })}
            enableReinitialize={true}
            onSubmit={(values) => {
              const formData: any = new FormData();
              formData.append("userId", values.userId);
              formData.append("certificateId", values.certificateId);
              formData.append("course", values.course);
              formData.append("year", values.year);
              console.log("HI");
              if (values.certificateFile) {
                const certFile = values.certificateFile as any;
                formData.append("certificateFile", {
                  uri: certFile.uri,
                  type: certFile.type,
                  name: certFile.name
                });
              }
              addCertificationMutation.mutate(formData);
            }}
          >
            {({ handleSubmit, setFieldValue, values, getFieldMeta }) => {
              // console.log(values);
              return (
                <View style={styles.innerContainer}>
                  <TextInputWrapper
                    name="course"
                    label="Course"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="year"
                    label="Year"
                    secureTextEntry={false}
                  />
                  <Text style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                    Upload Certificate Document
                  </Text>
                  {values.certificateFile && (
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 10,
                        columnGap: 10
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>File selected:</Text>
                      <Text>{(values.certificateFile as any).name}</Text>
                    </View>
                  )}
                  <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                    <Button
                      title="Select File"
                      type="outline"
                      onPress={() => handleDocumentPick(setFieldValue)}
                    />
                  </View>

                  {getFieldMeta("certificateFile").touched &&
                    getFieldMeta("certificateFile").error && (
                      <Text
                        style={{
                          color: theme.colors.error,
                          fontSize: 12,
                          paddingHorizontal: 15
                        }}
                      >
                        {getFieldMeta("certificateFile").error}
                      </Text>
                    )}

                  {addCertificationMutation.isPending ? (
                    <ActivityIndicator size="large" animating={true} />
                  ) : (
                    <TouchableOpacity style={styles.button}>
                      <Button
                        title="SAVE"
                        type="outline"
                        buttonStyle={{
                          borderColor: theme.colors.secondary,
                          borderWidth: 1
                        }}
                        titleStyle={{
                          color: theme.colors.secondary,
                          marginRight: 10
                        }}
                        onPress={() => handleSubmit()}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          </Formik>
        </View>

        <Toast />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10
  },
  overlayHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    backgroundColor: themeLight.lightColors?.primary,
    paddingHorizontal: 10,
    height: 60
  },
  textPrimary: {
    fontSize: 17,
    color: "#FFFFFF"
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17
  },
  iconStyle: {
    color: "#FFFFFF"
  },
  fullScreenOverlay: {
    width: "100%", // Full width
    height: "100%", // Full height
    marginTop: 0, // No margin
    padding: 0 // No padding
  },
  innerContainer: {
    rowGap: 0
  }
});

export default AddEditCertificationOverlay;
