import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Plus, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

// Pomodoro
const PRESETS = [
  { label: "Pomodoro", minutes: 25 },
  { label: "Short Break", minutes: 5 },
  { label: "Long Break", minutes: 15 },
];

const Pomodoro = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (seconds === 0 && running) {
        toast.success("Time's up! Great work 🎉");
        setRunning(false);
      }
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, seconds]);

  const selectPreset = (i: number) => {
    setActivePreset(i);
    setSeconds(PRESETS[i].minutes * 60);
    setRunning(false);
  };

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = 1 - seconds / (PRESETS[activePreset].minutes * 60);

  return (
    <div className="glass-card p-8 text-center">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Pomodoro Timer</h2>
      <div className="flex justify-center gap-3 mb-8">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => selectPreset(i)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activePreset === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(0 0% 18%)" strokeWidth="4" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(155 72% 57%)" strokeWidth="4"
            strokeDasharray={`${progress * 283} 283`} strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl font-bold text-foreground">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => setRunning(!running)} className="rounded-full bg-primary p-4 text-primary-foreground hover:opacity-90 transition-opacity">
          {running ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={() => selectPreset(activePreset)} className="rounded-full bg-secondary p-4 text-muted-foreground hover:text-foreground transition-colors">
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

// Task List
interface Task { id: string; text: string; done: boolean; }

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(() => JSON.parse(localStorage.getItem("decept_tasks") || "[]"));
  const [input, setInput] = useState("");

  const save = (t: Task[]) => { setTasks(t); localStorage.setItem("decept_tasks", JSON.stringify(t)); };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    save([...tasks, { id: crypto.randomUUID(), text: input.trim(), done: false }]);
    setInput("");
  };

  return (
    <div className="glass-card p-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Task List</h2>
      <form onSubmit={addTask} className="flex gap-3 mb-6">
        <input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none"
        />
        <button type="submit" className="rounded-lg bg-primary px-4 text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus size={20} />
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No tasks yet. Stay productive!</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <div key={t.id} className={`flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3 group ${t.done ? "opacity-50" : ""}`}>
              <button
                onClick={() => save(tasks.map((x) => x.id === t.id ? { ...x, done: !x.done } : x))}
                className={`flex-shrink-0 w-5 h-5 rounded border transition-colors flex items-center justify-center ${
                  t.done ? "bg-primary border-primary" : "border-border hover:border-primary"
                }`}
              >
                {t.done && <Check size={12} className="text-primary-foreground" />}
              </button>
              <span className={`flex-1 text-sm ${t.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.text}</span>
              <button onClick={() => save(tasks.filter((x) => x.id !== t.id))} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      {tasks.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          {tasks.filter((t) => t.done).length}/{tasks.length} completed
        </p>
      )}
    </div>
  );
};

const StudyTools = () => (
  <div className="min-h-screen pt-24 pb-12">
    <div className="container">
      <h1 className="font-display text-4xl font-bold text-foreground mb-2">Study Tools</h1>
      <p className="text-muted-foreground mb-10">Focus better with Pomodoro and manage your tasks</p>
      <div className="grid lg:grid-cols-2 gap-8">
        <Pomodoro />
        <TaskList />
      </div>
    </div>
  </div>
);

export default StudyTools;
