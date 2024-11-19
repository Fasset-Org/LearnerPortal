import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Button, Icon, useTheme } from "@rneui/themed";
import { Redirect, useFocusEffect, useRouter } from "expo-router";
import { AuthContext } from "../components/AuthContext";
import SplashScreen from "../components/SplashScreen";
import { Image } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StudentQuery from "./xhr/student";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

const Home = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const queryClient: any = useQueryClient();

  const userInfoQuery: any = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => StudentQuery.getUserInfo(),
    retry: 0
  });

  const userInfo = userInfoQuery?.data?.user;

  const openURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Unable to open this URL: ${url}`);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries(["userInfo"]);
    }, [])
  );

  if (userInfo) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <ScrollView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={styles.headerTitle}>Introduction</Text>
        <Text>
          Welcome to the FASSET Learner Portal. Your gateway to the oasis of
          opportunities in the Finance and Accounting Sector. The purpose of
          this portal is to assist young people with information of career paths
          that are available in the financial sector.
        </Text>

        <Image
          source={require(`../assets/images/400px.jpg`)}
          style={{
            width: "100%",
            maxHeight: "40%",
            objectFit: "contain"
          }}
        />

        <Text>
          If you are interested in learning more about how FASSET can help you
          achieve more in your career, please register and complete your
          profile.
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => router.push(`/(auth)/login`)}>
            <Button
              title="LOGIN"
              icon={
                <Icon
                  name="login"
                  size={20}
                  color="#FFFFFF"
                  style={styles.icon}
                />
              }
              onPress={() => router.push(`/(auth)/login`)}
              iconPosition="right"
              color="primary"
              buttonStyle={{ backgroundColor: theme.colors.primary }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Button
              title="REGISTER"
              icon={
                <Icon
                  name="pencil-square-o"
                  size={20}
                  color={theme.colors.secondary}
                  style={styles.icon}
                  type="font-awesome"
                />
              }
              iconPosition="right"
              type="outline"
              buttonStyle={{
                borderColor: theme.colors.secondary,
                borderWidth: 1
              }}
              titleStyle={{ color: theme.colors.secondary }}
              onPress={() => router.push(`/(auth)/register`)}
            />
          </TouchableOpacity>
          <Text>
            Click on "View Career Guide" to learn more about FASSET Scarce and
            critical Occupations and our funded programmes.
          </Text>
          <Button
            title="VIEW CAREER GUIDE"
            icon={
              <Icon
                name="visibility"
                size={20}
                color={theme.colors.warning}
                style={styles.icon}
                type="material"
              />
            }
            iconPosition="right"
            type="outline"
            // color="warning"
            buttonStyle={{ borderColor: theme.colors.warning, borderWidth: 1 }}
            titleStyle={{ color: theme.colors.warning }}
            onPress={() =>
              openURL("https://mogulcollective.com/next-big-thing-language/")
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    rowGap: 10,
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  listItem: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row"
  },
  bullet: {
    fontSize: 24,
    marginRight: 8
  },
  itemText: {
    // fontSize: 18
  },
  btnContainer: {
    rowGap: 10
  },
  icon: {
    marginLeft: 7
  }
});
