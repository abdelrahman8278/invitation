import { createSupabaseServerClient } from '@/lib/supabase-server'
import InvitationView from '@/components/InvitationView'
import type { Invitation, SlugPageProps } from '@/lib/types'

export const dynamic = 'force-dynamic'

const invitationPublicFields = `
    id,
    slug,
    groom,
    bride,
    message,
    wedding_date,
    location_name,
    location_city,
    template,
    template_id,
    music_url
`

export default async function Page({ params }: SlugPageProps) {
    const { slug } = await params
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
        .from('invitations')
        .select(invitationPublicFields)
        .eq('slug', slug)
        .single<Invitation>()

    if (error || !data) {
        return <div className="text-center mt-10">Invitation Not Found</div>
    }

    return <InvitationView data={data} />
}
