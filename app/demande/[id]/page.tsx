"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function DemandePage() {
  const [sent, setSent] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    setSelectedFiles((prev) => {
      const merged = [...prev];

      for (const file of files) {
        const alreadyExists = merged.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        );

        if (!alreadyExists) {
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

            <div className="rounded-2xl border border-dashed border-slate-300 p-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Ajouter des fichiers
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
                    Fichiers sélectionnés
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
            <p className="mt-1 text-sm">
              Nombre de fichiers joints :{" "}
              <span className="font-semibold">{selectedFiles.length}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}