import jwtDecode from "jwt-decode";
/**For handling cookies and set the timestamp in the localstorage */
export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  };
  
export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};
  
export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};