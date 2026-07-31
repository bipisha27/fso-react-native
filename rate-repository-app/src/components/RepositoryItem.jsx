import { View, Image, StyleSheet, Pressable } from "react-native";

import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";
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
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 15,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});

const RepositoryItem = ({ item, showGitHubButton }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
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

      {showGitHubButton && (
        <View style={styles.btn}>
          <Pressable onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.btnText}>Open in GitHub</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default RepositoryItem;
