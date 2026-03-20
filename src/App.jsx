import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Home from './pages/Home'
import FAQ from './pages/FAQ'
import Support from './pages/Support'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/suporte" element={<Support />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
