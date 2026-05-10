'use client'

import { useState, useEffect } from 'react'
import {
  Flame,
  Ambulance,
  Users,
  ClipboardList,
  ChevronRight,
  Menu,
  X,
  BadgeCheck,
  BookOpen,
  Building2,
  Crown,
  FileText,
  Shirt,
  Truck,
  Camera,
  AlertTriangle,
  Radio,
  Activity,
  ShieldCheck,
  Send,
  Siren,
  Loader2,
} from 'lucide-react'

type PageId =
  | 'home'
  | 'about'
  | 'operations'
  | 'ranks'
  | 'uniforms'
  | 'sop'
  | 'command'
  | 'department'
  | 'mdt'

type NavItem = {
  id: PageId
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const pages: NavItem[] = [
  { id: 'home', label: 'Home', icon: Flame },
  { id: 'about', label: 'About', icon: Users },
  { id: 'operations', label: 'Operations', icon: Truck },
  { id: 'ranks', label: 'Ranks', icon: BadgeCheck },
  { id: 'uniforms', label: 'Uniforms', icon: Shirt },
  { id: 'sop', label: 'SOP', icon: BookOpen },
  { id: 'command', label: 'Command', icon: Crown },
  { id: 'department', label: 'Department', icon: FileText },
  { id: 'mdt', label: 'MDT', icon: ClipboardList },
]

const operations = [
  {
    title: 'Fire Suppression',
    text: 'Structure fires, vehicle fires, fire alarms, hazard control, rescue incidents, and active suppression response.',
    icon: Flame,
  },
  {
    title: 'Emergency Medical Services',
    text: 'Patient care, medical response, stabilization, treatment documentation, and EMS scene operations.',
    icon: Ambulance,
  },
  {
    title: 'Rescue Operations',
    text: 'Vehicle extrication, technical rescue, scene stabilization, and emergency support during high-risk calls.',
    icon: AlertTriangle,
  },
  {
    title: 'Training & Readiness',
    text: 'Probationary development, continuing education, evaluations, skill refreshers, and operational readiness.',
    icon: BookOpen,
  },
]

const standards = [
  'Maintain professionalism while on duty and on scene.',
  'Use clear radio traffic during responses and active calls.',
  'Follow command direction during fire, EMS, and rescue incidents.',
  'Operate apparatus safely and responsibly.',
  'Wear approved uniforms, EMS gear, or turnout gear when required.',
  'Complete reports and call documentation when assigned.',
]

const rankGroups = [
  {
    title: 'Fire / EMS Ranks & Payments',
    ranks: [
      'Prob. Firefighter — $100',
      'Prob. EMT — $100',
      'Firefighter I — $600',
      'Firefighter II — $650',
      'Senior Firefighter — $700',
      'EMT — $200',
      'Paramedic I — $600',
      'Paramedic II — $650',
      'Senior Paramedic — $700',
      'Field Supervisor — $750',
      'Clinical Advisor — $800',
      'Lieutenant — $1,000',
      'Captain — $1,500',
      'Battalion Chief — $2,500',
      'Deputy Chief — $3,000',
      'Assistant Chief — $4,600',
      'Fire Chief — $6,500',
    ],
  },
]

const commandStaff = [
  { role: 'Fire Chief', name: '01 | Quin' },
  { role: 'Assistant Chief', name: 'To Be Assigned' },
  { role: 'Deputy Chief', name: 'To Be Assigned' },
  { role: 'Battalion Chief', name: 'To Be Assigned' },
  { role: 'Captain', name: 'To Be Assigned' },
  { role: 'Lieutenant', name: 'To Be Assigned' },
]

function TopNavButton({
  item,
  active,
  onClick,
}: {
  item: NavItem
  active: boolean
  onClick: () => void
}) {
  const Icon = item.icon

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
        active
          ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
          : 'text-zinc-300 hover:bg-white/7 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{item.label}</span>
    </button>
  )
}

function SectionHeader({ title, text }: { title: string; text?: string }) {
  return (
    <div className="border-b border-white/10 pb-5">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
        Dallas Fire-Rescue
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">{text}</p> : null}
    </div>
  )
}

function InfoPanel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-5 shadow-xl shadow-black/20">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-red-400">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-7 text-zinc-300">{children}</div>
    </div>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111318] p-4">
      <div className="text-xl font-black text-white">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </div>
    </div>
  )
}

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const [mdtForm, setMdtForm] = useState({
    reportType: 'EMS Report',
    unitCallsign: '',
    submittedBy: '',
    incidentLocation: '',
    patientName: '',
    patientCondition: '',
    treatmentGiven: '',
    transportDecision: 'No Transport',
    hospitalDestination: '',
    narrative: '',
  })

  const [mdtStatus, setMdtStatus] = useState('')
  const [mdtSubmitting, setMdtSubmitting] = useState(false)
  const [mdtStatusOk, setMdtStatusOk] = useState<boolean | null>(null)

  useEffect(() => {
    if (mdtStatusOk === true) {
      const t = setTimeout(() => {
        setMdtStatus('')
        setMdtStatusOk(null)
      }, 4000)
      return () => clearTimeout(t)
    }
  }, [mdtStatusOk])

  const goTo = (pageId: PageId) => {
    setActivePage(pageId)
    setMobileOpen(false)

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const updateMdtField = (field: string, value: string) => {
    setMdtForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const submitMdtReport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMdtSubmitting(true)
    setMdtStatus('Submitting report...')
    setMdtStatusOk(null)

    try {
      const response = await fetch('/api/mdt-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mdtForm),
      })

      const data = await response.json()

      if (!response.ok) {
        setMdtStatus(data.error || 'Report failed to submit.')
        setMdtStatusOk(false)
        return
      }

      setMdtStatus('Report submitted to Discord successfully.')
      setMdtStatusOk(true)

      setMdtForm({
        reportType: 'EMS Report',
        unitCallsign: '',
        submittedBy: '',
        incidentLocation: '',
        patientName: '',
        patientCondition: '',
        treatmentGiven: '',
        transportDecision: 'No Transport',
        hospitalDestination: '',
        narrative: '',
      })
    } catch {
      setMdtStatus('Report failed to submit.')
      setMdtStatusOk(false)
    } finally {
      setMdtSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#07080b] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-red-900/25 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-orange-700/10 blur-[120px]" />
        <div className="absolute bottom-[-25%] left-[35%] h-[500px] w-[500px] rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080b]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <button onClick={() => goTo('home')} className="text-left">
            <div className="text-[11px] font-black uppercase tracking-[0.32em] text-red-400">
              Dallas Fire-Rescue
            </div>
            <div className="mt-1 flex items-center gap-2 text-xl font-black text-white">
              <Siren className="h-5 w-5 text-red-500" />
              Fire & EMS Portal
            </div>
          </button>

          <nav className="hidden items-center gap-1 xl:flex">
            {pages.map((item) => (
              <TopNavButton
                key={item.id}
                item={item}
                active={activePage === item.id}
                onClick={() => goTo(item.id)}
              />
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex rounded-lg border border-white/10 bg-white/5 p-2 xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[#0b0d11] px-4 py-4 xl:hidden">
            <div className="grid gap-2">
              {pages.map((item) => (
                <TopNavButton
                  key={item.id}
                  item={item}
                  active={activePage === item.id}
                  onClick={() => goTo(item.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div key={activePage} className="page-enter">
        {activePage === 'home' && (
          <section className="space-y-6">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0f14]/90 shadow-2xl shadow-black/40">
              <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-300">
                    <Activity className="h-4 w-4" />
                    Internal Fire & EMS Operations
                  </div>

                  <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
                    Dallas Fire-Rescue Command Portal
                  </h1>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                    Centralized internal system for Fire and EMS personnel. Access operational
                    standards, SOP guidelines, command structure, uniforms, department
                    information, and MDT reporting from one secure-style portal.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      onClick={() => goTo('mdt')}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500"
                    >
                      <Send className="h-4 w-4" />
                      Open MDT
                    </button>
                    <button
                      onClick={() => goTo('operations')}
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                    >
                      View Operations
                    </button>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <StatBox label="Focus" value="Fire / EMS" />
                    <StatBox label="Portal" value="Internal" />
                    <StatBox label="MDT" value="Online" />
                    <StatBox label="Status" value="Active" />
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">
                          Live Portal Overview
                        </p>
                        <h2 className="mt-1 text-2xl font-black">Operations Board</h2>
                      </div>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                        System Active
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4">
                      <InfoPanel title="Mission">
                        Maintain readiness, professionalism, safe response standards, and
                        accountability across fire and emergency medical operations.
                      </InfoPanel>

                      <InfoPanel title="MDT Reporting">
                        Submit Fire, EMS, rescue, training, and department reports directly
                        into the configured Discord channel.
                      </InfoPanel>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-red-500/15 bg-red-500/10 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-300">
                            Fire Ops
                          </p>
                          <p className="mt-2 text-sm text-zinc-300">
                            Suppression, rescue, apparatus, command.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-blue-400/15 bg-blue-400/10 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-300">
                            EMS Ops
                          </p>
                          <p className="mt-2 text-sm text-zinc-300">
                            Patient care, treatment, transport, reports.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'about' && (
          <section className="space-y-6">
            <SectionHeader
              title="About Dallas Fire-Rescue"
              text="Department purpose, standards, and internal expectations for Fire and EMS personnel."
            />

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6">
                <h3 className="text-xl font-black text-white">Department Mission</h3>
                <p className="mt-4 text-sm leading-8 text-zinc-300">
                  Dallas Fire-Rescue exists to provide organized, professional, and reliable
                  emergency response. Members are expected to operate with discipline,
                  respect, and accountability during all fire, EMS, rescue, and station
                  operations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6">
                <h3 className="text-xl font-black text-white">Core Values</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    'Readiness',
                    'Professionalism',
                    'Accountability',
                    'Teamwork',
                    'Scene Safety',
                    'Public Service',
                  ].map((value) => (
                    <div
                      key={value}
                      className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-zinc-200"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'operations' && (
          <section className="space-y-6">
            <SectionHeader
              title="Fire & EMS Operations"
              text="Operational areas for Dallas Fire-Rescue personnel."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {operations.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-[#0d0f14] p-5"
                  >
                    <div className="mb-4 inline-flex rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

       {activePage === 'ranks' && (
  <section className="space-y-6">
    <SectionHeader
      title="Ranks & Pay Scale"
      text="Dallas Fire-Rescue rank structure and payment chart for Fire and EMS personnel."
    />

    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-red-400">
          Department Pay Scale
        </p>
        <h3 className="mt-3 text-2xl font-black text-white">
          Fire / EMS Rank Progression
        </h3>
        <p className="mt-4 text-sm leading-7 text-zinc-400">
          This chart lists each active rank and its assigned payment. Promotions should
          follow department activity, performance, professionalism, and command approval.
        </p>

        <div className="mt-6 grid gap-3">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              Starting Pay
            </p>
            <p className="mt-1 text-2xl font-black text-white">$100</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              Highest Pay
            </p>
            <p className="mt-1 text-2xl font-black text-red-400">$6,500</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              Total Ranks
            </p>
            <p className="mt-1 text-2xl font-black text-white">17</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f14]">
        <div className="grid grid-cols-[70px_1fr_120px] border-b border-white/10 bg-black/30 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
          <div>Grade</div>
          <div>Rank</div>
          <div className="text-right">Payment</div>
        </div>

        <div className="divide-y divide-white/10">
          {[
            ['0', 'Prob. Firefighter', '$100'],
            ['1', 'Prob. EMT', '$100'],
            ['2', 'Firefighter I', '$600'],
            ['3', 'Firefighter II', '$650'],
            ['4', 'Senior Firefighter', '$700'],
            ['5', 'EMT', '$200'],
            ['6', 'Paramedic I', '$600'],
            ['7', 'Paramedic II', '$650'],
            ['8', 'Senior Paramedic', '$700'],
            ['9', 'Field Supervisor', '$750'],
            ['10', 'Clinical Advisor', '$800'],
            ['11', 'Lieutenant', '$1,000'],
            ['12', 'Captain', '$1,500'],
            ['13', 'Battalion Chief', '$2,500'],
            ['14', 'Deputy Chief', '$3,000'],
            ['15', 'Assistant Chief', '$4,600'],
            ['16', 'Fire Chief', '$6,500'],
          ].map(([grade, rank, pay]) => (
            <div
              key={grade}
              className="grid grid-cols-[70px_1fr_120px] items-center px-4 py-4 transition hover:bg-white/5"
            >
              <div>
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 px-2 text-sm font-black text-red-300">
                  {grade}
                </span>
              </div>

              <div className="text-sm font-semibold text-zinc-100">
                {rank}
              </div>

              <div className="text-right text-sm font-black text-white">
                {pay}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)}
        {activePage === 'uniforms' && (
          <section className="space-y-6">
            <SectionHeader
              title="Uniforms & Equipment"
              text="Uniform and equipment standards for Fire and EMS personnel."
            />

            <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 md:p-8">
                <div className="space-y-8 text-sm leading-8 text-zinc-300">
                  <section>
                    <h3 className="text-xl font-black text-white">
                      Uniform & Equipment Policy
                    </h3>
                    <p className="mt-3">
                      All personnel shall maintain a clean, professional appearance while on
                      duty. Uniform and gear requirements may vary based on assignment,
                      station duty, fire response, EMS response, or command function.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-white">Station Uniform</h4>
                    <p className="mt-3">
                      Standard station uniform should be worn during normal duty hours unless
                      turnout gear, EMS gear, or command attire is required.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-white">Turnout Gear</h4>
                    <p className="mt-3">
                      Turnout gear is required for fire suppression, rescue incidents, hazard
                      scenes, and any call where protective equipment is necessary.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-white">EMS Equipment</h4>
                    <p className="mt-3">
                      EMS personnel shall carry and use appropriate medical equipment during
                      patient contact, treatment, and transport-related operations.
                    </p>
                  </section>
                </div>
              </div>

              <div className="grid gap-4">
                <InfoPanel title="Station Uniform">
                  Used for regular station duty, general operations, and non-fire response
                  activity.
                </InfoPanel>

                <InfoPanel title="Turnout Gear">
                  Required for fire suppression, rescue, hazard scenes, and protective
                  response assignments.
                </InfoPanel>

                <InfoPanel title="EMS Gear">
                  Used for medical response, patient care, and EMS field operations.
                </InfoPanel>
              </div>
            </div>
          </section>
        )}

        {activePage === 'sop' && (
          <section className="space-y-6">
            <SectionHeader
              title="Standard Operating Procedure"
              text="Internal Dallas Fire-Rescue Fire and EMS policy reference."
            />

            <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 md:p-8">
              <div className="space-y-10 text-sm leading-8 text-zinc-300">
                <section>
                  <h3 className="text-xl font-black text-white">I. Introduction</h3>
                  <p className="mt-3">
                    Dallas Fire-Rescue personnel are expected to maintain professionalism,
                    readiness, and safe operational conduct at all times.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black text-white">II. On-Duty Conduct</h3>
                  <p className="mt-3">
                    Members shall remain respectful, alert, and professional while on duty.
                    Personnel are expected to follow command direction and represent the
                    department properly during station activity, emergency response, and
                    public interaction.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black text-white">III. Response Expectations</h3>
                  <ul className="mt-3 list-disc space-y-1 pl-6">
                    <li>Respond safely and appropriately to dispatched calls.</li>
                    <li>Use lights and sirens responsibly.</li>
                    <li>Stage apparatus safely on scene.</li>
                    <li>Follow incident command instructions.</li>
                    <li>Maintain scene awareness and avoid unnecessary risk.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-black text-white">IV. Radio Communications</h3>
                  <p className="mt-3">
                    Radio traffic should remain clear, brief, and professional. Units should
                    identify themselves, report status changes, and communicate important
                    scene information to command or dispatch.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black text-white">V. EMS Operations</h3>
                  <p className="mt-3">
                    EMS personnel shall provide appropriate care, communicate patient status
                    clearly, and maintain professionalism during all medical calls.
                  </p>
                </section>
              </div>
            </div>
          </section>
        )}

        {activePage === 'command' && (
          <section className="space-y-6">
            <SectionHeader
              title="Command Staff"
              text="Replace the placeholder names below with your actual Dallas Fire-Rescue leadership."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {commandStaff.map((person) => (
                <div
                  key={`${person.role}-${person.name}`}
                  className="rounded-2xl border border-white/10 bg-[#0d0f14] p-5"
                >
                  <div className="mb-3 inline-flex rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-red-400">
                    {person.role}
                  </div>
                  <div className="mt-2 text-lg font-black text-white">{person.name}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Dallas Fire-Rescue Department
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'department' && (
          <section className="space-y-6">
            <SectionHeader
              title="Department Information"
              text="Internal references for Fire and EMS unit identifiers, apparatus, station assignments, and department notes."
            />

            <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6">
                <h3 className="text-xl font-black text-white">Internal Reference</h3>
                <p className="mt-4 text-sm leading-8 text-zinc-300">
                  Use this section for station assignments, apparatus access, unit numbers,
                  EMS assignments, briefing schedules, and department reference material.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ['Unit Guide', 'Fire, EMS, and apparatus identifiers'],
                    ['Station Notes', 'Station expectations and reminders'],
                    ['Apparatus Assignments', 'Authorized apparatus by role'],
                    ['Operations Notes', 'Internal notices and expectations'],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-xl border border-white/10 bg-black/25 p-4"
                    >
                      <div className="text-sm font-bold text-white">{title}</div>
                      <div className="mt-1 text-sm leading-7 text-zinc-400">{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  'Built for internal Fire and EMS department use only',
                  'Clean place for unit numbers and apparatus references',
                  'Readable on desktop and mobile',
                  'Ready for your real department details',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[#0d0f14] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-red-400" />
                      <p className="text-sm leading-7 text-zinc-200">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activePage === 'mdt' && (
          <section className="space-y-6">
            <SectionHeader
              title="MDT Report Center"
              text="Submit Fire and EMS reports directly to the department Discord channel."
            />

            <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
              <form
                onSubmit={submitMdtReport}
                className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 md:p-8"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Report Type <span className="text-red-400">*</span></span>
                    <select
                      value={mdtForm.reportType}
                      onChange={(event) => updateMdtField('reportType', event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none focus:border-red-500"
                    >
                      <option>EMS Report</option>
                      <option>Fire Incident Report</option>
                      <option>Rescue Report</option>
                      <option>Training Report</option>
                      <option>General Department Report</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Unit / Callsign <span className="text-red-400">*</span></span>
                    <input
                      value={mdtForm.unitCallsign}
                      onChange={(event) => updateMdtField('unitCallsign', event.target.value)}
                      placeholder="Example: Medic 1, Engine 2, D-01"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Submitted By <span className="text-red-400">*</span></span>
                    <input
                      value={mdtForm.submittedBy}
                      onChange={(event) => updateMdtField('submittedBy', event.target.value)}
                      placeholder="Your name / rank"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Incident Location <span className="text-red-400">*</span></span>
                    <input
                      value={mdtForm.incidentLocation}
                      onChange={(event) => updateMdtField('incidentLocation', event.target.value)}
                      placeholder="Street, postal, or scene location"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Patient Name</span>
                    <input
                      value={mdtForm.patientName}
                      onChange={(event) => updateMdtField('patientName', event.target.value)}
                      placeholder="Optional"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Patient Condition</span>
                    <input
                      value={mdtForm.patientCondition}
                      onChange={(event) => updateMdtField('patientCondition', event.target.value)}
                      placeholder="Stable, critical, unconscious, etc."
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-zinc-300">Treatment Given</span>
                    <textarea
                      value={mdtForm.treatmentGiven}
                      onChange={(event) => updateMdtField('treatmentGiven', event.target.value)}
                      placeholder="CPR, oxygen, bandaging, medication, vitals, etc."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Transport Decision</span>
                    <select
                      value={mdtForm.transportDecision}
                      onChange={(event) => updateMdtField('transportDecision', event.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none focus:border-red-500"
                    >
                      <option>No Transport</option>
                      <option>Transported</option>
                      <option>Refused Treatment</option>
                      <option>Transferred Care</option>
                      <option>DOA</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-300">Hospital Destination</span>
                    <input
                      value={mdtForm.hospitalDestination}
                      onChange={(event) => updateMdtField('hospitalDestination', event.target.value)}
                      placeholder="Optional"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-zinc-300">Narrative <span className="text-red-400">*</span></span>
                    <textarea
                      value={mdtForm.narrative}
                      onChange={(event) => updateMdtField('narrative', event.target.value)}
                      placeholder="Explain what happened, what units responded, actions taken, and final outcome."
                      rows={6}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-red-500"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={mdtSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {mdtSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {mdtSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>

                  {mdtStatus ? (
                    <p className={`text-sm font-semibold ${
                      mdtStatusOk === true
                        ? 'text-emerald-400'
                        : mdtStatusOk === false
                        ? 'text-red-400'
                        : 'text-zinc-400'
                    }`}>
                      {mdtStatus}
                    </p>
                  ) : null}
                </div>
              </form>

              <div className="space-y-4">
                <InfoPanel title="Discord Delivery">
                  Submitted reports post into the configured Fire / EMS Discord channel
                  using your private webhook.
                </InfoPanel>

                <InfoPanel title="Required Fields">
                  Report Type, Unit / Callsign, Submitted By, Incident Location, and
                  Narrative are required.
                </InfoPanel>

                <InfoPanel title="Security Note">
                  Keep your Discord webhook inside your environment file. Never paste the
                  webhook URL directly into public code.
                </InfoPanel>
              </div>
            </div>
          </section>
        )}
        </div>
      </main>

      <footer className="relative border-t border-white/10 bg-[#0b0d11]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 Dallas Fire-Rescue</p>
          <p>Internal Fire & EMS Department Portal</p>
        </div>
      </footer>
    </div>
  )
}