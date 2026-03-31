"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function DemandePage() {
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles((prev) => {
      const merged = [...prev];

      for (const file of files) {
        const exists = merged.some(
          (f) =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
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

  function removeFile(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function resetForm() {
    setSubmitted(false);
    setSelectedFiles([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            FormPass
          </p>

          <Link
            href="/"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Retour accueil
          </Link>
        </div>

        <h1 className="mt-4 text-3xl font-bold">Demande reçue</h1>

        <p className="mt-2 text-slate-600">
          Référence : <span className="font-semibold">{id}</span>
        </p>

        <div className="mt-4 flex gap-2 text-sm">
          <span
            className={`rounded-full px-3 py-1 ${
              submitted ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-slate-500"
            }`}
          >
            Envoyé
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-slate-500">
            Reçu
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-slate-500">
            Validé
          </span>
        </div>

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Envoyer votre dossier</h2>

          {!submitted && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Nom"
                className="w-full rounded-xl border px-4 py-3"
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border px-4 py-3"
                required
              />

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-xl border px-4 py-3"
                required
              />

              {selectedFiles.length > 0 && (
                <div className="rounded-xl bg-blue-50 p-3">
                  <p className="mb-2 text-sm font-medium text-blue-900">
                    Fichiers sélectionnés
                  </p>

                  <div className="space-y-2">
                    {selectedFiles.map((file, i) => (
                      <div
                        key={`${file.name}-${file.lastModified}-${i}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="truncate pr-4">{file.name}</span>

                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
                        >
                          Retirer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="rounded-xl bg-blue-700 px-6 py-3 text-white"
              >
                Envoyer
              </button>
            </form>
          )}

          {submitted && (
            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-blue-800">
              <p className="font-semibold">Dossier envoyé</p>
              <p className="mt-2 text-sm">
                Votre dossier a bien été transmis. Le service pourra maintenant le recevoir et le traiter.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 border"
                >
                  Envoyer un autre dossier
                </button>

                <Link
                  href="/"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Retour accueil
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
