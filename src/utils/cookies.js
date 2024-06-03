import Cookies from "js-cookie";

export const getUserFromCookies = () => {
  const result = Cookies.get("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const getTokenFromCookies = () => {
  const result = Cookies.get("token");
  const token = result ? JSON.parse(result) : null;
  return token;
};
