import { useEffect, createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefault";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const handleData = async () => {
    try {
      const { data } = await axiosRes("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {}
  };

  useEffect(() => {
    handleData();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              navigate("/");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            console.log(err);
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  },[navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};