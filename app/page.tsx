import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-6">🚀 SaaSKit</h1>
      <p className="text-muted-foreground mb-6">A modern starter kit for building SaaS products fast.</p>
      <Button>Get Started</Button>
    </main>
  )
}
