import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { useApolloClient, useQuery } from "@apollo/client/react";

import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ScrollView } from "react-native";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollContent: {
    flexDirection: "row",
    padding: 12,
  },
  tabSeparator: {
    width: 20,
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(ME);
  console.log("ME query ->", { data, error, loading });

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signedIn = Boolean(data?.me);
  console.log("signedIn ->", signedIn);

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <AppBarTab text="Repositories" to="/" />
        <View style={styles.tabSeparator} />
        {signedIn ? (
          <>
            <AppBarTab text="Create a review" to="/review" />
            <View style={styles.tabSeparator} />
            <AppBarTab text="Sign out" onPress={onSignOut} />
          </>
        ) : (
          <AppBarTab text="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
