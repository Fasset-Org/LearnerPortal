import React, { useState } from "react";
import { Button, Overlay, Icon, useTheme } from "@rneui/themed";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import themeLight from "../Theme";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInputWrapper from "./FormComponents/TextInputWrapper";
import SelectInputWrapper from "./FormComponents/SelectInputWrapper";

type AddEditTertiaryEducationOverlay = {};

const AddEditTertiaryEducationOverlay: React.FunctionComponent<
  AddEditTertiaryEducationOverlay
> = () => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Icon
        name="pencil-square-o"
        size={20}
        type="font-awesome"
        // style={styles.iconStyle}
        color={themeLight.lightColors?.primary}
        onPress={toggleOverlay}
      />
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
        <View style={{ padding: 10 }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              rsaId: ""
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required("FirstName required"),
              lastName: Yup.string().required("LastName required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Email required"),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password required"),
              rsaId: Yup.string().required("Please select")
            })}
            onSubmit={(values) => {}}
            // Optionally add validationSchema here
          >
            {({ handleSubmit }) => (
              <View style={styles.innerContainer}>
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
                <TextInputWrapper
                  name="password"
                  label="Password"
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
            )}
          </Formik>
        </View>
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
