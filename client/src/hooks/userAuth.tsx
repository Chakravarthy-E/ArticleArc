import Cookies from "js-cookie";
export const userAuth = () => {
  const token = Cookies.get("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};
