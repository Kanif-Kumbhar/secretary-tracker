import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CollegeSummaryPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-balance text-2xl font-semibold text-slate-900">College Summary</h1>
          <p className="mt-1 text-sm text-slate-600">High-level summaries by college with key stats.</p>
        </div>
        <Link href="/teacher" className="text-sm font-medium text-orange-600 hover:text-orange-700">
          Back to Teacher Hub
        </Link>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-orange-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900">Participation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Total sensitized students and presentations by college.
          </CardContent>
        </Card>

        <Card className="border border-orange-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900">Engagement</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Engagement scores and feedback trends to visualize later.
          </CardContent>
        </Card>

        <Card className="border border-orange-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900">Highlights</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Notable achievements and milestone activities per college.
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
