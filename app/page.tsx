"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          FORMPASS
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight max-w-3xl">
          Transmettez un dossier complet en quelques clics
        </h1>

        <p className="mt-6 text-lg text-slate-300 max-w-2xl">
          FormPass permet d’envoyer un dossier administratif ou professionnel de manière simple,
          rapide et structurée, avec preuve d’envoi et suivi de réception.
        </p>

        {/* BLOCS */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">

          {/* CITOYEN */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-lg">
            <p className="text-sm font-semibold text-blue-400 uppercase">
              Citoyen / Expéditeur
            </p>

            <h2 className="mt-4 text-2xl font-semibold">
              Je veux envoyer un dossier
            </h2>

            <p className="mt-4 text-slate-300">
              Remplissez vos informations, ajoutez vos documents et préparez votre transmission.
            </p>

            <div className="mt-6">
              <Link
                href="/citoyen"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition"
              >
                Accéder à l’espace citoyen
              </Link>
            </div>
          </div>

          {/* SERVICE */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-lg">
            <p className="text-sm font-semibold text-blue-400 uppercase">
              Service / Entreprise
            </p>

            <h2 className="mt-4 text-2xl font-semibold">
              Je veux recevoir des dossiers
            </h2>

            <p className="mt-4 text-slate-300">
              Créez une demande claire et recevez des dossiers complets, structurés et traçables.
            </p>

            <div className="mt-6">
              <Link
                href="/service"
                className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-slate-200 transition"
              >
                Accéder à l’espace service
              </Link>
            </div>
          </div>

        </div>

        {/* AVANTAGES */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-lg">Transmission simple</h3>
            <p className="mt-2 text-slate-300">
              Un même système pour citoyens, communes, entreprises et partenaires.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-lg">Preuve d’envoi</h3>
            <p className="mt-2 text-slate-300">
              Chaque transmission peut recevoir un identifiant unique et une date.
            </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-lg">Réception claire</h3>
            <p className="mt-2 text-slate-300">
              Le destinataire peut confirmer la bonne réception du dossier.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}