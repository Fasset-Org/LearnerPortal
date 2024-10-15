import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { Button, Dialog, Icon, useTheme } from "@rneui/themed";
import themeLight from "../../Theme";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import AuthQuery from "../xhr/auth";
import { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  const { mutate, data, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return AuthQuery.loginUser(formData);
    },
    onSuccess: (data: any) => {
      SecureStore.setItem("userToken", data?.user?.token);
      setTimeout(() => {
        router.push(`/(tabs)`);
      }, 3000);
    },
    onError: (err: AxiosError) => {
      setIsVisible(true);
      console.log("Error", error.response.data);
    }
  });

  return (
    <ScrollView>
      {isPending && (
        <Dialog isVisible={true} onBackdropPress={() => {}}>
          <ActivityIndicator size="large" />
        </Dialog>
      )}

      {isSuccess && (
        <Dialog
          isVisible={true}
          overlayStyle={{
            alignItems: "center",
            justifyContent: "center",
            rowGap: 20
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Icon
              name="check"
              type="material"
              iconStyle={{
                fontSize: 50,
                height: 50,
                width: 50,
                color: theme.colors.success,
                borderWidth: 1,
                borderColor: theme.colors.success,
                borderRadius: 25
              }}
            />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.success, fontWeight: "bold" }}>
            {(data as any).message}
          </Text>
        </Dialog>
      )}

      {isError && (
        <Dialog
          isVisible={isVisible}
          onBackdropPress={() => {}}
          overlayStyle={{
            alignItems: "center",
            justifyContent: "center",
            rowGap: 20
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Icon
              name="close"
              type="material"
              iconStyle={{
                fontSize: 50,
                height: 50,
                width: 50,
                color: theme.colors.error,
                borderWidth: 1,
                borderColor: theme.colors.error,
                borderRadius: 25
              }}
            />
          </TouchableOpacity>

          <View style={{ display: "flex", rowGap: 20 }}>
            <Text style={{ color: theme.colors.error }}>
              {error?.response?.data?.message || "Something went wrong"}
            </Text>
            <Button
              size="lg"
              type="outline"
              onPress={() => setIsVisible(false)}
            >
              Close
              <Icon
                name="close"
                type="material"
                iconStyle={{ marginLeft: 10, color: theme.colors.primary }}
              />
            </Button>
          </View>
        </Dialog>
      )}
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
              <TouchableOpacity style={styles.button}>
                <Button
                  title="LOGIN"
                  icon={<Icon name="login" size={20} color="#FFFFFF" />}
                  iconPosition="right"
                  color="primary"
                  onPress={() => handleSubmit()}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
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
