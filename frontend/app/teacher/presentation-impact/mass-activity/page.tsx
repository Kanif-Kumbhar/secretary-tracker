import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MassActivityPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-balance text-2xl font-semibold text-slate-900">Mass Activity</h1>
          <p className="mt-1 text-sm text-slate-600">Log and analyze mass-impact activities.</p>
        </div>
        <Link href="/teacher" className="text-sm font-medium text-orange-600 hover:text-orange-700">
          Back to Teacher Hub
        </Link>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-orange-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Add your latest activities here to track reach and outcomes.
          </CardContent>
        </Card>

        <Card className="border border-orange-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900">Top Locations</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Summaries by city/campus with participation metrics.
          </CardContent>
        </Card>

        <Card className="border border-orange-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900">Impact KPIs</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Quick KPIs (attendees, sessions, feedback) configurable later.
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
