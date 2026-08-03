import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigate } from "react-router";

import useAuthorizedUser from "../hooks/useAuthorizedUser";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  repoName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    color: "#586069",
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString();
};

const ReviewItem = ({ review }) => (
  <View style={styles.reviewItem}>
    <View style={styles.ratingCircle}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>

    <View style={styles.content}>
      <Text style={styles.repoName}>{review.repository.fullName}</Text>
      <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
      <Text style={styles.text}>{review.text}</Text>
    </View>
  </View>
);

const MyReviews = () => {
  const { user } = useAuthorizedUser();
  const navigate = useNavigate();

  const reviewNodes = user?.reviews
    ? user.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repository/${item.repository.id}`)}
        >
          <ReviewItem review={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
