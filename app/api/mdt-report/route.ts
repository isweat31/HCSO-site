import { NextResponse } from 'next/server'

type MDTReport = {
  reportType: string
  unitCallsign: string
  submittedBy: string
  incidentLocation: string
  patientName: string
  patientCondition: string
  treatmentGiven: string
  transportDecision: string
  hospitalDestination: string
  narrative: string
}

function clean(value: unknown) {
  return String(value || '').trim().slice(0, 900)
}

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.DISCORD_FIRE_WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Missing DISCORD_FIRE_WEBHOOK_URL.' },
        { status: 500 }
      )
    }

    const body = (await request.json()) as MDTReport

    const reportType = clean(body.reportType)
    const unitCallsign = clean(body.unitCallsign)
    const submittedBy = clean(body.submittedBy)
    const incidentLocation = clean(body.incidentLocation)
    const patientName = clean(body.patientName)
    const patientCondition = clean(body.patientCondition)
    const treatmentGiven = clean(body.treatmentGiven)
    const transportDecision = clean(body.transportDecision)
    const hospitalDestination = clean(body.hospitalDestination)
    const narrative = clean(body.narrative)

    if (!reportType || !unitCallsign || !submittedBy || !incidentLocation || !narrative) {
      return NextResponse.json(
        { error: 'Missing required report fields.' },
        { status: 400 }
      )
    }

    const discordPayload = {
  username: 'Dallas Fire-Rescue MDT',
  allowed_mentions: {
    parse: [],
  },
  embeds: [
    {
      author: {
        name: 'Dallas Fire-Rescue Department',
      },
      title: '🚨 New MDT Report Submitted',
      description:
        'A new Fire / EMS report has been submitted through the department MDT system.',
      color: 15158332,
      fields: [
        {
          name: '📋 Report Information',
          value:
            `**Report Type:** ${reportType || 'N/A'}\n` +
            `**Submitted By:** ${submittedBy || 'N/A'}\n` +
            `**Unit / Callsign:** ${unitCallsign || 'N/A'}\n` +
            `**Incident Location:** ${incidentLocation || 'N/A'}`,
          inline: false,
        },
        {
          name: '🩺 Patient Information',
          value:
            `**Patient Name:** ${patientName || 'N/A'}\n` +
            `**Patient Condition:** ${patientCondition || 'N/A'}\n` +
            `**Transport Decision:** ${transportDecision || 'N/A'}\n` +
            `**Hospital Destination:** ${hospitalDestination || 'N/A'}`,
          inline: false,
        },
        {
          name: '💊 Treatment Given',
          value: treatmentGiven || 'N/A',
          inline: false,
        },
        {
          name: '📝 Narrative',
          value: narrative || 'N/A',
          inline: false,
        },
      ],
      footer: {
        text: 'Dallas Fire-Rescue MDT • Internal Report System',
      },
      timestamp: new Date().toISOString(),
    },
  ],
}

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    })

    if (!discordResponse.ok) {
      const text = await discordResponse.text()
      return NextResponse.json(
        { error: 'Discord webhook failed.', details: text },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Server error while submitting report.' },
      { status: 500 }
    )
  }
}