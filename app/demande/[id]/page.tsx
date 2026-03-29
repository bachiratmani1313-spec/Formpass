"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function DemandePage() {
  const [sent, setSent] = useState(false);
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "ID-INCONNU";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          FormPass
        </p>

        <h1 className="text-3xl font-bold">Demande reçue</h1>

        <p className="mt-2 text-slate-600">
          Référence : <span className="font-semibold">{id}</span>
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Envoyer votre dossier</h2>

          <p className="mt-2 text-sm text-slate-600">
            Complétez ce formulaire pour répondre à la demande.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Nom"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />

            <input
              type="file"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white"
            >
              Envoyer
            </button>
          </form>
        </div>

        {sent && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800">
            <h2 className="font-semibold">Dossier envoyé</h2>
            <p className="mt-2 text-sm">
              Votre réponse a bien été transmise.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}