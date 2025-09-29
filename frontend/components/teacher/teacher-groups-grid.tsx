import { GroupCard } from "./group-card"

type Group = {
  name: string
  totalSensitized: number
  totalPresentations: number
  totalImpactActivities: number
}

// Deterministic values (index-based) to avoid hydration mismatch
function makeGroups(): Group[] {
  const groups: Group[] = []
  for (let i = 1; i <= 10; i++) {
    groups.push({
      name: `Group${i}`,
      totalSensitized: 60 + ((i * 37) % 141), // 60..200
      totalPresentations: 3 + ((i * 2) % 13), // 3..15
      totalImpactActivities: 1 + ((i * 3) % 8), // 1..9
    })
  }
  return groups
}

export function TeacherGroupsGrid() {
  const groups = makeGroups()
  return (
    <section aria-labelledby="teacher-section-title" className="w-full">
      <header className="mb-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
        <h2 id="teacher-section-title" className="text-pretty text-2xl font-semibold tracking-tight">
          Hi, Sagar
        </h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s the overview of groups with totals for sensitized students, presentations, and impact activities.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {groups.map((g, idx) => (
          <div
            key={g.name}
            className="animate-in fade-in-50 slide-in-from-bottom-2 duration-700"
            style={{ animationDelay: `${100 + idx * 70}ms` }}
          >
            <GroupCard
              name={g.name}
              totalSensitized={g.totalSensitized}
              totalPresentations={g.totalPresentations}
              totalImpactActivities={g.totalImpactActivities}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeacherGroupsGrid
