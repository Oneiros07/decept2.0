import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, BookMarked, X, ChevronDown, ChevronUp } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  description: string;
  notes: string;
  addedBy: string;
}

const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() =>
    JSON.parse(localStorage.getItem("decept_subjects") || "[]")
  );
  const save = (s: Subject[]) => { setSubjects(s); localStorage.setItem("decept_subjects", JSON.stringify(s)); };
  const add = (subject: Omit<Subject, "id">) => save([...subjects, { ...subject, id: crypto.randomUUID() }]);
  const remove = (id: string) => save(subjects.filter((s) => s.id !== id));
  return { subjects, add, remove };
};

const Notes = () => {
  const { user } = useAuth();
  const { subjects, add, remove } = useSubjects();
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", notes: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");
    add({ ...form, addedBy: user.username });
    setForm({ name: "", description: "", notes: "" });
    setShowForm(false);
    toast.success("Subject added!");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">Notes & Subjects</h1>
            <p className="text-muted-foreground mt-1">Add subjects and share your knowledge</p>
          </div>
          <button
            onClick={() => user ? setShowForm(!showForm) : toast.error("Please login first")}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus size={18} /> Add Subject
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="glass-card p-6 mb-8 space-y-4">
            <input placeholder="Subject Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <input placeholder="Short Description" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none" />
            <textarea placeholder="Notes / Content (supports detailed text)" rows={6} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none resize-y" />
            <button type="submit" className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Add Subject
            </button>
          </form>
        )}

        {subjects.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground">No subjects yet. Start adding your notes!</div>
        ) : (
          <div className="space-y-4">
            {subjects.map((s) => (
              <div key={s.id} className="glass-card overflow-hidden hover:border-primary/50 transition-all">
                <div className="flex items-center justify-between p-6 cursor-pointer" onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                  <div className="flex items-center gap-3">
                    <BookMarked className="text-primary" size={20} />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{s.name}</h3>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user?.username === s.addedBy && (
                      <button onClick={(e) => { e.stopPropagation(); remove(s.id); }} className="text-muted-foreground hover:text-destructive"><X size={16} /></button>
                    )}
                    {expanded === s.id ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
                  </div>
                </div>
                {expanded === s.id && (
                  <div className="px-6 pb-6 border-t border-border/50 pt-4">
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap">{s.notes || "No notes added yet."}</p>
                    <p className="text-xs text-muted-foreground mt-4">Added by {s.addedBy}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
