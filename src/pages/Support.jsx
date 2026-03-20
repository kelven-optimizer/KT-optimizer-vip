import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const teamContacts = [
  {
    username: 'kelvenapk',
    displayName: 'kelvenapk',
    role: 'Programador Principal',
    github: 'https://github.com/kelvenapk',
    avatar: 'https://avatars.githubusercontent.com/kelvenapk',
    icon: 'fa-code',
    gradient: 'from-purple-500 to-fuchsia-600',
    description: 'Para questões técnicas sobre código e funcionalidades.',
    accent: '#a855f7',
  },
  {
    username: 'thurdev155',
    displayName: 'thurr',
    role: 'Divulgação',
    github: 'https://github.com/thurdev155',
    avatar: 'https://avatars.githubusercontent.com/thurdev155',
    icon: 'fa-bullhorn',
    gradient: 'from-purple-500 to-violet-600',
    description: 'Para parcerias, divulgação e questões gerais.',
    accent: '#7c3aed',
  },
  {
    username: 'pegaso0x1337',
    displayName: 'pegaso',
    role: 'Segurança',
    github: 'https://github.com/pegaso0x1337',
    avatar: 'https://avatars.githubusercontent.com/pegaso0x1337',
    icon: 'fa-shield-halved',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Para reportar vulnerabilidades e questões de segurança.',
    accent: '#10b981',
  },
]

function Avatar({ src, username, size = 'w-11 h-11' }) {
  const [err, setErr] = useState(false)
  return err ? (
    <div className={`${size} rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0`}>
      <span className="text-white font-bold text-base">{username[0].toUpperCase()}</span>
    </div>
  ) : (
    <img
      src={src}
      alt={username}
      onError={() => setErr(true)}
      className={`${size} rounded-full object-cover flex-shrink-0`}
    />
  )
}

export default function Support() {
  const [form, setForm] = useState({ name: '', email: '', message: '', subject: 'Dúvida geral' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  useReveal()

  const subjects = ['Dúvida geral', 'Reportar bug', 'Sugestão', 'Parceria', 'Segurança']

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div className="grid-bg min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-500/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Suporte & Contato
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Como podemos <span className="text-gradient">Ajudar?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Nossa equipe e comunidade estão disponíveis para ajudar com dúvidas, problemas ou sugestões sobre o KT Optimizer.
          </p>
        </div>

        {/* Discord CTA — top */}
        <div className="mb-10 rounded-2xl bg-[#5865F2]/8 border border-[#5865F2]/20 p-5 flex flex-col sm:flex-row items-center gap-4 hover:border-[#5865F2]/35 transition-all duration-300"
          style={{ boxShadow: '0 0 30px rgba(88,101,242,0.07)' }}>
          <div className="flex items-center gap-3">
            <i className="fab fa-discord text-3xl text-[#7289da]" />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-glow" />
              <span className="text-emerald-400 text-xs font-medium">Online</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-semibold">Precisa de suporte rápido?</p>
            <p className="text-slate-500 text-sm">Junte-se ao nosso servidor do Discord e receba ajuda da comunidade em minutos.</p>
          </div>
          <a
            href="https://discord.gg/ZmayZzzswC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-105 ripple-btn"
            style={{ background: 'linear-gradient(135deg,#5865F2,#7289da)', boxShadow: '0 0 20px rgba(88,101,242,0.3)' }}
          >
            <i className="fab fa-discord" />
            Entrar no Discord
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 reveal">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <div className="card-bg rounded-2xl border border-white/6 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-400/10 border border-purple-400/15 flex items-center justify-center">
                  <i className="fas fa-envelope text-purple-400 text-xs" />
                </div>
                Formulário de Contato
              </h2>
              <p className="text-slate-500 text-sm mb-6">Descreva sua situação e entraremos em contato.</p>

              {submitted ? (
                <div className="text-center py-12 animate-slide-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center mx-auto mb-4"
                    style={{ boxShadow: '0 0 25px rgba(16,185,129,0.2)' }}>
                    <i className="fas fa-check text-2xl text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Mensagem Enviada!</h3>
                  <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                    Obrigado pelo contato. Nossa equipe responderá o mais breve possível.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '', subject: 'Dúvida geral' }) }}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Subject pills */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Assunto</label>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, subject: s })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            form.subject === s
                              ? 'bg-purple-400/20 border border-purple-400/40 text-purple-300'
                              : 'bg-white/4 border border-white/8 text-slate-400 hover:text-white hover:border-white/15'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Nome', placeholder: 'Seu nome', type: 'text' },
                      { name: 'email', label: 'E-mail', placeholder: 'seu@email.com', type: 'email' },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                          {field.label} <span className="text-red-400">*</span>
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 rounded-xl bg-[#0c101e] text-white placeholder-slate-600 text-sm outline-none transition-all duration-200 ${
                            focused === field.name
                              ? 'border border-purple-400/40 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
                              : 'border border-white/6 hover:border-white/12'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Mensagem <span className="text-red-400">*</span>
                      </label>
                      <span className={`text-xs tabular-nums transition-colors duration-200 ${
                        form.message.length > 450 ? 'text-red-400' : 'text-slate-600'
                      }`}>
                        {form.message.length}/500
                      </span>
                    </div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required
                      rows={5}
                      maxLength={500}
                      placeholder="Descreva sua dúvida, sugestão ou problema..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#0c101e] text-white placeholder-slate-600 text-sm outline-none transition-all duration-200 resize-none ${
                        focused === 'message'
                          ? 'border border-purple-400/40 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
                          : 'border border-white/6 hover:border-white/12'
                      }`}
                    />
                  </div>

                  <button type="submit" className="btn-primary ripple-btn w-full justify-center py-3 text-base">
                    <i className="fas fa-paper-plane" />
                    Enviar Mensagem
                  </button>
                  <p className="text-slate-700 text-xs text-center">Interface demonstrativa · Envio real em breve</p>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            {/* Team */}
            <div className="card-bg rounded-2xl border border-white/6 p-5">
              <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <i className="fas fa-users text-purple-400 text-sm" />
                Contato com a Equipe
              </h3>
              <div className="space-y-3">
                {teamContacts.map(m => (
                  <a
                    key={m.username}
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/12 hover:bg-white/3 transition-all duration-200"
                  >
                    <Avatar src={m.avatar} username={m.displayName} />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm">{m.displayName}</div>
                      <div className="text-slate-500 text-xs">{m.description}</div>
                    </div>
                    <i className="fab fa-github text-slate-600 group-hover:text-slate-300 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Discord */}
            <div className="rounded-2xl border border-[#5865F2]/25 bg-[#5865F2]/6 p-5">
              <h3 className="text-white font-bold text-base mb-1 flex items-center gap-2">
                <i className="fab fa-discord text-[#7289da]" />
                Comunidade no Discord
              </h3>
              <p className="text-slate-400 text-xs mb-4">
                Servidor oficial do KT Optimizer. Suporte, novidades e comunidade.
              </p>
              <a
                href="https://discord.gg/ZmayZzzswC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105 ripple-btn"
                style={{ background: 'linear-gradient(135deg,#5865F2,#7289da)', boxShadow: '0 0 20px rgba(88,101,242,0.25)' }}
              >
                <i className="fab fa-discord" />
                discord.gg/ZmayZzzswC
              </a>
            </div>

            {/* Quick links */}
            <div className="card-bg rounded-2xl border border-white/6 p-5">
              <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <i className="fas fa-link text-purple-400 text-sm" />
                Links Rápidos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'FAQ', to: '/faq', icon: 'fa-circle-question', color: 'text-purple-400' },
                  { label: 'AME Wizard', href: 'https://github.com/Ameliorated-LLC/trusted-uninstaller-cli', icon: 'fa-wand-magic-sparkles', color: 'text-emerald-400' },
                  { label: 'GitHub', href: 'https://github.com/kelvenapk', icon: 'fab fa-github', color: 'text-slate-400' },
                  { label: 'Discord', href: 'https://discord.gg/ZmayZzzswC', icon: 'fab fa-discord', color: 'text-[#7289da]' },
                ].map(link => link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/12 text-slate-400 hover:text-white text-xs font-medium transition-all duration-200"
                  >
                    <i className={`fas ${link.icon} ${link.color} text-xs`} />
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/3 border border-white/6 hover:bg-white/6 hover:border-white/12 text-slate-400 hover:text-white text-xs font-medium transition-all duration-200"
                  >
                    <i className={`fas ${link.icon} ${link.color} text-xs`} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
