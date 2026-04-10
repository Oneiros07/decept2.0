import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("decept_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("decept_user", JSON.stringify(user));
    else localStorage.removeItem("decept_user");
  }, [user]);

  const getUsers = (): Array<User & { password: string }> => {
    return JSON.parse(localStorage.getItem("decept_users") || "[]");
  };

  const register = (username: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u) => u.email === email || u.username === username)) return false;
    const newUser = { id: `DCT-${Date.now().toString(36).toUpperCase()}`, username, email, password };
    users.push(newUser);
    localStorage.setItem("decept_users", JSON.stringify(users));
    const { password: _, ...safe } = newUser;
    setUser(safe);
    return true;
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _, ...safe } = found;
    setUser(safe);
    return true;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
