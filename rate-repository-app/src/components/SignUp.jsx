import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(30, "Username must be at most 30 characters.")
    .required("Username is required."),

  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(50, "Password must be at most 50 characters.")
    .required("Password is required."),

  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Password confirmation is required."),
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

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpForm onSubmit={onSubmit} />;
};

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;
  const passwordConfirmationError =
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, usernameError && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />

      {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={[styles.input, passwordError && styles.inputError]}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />

      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TextInput
        style={[styles.input, passwordConfirmationError && styles.inputError]}
        secureTextEntry
        placeholder="Password Confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
      />

      {passwordConfirmationError && (
        <Text style={styles.errorText}>{passwordConfirmationError}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
