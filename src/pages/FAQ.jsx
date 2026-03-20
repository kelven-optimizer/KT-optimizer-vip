import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  {
    question: 'O que é o KT Optimizer?',
    answer: 'O KT Optimizer é uma suíte de ferramentas de otimização para Windows desenvolvida pela nossa equipe. Ele aplica configurações avançadas de performance, ajusta parâmetros do sistema operacional e remove bloatware para garantir que seu computador opere com o máximo de eficiência — seja para jogos, trabalho ou uso geral.',
    icon: 'fa-circle-question',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    tag: 'Geral',
  },
  {
    question: 'Qual é a diferença entre a versão gratuita e a VIP?',
    answer: 'A versão gratuita já oferece um conjunto robusto de otimizações para Windows. A VIP, em desenvolvimento, trará recursos exclusivos, painel reescrito em C# com mais performance, opções avançadas de personalização, suporte prioritário e uma Suíte de Otimização Integrada muito mais poderosa.',
    icon: 'fa-crown',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    tag: 'VIP',
  },
  {
    question: 'A migração do painel para C# é segura?',
    answer: 'Sim. A migração de Electron para C# é uma decisão técnica focada em segurança e performance. O C# permite código nativo mais eficiente, menor consumo de memória e maior controle sobre as operações do sistema. O responsável pela segurança (pegaso) acompanha todo o processo para garantir a integridade do projeto.',
    icon: 'fa-shield-halved',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    tag: 'Segurança',
  },
  {
    question: 'Como posso contribuir com o projeto?',
    answer: 'Você pode contribuir reportando bugs, sugerindo melhorias, divulgando para amigos, ou entrando em contato via GitHub ou Discord. Siga os perfis dos desenvolvedores — kelvenapk, thurdev155 e pegaso0x1337 — para acompanhar as novidades e abrir issues.',
    icon: 'fa-hands-helping',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    tag: 'Comunidade',
  },
  {
    question: 'Os projetos do KT Optimizer são open-source?',
    answer: 'Partes dos projetos são públicas nos perfis do GitHub da equipe. Recomendamos verificar diretamente nos repositórios de kelvenapk, thurdev155 e pegaso0x1337 para informações atualizadas sobre licenciamento e acesso ao código-fonte.',
    icon: 'fa-code-branch',
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-400/10',
    tag: 'Geral',
  },
  {
    question: 'O KT Optimizer funciona em todas as versões do Windows?',
    answer: 'O KT Optimizer é otimizado principalmente para Windows 10 e Windows 11. Para garantir a melhor experiência, recomendamos manter seu sistema atualizado. A equipe trabalha continuamente para garantir compatibilidade com as versões mais recentes do Windows.',
    icon: 'fa-windows',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    tag: 'Compatibilidade',
  },
  {
    question: 'Quando o KT Optimizer VIP será lançado?',
    answer: 'O VIP está em desenvolvimento ativo. A reescrita de Electron para C# leva tempo quando feita da forma correta e segura. Não temos uma data exata, mas a espera valerá a pena! Acompanhe nosso Discord e os perfis do GitHub para ficar por dentro das novidades.',
    icon: 'fa-clock',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    tag: 'VIP',
  },
  {
    question: 'O otimizador pode danificar meu sistema?',
    answer: 'Não. Todas as otimizações são reversíveis e testadas pela equipe antes de qualquer release. Recomendamos criar um ponto de restauração do Windows antes de aplicar qualquer tweak, como boa prática geral. A segurança do seu sistema é nossa prioridade.',
    icon: 'fa-triangle-exclamation',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    tag: 'Segurança',
  },
]

const tags = ['Todos', 'Geral', 'VIP', 'Segurança', 'Comunidade', 'Compatibilidade']

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-purple-400/25 bg-[#0a0d1e]' : 'border-white/6 bg-[#090c1a]/60 hover:border-white/12'
      }`}
      style={isOpen ? { boxShadow: '0 0 25px rgba(0,212,255,0.07)' } : {}}
    >
      <button onClick={onToggle} aria-expanded={isOpen} className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? `${item.bg} ${item.color}` : 'bg-white/5 text-slate-500'}`}>
          <i className={`fas ${item.icon} text-sm`} />
        </div>
        <span className={`flex-1 font-semibold text-sm sm:text-base transition-colors duration-200 ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
          {item.question}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-purple-400/15' : 'bg-white/5'}`}>
          <i className="fas fa-chevron-down text-slate-400 text-xs" />
        </div>
      </button>
      <div className={`accordion-body${isOpen ? ' open' : ''}`}>
        <div className="px-5 sm:px-6 pb-6">
          <div className="ml-14 border-l-2 border-purple-400/20 pl-5">
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('Todos')
  useReveal()

  const filtered = useMemo(() => {
    return faqs.filter(f => {
      const matchTag = activeTag === 'Todos' || f.tag === activeTag
      const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
      return matchTag && matchSearch
    })
  }, [search, activeTag])

  return (
    <div className="grid-bg min-h-screen pt-24 pb-16">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Perguntas Frequentes
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Tire suas <span className="text-gradient">Dúvidas</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Respostas para as perguntas mais comuns sobre o KT Optimizer.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5 reveal">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
          <input
            type="text"
            placeholder="Pesquisar perguntas..."
            value={search}
            onChange={e => { setSearch(e.target.value); setOpenIndex(null) }}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0c101e] border border-white/8 text-white placeholder-slate-600 text-sm outline-none focus:border-purple-400/40 focus:shadow-[0_0_20px_rgba(0,212,255,0.08)] transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
              <i className="fas fa-times text-sm" />
            </button>
          )}
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-8 reveal">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setOpenIndex(null) }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-purple-400/20 border border-purple-400/40 text-purple-300'
                  : 'bg-white/4 border border-white/8 text-slate-400 hover:text-white hover:border-white/15'
              }`}
            >
              {tag}
              {tag !== 'Todos' && (
                <span className="ml-1.5 opacity-50">{faqs.filter(f => f.tag === tag).length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-2.5 mb-14 reveal">
          {filtered.length > 0 ? filtered.map((item, i) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          )) : (
            <div className="text-center py-16 text-slate-500">
              <i className="fas fa-search text-3xl mb-3 block opacity-30" />
              <p>Nenhuma pergunta encontrada para "<span className="text-slate-400">{search}</span>"</p>
            </div>
          )}
        </div>

        {/* Still have questions */}
        <div className="card-bg rounded-2xl border border-white/6 p-8 text-center reveal">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400/15 to-purple-600/15 border border-purple-400/20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-headset text-2xl text-purple-400" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Ainda tem dúvidas?</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Nossa equipe e comunidade estão prontos para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/suporte" className="btn-primary ripple-btn px-6 py-2.5 text-sm">
              <i className="fas fa-envelope" />
              Entrar em Contato
            </Link>
            <a
              href="https://discord.gg/ZmayZzzswC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-[#a5b0ff] border border-[#5865F2]/30 hover:bg-[#5865F2]/10 transition-all duration-200"
            >
              <i className="fab fa-discord text-[#7289da]" />
              Perguntar no Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
