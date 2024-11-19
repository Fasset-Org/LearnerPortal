import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Dialog } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "../app/xhr/student";
import { showToast } from "../utils/showToast";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";

const DeleteTertiaryEducationModal = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState(false);

  const queryClient: any = useQueryClient();

  const deleteMutatuon = useMutation({
    mutationFn: (id: string) => StudentQuery.deleteTertiaryEducation(id),
    onSuccess: (data: any) => {
      showToast("success", "Success", data?.message);
      queryClient.invalidateQueries(["userInfo"]);
      setVisible(false);
    },
    onError: (err: any) => {
      showToast("error", "Error", err?.response?.data?.message);
    }
  });

  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleDelete = (id: string) => {
    deleteMutatuon.mutate(id);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "lightgray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgray"
          }}
        >
          <Icon
            name="delete"
            type="material"
            size={20}
            color="red"

            // style={{ borderWidth: 1, width: "fit-content" }}
          />
        </View>
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
        <Dialog.Title title={"Confirm Delete"} />
        <Text>Are you sure you want to delete this item?</Text>
        <Dialog.Actions>
          {deleteMutatuon.isPending ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Button
              title="Delete"
              type="clear"
              onPress={() => handleDelete(id)}
            />
          )}
          <Dialog.Button title="Cancel" onPress={toggleModal} />
        </Dialog.Actions>
      </Dialog>
      {/* </View> */}
    </>
  );
};

export default DeleteTertiaryEducationModal;
