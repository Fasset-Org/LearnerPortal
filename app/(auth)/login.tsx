import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import TextInputWrapper from "../../components/FormComponents/TextInputWrapper";
import * as Yup from "yup";
import { Button, Icon } from "@rneui/themed";
import themeLight from "../../Theme";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  return (
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
          email: "test@gmail.com",
          password: "@Password123" || ""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password required")
        })}
        onSubmit={(values) => {
          console.log(values);
          router.replace("/(tabs)");
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
