"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  bio?: string | null;
  createdAt: Date;
};

export function ProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/perfil", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-3xl bg-gray-900 overflow-hidden flex items-center justify-center">
          {user.image ? (
            <img src={user.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-3xl font-black">{name?.[0]?.toUpperCase() || "A"}</span>
          )}
        </div>
        <div>
          <p className="font-bold text-gray-900">{user.name || "Estudiante"}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Cuéntanos algo de ti..."
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black text-white font-bold py-3 rounded-2xl hover:bg-gray-900 transition-all text-sm disabled:opacity-50"
        >
          {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar cambios"}
        </button>
      </form>

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="w-full border border-red-100 text-red-500 font-bold py-3 rounded-2xl hover:bg-red-50 transition-all text-sm"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
