import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { useNavigate } from "react-router";

import useAuthorizedUser from "../hooks/useAuthorizedUser";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItem: {
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
  buttonRow: {
    flexDirection: "row",
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  viewButton: {
    backgroundColor: "#0366d6",
  },
  deleteButton: {
    backgroundColor: "#d73a4a",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString();
};

const ReviewItem = ({ review, onViewRepository, onDeleteReview }) => (
  <View style={styles.reviewItem}>
    <View style={styles.topRow}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.repoName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>

    <View style={styles.buttonRow}>
      <Pressable
        style={[styles.button, styles.viewButton]}
        onPress={onViewRepository}
      >
        <Text style={styles.buttonText}>View repository</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={onDeleteReview}
      >
        <Text style={styles.buttonText}>Delete review</Text>
      </Pressable>
    </View>
  </View>
);

const MyReviews = () => {
  const { user, refetch } = useAuthorizedUser();
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const reviewNodes = user?.reviews
    ? user.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "CANCEL", style: "cancel" },
        {
          text: "DELETE",
          style: "destructive",
          onPress: async () => {
            await deleteReview(id);
            refetch();
          },
        },
      ],
    );
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={() => navigate(`/repository/${item.repository.id}`)}
          onDeleteReview={() => handleDelete(item.id)}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
