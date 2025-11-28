"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

export default function GroupDetailPage() {
  const { id } = useParams();
  const idNum = Number(id)
  const groupName = Number.isFinite(idNum) ? `Group${idNum}` : "Group"

  // Deterministic mock data for 7 weeks
  const weeks = Array.from({ length: 7 }, (_, i) => {
    const week = i + 1
    const students = 50 + ((idNum * 7 + week * 3) % 120) // 50..169 approx
    const presentations = 1 + ((idNum + week) % 4) // 1..4
    const impact = 2 + ((idNum * week) % 6) // 2..7
    return { week, students, presentations, impact }
  })

  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8 md:mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-pretty text-2xl md:text-3xl font-semibold text-slate-900">
            {groupName} — Weekly Overview
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            Review 7-week progress for sensitized students, presentations, and impact activities.
          </p>
          <div className="mt-4 h-1 w-28 rounded bg-orange-600" />
        </div>

        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <Link href="/teacher">Back to Groups</Link>
        </Button>
      </header>

      <section aria-label="Weekly cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {weeks.map((w, idx) => (
          <div
            key={w.week}
            className="opacity-0 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${Math.min(idx * 80, 600)}ms`, animationFillMode: "forwards" }}
          >
            <WeekCard week={w.week} students={w.students} presentations={w.presentations} impact={w.impact} />
          </div>
        ))}
      </section>
    </main>
  )
}

function WeekCard({
  week,
  students,
  presentations,
  impact,
}: {
  week: number
  students: number
  presentations: number
  impact: number
}) {
  return (
    <Card className="border border-orange-200 hover:border-orange-300 bg-white rounded-xl transition group hover:shadow-lg hover:shadow-orange-100/60">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="flex items-center justify-between text-slate-900">
          <span>Week {week}</span>
          <span className="text-xs font-medium text-white bg-orange-600 rounded px-2 py-1">Active</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <ul className="grid grid-cols-1 gap-3">
          <li className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
            <span className="text-xs text-slate-600">Sensitized Students</span>
            <span className="text-base font-semibold text-slate-900">{students}</span>
          </li>
          <li className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
            <span className="text-xs text-slate-600">Presentations</span>
            <span className="text-base font-semibold text-slate-900">{presentations}</span>
          </li>
          <li className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
            <span className="text-xs text-slate-600">Impact Activities</span>
            <span className="text-base font-semibold text-slate-900">{impact}</span>
          </li>
        </ul>
        <div className="mt-4 h-1 w-full rounded bg-orange-600/80 transition-opacity group-hover:opacity-100" />
      </CardContent>
    </Card>
  )
}
