import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import ProgramLayout from "../../components/ProgramLayout";
import { AuthContext } from "../../components/AuthContext";
import StudentQuery from "../xhr/student";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComponent";
import { Button } from "@rneui/themed";
import ErrorComponent from "../../components/ErrorComponent";
import { useFocusEffect } from "expo-router";

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
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <Button title="Save Programmes" />}
      />
    </View>
  );
};

export default LearnerProgramme;

const styles = StyleSheet.create({});
