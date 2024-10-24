import React, { useState } from "react";
import { Button, Overlay, Icon, useTheme } from "@rneui/themed";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import themeLight from "../Theme";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInputWrapper from "./FormComponents/TextInputWrapper";
import SelectInputWrapper from "./FormComponents/SelectInputWrapper";

type AddEditBasicEducationOverlay = {
  education?: any;
};

const AddEditBasicEducationOverlay: React.FunctionComponent<
  AddEditBasicEducationOverlay
> = ({ education }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

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
            {education ? "Edit Basic Education" : "Add Basic Information"}
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
              grade: "",
              school: "",
              city: "",
              province: ""
            }}
            validationSchema={Yup.object({
              grade: Yup.string().required("Grade required"),
              school: Yup.string().required("School required"),
              city: Yup.string().required("City required"),
              province: Yup.string().required("Province required")
            })}
            onSubmit={(values) => {}}
            // Optionally add validationSchema here
          >
            {({ handleSubmit }) => (
              <View style={styles.innerContainer}>
                <TextInputWrapper
                  name="grade"
                  label="Highest Grade Passed"
                  secureTextEntry={false}
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

                <TextInputWrapper
                  name="province"
                  label="High School Province"
                  secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}>
                  <Button
                    title="SAVE"
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

export default AddEditBasicEducationOverlay;
