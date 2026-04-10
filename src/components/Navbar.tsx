import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Tutors", path: "/tutors" },
  { label: "Notes", path: "/notes" },
  { label: "Research", path: "/research" },
  { label: "Study Tools", path: "/study-tools" },
  { label: "AI Space", path: "/ai-space" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-primary glow-text tracking-wider">
          DECEPT
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <User size={14} className="text-primary" />
                {user.username}
                <span className="text-primary/60">#{user.id.slice(-4)}</span>
              </span>
              <button onClick={logout} className="text-muted-foreground hover:text-primary transition-colors">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
