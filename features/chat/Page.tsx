"use client";
 
import { useState, useRef, useEffect } from "react";
 
type Status = "online" | "away" | "offline";
 
type Contact = {
  id: string;
  name: string;
  initials: string;
  color: string;
  lastSeen: string;
  status: Status;
};
 
type Message = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};
 
type Conversations = Record<string, Message[]>;
 
const CONTACTS: Contact[] = [
  { id: "1", name: "Maya Chen",   initials: "MC", color: "#d4a574", lastSeen: "now",       status: "online"  },
  { id: "2", name: "James Park",  initials: "JP", color: "#7eb8a4", lastSeen: "2m ago",    status: "online"  },
  { id: "3", name: "Sofia Reyes", initials: "SR", color: "#b088c4", lastSeen: "12m ago",   status: "away"    },
  { id: "4", name: "Tom Walsh",   initials: "TW", color: "#e07878", lastSeen: "1h ago",    status: "offline" },
  { id: "5", name: "Anika Patel", initials: "AP", color: "#6baed6", lastSeen: "yesterday", status: "offline" },
];
 
const SEED_MESSAGES: Conversations = {
  "1": [
    { id: 1, from: "them", text: "hey, are you free this weekend?", time: "9:41 AM" },
    { id: 2, from: "me",   text: "yeah should be! what's the plan?", time: "9:43 AM" },
    { id: 3, from: "them", text: "thinking hiking on saturday, maybe brunch after?", time: "9:44 AM" },
  ],
  "2": [
    { id: 4, from: "them", text: "did you get the files I sent over?",        time: "Yesterday" },
    { id: 5, from: "me",   text: "got them, looks good. I'll review tonight", time: "Yesterday" },
  ],
  "3": [
    { id: 6, from: "them", text: "can't believe that ending 😭",     time: "Monday" },
    { id: 7, from: "me",   text: "I know!! did NOT see that coming", time: "Monday" },
  ],
  "4": [],
  "5": [
    { id: 8, from: "them", text: "happy birthday!! hope you have a great day 🎉", time: "Last week" },
  ],
};
 
function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
 
function Avatar({ contact, size = 40 }: { contact: Contact; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: contact.color + "33",
      border: `1.5px solid ${contact.color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 600, color: contact.color,
      letterSpacing: "0.03em",
    }}>
      {contact.initials}
    </div>
  );
}
 
function StatusDot({ status }: { status: Status }) {
  const colors: Record<Status, string> = {
    online:  "#4caf7d",
    away:    "#f0a44a",
    offline: "#444",
  };
  return (
    <div style={{
      width: 9, height: 9, borderRadius: "50%",
      background: colors[status],
      border: "2px solid #161618",
      position: "absolute", bottom: 0, right: 0,
    }} />
  );
}
 
export function ChatPage() {
  const [activeId,      setActiveId]      = useState<string>("1");
  const [conversations, setConversations] = useState<Conversations>(SEED_MESSAGES);
  const [input,         setInput]         = useState("");
  const [search,        setSearch]        = useState("");
  const [newIds,        setNewIds]        = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);
  const nextId    = useRef(9);
 
  const contact  = CONTACTS.find((c) => c.id === activeId) ?? CONTACTS[0];
  const messages: Message[] = conversations[activeId] ?? [];
 
  const filtered = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
 
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeId]);
 
  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const id = nextId.current++;
    const msg: Message = { id, from: "me", text, time: formatTime() };
    setConversations((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), msg],
    }));
    setNewIds((s) => new Set([...s, id]));
    inputRef.current?.focus();
  };
 
  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
 
  const lastMsg = (id: string) => {
    const msgs = conversations[id] ?? [];
    return msgs[msgs.length - 1]?.text ?? "No messages yet";
  };
 
  const lastMsgTime = (id: string) => {
    const msgs = conversations[id] ?? [];
    return msgs[msgs.length - 1]?.time ?? "";
  };
 
  return (
    <div style={{
      height: "100vh", width: "100%", display: "flex",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      background: "#111113", color: "#e8e2d9",
    }}>
 
      {/* ── Sidebar ── */}
      <div style={{
        width: 290, flexShrink: 0, display: "flex", flexDirection: "column",
        borderRight: "1px solid #222225", background: "#161618",
      }}>
        {/* Sidebar header */}
        <div style={{ padding: "20px 16px 12px" }}>
          <p style={{ fontSize: 19, fontWeight: 500, color: "#f0e8dc", marginBottom: 14, letterSpacing: "-0.02em" }}>
            Chats
          </p>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#1e1e21", borderRadius: 10, padding: "8px 12px",
            border: "1px solid #2a2a2d",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              style={{
                background: "none", border: "none", fontSize: 13.5,
                color: "#ccc", width: "100%", fontFamily: "inherit", outline: "none",
              }}
            />
          </div>
        </div>
 
        {/* Contact list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveId(c.id)}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                padding: "10px 16px", cursor: "pointer",
                borderBottom: "1px solid #1c1c1f",
                background: c.id === activeId ? "#252528" : "transparent",
                transition: "background 0.1s",
              }}
            >
              <div style={{ position: "relative" }}>
                <Avatar contact={c} size={42} />
                <StatusDot status={c.status} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: "#f0e8dc" }}>{c.name}</span>
                  <span style={{ fontSize: 10.5, color: "#555", flexShrink: 0, marginLeft: 6 }}>
                    {lastMsgTime(c.id)}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {lastMsg(c.id)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ── END Sidebar ── */}
 
      {/* ── Chat panel ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
 
        {/* Header */}
        <div style={{
          padding: "13px 20px", borderBottom: "1px solid #222225",
          display: "flex", alignItems: "center", gap: 11,
          background: "#161618",
        }}>
          <div style={{ position: "relative" }}>
            <Avatar contact={contact} size={36} />
            <StatusDot status={contact.status} />
          </div>
          <div>
            <p style={{ fontSize: 14.5, fontWeight: 500, color: "#f0e8dc", letterSpacing: "-0.01em" }}>
              {contact.name}
            </p>
            <p style={{ fontSize: 11, color: contact.status === "online" ? "#4caf7d" : "#666" }}>
              {contact.status === "online" ? "Active now" : `Last seen ${contact.lastSeen}`}
            </p>
          </div>
        </div>
 
        {/* Messages */}
        <div ref={scrollRef} style={{
          flex: 1, overflowY: "auto", padding: "20px 20px 8px",
          display: "flex", flexDirection: "column",
        }}>
          {messages.length === 0 && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, opacity: 0.35 }}>
              <Avatar contact={contact} size={54} />
              <p style={{ fontSize: 13.5, color: "#888" }}>Start a conversation with {contact.name.split(" ")[0]}</p>
            </div>
          )}
 
          {messages.map((msg, i) => {
            const isMe       = msg.from === "me";
            const prevFrom   = messages[i - 1]?.from;
            const nextFrom   = messages[i + 1]?.from;
            const showAvatar = !isMe && prevFrom !== "them";
            const showTime   = nextFrom !== msg.from || i === messages.length - 1;
            const isNew      = newIds.has(msg.id);
 
            return (
              <div key={msg.id} style={{
                display: "flex",
                flexDirection: isMe ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: 8,
                marginBottom: showTime ? 14 : 3,
                animation: isNew ? "pop 0.22s cubic-bezier(0.34,1.4,0.64,1)" : "none",
              }}>
                {!isMe && (
                  <div style={{ width: 28, flexShrink: 0 }}>
                    {showAvatar && <Avatar contact={contact} size={28} />}
                  </div>
                )}
                <div style={{
                  maxWidth: "60%", display: "flex", flexDirection: "column",
                  alignItems: isMe ? "flex-end" : "flex-start", gap: 3,
                }}>
                  <div style={{
                    padding: "9px 13px",
                    borderRadius: isMe
                      ? (prevFrom === "me"   ? "18px 4px 4px 18px" : "18px 18px 4px 18px")
                      : (prevFrom === "them" ? "4px 18px 18px 4px" : "18px 18px 18px 4px"),
                    background: isMe ? contact.color + "1a" : "#222225",
                    border: isMe ? `1px solid ${contact.color}33` : "1px solid #2a2a2d",
                    color: isMe ? "#f0e8dc" : "#d5cfc7",
                    fontSize: 13.5, lineHeight: 1.6,
                  }}>
                    {msg.text}
                  </div>
                  {showTime && (
                    <span style={{ fontSize: 10, color: "#3e3e42", letterSpacing: "0.03em" }}>{msg.time}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
 
        {/* Input */}
        <div style={{ padding: "10px 20px 16px", borderTop: "1px solid #222225" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", gap: 9,
            background: "#1a1a1d", borderRadius: 20,
            padding: "9px 9px 9px 15px",
            border: "1px solid #2a2a2d",
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={`Message ${contact.name.split(" ")[0]}…`}
              rows={1}
              style={{
                flex: 1, resize: "none", border: "none", background: "transparent",
                fontSize: 13.5, fontFamily: "inherit", color: "#e8e2d9",
                lineHeight: 1.55, maxHeight: 100, overflow: "auto", outline: "none",
              }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 100) + "px";
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                width: 32, height: 32, borderRadius: "50%", border: "none",
                background: contact.color, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, opacity: input.trim() ? 1 : 0.3,
                transition: "opacity 0.15s",
              }}
              aria-label="Send"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
 
      </div>
      {/* ── END Chat panel ── */}
 
    </div>
  );
}