import { Pressable, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
