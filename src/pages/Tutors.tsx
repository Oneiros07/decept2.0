import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Mail, BookOpen, X } from "lucide-react";

interface Tutor {
  id: string;
  name: string;
  subject: string;
  email: string;
  bio: string;
  addedBy: string;
}

const useTutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>(() =>
    JSON.parse(localStorage.getItem("decept_tutors") || "[]")
  );
  const save = (t: Tutor[]) => { setTutors(t); localStorage.setItem("decept_tutors", JSON.stringify(t)); };
  const add = (tutor: Omit<Tutor, "id">) => { save([...tutors, { ...tutor, id: crypto.randomUUID() }]); };
  const remove = (id: string) => { save(tutors.filter((t) => t.id !== id)); };
  return { tutors, add, remove };
};

const Tutors = () => {
  const { user } = useAuth();
  const { tutors, add, remove } = useTutors();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", email: "", bio: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");
    add({ ...form, addedBy: user.username });
    setForm({ name: "", subject: "", email: "", bio: "" });
    setShowForm(false);
    toast.success("Tutor added!");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">Tutors</h1>
            <p className="text-muted-foreground mt-1">Find or register expert tutors</p>
          </div>
          <button
            onClick={() => user ? setShowForm(!showForm) : toast.error("Please login first")}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus size={18} /> Add Tutor
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="glass-card p-6 mb-8 grid md:grid-cols-2 gap-4">
            <input placeholder="Tutor Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <input placeholder="Subject / Expertise" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <input type="email" placeholder="Contact Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <input placeholder="Short Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <button type="submit" className="md:col-span-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Register Tutor
            </button>
          </form>
        )}

        {tutors.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">No tutors yet. Be the first to add one!</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((t) => (
              <div key={t.id} className="glass-card p-6 group hover:border-primary/50 transition-all relative">
                {user?.username === t.addedBy && (
                  <button onClick={() => remove(t.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"><X size={16} /></button>
                )}
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">{t.name}</h3>
                <div className="flex items-center gap-1.5 text-primary text-sm mb-2"><BookOpen size={14} />{t.subject}</div>
                <p className="text-sm text-muted-foreground mb-3">{t.bio || "No bio provided"}</p>
                <a href={`mailto:${t.email}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline"><Mail size={14} />{t.email}</a>
                <p className="text-xs text-muted-foreground mt-3">Added by {t.addedBy}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutors;
