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
import { Formik } from "formik";
import * as Yup from "yup";
import TextInputWrapper from "./FormComponents/TextInputWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import { showToast } from "../utils/showToast";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import Dropdown from "./FormComponents/DropDown";

type AddEditBasicEducationOverlay = {
  education?: any;
  userId?: string | any;
};

const AddEditBasicEducationOverlay: React.FunctionComponent<
  AddEditBasicEducationOverlay
> = ({ education, userId }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const queryClient: any = useQueryClient();

  const grades = [
    {
      value: "",
      label: "Highest Grade Passed"
    },
    {
      value: "Grade 9",
      label: "Grade 9"
    },
    {
      value: "Grade 10",
      label: "Grade 10"
    },
    {
      value: "Grade 11",
      label: "Grade 11"
    },
    {
      value: "Grade 12",
      label: "Grade 12(Matric)"
    }
  ];

  const provinces = [
    { label: "Gauteng", value: "Gauteng" },
    { label: "KwaZulu-Natal", value: "KwaZulu-Natal" },
    { label: "Western Cape", value: "Western Cape" },
    { label: "Eastern Cape", value: "Eastern Cape" },
    { label: "Free State", value: "Free State" },
    { label: "Limpopo", value: "Limpopo" },
    { label: "Mpumalanga", value: "Mpumalanga" },
    { label: "North West", value: "North West" },
    { label: "Northern Cape", value: "Northern Cape" }
  ];

  const addBasicEducationMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.addBasicEducation(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
      setTimeout(() => {
        setVisible(!visible);
      }, 2000);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  const editBasicEducationMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.editBasicEducation(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
      setTimeout(() => {
        setVisible(!visible);
      }, 2000);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
      setTimeout(() => {
        setVisible(!visible);
      }, 2000);
    }
  });

  const toggleOverlay = () => {
    setVisible(!visible);
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
            {education ? "Edit Basic Education" : "Add Basic Education"}
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
              educationId: education?.id || "",
              grade: education?.grade || "",
              school: education?.school || "",
              city: education?.city || "",
              province: education?.province || ""
            }}
            validationSchema={Yup.object({
              grade: Yup.string().required("Grade required"),
              school: Yup.string().required("School required"),
              city: Yup.string().required("City required"),
              province: Yup.string().required("Province required")
            })}
            onSubmit={(values) => {
              if (education) {
                editBasicEducationMutation.mutate(values);
              } else {
                addBasicEducationMutation.mutate(values);
              }
            }}
          >
            {({ handleSubmit }) => (
              <View style={styles.innerContainer}>
                <Dropdown
                  name="grade"
                  placeholder="Highest Grade Passed"
                  data={grades}
                />
                <TextInputWrapper
                  name="school"
                  label="High School Name"
                  secureTextEntry={false}
                />
                <TextInputWrapper
                  name="city"
                  label="High School City"
                  secureTextEntry={false}
                />

                <Dropdown
                  name="province"
                  placeholder="High School Province"
                  data={provinces}
                />
                {education ? (
                  <>
                    {editBasicEducationMutation.isPending ? (
                      <ActivityIndicator size="large" animating={true} />
                    ) : (
                      <TouchableOpacity style={styles.button}>
                        <Button
                          title="UPDATE"
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
                  </>
                ) : (
                  <>
                    {addBasicEducationMutation.isPending ? (
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
                  </>
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

export default AddEditBasicEducationOverlay;
