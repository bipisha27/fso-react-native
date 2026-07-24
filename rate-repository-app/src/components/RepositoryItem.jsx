import { View, Image, StyleSheet } from "react-native";

import Text from "./Text";
import LanguageTag from "./LanguageTag";
import RepositoryItemStats from "./RepositoryItemStats";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topRow: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flexShrink: 1,
    justifyContent: "space-between",

    fullName: {
      marginBottom: 4,
    },
    description: {
      marginBottom: 8,
    },
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.infoContainer}>
          <Text style={styles.fullName} fontWeight="bold">
            {" "}
            {item.fullName}
          </Text>

          <Text style={styles.description} color="textSecondary">
            {" "}
            {item.description}
          </Text>

          <LanguageTag language={item.language}> {item.language}</LanguageTag>
        </View>
      </View>

      <RepositoryItemStats
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
