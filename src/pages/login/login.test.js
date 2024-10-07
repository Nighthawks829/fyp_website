import { fireEvent, screen, waitFor } from "@testing-library/react";
import { LoginPage } from "./loginPage";
import { renderWithProviders } from "../../test-utils";
import configureStore from "redux-mock-store";
import { loginUserThunk } from "../../stores/auth/authThunk";

const mockStore = configureStore([]);
jest.mock("../../stores/auth/authThunk", () => ({
  loginUserThunk: jest.fn()
}));

describe("Login Page", () => {
  test("should render login form correctly", () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByAltText("img-thumbnail")).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("should handle input change", () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("should focus and blur email and password inputs", () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Simulate focus and blur on email input
    fireEvent.focus(emailInput);
    expect(emailInput).toHaveClass("shadow");

    fireEvent.blur(emailInput);
    expect(emailInput).not.toHaveClass("shadow");

    // Simulate focus and blur on password input
    fireEvent.focus(passwordInput);
    expect(passwordInput).toHaveClass("shadow");

    fireEvent.blur(passwordInput);
    expect(passwordInput).not.toHaveClass("shadow");
  });
});
