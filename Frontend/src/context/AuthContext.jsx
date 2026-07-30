import { createContext, useContext, useState, useEffect, useCallback } from "react";

const DEMO_USER = {
  name: "James Wilson",
  email: "james@example.com",
  avatar: null,
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rw-auth-user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem("rw-auth-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    const u = { ...DEMO_USER, email };
    setUser(u);
    localStorage.setItem("rw-auth-user", JSON.stringify(u));
    return u;
  }, []);

  const register = useCallback(async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    const u = { name: data.name, email: data.email, avatar: null };
    setUser(u);
    localStorage.setItem("rw-auth-user", JSON.stringify(u));
    return u;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("rw-auth-user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { AuthProvider, useAuth };
