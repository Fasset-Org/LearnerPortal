import React, { useState } from "react";
import { Button, Overlay, Icon, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import themeLight from "../Theme";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInputWrapper from "./FormComponents/TextInputWrapper";
import SelectInputWrapper from "./FormComponents/SelectInputWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import { showToast } from "../utils/showToast";
import { ActivityIndicator } from "react-native-paper";

type EditUserInfoOverlay = {
  userInfo: any;
};

const EditUserInfoOverlay: React.FunctionComponent<EditUserInfoOverlay> = ({
  userInfo
}: any) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const queryClient: any = useQueryClient();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const editBadicInfoMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.editBasicInfo(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
      setVisible(!visible);
    },
    onError: (err: any) => {
      showToast("success", "Success", err?.response?.data?.message);
      setVisible(!visible);
    }
  });

  const careerStatusOptions = [
    {
      value: "",
      label: "None"
    },
    {
      value: "I am a high school learner” for career status",
      label: "I am a high school learner” for career status"
    },
    {
      value: "I obtained a matric certificate",
      label: "I obtained a matric certificate"
    },
    {
      value: "I obtained a matric certificate with university exemption",
      label: "I obtained a matric certificate with university exemption"
    },
    {
      value: "I am currently registered at a tertiary institution",
      label: "I am currently registered at a tertiary institution"
    },
    {
      value: "I have no formal employment",
      label: "I have no formal employment"
    },
    {
      value: "I currently have a part-time job / internship",
      label: "I currently have a part-time job / internship"
    },
    {
      value: "I currently have a full-time, salaried job",
      label: "I currently have a full-time, salaried job"
    }
  ];

  const raceOptions = [
    {
      value: "",
      label: "None"
    },
    {
      value: "Black",
      label: "Black"
    },
    {
      value: "White",
      label: "White"
    },
    {
      value: "Coloured",
      label: "Coloured"
    },
    {
      value: "Indian",
      label: "Indian"
    }
  ];

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
      <TouchableOpacity
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
        onPress={toggleOverlay}
      >
        <Icon
          name="pencil-square-o"
          size={20}
          type="font-awesome"
          style={styles.iconStyle}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.fullScreenOverlay}
      >
        <View style={styles.overlayHeader}>
          <Text style={styles.textPrimary}>Edit Basic Information</Text>
          <Icon
            name="close"
            type="material"
            color="white"
            size={30}
            onPress={toggleOverlay}
          />
        </View>
        <ScrollView>
          <View style={{ padding: 10 }}>
            <Formik
              initialValues={{
                id: userInfo?.id || "",
                firstName: userInfo?.firstName || "",
                middleName: userInfo?.middleName || "",
                lastName: userInfo?.lastName || "",
                identificationNumber:
                  userInfo?.studentInformation?.identificationNumber || "",
                rsaId: userInfo?.studentInformation?.rsaId || "",
                passportNumber:
                  userInfo?.studentInformation?.passportNumber || "",
                disbility: userInfo?.studentInformation?.disbility || "",
                careerStatus: userInfo?.studentInformation?.careerStatus || "",
                mobileNumber: userInfo?.studentInformation?.mobileNumber || "",
                race: userInfo?.studentInformation?.race || ""
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required("FirstName required"),
                lastName: Yup.string().required("LastName required"),
                careerStatus: Yup.string().required("Career status required"),
                mobileNumber: Yup.string().required("Mobile number required"),
                race: Yup.string().required("Race is required"),
                disbility: Yup.string().required(
                  "Disability status is required"
                ),
                rsaId: Yup.string().required("Please select"),
                identificationNumber: Yup.string().when("rsaId", {
                  is: "Yes",
                  then: () =>
                    Yup.string()
                      .required("ID number required")
                      .test(
                        "rsaId",
                        "Please provide valid Identification Number",
                        function (num) {
                          let idNumber = num?.toString();
                          var correct = true;
                          if (
                            idNumber?.length !== 13 ||
                            !!isNaN(parseFloat(num))
                          ) {
                            correct = false;
                          }
                          var tempDate = new Date(
                            Number(idNumber?.substring(0, 2)),
                            Number(idNumber?.substring(2, 4)) - 1,
                            Number(idNumber?.substring(4, 6))
                          );
                          if (tempDate instanceof Date) {
                            correct = true;
                          } else {
                            correct = false;
                          }
                          var tempTotal = 0;
                          var checkSum = 0;
                          var multiplier = 1;

                          for (var i = 0; i < 13; ++i) {
                            tempTotal =
                              parseInt(idNumber?.charAt(i)) * multiplier;
                            if (tempTotal > 9) {
                              tempTotal =
                                parseInt(tempTotal.toString().charAt(0)) +
                                parseInt(tempTotal.toString().charAt(1));
                            }
                            checkSum = checkSum + tempTotal;
                            multiplier = multiplier % 2 === 0 ? 1 : 2;
                          }
                          if (checkSum % 10 !== 0) {
                            correct = false;
                          }
                          if (correct) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      )
                }),
                passportNumber: Yup.string().when("rsaId", {
                  is: "No",
                  then: () => Yup.string().required("Passport number required")
                })
              })}
              onSubmit={(values) => {
                editBadicInfoMutation.mutate(values);
              }}
            >
              {({ handleSubmit, values }) => (
                <View>
                  <TextInputWrapper
                    name="firstName"
                    label="First Name"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="middleName"
                    label="Middle Name"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="lastName"
                    label="Last Name"
                    secureTextEntry={false}
                  />
                  <SelectInputWrapper
                    name="rsaId"
                    label="Do you have RSA ID?"
                    options={[
                      { value: "", label: "Do you have RSA ID?" },
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" }
                    ]}
                  />

                  {values.rsaId === "Yes" && (
                    <TextInputWrapper
                      name="identificationNumber"
                      label="Identification Number"
                      secureTextEntry={false}
                      disable={true}
                    />
                  )}

                  {values.rsaId === "No" && (
                    <TextInputWrapper
                      name="passportNumber"
                      label="Passport Number"
                      secureTextEntry={false}
                    />
                  )}

                  <SelectInputWrapper
                    name="disbility"
                    label="Disability"
                    options={[
                      { value: "", label: "Disability?" },
                      { value: "None", label: "None" },
                      { value: "Yes", label: "Yes" }
                    ]}
                  />

                  <SelectInputWrapper
                    name="careerStatus"
                    label="Career Status"
                    options={careerStatusOptions}
                  />

                  <SelectInputWrapper
                    name="race"
                    label="Race"
                    options={raceOptions}
                  />

                  <TextInputWrapper
                    name="mobileNumber"
                    label="Mobile Number"
                    secureTextEntry={false}
                  />
                  {editBadicInfoMutation.isPending ? (
                    <ActivityIndicator animating={true} size="large" />
                  ) : (
                    <TouchableOpacity onPress={() => handleSubmit()}>
                      <Button
                        title="UPDATE"
                        icon={
                          <Icon
                            name="pencil-square-o"
                            size={20}
                            color={theme.colors.secondary}
                            type="font-awesome"
                          />
                        }
                        iconPosition="right"
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
        </ScrollView>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // margin: 10
  },
  overlayHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    backgroundColor: themeLight.lightColors?.primary,
    paddingHorizontal: 20,
    height: 60
  },
  textPrimary: {
    fontSize: 17,
    color: "#FFFFFF"
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

export default EditUserInfoOverlay;
