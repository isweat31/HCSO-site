'use client'

import { useState } from 'react'
import {
  Shield,
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
  CarFront,
} from 'lucide-react'

type PageId =
  | 'home'
  | 'about'
  | 'divisions'
  | 'ranks'
  | 'standards'
  | 'uniforms'
  | 'sop'
  | 'command'
  | 'department'

type NavItem = {
  id: PageId
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const pages: NavItem[] = [
  { id: 'home', label: 'Home', icon: Shield },
  { id: 'about', label: 'About', icon: Users },
  { id: 'divisions', label: 'Divisions', icon: Building2 },
  { id: 'ranks', label: 'Ranks', icon: BadgeCheck },
  { id: 'standards', label: 'Standards', icon: ClipboardList },
  { id: 'uniforms', label: 'Uniforms', icon: Shirt },
  { id: 'sop', label: 'SOP', icon: BookOpen },
  { id: 'command', label: 'Command', icon: Crown },
  { id: 'department', label: 'Department', icon: FileText },
]

const divisionStatus = [
  {
    title: 'Specialized Units',
    text: 'HCSO specialized divisions are not active at this time. As the department grows, new units will be established based on activity, staffing, and operational need.',
    icon: Building2,
  },
  {
    title: 'Future Development',
    text: 'Additional divisions will be introduced when the department has the structure, supervision, and consistent personnel needed to support them professionally.',
    icon: Shield,
  },
  {
    title: 'Current Focus',
    text: 'The current focus is building a strong patrol foundation, maintaining standards, and developing the department before expanding into specialized assignments.',
    icon: CarFront,
  },
]

const standards = [
  'Maintain professionalism in all scenes and interactions.',
  'Use proper radio traffic and communicate clearly.',
  'Follow the chain of command at all times.',
  'Handle scenes, stops, and transport responsibly.',
  'Remain active, dependable, and respectful.',
  'Submit complete and accurate reports when required.',
]

const rankGroups = [
  {
    title: 'Command Staff',
    ranks: ['Sheriff', 'Undersheriff', 'Captain', 'Major'],
  },
  {
    title: 'Supervisors',
    ranks: ['Lieutenant', 'Sergeant', 'Corporal'],
  },
  {
    title: 'Deputies',
    ranks: ['Deputy 2', 'Deputy 1', 'Probationary Deputy'],
  },
]

const commandStaff = [
  { role: 'Sheriff', name: 'D-01 | Quin' },
  { role: 'Undersheriff', name: 'To Be Assigned' },
  { role: 'Captain', name: 'To Be Assigned' },
  { role: 'Major', name: 'To Be Assigned' },
  { role: 'Lieutenant', name: 'To Be Assigned' },
  { role: 'Sergeant', name: 'To Be Assigned' },
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
      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
        active
          ? 'bg-[#c69214] text-black'
          : 'text-zinc-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{item.label}</span>
    </button>
  )
}

function SectionHeader({
  title,
  text,
}: {
  title: string
  text?: string
}) {
  return (
    <div className="border-b border-white/10 pb-4">
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {text ? <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-400">{text}</p> : null}
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
    <div className="rounded-lg border border-white/10 bg-[#0d0f12] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#d0a126]">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-7 text-zinc-300">{children}</div>
    </div>
  )
}

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const goTo = (pageId: PageId) => {
    setActivePage(pageId)
    setMobileOpen(false)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0c0e]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <button onClick={() => goTo('home')} className="text-left">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d0a126]">
              Harris County Sheriff&apos;s Office
            </div>
            <div className="mt-1 text-xl font-semibold text-white">Department Portal</div>
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
            className="inline-flex rounded-md border border-white/10 bg-[#141519] p-2 xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[#0f1013] px-4 py-4 xl:hidden">
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

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        {activePage === 'home' && (
          <section className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#111214]">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
                  <div className="inline-flex rounded-md border border-[#d0a126]/30 bg-[#d0a126]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#d0a126]">
                    Internal Use Only
                  </div>

                  <h1 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                    Harris County Sheriff&apos;s Office Department Portal
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">
                    This portal is for active HCSO members. It provides one place for
                    department structure, SOP reference, command information, uniform policy,
                    and internal standards.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => goTo('sop')}
                      className="rounded-md bg-[#c69214] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d7a826]"
                    >
                      Open SOP
                    </button>
                    <button
                      onClick={() => goTo('uniforms')}
                      className="rounded-md border border-white/10 bg-[#181a1f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d2026]"
                    >
                      View Uniforms
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      ['Coverage', 'County Wide'],
                      ['Divisions', 'Pending'],
                      ['Portal', 'Internal'],
                      ['Status', 'Active'],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-white/10 bg-[#0d0f12] p-4"
                      >
                        <div className="text-lg font-semibold text-white">{value}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.12em] text-zinc-500">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="rounded-lg border border-white/10 bg-[#0d0f12] p-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d0a126]">
                          Overview
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-white">
                          Department Summary
                        </div>
                      </div>
                      <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                        Active
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      <InfoPanel title="Mission">
                        Maintain professionalism, structure, and consistency across all
                        department operations.
                      </InfoPanel>

                      <InfoPanel title="Purpose">
                        Provide deputies with a central reference point for ranks, policy,
                        standards, command, uniforms, and day-to-day department information.
                      </InfoPanel>

                      <InfoPanel title="Current Development">
                        The department is currently focused on building a solid internal
                        structure before expanding into specialized divisions.
                      </InfoPanel>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: 'Internal Focus',
                  text: 'The layout is built like an internal portal instead of a flashy public landing page.',
                  icon: Shield,
                },
                {
                  title: 'Real Structure',
                  text: 'Ranks, standards, SOP, command, and uniforms are separated into straightforward sections.',
                  icon: Users,
                },
                {
                  title: 'Readable Layout',
                  text: 'Text blocks are sized to fit normally without awkward wrapping or oversized hero copy.',
                  icon: ClipboardList,
                },
                {
                  title: 'Ready To Grow',
                  text: 'Callsigns, unit assignments, and divisions can be added later without rebuilding the whole site.',
                  icon: FileText,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/10 bg-[#111214] p-5"
                  >
                    <div className="mb-3 inline-flex rounded-md border border-[#d0a126]/20 bg-[#d0a126]/10 p-2 text-[#d0a126]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {activePage === 'about' && (
          <section className="space-y-6">
            <SectionHeader
              title="About the Department"
              text="This section outlines the department’s purpose and the expectations that shape HCSO operations."
            />

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-lg border border-white/10 bg-[#111214] p-6">
                <h3 className="text-xl font-semibold text-white">Department Mission</h3>
                <p className="mt-4 text-sm leading-8 text-zinc-300">
                  The Harris County Sheriff&apos;s Office exists to maintain disciplined,
                  realistic, and consistent county law enforcement roleplay. Deputies are
                  expected to carry themselves professionally and operate within department
                  policy at all times.
                </p>
                <p className="mt-4 text-sm leading-8 text-zinc-300">
                  From patrol scenes to transport and supervisory functions, the goal is to
                  keep the office organized, dependable, and clearly structured.
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#111214] p-6">
                <h3 className="text-xl font-semibold text-white">Core Values</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    'Integrity',
                    'Professionalism',
                    'Leadership',
                    'Accountability',
                    'Teamwork',
                    'Scene Quality',
                  ].map((value) => (
                    <div
                      key={value}
                      className="rounded-md border border-white/10 bg-[#0d0f12] px-4 py-3 text-sm text-zinc-200"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'divisions' && (
          <section className="space-y-6">
            <SectionHeader
              title="Divisions"
              text="HCSO does not currently operate specialized divisions. This section reflects the department’s current stage of development."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {divisionStatus.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/10 bg-[#111214] p-5"
                  >
                    <div className="mb-3 inline-flex rounded-md border border-[#d0a126]/20 bg-[#d0a126]/10 p-2 text-[#d0a126]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
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
              title="Rank Structure"
              text="This section reflects the current HCSO chain of command."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {rankGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-lg border border-white/10 bg-[#111214] p-6"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#d0a126]">
                    {group.title}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {group.ranks.map((rank) => (
                      <div
                        key={rank}
                        className="rounded-md border border-white/10 bg-[#0d0f12] px-4 py-3 text-sm font-medium text-zinc-200"
                      >
                        {rank}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'standards' && (
          <section className="space-y-6">
            <SectionHeader
              title="Department Standards"
              text="These expectations help maintain consistency throughout the department."
            />

            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-lg border border-white/10 bg-[#111214] p-6">
                <h3 className="text-xl font-semibold text-white">General Expectations</h3>
                <p className="mt-4 text-sm leading-8 text-zinc-300">
                  HCSO members are expected to communicate clearly, follow supervision,
                  maintain professionalism, and operate with sound judgment during every
                  scene.
                </p>
              </div>

              <div className="grid gap-3">
                {standards.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-[#111214] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#d0a126]" />
                      <p className="text-sm leading-7 text-zinc-200">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activePage === 'uniforms' && (
          <section className="space-y-6">
            <SectionHeader
              title="Uniforms & Equipment"
              text="This page contains current HCSO uniform and equipment policy."
            />

            <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-lg border border-white/10 bg-[#111214] p-6 md:p-8">
                <div className="space-y-8 text-sm leading-8 text-zinc-300">
                  <section>
                    <h3 className="text-xl font-semibold text-white">
                      Uniform & Equipment Policy
                    </h3>
                    <p className="mt-3">
                      All personnel shall adhere to the following uniform and equipment
                      standards while on duty.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-white">Vest Authorization</h4>
                    <ul className="mt-3 list-disc space-y-1 pl-6">
                      <li>
                        Lieutenant – Sheriff: Authorized to wear a vest labeled
                        “Command Staff”
                      </li>
                      <li>
                        Corporal – Sergeant: Authorized to wear a vest labeled
                        “Supervisor”
                      </li>
                      <li>
                        All other ranks shall wear the standard Harris County Sheriff&apos;s
                        Office issued vest
                      </li>
                    </ul>

                    <p className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300">
                      The vest that says “Sheriff” is not authorized for wear.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-white">Uniform Options</h4>
                    <p className="mt-3">
                      Deputies are permitted to wear either long sleeve or short sleeve
                      uniforms at their discretion.
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-6">
                      <li>Long Sleeve Uniforms: 692–694</li>
                      <li>Short Sleeve Uniforms: 691, 695</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-white">Pants</h4>
                    <ul className="mt-3 list-disc space-y-1 pl-6">
                      <li>All personnel shall wear standard issue uniform pants</li>
                      <li>Pant Code: 336</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-white">Footwear</h4>
                    <p className="mt-3">
                      Footwear must maintain a professional appearance at all times.
                    </p>
                    <p className="mt-3">
                      Acceptable footwear includes duty boots or shoes that are clean,
                      neutral in color, and appropriate for law enforcement operations.
                    </p>
                  </section>
                </div>
              </div>

              <div className="grid gap-4">
                <InfoPanel title="Command Staff Vest">
                  Lieutenant through Sheriff are authorized to wear a vest labeled
                  “Command Staff.”
                </InfoPanel>

                <InfoPanel title="Supervisor Vest">
                  Corporal through Sergeant are authorized to wear a vest labeled
                  “Supervisor.”
                </InfoPanel>

                <InfoPanel title="Standard Issue Vest">
                  All remaining ranks shall wear the standard Harris County Sheriff&apos;s
                  Office issued vest.
                </InfoPanel>

                <InfoPanel title="Uniform Codes">
                  Long sleeve: 692–694. Short sleeve: 691 and 695. Pants: 336.
                </InfoPanel>
              </div>
            </div>
          </section>
        )}

        {activePage === 'sop' && (
          <section className="space-y-6">
            <SectionHeader
              title="Standard Operating Procedure"
              text="Internal department policy and conduct manual."
            />

            <div className="rounded-lg border border-white/10 bg-[#111214] p-6 md:p-8">
              <div className="space-y-10 text-sm leading-8 text-zinc-300">
                <section>
                  <h3 className="text-xl font-semibold text-white">I. Introduction</h3>
                  <p className="mt-3">
                    Welcome to the Harris County Sheriff&apos;s Office. As a member of HCSO,
                    you represent professionalism, structure, and realism at all times.
                    This document outlines expectations, transport laws, communication
                    procedures, rank structure, and department standards.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    II. On-Duty Behavior Expectations
                  </h3>
                  <div className="mt-3 space-y-3">
                    <p>
                      <span className="font-semibold text-white">Professionalism:</span>{' '}
                      Maintain a professional demeanor at all times. Every interaction
                      reflects HCSO.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Respect:</span> Treat
                      civilians, suspects, and fellow deputies with respect both IC and OOC.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Chain of Command:</span>{' '}
                      Follow the chain of command:
                    </p>
                    <ul className="list-disc space-y-1 pl-6">
                      <li>Sheriff</li>
                      <li>Undersheriff</li>
                      <li>Captain</li>
                      <li>Major</li>
                      <li>Lieutenant</li>
                      <li>Sergeant</li>
                      <li>Corporal</li>
                      <li>Deputy 2</li>
                      <li>Deputy 1</li>
                      <li>Probationary Deputy</li>
                    </ul>
                    <p>
                      <span className="font-semibold text-white">Bodycams:</span> All
                      deputies are expected to record patrols when possible. Command staff
                      may review footage when needed.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    III. Transport Protocols & Lawful Practice
                  </h3>
                  <div className="mt-3 space-y-3">
                    <p className="font-semibold text-white">Search Before Transport</p>
                    <ul className="list-disc space-y-1 pl-6">
                      <li>Remove all weapons and contraband.</li>
                      <li>Log all seized items in the report.</li>
                    </ul>

                    <p className="font-semibold text-white">Vehicle Safety</p>
                    <ul className="list-disc space-y-1 pl-6">
                      <li>Place the suspect in the rear seat.</li>
                      <li>Secure them with a seatbelt if possible.</li>
                      <li>Keep the vehicle locked during transport.</li>
                    </ul>

                    <p className="font-semibold text-white">Legal Standards</p>
                    <ul className="list-disc space-y-1 pl-6">
                      <li>Texas Penal Code 39.03</li>
                      <li>Miranda Rights before questioning</li>
                      <li>Fourth Amendment compliance</li>
                    </ul>

                    <p>
                      Deputies are responsible for the suspect&apos;s safety during
                      transport. Reckless driving or negligence may result in discipline.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    IV. Radio Communications Protocol
                  </h3>
                  <div className="mt-3 space-y-3">
                    <p>Clear and concise communication is required at all times.</p>
                    <p>
                      <span className="font-semibold text-white">Common Codes:</span> 10-15,
                      10-23, 10-97, Code 1, Code 2, and Code 3.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Basic Format:</span>{' '}
                      “(Your Callsign) to Dispatch, show me en route with 1 10-15.”
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    V. Uniform Policy Reference
                  </h3>
                  <div className="mt-3 space-y-3">
                    <p>
                      Uniform and equipment standards are maintained on the Uniforms page of
                      this portal and apply to all on-duty personnel.
                    </p>
                    <p>
                      Members are responsible for wearing the correct vest, approved uniform
                      combination, standard issue pants, and professional footwear while on
                      duty.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    VI. Report Writing Standards
                  </h3>
                  <div className="mt-3 space-y-3">
                    <p>
                      Reports must include time, date, officers, callsigns, suspect names,
                      charges, detailed narrative, evidence, and arrest procedure.
                    </p>
                    <p>Poor reports may delay promotion or result in corrective action.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">VII. Promotion Policy</h3>
                  <div className="mt-3 space-y-3">
                    <p>
                      Promotion is based on activity, professionalism, report quality,
                      leadership, and time in rank.
                    </p>
                    <p>
                      Meeting minimum time requirements does not guarantee advancement.
                    </p>
                    <p>Fast-track promotions require Sheriff approval.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    VIII. Inactivity & Strike Policy
                  </h3>
                  <ul className="mt-3 list-disc space-y-1 pl-6">
                    <li>1st Strike — 5+ days unexplained inactivity</li>
                    <li>2nd Strike — continued inactivity or repeat absence</li>
                    <li>3rd Strike — removal from the department</li>
                  </ul>
                  <p className="mt-3">
                    Exceptions may be made for real-life obligations when communicated to a
                    Sergeant or higher.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    IX. Discipline & Misconduct
                  </h3>
                  <ul className="mt-3 list-disc space-y-1 pl-6">
                    <li>Verbal Warning</li>
                    <li>Written Warning</li>
                    <li>Suspension</li>
                    <li>Termination</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">
                    X. Rank Structure & Responsibilities
                  </h3>
                  <div className="mt-3 space-y-3">
                    <p>
                      <span className="font-semibold text-white">Sheriff / Undersheriff:</span>{' '}
                      Department leadership, policy creation, and top-level oversight.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Captain / Major:</span>{' '}
                      Command supervision, division leadership, and administration.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Lieutenant:</span>{' '}
                      Operational supervision and oversight of Sergeants.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Sergeant:</span> Patrol
                      supervisor, report review, and discipline.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Corporal:</span> Field
                      supervision and scene support.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Deputy 2 / Deputy 1:</span>{' '}
                      Full patrol duties and report accountability.
                    </p>
                    <p>
                      <span className="font-semibold text-white">Probationary Deputy:</span>{' '}
                      Entry-level member under evaluation.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-white">XI. Final Note</h3>
                  <p className="mt-3">
                    HCSO is built on professionalism, realism, and accountability. Every
                    member is expected to uphold department standards through conduct,
                    communication, and integrity.
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
              text="Replace the placeholder names below with your actual department leadership."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {commandStaff.map((person) => (
                <div
                  key={`${person.role}-${person.name}`}
                  className="rounded-lg border border-white/10 bg-[#111214] p-5"
                >
                  <div className="mb-3 inline-flex rounded-md border border-[#d0a126]/20 bg-[#d0a126]/10 p-2 text-[#d0a126]">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d0a126]">
                    {person.role}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">{person.name}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Harris County Sheriff&apos;s Office
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
              text="This page is for internal department references such as callsigns, vehicle assignments, schedules, and other operational notes."
            />

            <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-lg border border-white/10 bg-[#111214] p-6">
                <h3 className="text-xl font-semibold text-white">Internal Reference</h3>
                <p className="mt-4 text-sm leading-8 text-zinc-300">
                  Use this section for callsign numbers, vehicle access, briefing schedules,
                  and department reference material that active members need during regular
                  operations.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ['Callsign Guide', 'Department numbers and identifiers'],
                    ['Vehicle Assignments', 'Authorized vehicles by role'],
                    ['Briefing Notes', 'Schedules, reminders, and updates'],
                    ['Operations Notes', 'Internal notices and expectations'],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-md border border-white/10 bg-[#0d0f12] p-4"
                    >
                      <div className="text-sm font-semibold text-white">{title}</div>
                      <div className="mt-1 text-sm leading-7 text-zinc-400">{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  'Built for internal department use only',
                  'Clean place for callsigns and assignment references',
                  'Readable on desktop and mobile without oversized design elements',
                  'Ready for your real department details and images',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/10 bg-[#111214] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#d0a126]" />
                      <p className="text-sm leading-7 text-zinc-200">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/10 bg-[#0f1013]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 Harris County Sheriff&apos;s Office</p>
          <p>Internal Department Portal</p>
        </div>
      </footer>
    </div>
  )
}