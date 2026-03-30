"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function CitoyenPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fakeId = `FP-${Date.now()}`;
    const link = `${window.location.origin}/demande/${fakeId}`;

    setGeneratedLink(link);
    setSubmitted(true);
  }

  function resetForm() {
    setSelectedFiles([]);
    setSubmitted(false);
    setGeneratedLink("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    alert("Lien copié");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          FormPass
        </p>

        <h1 className="text-3xl font-bold">Espace citoyen</h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Complétez la demande, ajoutez les documents nécessaires et générez un
          lien à transmettre au destinataire.
        </p>

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Créer une demande de transmission
          </h2>

          {!submitted && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full rounded-xl border px-4 py-3"
                  required
                />

                <input
                  type="text"
                  placeholder="Prénom"
                  className="w-full rounded-xl border px-4 py-3"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="tel"
                  placeholder="Numéro de téléphone"
                  className="w-full rounded-xl border px-4 py-3"
                  required
                />

                <input
                  type="email"
                  placeholder="Adresse email"
                  className="w-full rounded-xl border px-4 py-3"
                  required
                />
              </div>

              <select
                className="w-full rounded-xl border px-4 py-3"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choisir un type de documents
                </option>
                <option>Documents administratifs</option>
                <option>Documents personnels</option>
                <option>Curriculum vitae</option>
                <option>Pièces d’identité</option>
                <option>Justificatifs de domicile</option>
                <option>Permis de conduire</option>
                <option>Autres documents</option>
              </select>

              <textarea
                placeholder="Expliquez brièvement votre demande ou le contenu attendu"
                className="min-h-[140px] w-full rounded-xl border px-4 py-3"
              />

              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <label className="block text-sm font-medium text-slate-700">
                  Ajouter un ou plusieurs documents
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="mt-3 w-full rounded-xl border bg-white px-4 py-3"
                />

                <p className="mt-2 text-sm text-slate-500">
                  Vous pouvez ajouter plusieurs fichiers PDF, images ou documents.
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="mb-3 font-medium text-blue-900">
                    Documents sélectionnés
                  </p>

                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm"
                      >
                        <span className="truncate pr-4">{file.name}</span>

                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="rounded-lg px-2 py-1 text-red-600 hover:bg-red-50"
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
                className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Générer le lien
              </button>
            </form>
          )}

          {submitted && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-lg font-semibold text-green-900">
                Demande créée avec succès
              </h3>

              <p className="mt-2 text-green-800">
                Votre lien de transmission a été généré. Vous pouvez le copier et
                l’envoyer au destinataire.
              </p>

              <div className="mt-4 rounded-xl border bg-white p-4">
                <p className="text-sm font-medium text-slate-700">Lien généré</p>
                <p className="mt-2 break-all text-sm text-blue-700">
                  {generatedLink}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyLink}
                  className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
                >
                  Copier le lien
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800"
                >
                  Nouvelle demande
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center rounded-xl bg-slate-200 px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-300"
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