import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import SplashScreen from "./SplashScreen";
import ErrorComponent from "./ErrorComponent";
import { AxiosError } from "axios";
import { router } from "expo-router";

interface ProviderProps {
  isAuth: boolean;
  userInfo: Object;
}

export const AuthContext = createContext<ProviderProps>({
  isAuth: false,
  userInfo: {}
});

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  const userData = data as any;

  console.log(userData);

  const err = error as AxiosError;

  if (isError && err?.response?.status !== 401) {
    return (
      <ErrorComponent
        title={err?.name}
        errMessage={err?.response?.data?.message}
      />
    );
  }

  if (isPending) {
    return <SplashScreen loading={isPending} />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuth: userData?.success, userInfo: userData?.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
