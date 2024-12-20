import React, { useContext, useEffect } from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Formik } from "formik";
import TextInputWrapper from "../../components/FormComponents/TextInputWrapper";
import * as Yup from "yup";
import { Button, Icon } from "@rneui/themed";
import themeLight from "../../Theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthQuery from "../xhr/auth";

import Toast from "react-native-toast-message";
import { showToast } from "../../utils/showToast";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/AuthContext";
import { Redirect, useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentQuery from "../xhr/student";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const queryClient: any = useQueryClient();

  const userInfoQuery: any = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  const userInfo = userInfoQuery?.data?.user;

  const openURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Unable to open this URL: ${url}`);
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     queryClient.invalidateQueries(["userInfo"]);
  //   }, [])
  // );

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return AuthQuery.loginUser(formData);
    },
    onSuccess: async (data: any) => {
      // SecureStore.setItem("userToken", data?.user?.token);
      await AsyncStorage.setItem("token", data?.user?.token);
      showToast("success", "Success", data?.message);
      await queryClient.invalidateQueries(["userInfo"]);
      router.replace(`/(tabs)`);
    },
    onError: (err: any) => {
      console.log(JSON.stringify(err as any));
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  // useEffect(() => {
  //   if (userInfoQuery?.data?.user) {
  //     router.push(`/(tabs)`);
  //   }
  // }, [userInfoQuery?.data?.user]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF"
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require(`../../assets/images/blueLogo-transparentBg.png`)}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subTitle}>
          Login in to continue to Learner Portal
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Password required")
          })}
          onSubmit={async (values: FormData) => {
            console.log("Mutation calling");
            await queryClient.clear();
            mutate(values);
          }}
          // Optionally add validationSchema here
        >
          {({ handleSubmit }) => (
            <View style={styles.innerContainer}>
              <TextInputWrapper
                name="email"
                label="Email"
                secureTextEntry={false}
              />
              <TextInputWrapper
                name="password"
                label="Password"
                secureTextEntry={true}
              />
              {isPending ? (
                <ActivityIndicator size="large" />
              ) : (
                <TouchableOpacity style={styles.button}>
                  <Button
                    title="LOGIN"
                    icon={<Icon name="login" size={20} color="#FFFFFF" />}
                    iconPosition="right"
                    color="primary"
                    onPress={() => handleSubmit()}
                  />
                </TouchableOpacity>
              )}

              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 14, flexWrap: "nowrap" }}>
                  By logging in and completing your profile, you agree that you
                  have read, understood, and accepted that you will be bound by
                  the terms of use of the
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

              <TouchableOpacity
                onPress={() =>
                  openURL(
                    "https://www.learner-portal.fasset.org.za/forgotPassword"
                  )
                }
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    rowGap: 10,
    backgroundColor: "#FFFFFF"
  },
  innerContainer: {
    rowGap: 0
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
