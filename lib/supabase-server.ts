import { createClient } from '@supabase/supabase-js'
import { supabasePublicConfig } from './supabase'

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const hasSupabaseServiceRoleKey = Boolean(supabaseServiceRoleKey)

export function createSupabaseServerClient() {
    const url = supabasePublicConfig.url || 'https://placeholder-project.supabase.co'
    const key = supabaseServiceRoleKey || supabasePublicConfig.anonKey || 'placeholder-key'
    return createClient(
        url,
        key,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    )
}
