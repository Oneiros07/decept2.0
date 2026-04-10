import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { BookOpen, Users, FlaskConical, Timer, Sparkles } from "lucide-react";

const features = [
  { icon: Users, title: "Expert Tutors", desc: "Connect with verified tutors across disciplines", link: "/tutors" },
  { icon: BookOpen, title: "Subject Notes", desc: "Community-driven knowledge repository", link: "/notes" },
  { icon: FlaskConical, title: "Research Hub", desc: "Find collaborators for your research projects", link: "/research" },
  { icon: Timer, title: "Study Tools", desc: "Pomodoro timer and task management", link: "/study-tools" },
  { icon: Sparkles, title: "AI Space", desc: "Ask questions and get instant AI-powered answers", link: "/ai-space" },
];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative h-screen flex items-center justify-center">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 glass-card p-12 max-w-xl text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Where Knowledge Finds Its Guardians
        </h1>
        <p className="text-muted-foreground text-lg mb-8">Connect • Learn • Grow</p>
        <Link
          to="/tutors"
          className="inline-block rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground hover:opacity-90 transition-opacity animate-pulse-glow"
        >
          Explore Tutors
        </Link>
      </div>
    </section>

    {/* Features */}
    <section className="py-24">
      <div className="container">
        <h2 className="font-display text-3xl font-bold text-center mb-16 text-foreground">
          Your Academic <span className="text-primary glow-text">Arsenal</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Link key={f.title} to={f.link} className="glass-card p-6 group hover:border-primary/50 transition-all">
              <f.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Index;
