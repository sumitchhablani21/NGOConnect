import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import apiClient from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user session info on mount
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const response = await apiClient.get("/users/current-user");
      setCurrentUser(response.data.data);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await apiClient.post("/users/login", credentials);
      await checkUserStatus();
      return response;
    } catch (err) {
      setCurrentUser(null);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/users/logout");
      setCurrentUser(null);
    } catch (err) {
      throw err;
    }
  };

  // Derived boolean for easy checks
  const isAuthenticated = !!currentUser;

  // Memoize context value to optimize performance
  const value = useMemo(
    () => ({
      currentUser,
      loading,
      login,
      logout,
      setCurrentUser,
      isAuthenticated,
    }),
    [currentUser, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
