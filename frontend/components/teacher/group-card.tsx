"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import Link from "next/link"

type GroupCardProps = {
  name: string
  totalSensitized: number
  totalPresentations: number
  totalImpactActivities: number
}

export function GroupCard({ name, totalSensitized, totalPresentations, totalImpactActivities }: GroupCardProps) {
  // derive the id segment from "GroupX" name (fallback to encoded name)
  const idMatch = name.match(/\d+$/)
  const idSegment = idMatch ? idMatch[0] : encodeURIComponent(name)

  return (
    <Card
      role="article"
      aria-label={name}
      className="relative border-l-4 border-orange-500/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-100/70"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-semibold text-slate-900">{name}</CardTitle>
          <Button
            asChild
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white border-transparent transition-transform hover:-translate-y-0.5"
          >
            <Link
              href={`/teacher/presentation-impact/groups/${idSegment}`}
              aria-label={`Edit ${name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
              Edit
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between rounded-md border border-orange-100 bg-orange-50/50 px-3 py-2">
          <span className="text-sm text-slate-600">Total Sensitized Students</span>
          <span className="font-medium text-slate-900">{totalSensitized}</span>
        </div>
        <div className="flex items-center justify-between rounded-md border border-orange-100 bg-orange-50/50 px-3 py-2">
          <span className="text-sm text-slate-600">Total Presentations</span>
          <span className="font-medium text-slate-900">{totalPresentations}</span>
        </div>
        <div className="flex items-center justify-between rounded-md border border-orange-100 bg-orange-50/50 px-3 py-2">
          <span className="text-sm text-slate-600">Impact Activities</span>
          <span className="font-medium text-slate-900">{totalImpactActivities}</span>
        </div>
      </CardContent>
    </Card>
  )
}
