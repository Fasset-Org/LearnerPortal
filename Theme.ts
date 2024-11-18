import { createTheme } from "@rneui/themed";

const themeLight = createTheme({
  lightColors: {
    primary: "#163683",
    secondary: "#14a37f"
  },
  components: {
    Text: {
      style: {
        fontSize: 11
        // fontFamily: "Arial"
      }
    }
  }
});

export default themeLight;
