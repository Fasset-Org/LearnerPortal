import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Formik } from "formik";
import TextInputWrapper from "../../components/FormComponents/TextInputWrapper";
import * as Yup from "yup";
import { Button, Dialog, Icon, Text, useTheme } from "@rneui/themed";
import themeLight from "../../Theme";
import SelectInputWrapper from "../../components/FormComponents/SelectInputWrapper";
import { useMutation } from "@tanstack/react-query";
import AuthQuery from "../xhr/auth";
import { Redirect, useRouter } from "expo-router";
import LoadingPopup from "../../components/LoadingComponent";
import { ActivityIndicator } from "react-native-paper";
import { showToast } from "../../utils/showToast";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../components/AuthContext";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  rsaId: string;
  confirmPassword: string;
  identificationNumber?: string;
  passportNumber?: string;
}

const Register = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const { isAuth } = useContext(AuthContext);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return AuthQuery.registerUser(formData);
    },
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      setTimeout(() => {
        router.push(`/(auth)/login`);
      }, 2000);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  const openURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Unable to open this URL: ${url}`);
    }
  };

  // if (isAuth) {
  //   return <Redirect href="/(tabs)" />;
  // }

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require(`../../assets/images/blueLogo-transparentBg.png`)}
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subTitle}>
            Register to continue to Learner Portal
          </Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              rsaId: "",
              confirmPassword: "",
              identificationNumber: "",
              passportNumber: "",
              userType: "student"
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required("Email required")
                .email("Please prodive a valid email format"),
              password: Yup.string()
                .required("Password required")
                .min(8, "At least 8 characters required for password"),
              confirmPassword: Yup.string()
                .required("Confirm password required")
                .oneOf([Yup.ref("password"), ""], "Passwords must match"),
              firstName: Yup.string().required("FirstName required"),
              lastName: Yup.string().required("LastName required"),
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
            onSubmit={(values: FormData) => {
              mutate(values);
            }}
            enableReinitialize
          >
            {({ handleSubmit, values, errors }) => {
              return (
                <View style={styles.innerContainer}>
                  <TextInputWrapper
                    name="firstName"
                    label="FirstName"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="lastName"
                    label="LastName"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="email"
                    label="Email"
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
                    />
                  )}

                  {values.rsaId === "No" && (
                    <TextInputWrapper
                      name="passportNumber"
                      label="Passport Number"
                      secureTextEntry={false}
                    />
                  )}

                  <TextInputWrapper
                    name="password"
                    label="Password"
                    secureTextEntry={true}
                  />

                  <TextInputWrapper
                    name="confirmPassword"
                    label="Conrifm Password"
                    secureTextEntry={true}
                  />

                  {isPending ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <TouchableOpacity style={styles.button}>
                      <Button
                        title="REGISTER"
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

                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 14, flexWrap: "nowrap" }}>
                      By registering and completing your profile, you agree that
                      you have read, understood, and accepted that you will be
                      bound by the terms of use of the
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "blue",
                        textDecorationLine: "underline",
                        flexWrap: "nowrap"
                      }}
                      onPress={() =>
                        openURL(
                          "https://www.learner-portal.fasset.org.za/static/media/FASSET%20POPIA%20POLICY.d44535ef675cac491a34.pdf"
                        )
                      }
                    >
                      POPI Act No.4 2013
                    </Text>
                    <Text style={{ fontSize: 14, flexWrap: "nowrap" }}>
                      . FASSET endeavors to take all reasonable precautions to
                      ensure that any information provided is only used for the
                      purposes for which it has been provided.
                    </Text>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    rowGap: 10,
    backgroundColor: "#FFFFFF"
  },
  innerContainer: {
    // rowGap: 5
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 130,
    height: 130
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold"
  },
  subTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: themeLight.lightColors?.primary
  },
  button: {
    padding: 10
  },
  forgotText: {
    textAlign: "right",
    fontSize: 17,
    color: themeLight.lightColors?.primary,
    padding: 10
  }
});
