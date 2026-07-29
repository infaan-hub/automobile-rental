import BackgroundShapes from '../components/BackgroundShapes'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg relative overflow-hidden">
      <BackgroundShapes />
      <Navbar />
      <Hero />
    </main>
  )
}
