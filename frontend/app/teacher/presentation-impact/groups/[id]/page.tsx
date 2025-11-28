"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

export default function GroupWeeklyOverviewPage() {
  const { id } = useParams();
  const idNum = Number(id)
  const groupName = Number.isFinite(idNum) ? `Group${idNum}` : `Group ${id}`

  const weeks = Array.from({ length: 6 }, (_, i) => {
    const week = i + 1
    const students = 40 + ((idNum * 5 + week * 7) % 110) // 40..149 approx
    return { week, students }
  })

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-pretty text-2xl md:text-3xl font-semibold text-slate-900">
            {groupName} — 6-Week Overview
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            Review 6-week progress of total students sensitized. Click Edit on a week to manage Presentation or Impact.
          </p>
          <div className="mt-4 h-1 w-28 rounded bg-orange-600" />
        </div>

        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <Link href="/teacher/presentation-impact/groups">Back to Groups</Link>
        </Button>
      </header>

      <section aria-label="Weekly cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {weeks.map((w, idx) => (
          <div
            key={w.week}
            className="animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${Math.min(idx * 80, 480)}ms`, animationFillMode: "forwards" }}
          >
            <Card className="border border-orange-200 hover:border-orange-300 bg-white rounded-xl transition group hover:shadow-lg hover:shadow-orange-100/60">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="flex items-center justify-between text-slate-900">
                  <span>Week {w.week}</span>
                  <span className="text-xs font-medium text-white bg-orange-600 rounded px-2 py-1">Active</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
                  <span className="text-xs text-slate-600">Sensitized Students</span>
                  <span className="text-base font-semibold text-slate-900">{w.students}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Link
                      href={`/teacher/presentation-impact/groups/${id}/weeks/${w.week}`}
                      aria-label={`Edit Week ${w.week}`}
                    >
                      Edit
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 h-1 w-full rounded bg-orange-600/80 transition-opacity group-hover:opacity-100" />
              </CardContent>
            </Card>
          </div>
        ))}
      </section>
    </main>
  )
}
