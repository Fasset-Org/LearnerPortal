import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Dialog } from "@rneui/themed";
import { Icon } from "@rneui/base";
import themeLight from "../Theme";
import { Form, Formik } from "formik";
import TextInputWrapper from "./FormComponents/TextInputWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthQuery from "../app/xhr/auth";
import { showToast } from "../utils/showToast";
import * as Yup from "yup";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  userId?: string;
};

const DeleteAccountConfirmModal = ({ userId }: Props) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const queryClient: any = useQueryClient();

  const toggleModal = () => {
    setVisible(!visible);
  };

  const mutation = useMutation({
    mutationFn: (formData) => AuthQuery.deleteUser(formData),
    onSuccess: async (data: any) => {
      await AsyncStorage.removeItem("token");
      showToast("success", "Success", data?.message);
      setVisible(!visible);
      setTimeout(() => {
        router.push(`/(auth)/login`);
      }, 2000);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
      setVisible(!visible);
    }
  });

  return (
    <>
      <TouchableOpacity>
        <Button
          type="solid"
          title="Delete Account"
          color="error"
          onPress={toggleModal}
        />
      </TouchableOpacity>

      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1
        }}
      > */}
      <Dialog isVisible={visible} onBackdropPress={toggleModal}>
        <Dialog.Title
          title="Confirm Delete"
          titleStyle={{ paddingHorizontal: 10 }}
        />
        <Text style={{ fontWeight: "bold", paddingHorizontal: 10 }}>
          Are you sure you want to delete this item?
        </Text>
        <Text style={{ marginTop: 10, paddingHorizontal: 10 }}>
          Please enter your password to delete your account
        </Text>
        <Formik
          initialValues={{
            userId: userId || "",
            password: ""
          }}
          validationSchema={Yup.object({
            password: Yup.string().required(
              "Password required to delete your account"
            )
          })}
          enableReinitialize={true}
          onSubmit={(values: any) => {
            console.log(values);
            mutation.mutate(values);
          }}
        >
          {({ handleSubmit, setFieldValue, values, getFieldMeta }) => {
            return (
              <View style={{ marginTop: 20 }}>
                <TextInputWrapper
                  name="password"
                  label="Password"
                  secureTextEntry={true}
                />
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  {mutation.isPending ? (
                    <ActivityIndicator />
                  ) : (
                    <Button
                      type="clear"
                      color="error"
                      title="Delete"
                      onPress={() => handleSubmit()}
                    />
                  )}
                  <Button
                    type="clear"
                    color="primary"
                    title="Cancel"
                    onPress={toggleModal}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </Dialog>
      <Toast />
      {/* </View> */}
    </>
  );
};

export default DeleteAccountConfirmModal;
