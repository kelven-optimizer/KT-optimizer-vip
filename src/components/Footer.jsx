import { Link } from 'react-router-dom'

const team = [
  { username: 'kelvenapk', github: 'https://github.com/kelvenapk', role: 'Dev', avatar: 'https://avatars.githubusercontent.com/kelvenapk' },
  { username: 'thurdev155', github: 'https://github.com/thurdev155', role: 'Marketing', avatar: 'https://avatars.githubusercontent.com/thurdev155' },
  { username: 'pegaso0x1337', github: 'https://github.com/pegaso0x1337', role: 'Security', avatar: 'https://avatars.githubusercontent.com/pegaso0x1337' },
]

function AvatarSmall({ src, username }) {
  return (
    <img
      src={src}
      alt={username}
      onError={(e) => { e.target.style.display = 'none' }}
      className="w-7 h-7 rounded-full object-cover border-2 border-slate-700 hover:border-purple-400/50 transition-all hover:scale-110"
      title={`@${username}`}
    />
  )
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#050710]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center"
                style={{ boxShadow: '0 0 15px rgba(0,200,255,0.3)' }}>
                <i className="fas fa-bolt text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                KT <span className="text-gradient-purple">Optimizer</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs">
              Otimização extrema para Windows, feita por quem entende. Performance máxima, sem bloatware.
            </p>

            {/* Team avatars */}
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-2">Equipe</p>
              <div className="flex items-center gap-2">
                {team.map(m => (
                  <a key={m.username} href={m.github} target="_blank" rel="noopener noreferrer">
                    <AvatarSmall src={m.avatar} username={m.username} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Páginas</h4>
            <div className="space-y-2.5">
              {[
                { to: '/', label: 'Início' },
                { to: '/faq', label: 'FAQ' },
                { to: '/suporte', label: 'Suporte' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Links</h4>
            <div className="space-y-2.5">
              {[
                { href: 'https://github.com/kelvenapk', label: 'GitHub kelvenapk', icon: 'fab fa-github', color: 'text-slate-400' },
                { href: 'https://github.com/pegaso0x1337', label: 'GitHub pegaso', icon: 'fab fa-github', color: 'text-slate-400' },
                { href: 'https://github.com/thurdev155', label: 'GitHub thurr', icon: 'fab fa-github', color: 'text-slate-400' },
                { href: 'https://discord.gg/ZmayZzzswC', label: 'Discord', icon: 'fab fa-discord', color: 'text-[#7289da]' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200 group"
                >
                  <i className={`${link.icon} ${link.color} text-xs w-3`} />
                  {link.label}
                  <i className="fas fa-external-link-alt text-xs text-slate-700 group-hover:text-slate-500 ml-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Discord CTA strip */}
        <div className="rounded-2xl bg-[#5865F2]/8 border border-[#5865F2]/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <i className="fab fa-discord text-2xl text-[#7289da]" />
            <div>
              <p className="text-white font-semibold text-sm">Servidor do Discord</p>
              <p className="text-slate-500 text-xs">Comunidade KT Optimizer · Suporte · Novidades</p>
            </div>
          </div>
          <a
            href="https://discord.gg/ZmayZzzswC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#5865F2,#7289da)', boxShadow: '0 0 20px rgba(88,101,242,0.3)' }}
          >
            <i className="fab fa-discord" />
            Entrar agora
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} KT Optimizer · Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            {team.map(m => (
              <a
                key={m.username}
                href={m.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-white transition-colors text-sm"
                title={`@${m.username}`}
              >
                <i className="fab fa-github" />
              </a>
            ))}
            <a
              href="https://discord.gg/ZmayZzzswC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#7289da] transition-colors text-sm"
            >
              <i className="fab fa-discord" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
