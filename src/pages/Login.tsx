import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!username.trim()) return toast.error("Username required");
      const ok = register(username, email, password);
      if (ok) { toast.success("Welcome to DECEPT!"); navigate("/"); }
      else toast.error("Email or username already taken");
    } else {
      const ok = login(email, password);
      if (ok) { toast.success("Welcome back!"); navigate("/"); }
      else toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="font-display text-3xl font-bold text-center mb-2 text-primary glow-text">DECEPT</h1>
        <p className="text-center text-muted-foreground mb-8">{isRegister ? "Create your account" : "Sign in to continue"}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-primary hover:underline">
            {isRegister ? "Sign in" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
