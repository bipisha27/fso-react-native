import { View, StyleSheet } from "react-native";

import Text from "./Text";
import formatCount from "../utils/formatCount";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },
  statValue: {
    marginBottom: 4,
  },
});

const StatItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue} fontWeight="bold">
      {formatCount(value)}
    </Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItemStats = ({
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  return (
    <View style={styles.container}>
      <StatItem label="Stars" value={stargazersCount} />
      <StatItem label="Forks" value={forksCount} />
      <StatItem label="Reviews" value={reviewCount} />
      <StatItem label="Rating" value={ratingAverage} />
    </View>
  );
};

export default RepositoryItemStats;
