"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const username = form.get("username");
    const password = form.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-brand-cream flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl">
          <div className="text-center mb-8">
            <Image
              src="/images/logo.png"
              alt="TCCC Logo"
              width={72}
              height={72}
              className="mx-auto mb-4 rounded-full"
            />
            <h1 className="text-2xl font-bold text-brand-ink mb-2">
              Admin Login
            </h1>
            <p className="text-brand-ink/60 text-sm">
              Sign in to manage Daily Menu and Newsletter uploads.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-sm font-semibold text-brand-ink mb-1.5">
                Username
              </span>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full px-4 py-3 bg-brand-cream border border-brand-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold text-brand-ink mb-1.5">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-brand-cream border border-brand-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-brand-red/25"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
