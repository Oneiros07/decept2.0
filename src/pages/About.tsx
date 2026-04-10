import { Mail, Github, BookOpen, Shield, Users, FlaskConical } from "lucide-react";

const About = () => (
  <div className="min-h-screen pt-24 pb-12">
    <div className="container max-w-4xl">
      <h1 className="font-display text-4xl font-bold text-foreground mb-2">About DECEPT</h1>
      <p className="text-muted-foreground mb-12">Dedicated Education & Collaborative Exploration Platform for Thinkers</p>

      <div className="glass-card p-8 mb-8">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          DECEPT is a research-oriented education platform designed to bridge the gap between learners, educators, and researchers.
          We believe that knowledge thrives when shared openly. Our platform enables students and professionals to find expert tutors,
          collaborate on cutting-edge research, organize their studies, and contribute to a growing knowledge base — all in one dark,
          focused environment built for deep work.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Shield, title: "Quality First", desc: "Every tutor and research project is community-vetted for quality and relevance." },
          { icon: Users, title: "Collaboration", desc: "Connect with researchers worldwide. Find co-authors, mentors, and study partners." },
          { icon: FlaskConical, title: "Research Driven", desc: "Built for serious academic work — from literature reviews to publishing papers." },
        ].map((item) => (
          <div key={item.title} className="glass-card p-6">
            <item.icon className="text-primary mb-3" size={24} />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 mb-8">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">What You Can Do</h2>
        <ul className="space-y-3 text-muted-foreground">
          {[
            "Register and discover tutors across any academic discipline",
            "Post research projects and find collaborators worldwide",
            "Add subjects with detailed notes to build a shared knowledge base",
            "Use the Pomodoro timer for focused study sessions",
            "Manage your academic tasks with the built-in task list",
            "Get a unique ID upon registration for your academic identity",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <BookOpen size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-card p-8">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Contact</h2>
        <p className="text-muted-foreground mb-4">Have questions, suggestions, or want to collaborate? Reach out to us.</p>
        <a href="mailto:naman.1tyagi@gmail.com" className="inline-flex items-center gap-2 text-primary hover:underline text-lg">
          <Mail size={20} />
          naman.1tyagi@gmail.com
        </a>
      </div>
    </div>
  </div>
);

export default About;
