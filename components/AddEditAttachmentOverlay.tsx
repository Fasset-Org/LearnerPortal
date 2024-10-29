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
  education?: any;
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
> = ({ education, userId }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const queryClient: any = useQueryClient();

  console.log(education);

  const addCertificationMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.addProfessionalSkill(formData),
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
      value: "Id Document",
      label: "Id Document"
    }
  ];

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allows all file types
        copyToCacheDirectory: false
      });

      console.log(result);

      if (!(result.canceled === true)) {
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
              skill: "",
              skillLevel: ""
            }}
            validationSchema={Yup.object().shape({
              skill: Yup.string().required("Please enter skill"),
              skillLevel: Yup.string().required("Please select skill level")
            })}
            enableReinitialize={true}
            onSubmit={(values) => {
              addCertificationMutation.mutate(values);
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <View style={styles.innerContainer}>
                <SelectInputWrapper
                  name="documentName"
                  label="Document Name"
                  options={documentOptionsTemplate}
                />

                <Text style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                  Upload Document
                </Text>
                <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                  <Button title="Select File" onPress={handleDocumentPick} />
                </View>

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
    height: "100%", // Full height
    marginTop: 0, // No margin
    padding: 0 // No padding
  },
  innerContainer: {
    rowGap: 0
  }
});

export default AddEditAttachmentOverlay;
