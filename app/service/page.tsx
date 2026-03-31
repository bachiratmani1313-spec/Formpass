"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Dossier = {
  id: string;
  status: "sent" | "received" | "validated";
};

export default function ServicePage() {
  const [created, setCreated] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [dossiers, setDossiers] = useState<Dossier[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = "FPS-" + Math.floor(Math.random() * 1000000);
    const link = `${window.location.origin}/demande/${id}`;

    const newDossier = { id, status: "sent" as const };

    const updated = [...dossiers, newDossier];
    setDossiers(updated);
    localStorage.setItem("dossiers", JSON.stringify(updated));

    setRequestId(id);
    setGeneratedLink(link);
    setCreated(true);
  }

  useEffect(() => {
    const stored = localStorage.getItem("dossiers");
    if (stored) {
      setDossiers(JSON.parse(stored));
    }
  }, []);

  function updateStatus(id: string, status: Dossier["status"]) {
    const updated = dossiers.map((d) =>
      d.id === id ? { ...d, status } : d
    );

    setDossiers(updated);
    localStorage.setItem("dossiers", JSON.stringify(updated));
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    alert("Lien copié");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          FormPass
        </p>

        <h1 className="text-4xl font-bold">
          Espace service
        </h1>

        {/* CREATION */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 bg-white p-6 rounded-2xl border"
        >
          <input
            type="text"
            placeholder="Nom du service"
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <textarea
            placeholder="Informations demandées"
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <button className="bg-blue-700 text-white px-6 py-3 rounded-xl">
            Créer la demande
          </button>
        </form>

        {/* RESULTAT */}
        {created && (
          <div className="mt-6 bg-green-50 p-4 rounded-xl">
            <p>Demande créée : {requestId}</p>

            <div className="flex gap-2 mt-2">
              <input
                readOnly
                value={generatedLink}
                className="w-full border px-3 py-2 rounded"
              />
              <button onClick={copyLink} className="bg-black text-white px-3">
                Copier
              </button>
            </div>
          </div>
        )}

        {/* LISTE DOSSIERS */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Dossiers
          </h2>

          <div className="space-y-3">
            {dossiers.map((dossier) => (
              <div
                key={dossier.id}
                className="bg-white border p-4 rounded-xl"
              >
                <p className="font-semibold">{dossier.id}</p>

                <div className="mt-2 flex gap-2 text-sm">
                  <span
                    className={`px-3 py-1 rounded ${
                      dossier.status === "sent"
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    Envoyé
                  </span>

                  <span
                    className={`px-3 py-1 rounded ${
                      dossier.status === "received"
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    Reçu
                  </span>

                  <span
                    className={`px-3 py-1 rounded ${
                      dossier.status === "validated"
                        ? "bg-purple-100"
                        : "bg-gray-100"
                    }`}
                  >
                    Validé
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => updateStatus(dossier.id, "received")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Reçu
                  </button>

                  <button
                    onClick={() => updateStatus(dossier.id, "validated")}
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    Valider
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/" className="block mt-6 text-blue-600">
          Retour accueil
        </Link>
      </div>
    </main>
  );
}
