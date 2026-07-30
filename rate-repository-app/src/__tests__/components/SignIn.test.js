import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit handler with correct arguments", async () => {
      const onSubmit = jest.fn();

      await render(<SignInContainer onSubmit={onSubmit} />);

      await fireEvent.changeText(screen.getByTestId("usernameInput"), "kalle");
      await fireEvent.changeText(
        screen.getByTestId("passwordInput"),
        "password",
      );

      await fireEvent.press(screen.getByTestId("submitButton"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        username: "kalle",
        password: "password",
      });
    });
  });
});
