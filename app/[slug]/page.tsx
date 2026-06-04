import { supabase } from '@/lib/supabase'
import InvitationView from '@/components/InvitationView'
import type { Invitation, SlugPageProps } from '@/lib/types'

export default async function Page({ params, searchParams }: SlugPageProps) {
    const { slug } = await params
    const template = (await searchParams)?.template

    const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('slug', slug)
        .single<Invitation>()

    if (error || !data) {
        return <div className="text-center mt-10">Invitation Not Found</div>
    }

    return <InvitationView data={data} templateOverride={template} />
}
