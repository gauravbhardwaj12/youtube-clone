import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../components/Authuser";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [islogin, setIslogin] = useState(null); // 🔥 important
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await verifyUser(); // should return true/false
        setIslogin(result);
      } catch (err) {
        console.log(err);
        setIslogin(false);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ islogin, loading, setIslogin }}>
      {children}
    </AuthContext.Provider>
  );
}