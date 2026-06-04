import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { GuestMessage, InvitationAccess } from '@/lib/types'

type MessagesRouteContext = {
    params: Promise<{
        slug: string
    }>
}

type MessagesPayload = {
    password?: unknown
}

export const dynamic = 'force-dynamic'

export async function POST(request: Request, { params }: MessagesRouteContext) {
    const { slug } = await params
    const payload = await readPayload(request)
    const password = normalizePassword(payload.password)

    if (!slug || !password) {
        return NextResponse.json({ error: 'Missing slug or password.' }, { status: 400 })
    }

    const supabase = createSupabaseServerClient()

    const { data: invitation, error: invitationError } = await supabase
        .from('invitations')
        .select('id, access_password')
        .eq('slug', slug)
        .single<InvitationAccess>()

    if (invitationError || !invitation) {
        return NextResponse.json({ error: 'Invitation not found.' }, { status: 404 })
    }

    if (!invitation.access_password || invitation.access_password !== password) {
        return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
    }

    const { data: messages, error: messagesError } = await supabase
        .from('guest_messages')
        .select('id, invitation_id, name, message, created_at')
        .eq('invitation_id', invitation.id)
        .order('created_at', { ascending: false })
        .returns<GuestMessage[]>()

    if (messagesError) {
        return NextResponse.json({ error: 'Could not load guest messages.' }, { status: 500 })
    }

    return NextResponse.json({ messages: messages ?? [] })
}

async function readPayload(request: Request): Promise<MessagesPayload> {
    try {
        const payload = await request.json()
        return isRecord(payload) ? payload : {}
    } catch {
        return {}
    }
}

function normalizePassword(value: unknown) {
    if (typeof value !== 'string') {
        return ''
    }

    return value.trim().slice(0, 200)
}

function isRecord(value: unknown): value is MessagesPayload {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}
