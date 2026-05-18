"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-semibold px-4 py-2 rounded-xl transition-colors"
    >
      <LogOut className="w-4 h-4" /> Log Out
    </button>
  );
}
