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

        if (!exists) merged.push(file);
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
  }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    alert("Lien copié");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">

        {/* HEADER + RETOUR */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            FormPass
          </p>

          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Retour à l’accueil
          </Link>
        </div>

        <h1 className="mt-4 text-3xl font-bold">Espace citoyen</h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Complétez la demande, ajoutez les documents nécessaires et générez un lien.
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
                  placeholder="Téléphone"
                  className="w-full rounded-xl border px-4 py-3"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
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
                  Type de documents
                </option>
                <option>Documents administratifs</option>
                <option>Documents personnels</option>
                <option>CV</option>
                <option>Pièces d’identité</option>
                <option>Justificatifs</option>
                <option>Autres</option>
              </select>

              <textarea
                placeholder="Message / description"
                className="min-h-[120px] w-full rounded-xl border px-4 py-3"
              />

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-xl border px-4 py-3"
              />

              {selectedFiles.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-xl">
                  {selectedFiles.map((file, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      {file.name}
                      <button onClick={() => removeFile(i)}>❌</button>
                    </div>
                  ))}
                </div>
              )}

              <button className="bg-blue-700 text-white px-6 py-3 rounded-xl">
                Générer le lien
              </button>
            </form>
          )}

          {/* RESULTAT */}
          {submitted && (
            <div className="mt-6">
              <p className="text-green-700 font-semibold">
                Demande créée avec succès
              </p>

              <div className="mt-4 bg-white border p-4 rounded-xl">
                {generatedLink}
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                <button
                  onClick={copyLink}
                  className="bg-slate-900 text-white px-5 py-2 rounded-xl"
                >
                  Copier le lien
                </button>

                <button
                  onClick={resetForm}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  Nouvelle demande
                </button>

                <Link
                  href="/"
                  className="bg-gray-200 px-5 py-2 rounded-xl"
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