import React, { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import { ProviderProps } from "../utils/contants";
import { useFocusEffect } from "expo-router";

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

  const isAuth = Boolean(userQueryInfo.data?.user);

  useFocusEffect(
    React.useCallback(() => {
      userQueryInfo.refetch(); // Refetch on focus
    }, [isAuth])
  );

  return (
    <AuthContext.Provider
      value={{
        isAuth: userData?.user ? true : false,
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
