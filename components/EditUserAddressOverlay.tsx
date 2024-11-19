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
import TextInputWrapper from "./FormComponents/TextInputWrapper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import { showToast } from "../utils/showToast";
import { ActivityIndicator } from "react-native-paper";
import Dropdown from "./FormComponents/DropDown";
import Toast from "react-native-toast-message";

type EditUserAddressOverlay = {
  studentAddress: any;
};

const EditUserAddressOverlay: React.FunctionComponent<
  EditUserAddressOverlay
> = ({ studentAddress }) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const queryClient: any = useQueryClient();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addAddressMutation = useMutation({
    mutationFn: (formData: any) => StudentQuery.addAddresInfo(formData),
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

  const editAddressMutation = useMutation({
    mutationFn: (formData) => StudentQuery.editAddressInfo(formData),
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
        {!studentAddress ? (
          <Icon
            name="add"
            type="material"
            size={20}
            style={styles.iconStyle}
            color="#FFFFFF"
          />
        ) : (
          <Icon
            name="pencil-square-o"
            size={20}
            type="font-awesome"
            style={styles.iconStyle}
            color="#FFFFFF"
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
            {studentAddress
              ? "Edit Address Information"
              : "Add Address Information"}
          </Text>
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
                id: studentAddress?.id,
                streetNumber: studentAddress?.streetNumber || "",
                streetName: studentAddress?.streetName || "",
                suburb: studentAddress?.suburb || "",
                manicipality: studentAddress?.manicipality || "",
                city: studentAddress?.city || "",
                province: studentAddress?.province || "",
                country: studentAddress?.country || "",
                postalCode: studentAddress?.postalCode || ""
              }}
              validationSchema={Yup.object().shape({
                manicipality: Yup.string().required("Manicipality is required"),
                city: Yup.string().required("City is required"),
                province: Yup.string().required("Province is required"),
                country: Yup.string().required("Country is required"),
                postalCode: Yup.string().required("Postal Code is required")
              })}
              onSubmit={(values: any) => {
                if (studentAddress) {
                  editAddressMutation.mutate(values);
                } else {
                  addAddressMutation.mutate(values);
                }
              }}
            >
              {({ handleSubmit, values }) => (
                <View style={styles.innerContainer}>
                  <TextInputWrapper
                    name="streetNumber"
                    label="Street Number"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="streetName"
                    label="Street Name"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="suburb"
                    label="Suburb"
                    secureTextEntry={false}
                  />

                  <TextInputWrapper
                    name="manicipality"
                    label="Municipality"
                    secureTextEntry={false}
                  />

                  <TextInputWrapper
                    name="city"
                    label="City"
                    secureTextEntry={false}
                  />
                  <Dropdown
                    name="province"
                    placeholder="Province"
                    data={provinces}
                  />
                  <TextInputWrapper
                    name="country"
                    label="Country"
                    secureTextEntry={false}
                  />
                  <TextInputWrapper
                    name="postalCode"
                    label="Postal Code"
                    secureTextEntry={false}
                  />
                  {studentAddress ? (
                    <>
                      {editAddressMutation.isPending ? (
                        <ActivityIndicator size="large" />
                      ) : (
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => handleSubmit()}
                        >
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
                    </>
                  ) : (
                    <>
                      {addAddressMutation.isPending ? (
                        <ActivityIndicator size="large" />
                      ) : (
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => handleSubmit()}
                        >
                          <Button
                            title="SAVE"
                            // icon={
                            //   <Icon
                            //     name="add"
                            //     size={20}
                            //     color={theme.colors.secondary}
                            //     type="material"
                            //   />
                            // }
                            iconPosition="right"
                            type="solid"
                            buttonStyle={{
                              borderColor: theme.colors.primary,
                              borderWidth: 1
                            }}
                            titleStyle={{
                              // color: theme.colors.secondary,
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
        </ScrollView>
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

export default EditUserAddressOverlay;
