import { View, TextInput, Pressable, StyleSheet } from "react-native";
import * as yup from "yup";

import { useFormik } from "formik";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

import { CREATE_REVIEW } from "../graphql/mutations";

import Text from "./Text";
import theme from "../theme";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository Owner's name is required."),
  repositoryName: yup.string().required("Repository name is required."),
  rating: yup
    .number()
    .min(0, "Rating must be at least 0.")
    .max(100, "Rating must be at most 100.")
    .required("Rating is required."),
  text: yup.string(),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 15,
    marginTop: -10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const ownerNameError = formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameError =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingError = formik.touched.rating && formik.errors.rating;
  const textError = formik.touched.text && formik.errors.text;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, ownerNameError && styles.inputError]}
        placeholder="Repository Owner Name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
      />

      {ownerNameError && <Text style={styles.errorText}>{ownerNameError}</Text>}

      <TextInput
        style={[styles.input, repositoryNameError && styles.inputError]}
        placeholder="Repository Name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
      />

      {repositoryNameError && (
        <Text style={styles.errorText}>{repositoryNameError}</Text>
      )}

      <TextInput
        style={[styles.input, ratingError && styles.inputError]}
        placeholder="Rating between 0 to 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
      />

      {ratingError && <Text style={styles.errorText}>{ratingError}</Text>}

      <TextInput
        style={[styles.input, textError && styles.inputError, { height: 80 }]}
        placeholder="Review"
        value={formik.values.review}
        multiline
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
      />

      {textError && <Text style={styles.errorText}>{textError}</Text>}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "white" }} fontWeight="bold">
          Create a Review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      const repositoryId = data.createReview.repositoryId;
      navigate(`/repository/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
