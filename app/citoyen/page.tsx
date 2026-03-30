"use client";

import { useRef, useState } from "react";

export default function CitoyenPage() {
  const [sent, setSent] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
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
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          FormPass
        </p>

        <h1 className="text-4xl font-bold tracking-tight">Espace citoyen</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Remplissez votre dossier et préparez votre transmission.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Prénom
              </label>
              <input
                type="text"
                placeholder="Votre prénom"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nom
              </label>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="exemple@email.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Téléphone
              </label>
              <input
                type="tel"
                placeholder="+32..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Type de dossier
            </label>
            <select
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              required
            >
              <option value="">Sélectionnez</option>
              <option>Dossier administratif</option>
              <option>Candidature</option>
              <option>Dossier entreprise</option>
              <option>Autre demande</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Ajoutez un message pour le destinataire"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div className="rounded-2xl border border-dashed border-slate-300 p-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Ajouter des documents
            </label>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <p className="mt-2 text-xs text-slate-500">
              Vous pouvez ajouter des fichiers plusieurs fois. Les fichiers déjà
              sélectionnés restent dans la liste.
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-blue-900">
                  Documents sélectionnés
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
              Envoyer le dossier
            </button>

            <a
              href="/"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Retour accueil
            </a>
          </div>
        </form>

        {sent && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800 shadow-sm">
            <h2 className="text-lg font-semibold">Dossier transmis</h2>
            <p className="mt-2 text-sm">
              Votre dossier a été transmis avec succès.
            </p>
            <p className="mt-1 text-sm">
              Nombre de fichiers joints :{" "}
              <span className="font-semibold">{selectedFiles.length}</span>
            </p>
            <p className="mt-1 text-sm">
              Référence : <span className="font-semibold">FP-2026-0001</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}