import { View, Text } from "react-native";
import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import SplashScreen from "./SplashScreen";

const AuthContext = createContext<unknown>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean>();

  const { data, error, isPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  console.log(data as any);

  if (data) {
    setIsAuth(true);
  }

  if (isPending) {
    return <SplashScreen loading={isPending} />;
  }

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
