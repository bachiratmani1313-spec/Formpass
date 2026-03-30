export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_30%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10">
          <header className="mb-16 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
                FormPass
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Transmission simple de dossiers
              </p>
            </div>

            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 md:block">
              Version démo
            </div>
          </header>

          <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                Citoyens · Communes · Entreprises
              </div>

              <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-6xl">
                Envoyez, recevez et suivez un dossier en quelques clics
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                FormPass permet de créer une demande, générer un lien sécurisé,
                transmettre plusieurs documents et suivre le statut du dossier
                de manière simple, claire et professionnelle.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/citoyen"
                  className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Espace citoyen
                </a>

                <a
                  href="/service"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Espace service
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">1 lien</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Une seule demande à partager
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">Multi-fichiers</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Ajout progressif de documents
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">3 statuts</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Envoyé, reçu, validé
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                      Aperçu
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Parcours FormPass
                    </h2>
                  </div>

                  <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Actif
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      1. Création de demande
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Le service crée une demande et obtient un lien unique.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      2. Réponse au lien
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Le citoyen ou partenaire transmet ses documents.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      3. Suivi du statut
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Le dossier passe de envoyé à reçu puis validé.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                  <p className="text-sm font-medium text-blue-200">
                    Idéal pour communes, entreprises, RH, fournisseurs et
                    candidatures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}