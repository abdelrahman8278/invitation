import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { SlugPageProps } from '@/lib/types'

export async function generateMetadata({ params }: SlugPageProps) {
    const { slug } = await params
    const supabase = createSupabaseServerClient()

    const { data } = await supabase
        .from('invitations')
        .select('groom, bride')
        .eq('slug', slug)
        .single<{ groom: string; bride: string }>()

    if (!data) {
        return {
            title: 'Wedding Invitation',
        }
    }

    return {
        title: `${data.groom} & ${data.bride}`,
        description: `You are cordially invited to the wedding of ${data.groom} and ${data.bride}`,
    }
}

export default function SlugLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
