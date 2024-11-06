import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import ProgramLayout from "../../components/ProgramLayout";
import { AuthContext } from "../../components/AuthContext";
import StudentQuery from "../xhr/student";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComponent";
import { Button } from "@rneui/themed";
import ErrorComponent from "../../components/ErrorComponent";

const LearnerProgramme = () => {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const { userInfo } = useContext(AuthContext);

  const { data, isLoading, isError }: any = useQuery({
    queryKey: ["programmes"],
    queryFn: () => {
      return StudentQuery.getAllProgrammes();
    }
  });

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
              <ProgramLayout program={item} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default LearnerProgramme;

const styles = StyleSheet.create({});
