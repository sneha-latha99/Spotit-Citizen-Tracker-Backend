import LeaderboardView from "@/components/leaderboard-view"
import Header from "@/components/header"

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">Top contributors in your community</p>
        <LeaderboardView />
      </div>
    </main>
  )
}
