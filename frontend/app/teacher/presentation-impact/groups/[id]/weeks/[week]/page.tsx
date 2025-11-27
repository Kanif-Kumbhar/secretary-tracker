"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "next/navigation"

type Mode = "presentation" | "impact"

export default function WeekEditPage() {
  const { id, week } = useParams()
  const idNum = Number(id)
  const weekNum = Number(week)
  const [mode, setMode] = useState<Mode>("presentation")

  const presentationRows = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const day = (i + 1) * 3
      const date = new Date(2025, idNum % 12, (weekNum - 1) * 4 + day)
      const students = 15 + ((idNum + weekNum + i * 7) % 60)
      const presNo = 100 + idNum * 10 + weekNum * 2 + i
      const feedback = (i + idNum + weekNum) % 2 === 0 ? "Yes" : "No"
      return {
        date: date.toISOString().slice(0, 10),
        students,
        presNo,
        feedback,
      }
    })
  }, [idNum, weekNum])

  const impactRows = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => {
      const day = (i + 1) * 5
      const date = new Date(2025, weekNum % 12, (idNum % 3) * 6 + day)
      const impactNo = 200 + idNum * 5 + weekNum * 3 + i
      const people = 20 + ((idNum * 3 + weekNum * 4 + i * 9) % 120)
      return {
        date: date.toISOString().slice(0, 10),
        impactNo,
        people,
      }
    })
  }, [idNum, weekNum])

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-pretty text-2xl md:text-3xl font-semibold text-slate-900">
            Group{Number.isFinite(idNum) ? idNum : ` ${id}`} — Week {weekNum}
          </h1>
          <p className="mt-2 text-sm text-slate-600">Manage Presentation or Impact entries for this week.</p>
          <div className="mt-4 h-1 w-28 rounded bg-orange-600" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
          >
            <Link href={`/teacher/presentation-impact/groups/${id}`}>Back to Weeks</Link>
          </Button>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
            <Link href={`/teacher/presentation-impact/groups`}>All Groups</Link>
          </Button>
        </div>
      </header>

      <div className="mb-4 flex items-center gap-2">
        <Button
          onClick={() => setMode("presentation")}
          className={`h-9 px-4 ${mode === "presentation" ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-white text-slate-900 hover:bg-orange-50 border border-orange-200"}`}
          aria-pressed={mode === "presentation"}
        >
          Presentation
        </Button>
        <Button
          onClick={() => setMode("impact")}
          className={`h-9 px-4 ${mode === "impact" ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-white text-slate-900 hover:bg-orange-50 border border-orange-200"}`}
          aria-pressed={mode === "impact"}
        >
          Impact
        </Button>
      </div>

      {mode === "presentation" ? (
        <section
          aria-label="Presentation table"
          className="overflow-x-auto rounded-md border border-orange-200 bg-white"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50/60">
                <TableHead className="text-slate-700">Date</TableHead>
                <TableHead className="text-slate-700">Students Sensitized</TableHead>
                <TableHead className="text-slate-700">Presentation #</TableHead>
                <TableHead className="text-slate-700">Live Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {presentationRows.map((r, idx) => (
                <TableRow key={idx} className="hover:bg-orange-50/50">
                  <TableCell className="font-medium text-slate-900">{r.date}</TableCell>
                  <TableCell>{r.students}</TableCell>
                  <TableCell>{r.presNo}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${r.feedback === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {r.feedback}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <section aria-label="Impact table" className="overflow-x-auto rounded-md border border-orange-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50/60">
                <TableHead className="text-slate-700">Date</TableHead>
                <TableHead className="text-slate-700">Impact #</TableHead>
                <TableHead className="text-slate-700">People Sensitized</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {impactRows.map((r, idx) => (
                <TableRow key={idx} className="hover:bg-orange-50/50">
                  <TableCell className="font-medium text-slate-900">{r.date}</TableCell>
                  <TableCell>{r.impactNo}</TableCell>
                  <TableCell>{r.people}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </main>
  )
}
