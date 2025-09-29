import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sagar | Groups Overview",
  description: "Cards for Group1 to Group10 with totals and activity metrics.",
}

export default function TeacherPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-pretty text-2xl font-bold text-slate-900">Hi, Sagar</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Choose a section to continue.</p>
      </header>

      <section aria-label="Teacher sections">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/teacher/earn-and-learndetail"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
            aria-label="Open Earn and LearnDeatil"
          >
            <Card className="h-full border border-orange-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/70">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-slate-900">
                  <span>Earn and LearnDeatil</span>
                  <span className="inline-block h-8 w-8 rounded-md bg-orange-50 ring-1 ring-orange-100" aria-hidden />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Track earn-and-learn program data and progress.
                <div className="mt-3 text-orange-600">Open →</div>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/teacher/presentation-impact/groups"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
            aria-label="Open Presentation & impact master"
          >
            <Card className="h-full border border-orange-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/70">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-slate-900">
                  <span>Presentation &amp; impact master</span>
                  <span className="inline-block h-8 w-8 rounded-md bg-orange-50 ring-1 ring-orange-100" aria-hidden />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                View the groups overview data you&apos;re currently seeing.
                <div className="mt-3 text-orange-600">Open →</div>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/teacher/presentation-impact/mass-activity"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
            aria-label="Open Mass Activity"
          >
            <Card className="h-full border border-orange-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/70">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-slate-900">
                  <span>Mass Activity</span>
                  <span className="inline-block h-8 w-8 rounded-md bg-orange-50 ring-1 ring-orange-100" aria-hidden />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Log, manage, and review mass-impact activities.
                <div className="mt-3 text-orange-600">Open →</div>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/teacher/presentation-impact/college-summary"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
            aria-label="Open College Summary"
          >
            <Card className="h-full border border-orange-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100/70">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-slate-900">
                  <span>College Summary</span>
                  <span className="inline-block h-8 w-8 rounded-md bg-orange-50 ring-1 ring-orange-100" aria-hidden />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                High-level summaries by college and timeframe.
                <div className="mt-3 text-orange-600">Open →</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  )
}
