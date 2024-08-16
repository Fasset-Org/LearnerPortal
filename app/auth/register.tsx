import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import TextInputWrapper from "../../components/FormComponents/TextInputWrapper";
import * as Yup from "yup";
import { Button, Icon, useTheme } from "@rneui/themed";
import themeLight from "../../Theme";
import SelectInputWrapper from "../../components/FormComponents/SelectInputWrapper";

const Register = () => {
  const { theme } = useTheme();
  return (
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
        onSubmit={(values) => console.log(values)}
        // Optionally add validationSchema here
      >
        {({ handleSubmit }) => (
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
                titleStyle={{ color: theme.colors.secondary, marginRight: 10 }}
                onPress={() => handleSubmit()}
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
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
