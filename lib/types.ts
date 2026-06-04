import type { InvitationTemplateId } from './templates'

export type Invitation = {
    id: string
    slug: string
    groom: string
    bride: string
    message: string
    wedding_date: string
    location_name: string
    location_city: string
    template?: InvitationTemplateId | string | null
    template_id?: InvitationTemplateId | string | null
    access_password?: string
}

export type GuestMessage = {
    id: string
    invitation_id: string
    name: string
    message: string
    created_at?: string
}

export type SlugPageParams = {
    slug: string
}

export type SlugPageProps = {
    params: Promise<SlugPageParams>
    searchParams?: Promise<{
        template?: string
    }>
}

export type InvitationCardProps = {
    id: Invitation['id']
    groom: Invitation['groom']
    bride: Invitation['bride']
    message: Invitation['message']
    date: Invitation['wedding_date']
    location_name: Invitation['location_name']
    location_city: Invitation['location_city']
    template: InvitationTemplateId
}
