import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useContext } from "react";
import { Button, Icon, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { AuthContext } from "../components/AuthContext";
import SplashScreen from "../components/SplashScreen";
import { Image } from "react-native";

const Home = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const { isPending } = useContext(AuthContext);

  if (isPending) {
    return <SplashScreen loading={isPending} />;
  }

  // const list = [
  //   "Investment entities and trusts and company secretary services",
  //   "Stockbroking and financial markets.",
  //   "Financial development organisations.",
  //   "Accounting, bookkeeping, auditing and tax services.",
  //   "Business and management consulting services.",
  //   "The South African Revenue Service; the national and provincial treasuries",
  //   "And other activities auxiliary to financial intermediation, such as debt collection."
  // ];

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.headerTitle}>Introduction</Text>
        <Text>
          Welcome to the FASSET Learner Portal. Your gateway to the oasis of
          opportunities in the Finance and Accounting Sector. The purpose of
          this portal is to assist young people with information of career paths
          that are available in the financial sector.
          {/* This portal also serves as a
        platform for learners to join a database and for training providers and
        employers to access information on potential learners seeking to join
        education and training in the financial sector and / or seek placement. */}
        </Text>
        {/* <Text>
        The finance and accounting services sector is particularly important
        because it is the largest employer of people with financial management,
        accounting, and auditing skills. This sector includes:
      </Text> */}
        {/* <FlatList
        data={list}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          );
        }}
        // keyExtractor={(item) => item}
      /> */}

        <Image
          source={require(`../assets/images/Poster.jpg`)}
          style={{
            width: "100%",
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
    rowGap: 10
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
