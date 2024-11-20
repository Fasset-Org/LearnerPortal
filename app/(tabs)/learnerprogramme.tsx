import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Checkbox, List } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../xhr/student";
import { Button } from "@rneui/themed";
import { showToast } from "../../utils/showToast";
import LoadingComponent from "../../components/LoadingComponent";
import { Redirect, useFocusEffect } from "expo-router";
import themeLight from "../../Theme";
import Toast from "react-native-toast-message";

interface Programme {
  id: string;
  title: string;
  description: string;
  duration: string;
}

interface FormValues {
  userId: string;
  programmes: Programme[];
  completed: boolean;
}

const LearnerProgramme = () => {
  const queryClient: any = useQueryClient();

  const { data, isLoading: loading }: any = useQuery({
    queryKey: ["programmes"],
    queryFn: () => {
      return StudentQuery.getAllProgrammes();
    }
  });

  const mutation = useMutation({
    mutationFn: (formData) => StudentQuery.saveLearnerProgrammes(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (err: any) => {
      showToast("success", "Success", err?.response?.data?.message);
    }
  });

  const userInfoQuery: any = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  const userData = userInfoQuery?.data?.user;

  let studentProgrammes = [];

  if (userData?.studentProgrammes?.length > 0) {
    studentProgrammes = userData?.studentProgrammes?.map((programme: any) => {
      return programme.programmes;
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries(["programmes", "userInfo"]);
    }, [])
  );

  if (!userData) {
    return <Redirect href="/(auht)/login" />;
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 10 }}>
      <Formik
        initialValues={{
          userId: userData?.id || "",
          programmes: studentProgrammes || [],
          completed: userData?.studentProgrammes?.length > 0 ? true : false
        }}
        validationSchema={Yup.object().shape({
          programmes: Yup.array().min(1, "Please select at least one interest")
        })}
        onSubmit={(values: any) => {
          mutation.mutate(values);
        }}
        enableReinitialize
      >
        {({ setFieldValue, values, errors, handleSubmit }) => (
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
            >
              Select your interest(s):
            </Text>

            <View style={{ rowGap: 20 }}>
              {data?.programmes.map((option: Programme) => (
                <List.AccordionGroup key={option?.id}>
                  <List.Accordion
                    title={option.title}
                    id="1"
                    style={{
                      backgroundColor: themeLight.lightColors?.primary
                    }}
                    titleStyle={{ color: "#FFFFFF" }}
                  >
                    <View>
                      <TouchableOpacity
                        key={option?.id}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 10,
                          padding: 5
                        }}
                        onPress={() => {
                          const isSelected = values.programmes.some(
                            (p: any) => p?.id === option?.id
                          );
                          const updatedProgrammes = isSelected
                            ? values.programmes.filter(
                                (p: any) => p?.id !== option?.id
                              )
                            : [...values.programmes, option];
                          setFieldValue("programmes", updatedProgrammes);
                        }}
                      >
                        <Checkbox
                          status={
                            values.programmes.some(
                              (p: any) => p?.id === option?.id
                            )
                              ? "checked"
                              : "unchecked"
                          }
                        />
                        <Text style={{ flexShrink: 1 }}>
                          {option.description}
                        </Text>
                      </TouchableOpacity>
                      {/* <View
                        style={{
                          flexDirection: "row",
                          columnGap: 10,
                          paddingLeft: 50
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>Duration</Text>
                        <Text>{option.duration}</Text>
                      </View> */}
                    </View>
                  </List.Accordion>
                </List.AccordionGroup>
              ))}
            </View>

            {errors.programmes && (
              <Text style={{ color: "red", marginTop: 10 }}>
                {errors?.programmes as any}
              </Text>
            )}

            {mutation.isPending ? (
              <ActivityIndicator size="large" animating={true} />
            ) : (
              <Button
                title="Save"
                onPress={handleSubmit as any}
                disabled={loading}
                color="primary"
                containerStyle={{ marginTop: 20, marginBottom: 40 }}
              />
            )}
          </View>
        )}
      </Formik>
      <Toast />
    </ScrollView>
  );
};

export default LearnerProgramme;

// import { FlatList, StyleSheet, View } from "react-native";
// import React, { useContext, useState } from "react";
// import ProgramLayout from "../../components/ProgramLayout";
// import { AuthContext } from "../../components/AuthContext";
// import StudentQuery from "../xhr/student";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import LoadingComponent from "../../components/LoadingComponent";
// import { Button } from "@rneui/themed";
// import ErrorComponent from "../../components/ErrorComponent";
// import { useFocusEffect } from "expo-router";
// import { showToast } from "../../utils/showToast";
// import Toast from "react-native-toast-message";
// import { ActivityIndicator } from "react-native-paper";

// const LearnerProgramme = () => {
//   const { data, isLoading, isError }: any = useQuery({
//     queryKey: ["programmes"],
//     queryFn: () => {
//       return StudentQuery.getAllProgrammes();
//     }
//   });

//   const queryClient: any = useQueryClient();

//   const userInfoQuery: any = useQuery({
//     queryKey: ["userInfo"],
//     queryFn: () => StudentQuery.getUserInfo()
//   });

//   const userInfo = userInfoQuery?.data?.user;

//   const [learnerProgrammes, setLeanerProgrammes] = useState(
//     userInfo?.studentProgrammes.map((p: any) => p.programmes) || []
//   );

//   const { mutate, isPending } = useMutation({
//     mutationFn: (formData) => StudentQuery.saveLearnerProgrammes(formData),
//     onSuccess: (data: any) => {
//       showToast("success", "Success", data?.message);
//       queryClient.invalidateQueries(["userInfo"]);
//     },
//     onError: (err: any) => {
//       showToast("error", "Error", err?.response?.data?.message);
//     }
//   });

//   useFocusEffect(
//     React.useCallback(() => {
//       queryClient.invalidateQueries(["programmes", "userInfo"]);
//     }, [])
//   );

//   if (isLoading) {
//     return <LoadingComponent />;
//   }

//   if (isError) {
//     return <ErrorComponent />;
//   }

//   return (
//     <View style={{ padding: 10 }}>
//       <FlatList
//         data={data?.programmes}
//         renderItem={({ item }) => {
//           return (
//             <View style={{ marginBottom: 20 }}>
//               <ProgramLayout
//                 program={item}
//                 setLeanerProgrammes={setLeanerProgrammes}
//                 learnerProgrammes={learnerProgrammes}
//                 key={item?.id}
//               />
//             </View>
//           );
//         }}
//         keyExtractor={(item, index) => index.toString()}
//         ListFooterComponent={() =>
//           isPending ? (
//             <ActivityIndicator size="large" animating={true} />
//           ) : (
//             <Button
//               title="Save Programmes"
//               onPress={() =>
//                 mutate({
//                   userId: userInfo?.id,
//                   programmes: [...learnerProgrammes]
//                 } as any)
//               }
//             />
//           )
//         }
//       />
//       <Toast />
//     </View>
//   );
// };

// export default LearnerProgramme;

// const styles = StyleSheet.create({});
