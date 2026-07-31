import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topRow: {
    flexDirection: "row",
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    marginBottom: 8,
  },
  reviewText: {
    flexShrink: 1,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd MMM yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
