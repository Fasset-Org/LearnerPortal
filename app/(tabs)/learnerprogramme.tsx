import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import ProgramLayout from "../../components/ProgramLayout";
import { AuthContext } from "../../components/AuthContext";
import StudentQuery from "../xhr/student";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComponent";
import { Button } from "@rneui/themed";
import ErrorComponent from "../../components/ErrorComponent";
import { useFocusEffect } from "expo-router";
import { showToast } from "../../utils/showToast";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";

const LearnerProgramme = () => {
  const { data, isLoading, isError }: any = useQuery({
    queryKey: ["programmes"],
    queryFn: () => {
      return StudentQuery.getAllProgrammes();
    }
  });

  const queryClient: any = useQueryClient();

  const userInfoQuery: any = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  const userInfo = userInfoQuery?.data?.user;

  const [learnerProgrammes, setLeanerProgrammes] = useState(
    userInfo?.studentProgrammes.map((p: any) => p.programmes) || []
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => StudentQuery.saveLearnerProgrammes(formData),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries(["programmes", "userInfo"]);
    }, [])
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data?.programmes}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 20 }}>
              <ProgramLayout
                program={item}
                setLeanerProgrammes={setLeanerProgrammes}
                learnerProgrammes={learnerProgrammes}
                key={item?.id}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() =>
          isPending ? (
            <ActivityIndicator size="large" animating={true} />
          ) : (
            <Button
              title="Save Programmes"
              onPress={() => mutate(learnerProgrammes)}
            />
          )
        }
      />
      <Toast />
    </View>
  );
};

export default LearnerProgramme;

const styles = StyleSheet.create({});
