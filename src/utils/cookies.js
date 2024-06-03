import Cookies from "js-cookie";

export const getUserFromCookies = () => {
  const result = Cookies.get("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const getTokenFromCookies = () => {
  const token = Cookies.get("token");
  return token;
};
