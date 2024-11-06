interface ProviderProps {
  isAuth: boolean;
  userInfo: any;
  isPending: boolean;
  isError: boolean;
  error: any;
  query: any;
  refetchUserInfo: () => void;
}

export { ProviderProps };
