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
import Toast from "react-native-toast-message";
import Dropdown from "./FormComponents/DropDown";

type AddEditProfessionalSkillOverlay = {
  professionlSkill?: any;
  userId?: string | any;
};

const AddEditProfessionalSkillOverlay: React.FunctionComponent<
  AddEditProfessionalSkillOverlay
> = ({ professionlSkill, userId }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const queryClient: any = useQueryClient();

  // console.log(education);

  const addProfessionalSkillMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.addProfessionalSkill(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
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
        {professionlSkill ? (
          <Icon
            name="pencil-square-o"
            size={20}
            type="font-awesome"
            // style={styles.iconStyle}
            color={themeLight.lightColors?.primary}
          />
        ) : (
          <Icon
            name="add"
            size={20}
            type="material"
            // style={styles.iconStyle}
            color={themeLight.lightColors?.white}
          />
        )}
      </TouchableOpacity>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.fullScreenOverlay}
      >
        <View style={styles.overlayHeader}>
          <Text style={styles.textPrimary}>
            {professionlSkill
              ? "Edit Professional Skill"
              : "Add Professional Skill"}
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
              addProfessionalSkillMutation.mutate(values);
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <View style={styles.innerContainer}>
                <TextInputWrapper
                  name="skill"
                  label="Skill"
                  secureTextEntry={false}
                />
                <Dropdown
                  name="skillLevel"
                  placeholder="Skill Level"
                  data={[
                    {
                      value: "",
                      label: "Select level"
                    },
                    {
                      value: "Beginner",
                      label: "Beginner"
                    },
                    {
                      value: "Intermediate",
                      label: "Intermediate"
                    },
                    {
                      value: "Expert",
                      label: "Expert"
                    }
                  ]}
                />

                {addProfessionalSkillMutation.isPending ? (
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

export default AddEditProfessionalSkillOverlay;
