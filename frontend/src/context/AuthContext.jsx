import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authReducer } from "../reducers/authReducer";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: false,
    error: null,
  });

  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: { user: { name: "John Doe" } } }), 1000)
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}