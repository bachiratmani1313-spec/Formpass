"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";

type Status = "draft" | "sent" | "received" | "validated";

export default function DemandePage() {
  const [status, setStatus] = useState<Status>("draft");
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
    setStatus("sent");
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

        {/* STATUS */}
        <div className="mt-4 flex gap-2 text-sm">
          <span className={`px-3 py-1 rounded-full ${status === "sent" || status === "received" || status === "validated" ? "bg-blue-100 text-blue-800" : "bg-gray-100"}`}>
            Envoyé
          </span>
          <span className={`px-3 py-1 rounded-full ${status === "received" || status === "validated" ? "bg-green-100 text-green-800" : "bg-gray-100"}`}>
            Reçu
          </span>
          <span className={`px-3 py-1 rounded-full ${status === "validated" ? "bg-purple-100 text-purple-800" : "bg-gray-100"}`}>
            Validé
          </span>
        </div>

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Envoyer votre dossier</h2>

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
            />

            {selectedFiles.length > 0 && (
              <div className="bg-blue-50 p-3 rounded-xl">
                {selectedFiles.map((file, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    {file.name}
                    <button type="button" onClick={() => removeFile(i)}>
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button className="bg-blue-700 text-white px-6 py-3 rounded-xl">
              Envoyer
            </button>
          </form>
        </div>

        {/* ACTIONS STATUS */}
        {status === "sent" && (
          <button
            onClick={() => setStatus("received")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Marquer comme reçu
          </button>
        )}

        {status === "received" && (
          <button
            onClick={() => setStatus("validated")}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl"
          >
            Valider le dossier
          </button>
        )}

        {/* MESSAGE */}
        {status === "sent" && (
          <div className="mt-6 bg-blue-50 p-4 rounded-xl text-blue-800">
            Dossier envoyé
          </div>
        )}

        {status === "received" && (
          <div className="mt-6 bg-green-50 p-4 rounded-xl text-green-800">
            Dossier reçu par le service
          </div>
        )}

        {status === "validated" && (
          <div className="mt-6 bg-purple-50 p-4 rounded-xl text-purple-800">
            Dossier validé
          </div>
        )}
      </div>
    </main>
  );
}