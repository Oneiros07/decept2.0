import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, FlaskConical, Mail, X, Users, Tag } from "lucide-react";

interface ResearchProject {
  id: string;
  title: string;
  domain: string;
  description: string;
  lookingFor: string;
  email: string;
  addedBy: string;
}

const useResearch = () => {
  const [projects, setProjects] = useState<ResearchProject[]>(() =>
    JSON.parse(localStorage.getItem("decept_research") || "[]")
  );
  const save = (p: ResearchProject[]) => { setProjects(p); localStorage.setItem("decept_research", JSON.stringify(p)); };
  const add = (proj: Omit<ResearchProject, "id">) => save([...projects, { ...proj, id: crypto.randomUUID() }]);
  const remove = (id: string) => save(projects.filter((p) => p.id !== id));
  return { projects, add, remove };
};

const Research = () => {
  const { user } = useAuth();
  const { projects, add, remove } = useResearch();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ title: "", domain: "", description: "", lookingFor: "", email: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");
    add({ ...form, addedBy: user.username });
    setForm({ title: "", domain: "", description: "", lookingFor: "", email: "" });
    setShowForm(false);
    toast.success("Research project posted!");
  };

  const filtered = projects.filter((p) =>
    !filter || p.domain.toLowerCase().includes(filter.toLowerCase()) || p.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">Research Hub</h1>
            <p className="text-muted-foreground mt-1">Find collaborators and post research opportunities</p>
          </div>
          <button
            onClick={() => user ? setShowForm(!showForm) : toast.error("Please login first")}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus size={18} /> Post Research
          </button>
        </div>

        <input
          placeholder="🔍 Filter by domain or title..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full mb-8 rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none"
        />

        {showForm && (
          <form onSubmit={handleAdd} className="glass-card p-6 mb-8 grid md:grid-cols-2 gap-4">
            <input placeholder="Research Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <input placeholder="Domain (e.g. AI, Biology)" required value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <textarea placeholder="Description of the research" required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="md:col-span-2 rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none resize-y" />
            <input placeholder="Looking for (e.g. Data Scientist, Co-author)" value={form.lookingFor} onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <input type="email" placeholder="Contact Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <button type="submit" className="md:col-span-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Post Research
            </button>
          </form>
        )}

        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">
            {projects.length === 0 ? "No research projects yet. Post yours!" : "No results matching your filter."}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="glass-card p-6 hover:border-primary/50 transition-all relative">
                {user?.username === p.addedBy && (
                  <button onClick={() => remove(p.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"><X size={16} /></button>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="text-primary" size={18} />
                  <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs rounded-full bg-primary/10 text-primary px-3 py-1"><Tag size={12} />{p.domain}</span>
                  {p.lookingFor && <span className="flex items-center gap-1 text-xs rounded-full bg-secondary text-muted-foreground px-3 py-1"><Users size={12} />{p.lookingFor}</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline"><Mail size={14} />Reach out</a>
                <p className="text-xs text-muted-foreground mt-3">Posted by {p.addedBy}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
