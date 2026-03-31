"use client";

import { useRef, useState } from "react";

export default function ServicePage() {
  const [created, setCreated] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = "FPS-" + Math.floor(Math.random() * 1000000);
    setRequestId(id);
    setCreated(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles((prev) => {
      const merged = [...prev];

      for (const file of files) {
        const exists = merged.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        );

        if (!exists) {
          merged.push(file);
        }
      }

      return merged;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeFile(indexToRemove: number) {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
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

          <div className="rounded-2xl border border-dashed border-slate-300 p-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Documents joints à la demande (optionnel)
            </label>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <p className="mt-2 text-xs text-slate-500">
              Ajoutez un ou plusieurs documents modèle, formulaires, notices ou
              pièces de référence.
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-blue-900">
                  Documents ajoutés
                </h3>
                <span className="text-sm text-blue-700">
                  {selectedFiles.length} fichier(s)
                </span>
              </div>

              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                    className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm shadow-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-3 rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              Votre demande a bien été créée avec succès.
            </p>

            <p className="mt-2 text-sm">
              Référence : <span className="font-semibold">{requestId}</span>
            </p>

            <p className="mt-1 text-sm">
              Documents joints :{" "}
              <span className="font-semibold">{selectedFiles.length}</span>
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
