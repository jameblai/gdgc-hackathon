"use client";
import { useState } from "react";

type SkillStatus = "claimed" | "flagged" | "unclaimed";

type Skill = {
  id: number;
  title: string;
  status: SkillStatus;
  question: string;
};

const SKILLS_DATA: Skill[] = [
  { id: 1, title: "React Development", status: "claimed", question: "How does the Virtual DOM work?" },
  { id: 2, title: "Network Protocols", status: "flagged", question: "How does Ethernet work?" },
  { id: 3, title: "CSS Architecture", status: "unclaimed", question: "Explain the box model and stacking context." },
  { id: 4, title: "TypeScript", status: "unclaimed", question: "What are generics and when should you use them?" },
];

const STATUS_CONFIG: Record<SkillStatus, { label: string; bg: string; color: string; border: string }> = {
  claimed:   { label: "Claimed",   bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" },
  flagged:   { label: "Flagged",   bg: "#fff3e0", color: "#e65100", border: "#ffcc80" },
  unclaimed: { label: "Unclaimed", bg: "#f3f4f6", color: "#6b7280", border: "#d1d5db" },
};

function btnStyle(bg: string, color: string, borderColor: string = "transparent") {
  return {
    background: bg, color, border: `1.5px solid ${borderColor === "transparent" ? bg : borderColor}`,
    borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s",
  };
}

function SkillCard({ skill, onView, onEdit }: { skill: Skill; onView: (skill: Skill) => void; onEdit: (skill: Skill) => void }) {
  const config = STATUS_CONFIG[skill.status];
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #ede9fe", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 2px 8px rgba(124,77,255,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#9c6fff", textTransform: "uppercase", marginBottom: 4 }}>Skill #{skill.id}</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>{skill.title}</p>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: config.bg, color: config.color, border: `1px solid ${config.border}`, letterSpacing: "0.04em" }}>
          {config.label}
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {skill.status === "claimed"
          ? <button onClick={() => onView(skill)} style={btnStyle("#7C4DFF", "#fff")}>View</button>
          : <button onClick={() => onEdit(skill)} style={btnStyle("transparent", "#7C4DFF", "#7C4DFF")}>Edit</button>
        }
      </div>
    </div>
  );
}

function QuestionCard({ skill, onProve }: { skill: Skill; onProve: (skill: Skill) => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #ede9fe", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16, boxShadow: "0 2px 8px rgba(124,77,255,0.06)", minHeight: 120 }}>
      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, fontWeight: 500 }}>{skill.question}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => onProve(skill)} style={btnStyle("#7C4DFF", "#fff")}>Prove →</button>
      </div>
    </div>
  );
}

function Modal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,26,46,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "90%", maxWidth: 480, boxShadow: "0 24px 48px rgba(124,77,255,0.15)", border: "1.5px solid #ede9fe" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>Prove: {skill.title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#9c6fff" }}>×</button>
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>{skill.question}</p>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0", color: "#2e7d32", fontWeight: 600 }}>✓ Answer submitted!</div>
        ) : (
          <>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write your answer here..." rows={5}
              style={{ width: "100%", borderRadius: 10, border: "1.5px solid #ede9fe", padding: "12px 14px", fontSize: 14, fontFamily: "inherit", color: "#1a1a2e", resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }}
            />
            <button onClick={handleSubmit} disabled={!answer.trim()}
              style={{ ...btnStyle("#7C4DFF", "#fff"), width: "100%", marginTop: 14, opacity: answer.trim() ? 1 : 0.4 }}>
              Submit Answer
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function ProveSkillsPage() {
  const [skills] = useState<Skill[]>(SKILLS_DATA);
  const [modal, setModal] = useState<Skill | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f3ff; font-family: 'Sora', sans-serif; }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#f5f3ff", fontFamily: "'Sora', sans-serif", padding: "40px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#7C4DFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e" }}>Prove Skills</h1>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280" }}>Claim your skills by answering questions to verify your knowledge.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} onView={() => setModal(skill)} onEdit={() => setModal(skill)} />
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>Pending Verifications</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {skills.filter(s => s.status !== "claimed").map((skill) => (
                <QuestionCard key={skill.id} skill={skill} onProve={() => setModal(skill)} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && <Modal skill={modal} onClose={() => setModal(null)} />}
    </>
  );
}