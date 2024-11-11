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
import SelectInputWrapper from "./FormComponents/SelectInputWrapper";
import Toast from "react-native-toast-message";

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
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  const editTertiaryEducationMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.editTertiaryEducation(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (err: any) => {
      showToast("success", "Success", err?.response?.data?.message);
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
      value: "National First Degree (Min 360",
      label: "National First Degree (Min 360"
    },
    {
      value: "Post-doctoral Degree",
      label: "Post-doctoral Degree"
    },
    {
      value: "Doctoral Degree",
      label: "Doctoral Degree"
    },
    {
      value: "Masters Degree",
      label: "Masters Degree"
    },
    {
      value: "Professional Qualification",
      label: "Professional Qualification"
    },
    {
      value: "Honours Degree",
      label: "Honours Degree"
    },
    {
      value: "National Higher Diploma",
      label: "National Higher Diploma"
    },
    {
      value: "National Masters Diploma",
      label: "National Masters Diploma"
    },
    {
      value: "National Higher Certificate",
      label: "National Higher Certificate"
    },
    {
      value: "Further Diploma",
      label: "Further Diploma"
    },
    {
      value: "Post Graduate Diploma",
      label: "Post Graduate Diploma"
    },
    {
      value: "Senior Certificate",
      label: "Senior Certificate"
    },
    {
      value: "Qual at Nat Sen Cert level",
      label: "Qual at Nat Sen Cert level"
    },
    {
      value: "Apprenticeship / Trade Cert",
      label: "Apprenticeship / Trade Cert"
    },
    {
      value: "Post Grad B Degree (phasing out) e.g. B Ed",
      label: "Post Grad B Degree (phasing out) e.g. B Ed"
    },
    {
      value: "Post Diploma Diploma (phasing out)",
      label: "Post Diploma Diploma (phasing out)"
    },
    {
      value: "Post-basic Diploma [mainly applies to Nursing]",
      label: "Post-basic Diploma [mainly applies to Nursing]"
    },
    {
      value: "Further Ed and Training Cert (FETC)",
      label: "Further Ed and Training Cert (FETC)"
    },
    {
      value: "National First Degree (Min 480)",
      label: "National First Degree (Min 480)"
    },
    {
      value: "Schl below SenC: (not full qualification)",
      label: "Schl below SenC: (not full qualification)"
    },
    {
      value: "Advanced Certificate",
      label: "Advanced Certificate"
    },
    {
      value: "Advanced Diploma",
      label: "Advanced Diploma"
    },
    {
      value: "Higher Certificate",
      label: "Higher Certificate"
    },
    {
      value: "Occupational Certificate",
      label: "Occupational Certificate"
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
            {({ handleSubmit, setFieldValue, values }) => (
              <View style={styles.innerContainer}>
                {/* <YearPicker
                  selectedYear={selectedYear}
                  onSelectYear={(year) => {
                    setSelectedYear(year);
                    setFieldValue("year", year);
                  }}
                /> */}
                <SelectInputWrapper
                  name="educationLevel"
                  label="Education Level"
                  options={qualificationLevelOptions}
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

                <SelectInputWrapper
                  name="status"
                  label="Status"
                  options={completionStatus}
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

export default AddEditTertiaryEducationOverlay;
