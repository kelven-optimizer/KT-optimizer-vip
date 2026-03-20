import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { to: '/', label: 'Início', icon: 'fa-house' },
    { to: '/faq', label: 'FAQ', icon: 'fa-circle-question' },
    { to: '/suporte', label: 'Suporte', icon: 'fa-headset' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06080f]/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_40px_rgba(192,38,211,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-[10px] overflow-hidden transition-all duration-400 group-hover:scale-110 group-hover:-rotate-3 shadow-[0_0_15px_rgba(124,58,237,0.35)] relative">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[10px]" />
            </div>
            <span className="font-bold text-lg text-white">
              KT <span className="text-gradient-purple">Optimizer</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-purple-400 bg-purple-400/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${link.icon} text-xs`} />
                {link.label}
              </Link>
            ))}

            <a
              href="https://discord.gg/ZmayZzzswC"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#a5b0ff] hover:text-white hover:bg-[#5865F2]/15 transition-all duration-200 border border-[#5865F2]/20 hover:border-[#5865F2]/40"
            >
              <i className="fab fa-discord text-[#7289da]" />
              Discord
            </a>

          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#06080f]/98 backdrop-blur-xl border-b border-white/6 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? 'text-purple-400 bg-purple-400/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${link.icon} w-4 text-center`} />
                {link.label}
              </Link>
            ))}
            <a
              href="https://discord.gg/ZmayZzzswC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#a5b0ff] bg-[#5865F2]/10 border border-[#5865F2]/20"
            >
              <i className="fab fa-discord text-[#7289da] w-4 text-center" />
              Discord da Comunidade
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
