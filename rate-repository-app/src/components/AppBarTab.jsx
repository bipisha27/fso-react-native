import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { Pressable } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

const AppBarTab = ({ text, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
  return (
    <Link to={to}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
