import Link from "next/link"

function NavCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-orange-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      aria-label={title}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <div className="h-10 w-10 rounded-md bg-orange-50 ring-1 ring-orange-100" />
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-orange-600">
        <span>Open</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  )
}

export default function PresentationImpactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-pretty text-2xl font-bold text-slate-900">Presentation &amp; impact master</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Choose what you want to manage next.</p>
      </header>

      <section aria-label="Presentation & Impact Sections">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NavCard title="Groups" description="View all groups and their totals." href="/teacher/groups" />
          <NavCard
            title="Mass Activity"
            description="Record and review mass activities."
            href="/teacher/mass-activity"
          />
          <NavCard title="College Summary" description="Overview across colleges." href="/teacher/college-summary" />
        </div>
      </section>
    </main>
  )
}
