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
import SelectInputWrapper from "./FormComponents/SelectInputWrapper";

type AddEditAttachmentOverlay = {
  attachment?: any;
  userId?: string | any;
};

interface DocumentPickerResult {
  uri?: string;
  name?: string;
  mimeType?: string;
  size?: number;
}

const AddEditAttachmentOverlay: React.FunctionComponent<
  AddEditAttachmentOverlay
> = ({ attachment, userId }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const queryClient: any = useQueryClient();

  // console.log(education);

  const addDocumentMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.addDocument(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  const documentOptionsTemplate = [
    {
      value: "",
      label: "Select Document Name"
    },
    {
      value: "Matric Certificate",
      label: "Matric Certificate"
    },
    {
      value: "Qualification",
      label: "Qualification"
    },
    {
      value: "ID Document",
      label: "ID Document"
    },
    {
      value: "Other",
      label: "Other"
    }
  ];

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
        setFieldValue("file", {
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
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "lightgray",
        // backgroundColor: themeLight.lightColors?.primary,
        // paddingHorizontal: 10,
        height: 40,
        borderRadius: 29
      }}
    >
      {attachment ? (
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
            {attachment ? "Edit Attachment" : "Add Attachment"}
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
              documentName: "",
              file: null,
              otherName: ""
            }}
            validationSchema={Yup.object().shape({
              documentName: Yup.string().required("Document name required"),
              otherName: Yup.string().when("documentName", {
                is: "Other",
                then: () => Yup.string().required("Document name required")
              }),
              file: Yup.object().required("File required")
            })}
            enableReinitialize={true}
            onSubmit={(values: any) => {
              const formData: any = new FormData();

              formData.append("userId", values.userId);

              if (values?.documentName === "Other") {
                formData.append("documentName", values.otherName);
              } else {
                formData.append("documentName", values.documentName);
              }
              if (values.file) {
                const certFile = values.file as any;
                formData.append("file", {
                  uri: certFile.uri,
                  type: certFile.type,
                  name: certFile.name
                });

                // console.log(formData);

                addDocumentMutation.mutate(formData);
              }
            }}
          >
            {({ handleSubmit, setFieldValue, values, getFieldMeta }) => (
              <View style={styles.innerContainer}>
                {values.documentName === "Other" ? (
                  <TextInputWrapper
                    name="otherName"
                    label="Document Name"
                    secureTextEntry={false}
                  />
                ) : (
                  <SelectInputWrapper
                    name="documentName"
                    label="Document Name"
                    options={documentOptionsTemplate}
                  />
                )}

                {values.file && (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 10,
                      columnGap: 10
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>File selected:</Text>
                    <Text>{(values.file as any).name}</Text>
                  </View>
                )}

                <Text style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                  Upload Document
                </Text>
                <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                  <Button
                    title="Select File"
                    onPress={() => handleDocumentPick(setFieldValue)}
                    type="outline"
                  />
                </View>
                {getFieldMeta("file").touched && getFieldMeta("file").error && (
                  <Text
                    style={{
                      color: theme.colors.error,
                      fontSize: 12,
                      paddingHorizontal: 15
                    }}
                  >
                    {getFieldMeta("file").error}
                  </Text>
                )}

                {addDocumentMutation.isPending ? (
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
            )}
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
    height: "90%", // Full height
    marginTop: 0, // No margin
    padding: 0 // No padding
  },
  innerContainer: {
    rowGap: 0
  }
});

export default AddEditAttachmentOverlay;
