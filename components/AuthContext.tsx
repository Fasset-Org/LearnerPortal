import React, { createContext, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import { ProviderProps } from "../utils/contants";
import { AxiosError } from "axios";

export const AuthContext = createContext<ProviderProps>({
  isAuth: false,
  userInfo: null,
  isPending: false,
  isError: false,
  error: null,
  query: null
});

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const userQueryInfo: any = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo()
  });

  const userData = userQueryInfo?.data as any;

  const err = userQueryInfo?.error as any;

  return (
    <AuthContext.Provider
      value={{
        isAuth: userData?.success,
        userInfo: userData?.user,
        isPending: userQueryInfo?.isPending,
        isError: userQueryInfo?.isError,
        error: err,
        query: userQueryInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
