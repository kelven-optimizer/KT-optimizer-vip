import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

/* ── Team ── */
const teamMembers = [
  {
    username: 'kelvenapk',
    displayName: 'kelvenapk',
    role: 'Programador Principal',
    description: 'Desenvolvedor principal por trás de todos os projetos KT Optimizer.',
    github: 'https://github.com/kelvenapk',
    avatar: 'https://avatars.githubusercontent.com/kelvenapk',
    icon: 'fa-code',
    gradient: 'from-purple-500 to-fuchsia-600',
    ring: 'avatar-ring',
    accent: '#a855f7',
    badge: 'Dev',
    badgeBg: 'bg-purple-400/15 text-purple-300 border-purple-400/30',
  },
  {
    username: 'thurdev155',
    displayName: 'thurr',
    role: 'Divulgação',
    description: 'Responsável pela divulgação e crescimento da comunidade do KT Optimizer.',
    github: 'https://github.com/thurdev155',
    avatar: 'https://avatars.githubusercontent.com/thurdev155',
    icon: 'fa-bullhorn',
    gradient: 'from-purple-500 to-violet-600',
    ring: 'avatar-ring-purple',
    accent: '#7c3aed',
    badge: 'Marketing',
    badgeBg: 'bg-purple-400/15 text-purple-300 border-purple-400/30',
  },
  {
    username: 'pegaso0x1337',
    displayName: 'pegaso',
    role: 'Segurança',
    description: 'Responsável pela segurança e integridade de todos os projetos do KT Optimizer.',
    github: 'https://github.com/pegaso0x1337',
    avatar: 'https://avatars.githubusercontent.com/pegaso0x1337',
    icon: 'fa-shield-halved',
    gradient: 'from-emerald-500 to-teal-600',
    ring: 'avatar-ring-green',
    accent: '#10b981',
    badge: 'Security',
    badgeBg: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  },
]

/* ── Features ── */
const features = [
  { icon: 'fa-gauge-high', title: 'Mais FPS', desc: 'Otimizações diretas no kernel e drivers para extrair o máximo do seu hardware.', color: 'text-purple-400', bg: 'bg-purple-400/8', border: 'border-purple-400/20' },
  { icon: 'fa-memory', title: 'Menos RAM', desc: 'Redução de processos em segundo plano e serviços desnecessários do Windows.', color: 'text-purple-400', bg: 'bg-purple-400/8', border: 'border-purple-400/20' },
  { icon: 'fa-shield-halved', title: 'Sem Telemetria', desc: 'Remoção completa de rastreamento e coleta de dados da Microsoft.', color: 'text-emerald-400', bg: 'bg-emerald-400/8', border: 'border-emerald-400/20' },
  { icon: 'fa-bolt', title: 'Boot Rápido', desc: 'Inicialização mais veloz com desativação de serviços de startup desnecessários.', color: 'text-yellow-400', bg: 'bg-yellow-400/8', border: 'border-yellow-400/20' },
  { icon: 'fa-network-wired', title: 'Rede Otimizada', desc: 'Tweaks de latência e TCP/IP para menor ping em jogos online.', color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/8', border: 'border-fuchsia-400/20' },
  { icon: 'fa-trash-can', title: 'Sem Bloatware', desc: 'Remoção de apps pré-instalados e lixo que o Windows traz por padrão.', color: 'text-rose-400', bg: 'bg-rose-400/8', border: 'border-rose-400/20' },
]

/* ── Future Projects ── */
const futureProjects = [
  {
    title: 'KT Optimizer VIP',
    description: 'Suíte de Otimização Integrada em C# com recursos exclusivos, performance superior e segurança reforçada.',
    icon: 'fa-crown',
    accent: 'text-yellow-400',
    border: 'border-yellow-500/25',
    bg: 'bg-yellow-400/8',
    badge: 'Em Breve',
    badgeStyle: 'bg-yellow-400/20 text-yellow-300',
  },
  {
    title: 'AME Wizard Custom',
    description: 'Versão customizada baseada no AME Wizard — debloat avançado para máxima performance.',
    icon: 'fa-wand-magic-sparkles',
    accent: 'text-purple-400',
    border: 'border-purple-500/25',
    bg: 'bg-purple-400/8',
    badge: 'Planejado',
    badgeStyle: 'bg-purple-400/20 text-purple-300',
    link: 'https://github.com/Ameliorated-LLC/trusted-uninstaller-cli',
  },
  {
    title: 'Discord Lite',
    description: 'Discord re-imaginado — mais leve, menos RAM, mesmo poder comunicativo.',
    icon: 'fa-comments',
    accent: 'text-indigo-400',
    border: 'border-indigo-500/25',
    bg: 'bg-indigo-400/8',
    badge: 'Planejado',
    badgeStyle: 'bg-indigo-400/20 text-indigo-300',
  },
  {
    title: 'Spotify Lite',
    description: 'Escute sua música favorita sem travar seu sistema — versão ultra-leve do Spotify.',
    icon: 'fa-music',
    accent: 'text-green-400',
    border: 'border-green-500/25',
    bg: 'bg-green-400/8',
    badge: 'Planejado',
    badgeStyle: 'bg-green-400/20 text-green-300',
  },
]

/* ── Stats ── */
const stats = [
  { value: 3, suffix: '', label: 'Desenvolvedores', icon: 'fa-users', color: 'text-purple-400' },
  { value: 4, suffix: '+', label: 'Projetos', icon: 'fa-code-branch', color: 'text-purple-400' },
  { value: 100, suffix: '%', label: 'Grátis', icon: 'fa-gift', color: 'text-emerald-400' },
  { value: 0, suffix: '', label: 'Telemetria', icon: 'fa-eye-slash', color: 'text-rose-400' },
]

/* ── Animated counter ── */
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = Math.ceil(target / 40)
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(start)
        }, 30)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Avatar with fallback ── */
function Avatar({ src, username, size = 'w-20 h-20', ringClass = '' }) {
  const [err, setErr] = useState(false)
  return err ? (
    <div className={`${size} rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center ${ringClass}`}>
      <span className="text-white font-bold text-xl">{username[0].toUpperCase()}</span>
    </div>
  ) : (
    <img
      src={src}
      alt={username}
      onError={() => setErr(true)}
      className={`${size} rounded-full object-cover ${ringClass}`}
    />
  )
}

export default function Home() {
  const [hovered, setHovered] = useState(null)
  useReveal()

  return (
    <div className="grid-bg relative">

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-[600px] h-[600px] bg-purple-500/6 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/5 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/4 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-400/10 border border-purple-400/30 shadow-[0_0_20px_rgba(0,212,255,0.15)] backdrop-blur-md text-purple-400 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow" />
            Performance Extrema para Windows
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] font-black text-white mb-6 leading-[1.08] tracking-tight animate-slide-up">
            Otimização extrema para{' '}
            <span className="text-gradient">Windows</span>,<br className="hidden sm:block" />
            feita por quem entende.
          </h1>

          <p className="text-xl sm:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Uma suíte de ferramentas de alto desempenho criada para extrair o máximo do seu sistema — jogos, produtividade ou uso geral.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href="https://discord.gg/ZmayZzzswC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:scale-105 ripple-btn"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #7289da)',
                boxShadow: '0 0 30px rgba(88,101,242,0.4), 0 8px 25px rgba(88,101,242,0.2)',
              }}
            >
              <i className="fab fa-discord text-xl" />
              Entrar no Discord
              <i className="fas fa-arrow-right text-sm" />
            </a>
            <Link to="/faq" className="btn-outline ripple-btn text-base px-8 py-4">
              <i className="fas fa-circle-question" />
              Ver FAQ
            </Link>
          </div>

          {/* mini trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.35s' }}>
            {[
              { icon: 'fa-shield-halved', label: 'Sem vírus', color: 'text-emerald-400' },
              { icon: 'fa-eye-slash', label: 'Zero telemetria', color: 'text-purple-400' },
              { icon: 'fa-gift', label: '100% grátis', color: 'text-purple-400' },
              { icon: 'fa-code', label: 'Open source', color: 'text-yellow-400' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-1.5 text-slate-500 text-sm">
                <i className={`fas ${t.icon} ${t.color} text-xs`} />
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-float">
          <i className="fas fa-chevron-down text-xl" />
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
          {stats.map(s => (
            <div key={s.label} className="card-bg rounded-2xl border border-white/6 p-6 text-center hover:border-purple-400/20 transition-all duration-300 hover:-translate-y-1">
              <i className={`fas ${s.icon} ${s.color} text-2xl mb-3`} />
              <div className="text-3xl font-black text-white mb-1">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
              O que você ganha
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Tudo que o Windows <span className="text-gradient">deveria ser</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Cada otimização foi pensada para impacto real — sem placebo, sem promessas vazias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal reveal-delay-1">
            {features.map(f => (
              <div key={f.title} className={`card-bg rounded-2xl border ${f.border} p-6 card-hover group`}>
                <div className={`w-12 h-12 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fas ${f.icon} text-xl ${f.color}`} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VIP SPOTLIGHT ══ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto reveal">
          <div className="gradient-border">
            <div className="relative rounded-[19px] bg-[#08091a] p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-[19px]" />
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-600/12 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-600/20 border border-yellow-400/30 animate-pulse-glow" />
                    <i className="fas fa-crown text-5xl text-yellow-400 relative z-10 animate-float" />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-xs font-bold uppercase tracking-wider animate-flicker">
                      ⚡ Lançamento MUITO EM BREVE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-400/15 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                      Reescrita em C#
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
                    KT Optimizer <span className="text-gradient">VIP</span>
                  </h2>

                  <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-xl">
                    A migração do painel de{' '}
                    <span className="text-purple-400 font-semibold bg-purple-400/10 px-2 py-0.5 rounded">Electron</span>{' '}
                    para{' '}
                    <span className="text-purple-400 font-semibold bg-purple-400/10 px-2 py-0.5 rounded">C#</span>{' '}
                    está em andamento para garantir mais performance, segurança e recursos exclusivos. A espera valerá a pena!
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {[
                      { icon: 'fa-gauge-high', label: 'Maior Performance', color: 'text-purple-400' },
                      { icon: 'fa-shield-halved', label: 'Mais Segurança', color: 'text-emerald-400' },
                      { icon: 'fa-star', label: 'Recursos Exclusivos', color: 'text-yellow-400' },
                      { icon: 'fa-memory', label: 'Menos Memória RAM', color: 'text-purple-400' },
                    ].map(f => (
                      <div key={f.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/4 border border-white/8 text-slate-300 text-sm hover:bg-white/7 transition-colors">
                        <i className={`fas ${f.icon} ${f.color} text-xs`} />
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="flex flex-col items-center gap-4 px-6 py-5 rounded-2xl bg-white/3 border border-white/8 min-w-[170px]">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Progresso</span>
                        <span className="text-purple-400 text-xs font-bold tabular-nums">~60%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full bar-fill" style={{ '--fill': '60%', background: 'linear-gradient(90deg, #22d3ee, #818cf8)' }} />
                      </div>
                      <p className="text-slate-600 text-xs mt-2 text-center">Em desenvolvimento</p>
                    </div>
                    <a
                      href="https://discord.gg/ZmayZzzswC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105 ripple-btn"
                      style={{ background: 'linear-gradient(135deg,#5865F2,#7289da)', boxShadow: '0 0 18px rgba(88,101,242,0.35)' }}
                    >
                      <i className="fab fa-discord" />
                      Acompanhar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Massive Spotlight Behind Team */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '6s' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              Nossa Equipe
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Os <span className="text-gradient">Programadores</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Uma equipe pequena, dedicada e apaixonada por performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={member.username}
                className={`relative group card-bg rounded-2xl border border-white/6 p-6 overflow-hidden card-holographic cursor-pointer reveal reveal-delay-${i + 1}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Holographic glowing background on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} 
                />
                
                {/* Border glowing line animation (top edge) */}
                <div 
                  className="absolute top-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 pointer-events-none"
                  style={{ backgroundImage: `linear-gradient(to right, transparent, ${member.accent}, transparent)` }}
                />

                <div className="relative z-10 flex items-start gap-4 mb-5">
                  <div className="relative">
                    <Avatar 
                      src={member.avatar} 
                      username={member.displayName} 
                      size="w-24 h-24" 
                      ringClass={`${member.ring} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-[0_0_25px_rgba(255,255,255,0.05)]`} 
                    />
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 rounded-full border-[3px] border-[#0a0d18] animate-pulse-glow" />
                  </div>
                  <div className="flex-1 min-w-0 mt-2">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-black text-xl group-hover:text-purple-300 transition-colors">{member.displayName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${member.badgeBg}`}>
                        {member.badge}
                      </span>
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: member.accent }}>{member.role}</p>
                  </div>
                </div>

                <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-5 group-hover:text-slate-200 transition-colors">
                  {member.description}
                </p>

                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/4 border border-white/8 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                  style={hovered === i ? { boxShadow: `0 0 20px ${member.accent}25` } : {}}
                >
                  <i className="fab fa-github group-hover:animate-bounce" />
                  @{member.username}
                  <i className="fas fa-external-link-alt text-xs opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FUTURE PROJECTS ══ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              Próximos Projetos
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              O <span className="text-gradient-purple">Futuro</span> do KT Optimizer
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Projetos em desenvolvimento que vão revolucionar sua experiência no Windows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal reveal-delay-1">
            {futureProjects.map((p) => (
              <div key={p.title} className={`card-bg rounded-2xl border ${p.border} ${p.bg} p-6 card-hover group`}>
                <div className={`w-11 h-11 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fas ${p.icon} text-xl ${p.accent}`} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-white font-bold text-sm leading-tight">{p.title}</h3>
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${p.badgeStyle}`}>{p.badge}</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${p.accent} hover:opacity-80 text-xs font-medium transition-all`}>
                    <i className="fas fa-external-link-alt text-xs" />
                    Ver projeto
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DISCORD CTA ══ */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto reveal">
          <div
            className="card-bg rounded-3xl border border-[#5865F2]/25 p-12 relative overflow-hidden hover:border-[#5865F2]/40 transition-all duration-300"
            style={{ boxShadow: '0 0 60px rgba(88,101,242,0.1)' }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#5865F2]/8 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center mx-auto mb-6">
                <i className="fab fa-discord text-4xl text-[#7289da]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
                Fique por dentro das <span className="text-gradient">novidades</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                Entre no Discord da comunidade KT Optimizer e acompanhe em primeira mão o lançamento do VIP, tutoriais e suporte.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://discord.gg/ZmayZzzswC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 ripple-btn"
                  style={{
                    background: 'linear-gradient(135deg, #5865F2, #7289da)',
                    boxShadow: '0 0 30px rgba(88,101,242,0.4), 0 8px 25px rgba(88,101,242,0.25)',
                  }}
                >
                  <i className="fab fa-discord text-xl" />
                  Entrar no Discord
                  <i className="fas fa-arrow-right text-sm" />
                </a>
                <Link to="/suporte" className="btn-outline text-base px-8 py-4">
                  <i className="fas fa-headset" />
                  Falar com Suporte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
