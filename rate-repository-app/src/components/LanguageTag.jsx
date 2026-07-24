import { View, StyleSheet } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

const LanguageTag = ({ language }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{language}</Text>
    </View>
  );
};

export default LanguageTag;
