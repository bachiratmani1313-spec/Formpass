"use client";

import { useState } from "react";

export default function ServicePage() {
  const [created, setCreated] = useState(false);
  const [requestId, setRequestId] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = "FPS-" + Math.floor(Math.random() * 1000000);
    setRequestId(id);
    setCreated(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          FormPass
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Espace service / entreprise
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Créez une demande claire et recevez des dossiers complets, structurés
          et traçables.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Créer une demande</h2>
            <p className="mt-2 text-sm text-slate-600">
              Préparez une demande de dossier adaptée à votre besoin.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Recevoir les réponses</h2>
            <p className="mt-2 text-sm text-slate-600">
              Consultez les dossiers transmis par les citoyens ou entreprises.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Suivre les statuts</h2>
            <p className="mt-2 text-sm text-slate-600">
              Vérifiez les envois, réceptions et confirmations.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nom du service / entreprise
              </label>
              <input
                type="text"
                placeholder="Ex. Commune de Bruxelles"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email de réception
              </label>
              <input
                type="email"
                placeholder="service@exemple.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Type de demande
            </label>
            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              required
            >
              <option value="">Sélectionnez</option>
              <option>Dossier administratif</option>
              <option>Candidature</option>
              <option>Dossier entreprise</option>
              <option>Demande personnalisée</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Informations demandées
            </label>
            <textarea
              rows={5}
              placeholder="Ex. nom, prénom, adresse, numéro de dossier, documents justificatifs..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Créer la demande
            </button>

            <a
              href="/"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Retour accueil
            </a>
          </div>
        </form>

        {created && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800 shadow-sm">
            <h2 className="text-lg font-semibold">Demande créée</h2>

            <p className="mt-2 text-sm">
              Votre demande a bien été simulée avec succès.
            </p>

            <p className="mt-2 text-sm">
              Référence : <span className="font-semibold">{requestId}</span>
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
              <p className="mb-1 text-xs text-slate-500">Lien à envoyer :</p>

              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={`https://formpass.vercel.app/demande/${requestId}`}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://formpass.vercel.app/demande/${requestId}`
                    )
                  }
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white"
                >
                  Copier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}