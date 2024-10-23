import Toast from "react-native-toast-message";
import themeLight from "../Theme";

const showToast = (
  type: "success" | "error" | "info",
  title: string,
  message: string
) => {
  if (type === "error") {
    return Toast.show({
      type: "error",
      text1: title,
      text2: message,
      text2Style: { color: themeLight.lightColors?.error },
      text1Style: { color: themeLight.lightColors?.error },
      position: "bottom"
    });
  } else {
    return Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: "bottom"
    });
  }
};

export { showToast };
