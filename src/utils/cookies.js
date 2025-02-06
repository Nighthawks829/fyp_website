import Cookies from "js-cookie";

/**
 * Retrieves the user data from cookies.
 * 
 * This function attempts to fetch the "user" cookie, parses it as JSON if it exists,
 * and returns the user object. If the cookie is not found, it returns `null`.
 * 
 * @returns {Object|null} The parsed user object if available, otherwise `null`.
 */
export const getUserFromCookies = () => {
  const result = Cookies.get("user");   // Retrieve the "user" cookie
  const user = result ? JSON.parse(result) : null;  // Parse JSON if the cookie exists
  return user;
};

/**
 * Retrieves the authentication token from cookies.
 * 
 * This function fetches the "token" cookie and returns its value.
 * If the cookie does not exist, it returns `undefined`.
 * 
 * @returns {string|undefined} The authentication token if available, otherwise `undefined`.
 */
export const getTokenFromCookies = () => {
  const token = Cookies.get("token");   // Retrieve the "token" cookie
  return token;
};
