import Link from "next/link"
import TeacherGroupsGrid from "@/components/teacher/teacher-groups-grid"

export default function PresentationImpactGroupsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-balance text-2xl font-semibold text-slate-900">Presentation &amp; Impact — Groups</h1>
          <p className="mt-1 text-sm text-slate-600">Explore all groups. Click Edit to view its 6-week details.</p>
        </div>
        <Link href="/teacher" className="text-sm font-medium text-orange-600 hover:text-orange-700">
          Back to Teacher Hub
        </Link>
      </header>

      <section aria-label="Groups">
        <TeacherGroupsGrid />
      </section>
    </main>
  )
}
