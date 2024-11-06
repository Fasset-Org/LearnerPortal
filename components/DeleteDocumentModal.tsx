import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { Dialog } from "@rneui/themed";
import { Icon } from "@rneui/base";
import themeLight from "../Theme";

const DeleteDocumentModal = () => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleDelete = () => {
    // Handle delete action here
    console.log("Item deleted");
    setVisible(false); // Close the modal after deletion
  };

  return (
    <>
      <TouchableOpacity>
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
            onPress={toggleModal}
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
        <Dialog.Title title="Confirm Delete" />
        <Text>Are you sure you want to delete this item?</Text>
        <Dialog.Actions>
          <Dialog.Button title="Cancel" onPress={toggleModal} />
          <Dialog.Button title="Delete" onPress={handleDelete} color="red" />
        </Dialog.Actions>
      </Dialog>
      {/* </View> */}
    </>
  );
};

export default DeleteDocumentModal;
