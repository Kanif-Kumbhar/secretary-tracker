import { TeacherGroupsGrid } from "@/components/teacher/teacher-groups-grid"

export default function GroupsIndexPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-pretty text-2xl font-bold text-slate-900">Groups</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Explore all groups. Click Edit on a group to open its 7-week view.
        </p>
      </header>

      <TeacherGroupsGrid />
    </main>
  )
}
