import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Formik } from "formik";
import TextInputWrapper from "../../components/FormComponents/TextInputWrapper";
import * as Yup from "yup";
import { Button, Icon, useTheme } from "@rneui/themed";
import themeLight from "../../Theme";
import SelectInputWrapper from "../../components/FormComponents/SelectInputWrapper";
import { useMutation } from "@tanstack/react-query";
import AuthQuery from "../xhr/auth";
import { AxiosError, AxiosResponse } from "axios";

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

  const { mutate, data, error, isError, isSuccess } = useMutation<
    AxiosResponse<any>,
    AxiosError,
    FormData
  >({
    mutationFn: (formData: FormData) => {
      return AuthQuery.registerUser(formData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err: unknown) => {
      const error = err as AxiosError;

      console.log(JSON.stringify(error.response.data));
    }
  });

  if (error) {
    console.log("Err", error);
  }

  return (
    <ScrollView>
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
            passportNumber: ""
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
                      if (idNumber?.length !== 13 || !!isNaN(parseFloat(num))) {
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
                        tempTotal = parseInt(idNumber?.charAt(i)) * multiplier;
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
            // console.log(values);
            mutate(values);
          }}
          enableReinitialize
        >
          {({ handleSubmit, values, errors }) => {
            // console.log(errors, values);
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
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
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
