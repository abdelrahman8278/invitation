import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

const MAX_NAME_LENGTH = 80
const MAX_MESSAGE_LENGTH = 800

type GuestMessagePayload = {
    invitationId?: unknown
    name?: unknown
    message?: unknown
}

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const payload = await readPayload(request)
    const invitationId = normalizeText(payload.invitationId, 80)
    const name = normalizeText(payload.name, MAX_NAME_LENGTH)
    const message = normalizeText(payload.message, MAX_MESSAGE_LENGTH)

    if (!invitationId || !name || !message) {
        return NextResponse.json(
            { error: 'Missing invitation id, name, or message.' },
            { status: 400 }
        )
    }

    const supabase = createSupabaseServerClient()

    const { data: invitation, error: invitationError } = await supabase
        .from('invitations')
        .select('id')
        .eq('id', invitationId)
        .single<{ id: string }>()

    if (invitationError || !invitation) {
        return NextResponse.json({ error: 'Invitation not found.' }, { status: 404 })
    }

    const { error: submitError } = await supabase
        .from('guest_messages')
        .insert({ invitation_id: invitation.id, name, message })

    if (submitError) {
        return NextResponse.json({ error: 'Could not save guest message.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
}

async function readPayload(request: Request): Promise<GuestMessagePayload> {
    try {
        const payload = await request.json()
        return isRecord(payload) ? payload : {}
    } catch {
        return {}
    }
}

function normalizeText(value: unknown, maxLength: number) {
    if (typeof value !== 'string') {
        return ''
    }

    return value.trim().slice(0, maxLength)
}

function isRecord(value: unknown): value is GuestMessagePayload {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}
