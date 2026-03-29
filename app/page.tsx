export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            FormPass
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Transmettez un dossier complet en quelques clics
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            FormPass permet d’envoyer un dossier administratif ou professionnel
            de manière simple, rapide et structurée, avec preuve d’envoi et
            suivi de réception.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="/citoyen"
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Citoyen / Expéditeur
            </p>
            <h2 className="text-2xl font-bold">Je veux envoyer un dossier</h2>
            <p className="mt-3 text-slate-600">
              Remplissez vos informations, ajoutez vos documents et préparez
              votre transmission.
            </p>
            <div className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white">
              Accéder à l’espace citoyen
            </div>
          </a>

          <a
            href="/service"
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Service / Entreprise
            </p>
            <h2 className="text-2xl font-bold">Je veux recevoir des dossiers</h2>
            <p className="mt-3 text-slate-600">
              Créez une demande claire et recevez des dossiers complets,
              structurés et traçables.
            </p>
            <div className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
              Accéder à l’espace service
            </div>
          </a>
        </div>

        <div className="mt-12 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Transmission simple</h3>
            <p className="mt-2 text-sm text-slate-600">
              Un même système pour citoyens, communes, entreprises et partenaires.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Preuve d’envoi</h3>
            <p className="mt-2 text-sm text-slate-600">
              Chaque transmission peut recevoir un identifiant unique et une date.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Réception claire</h3>
            <p className="mt-2 text-sm text-slate-600">
              Le destinataire peut confirmer la bonne réception du dossier.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}