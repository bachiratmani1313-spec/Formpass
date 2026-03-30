"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          FormPass
        </p>

        <h1 className="mt-6 text-5xl font-bold">
          Envoyez, recevez et suivez un dossier
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Version simple de test des boutons
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          
          <Link
            href="/citoyen"
            className="w-full rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white sm:w-auto inline-flex justify-center items-center"
          >
            Espace citoyen
          </Link>

          <Link
            href="/service"
            className="w-full rounded-2xl border border-white/20 px-6 py-4 font-semibold text-white sm:w-auto inline-flex justify-center items-center"
          >
            Espace service
          </Link>

        </div>
      </div>
    </main>
  );
}