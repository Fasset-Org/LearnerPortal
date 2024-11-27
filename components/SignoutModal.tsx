import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Button, Dialog, useTheme } from "@rneui/themed";
import { Icon } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

const SignoutModal = () => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const queryClient: any = useQueryClient();

  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleSignout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace(`/(auth)/login`);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          toggleModal();
        }}
      >
        <Icon
          name="sign-out" // Logout icon name in FontAwesome
          size={30}
          type="font-awesome"
          color={theme.colors.error}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>

      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1
        }}
      > */}
      <Dialog isVisible={visible} onBackdropPress={toggleModal}>
        <Dialog.Title title={"Confirm Signout"} />
        <Text>Are you sure you want to signout?</Text>
        <Dialog.Actions>
          <Button title="Signout" type="clear" onPress={handleSignout} />
          <Button title="Cancel" type="clear" onPress={toggleModal} />
        </Dialog.Actions>
      </Dialog>
      {/* </View> */}
    </>
  );
};

export default SignoutModal;
