import React, { useContext } from "react";
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
import { Button, Icon } from "@rneui/themed";
import themeLight from "../../Theme";
import { useMutation } from "@tanstack/react-query";
import AuthQuery from "../xhr/auth";
import { AxiosError } from "axios";

import Toast from "react-native-toast-message";
import { showToast } from "../../utils/showToast";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/AuthContext";
import { Redirect } from "expo-router";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { isAuth } = useContext(AuthContext);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return AuthQuery.loginUser(formData);
    },
    onSuccess: async (data: any) => {
      SecureStore.setItem("userToken", data?.user?.token);
      showToast("success", "Success", data?.message);
      // setTimeout(() => {
      //   router.replace(`/(tabs)`);
      // }, 2000);
    },
    onError: (err: AxiosError) => {
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  if (isAuth) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
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
            onSubmit={(values: FormData) => {
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

                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Toast />
    </>
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
