import Header from "@/components/header"
import Hero from "@/components/hero"
import RecentIssues from "@/components/recent-issues"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <RecentIssues />
    </main>
  )
}
