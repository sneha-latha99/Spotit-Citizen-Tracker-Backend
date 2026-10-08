import ReportForm from "@/components/report-form"
import Header from "@/components/header"

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Report an Issue</h1>
        <p className="text-muted-foreground mb-8">Help us improve your neighborhood by reporting civic issues</p>
        <ReportForm />
      </div>
    </main>
  )
}
