import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import SplashScreen from "./SplashScreen";
import ErrorComponent from "./ErrorComponent";
import { AxiosError } from "axios";

const AuthContext = createContext<unknown>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean>();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  console.log(data as any);

  if (data) {
    setIsAuth(true);
  }

  if (
    isError &&
    ((error as AxiosError).response.status !== 401 ||
      (error as AxiosError).response.status !== 500)
  ) {
    console.log((error as AxiosError).response);
    return <ErrorComponent />;
  }

  if (isPending) {
    return <SplashScreen loading={isPending} />;
  }

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
