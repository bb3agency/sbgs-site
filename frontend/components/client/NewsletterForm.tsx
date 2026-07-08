"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // Presentational only — no marketing backend wired. Acknowledges locally.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return;
    setDone(true);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center gap-2 rounded-lg bg-card/95 p-1.5 shadow-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="Enter your email"
          aria-label="Email address for newsletter"
          className="h-9 flex-1 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-maroon text-white transition-colors hover:bg-brand-gold"
        >
          <Send className="size-4" />
        </button>
      </div>
      {done ? (
        <p className="mt-2 text-xs font-medium text-brand-gold">
          Thanks! We&apos;ll keep you posted on offers and new arrivals.
        </p>
      ) : null}
    </form>
  );
}
