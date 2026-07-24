import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ScrollView } from "react-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <AppBarTab text="Repositories" to="/" />
        <View style={styles.tabSeparator} />
        <AppBarTab text="Sign In" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
