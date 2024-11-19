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
import YearPicker from "./FormComponents/YearPicker";
import Toast from "react-native-toast-message";
import Dropdown from "./FormComponents/DropDown";

type AddEditTertiaryEducationOverlay = {
  education?: any;
  userId?: string | any;
};

const AddEditTertiaryEducationOverlay: React.FunctionComponent<
  AddEditTertiaryEducationOverlay
> = ({ education, userId }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const queryClient: any = useQueryClient();
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const addTertiaryEducationMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.addTertiaryEducation(formData),
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

  const editTertiaryEducationMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.editTertiaryEducation(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
      setTimeout(() => {
        setVisible(!visible);
      }, 2000);
    },
    onError: (err: any) => {
      showToast("success", "Success", err?.response?.data?.message);
      setTimeout(() => {
        setVisible(!visible);
      }, 2000);
    }
  });

  const qualificationLevelOptions = [
    {
      value: "",
      label: "Qualification Level"
    },
    {
      value: "National Certificate",
      label: "National Certificate"
    },
    {
      value: "National Diploma",
      label: "National Diploma"
    },

    {
      value: "Bachelors Degree",
      label: "Bachelors Degree"
    },

    {
      value: "Honours Degree",
      label: "Honours Degree"
    },

    {
      value: "Masters Degree",
      label: "Masters Degree"
    },
    {
      value: "Certificate",
      label: "Certificate"
    }
  ];

  const completionStatus = [
    {
      value: "",
      label: "Please select status"
    },
    {
      value: "In Progress",
      label: "In Progress"
    },
    {
      value: "Pending",
      label: "Pending"
    },
    {
      value: "Completed",
      label: "Completed"
    }
  ];

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
        <TouchableOpacity onPress={toggleOverlay}>
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
            <Icon
              name="add"
              size={20}
              type="material"
              // style={styles.iconStyle}
              color={themeLight.lightColors?.white}
            />
          </View>
        </TouchableOpacity>
      )}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.fullScreenOverlay}
      >
        <View style={styles.overlayHeader}>
          <Text style={styles.textPrimary}>
            {education ? "Edit Tertiary Education" : "Add Tertiary Education"}
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
              tertiaryEducationId: education?.id || "",
              educationLevel: education?.educationLevel || "",
              fieldOfStudy: education?.fieldOfStudy || "",
              institution: education?.institution || "",
              startYear: education?.startYear || "",
              endYear: education?.endYear || "",
              status: education?.status || ""
            }}
            validationSchema={Yup.object({
              educationLevel: Yup.string().required(
                "Qualification level required"
              ),
              fieldOfStudy: Yup.string().required(
                "Field of study name required"
              ),
              institution: Yup.string().required("Institution required"),
              startYear: Yup.string().required("Year started required"),
              status: Yup.string().required("Status required"),
              endYear: Yup.string().when("status", {
                is: "Completed",
                then: (schema) => Yup.date().required("Year completed Required")
              })
            })}
            enableReinitialize={true}
            onSubmit={(values) => {
              if (education) {
                editTertiaryEducationMutation.mutate(values);
              } else {
                addTertiaryEducationMutation.mutate(values);
              }
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => {
              // console.log(values);
              return (
                <View style={styles.innerContainer}>
                  {/* <YearPicker
                    selectedYear={selectedYear}
                    onSelectYear={(year) => {
                      setSelectedYear(year);
                      setFieldValue("year", year);
                    }}
                  /> */}

                  <Dropdown
                    name="educationLevel"
                    data={qualificationLevelOptions}
                    placeholder={"Qualification Level"}
                  />
                  <TextInputWrapper
                    name="fieldOfStudy"
                    label="FIeld Of Study"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="institution"
                    label="Institution"
                    secureTextEntry={false}
                  />

                  <TextInputWrapper
                    name="startYear"
                    label="Start Year"
                    secureTextEntry={false}
                  />

                  <Dropdown
                    name="status"
                    placeholder="Status"
                    data={completionStatus}
                  />

                  {values.status === "Completed" && (
                    <TextInputWrapper
                      name="endYear"
                      label="End Year"
                      secureTextEntry={false}
                    />
                  )}

                  {education ? (
                    <>
                      {editTertiaryEducationMutation.isPending ? (
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
                      {addTertiaryEducationMutation.isPending ? (
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
    height: "90%", // Full height
    marginTop: 0, // No margin
    padding: 0 // No padding
  },
  innerContainer: {
    rowGap: 0
  }
});

export default AddEditTertiaryEducationOverlay;
