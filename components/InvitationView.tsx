'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FaRegEnvelope } from 'react-icons/fa6'
import Envelope from './Envelope'
import InvitationCard from './InvitationCard'
import TemplateSwitcher from './TemplateSwitcher'
import type { Invitation } from '@/lib/types'
import { getInvitationTemplateId, getInvitationTemplateUi, getInvitationThemeMode, getInvitationThemeVars } from '@/lib/templates'
import type { CSSProperties } from 'react'

type InvitationViewProps = {
    data: Invitation
    templateOverride?: string
}

export default function InvitationView({ data, templateOverride }: InvitationViewProps) {
    const [open, setOpen] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const searchParams = useSearchParams()
    const templateFromUrl = searchParams.get('template')
    const template = getInvitationTemplateId(templateFromUrl ?? templateOverride ?? data.template ?? data.template_id)
    const mode = getInvitationThemeMode(searchParams.get('mode'))
    const ui = getInvitationTemplateUi(template)
    const themeVars = getInvitationThemeVars(mode) as CSSProperties

    // Preserve open state when template changes
    const prevTemplateRef = useRef(template)
    if (prevTemplateRef.current !== template) {
        prevTemplateRef.current = template
        // open state is intentionally preserved
    }

    const handleOpen = () => {
        setOpen(true)
        audioRef.current?.play().catch(() => {})
    }

    return (
        <main
            className={`min-h-screen flex items-center justify-center relative overflow-hidden px-3 pt-16 pb-28 sm:pb-12 lg:pt-28 ${ui.pageBackground}`}
            data-invitation-mode={mode}
            style={themeVars}
        >
            <TemplateSwitcher activeTemplate={template} activeMode={mode} />

            <audio ref={audioRef} loop src="/music.mp3" />

            <AnimatePresence mode="wait">
                {!open ? (
                    <Envelope
                        key={`env-${template}-${mode}`}
                        onOpen={handleOpen}
                        template={template}
                        groom={data.groom}
                        bride={data.bride}
                    />
                ) : (
                    <InvitationCard
                        key={`card-${template}-${mode}`}
                        id={data.id}
                        groom={data.groom}
                        bride={data.bride}
                        message={data.message}
                        date={data.wedding_date}
                        location_name={data.location_name}
                        location_city={data.location_city}
                        template={template}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6"
            >
                <Link
                    href={`/${data.slug}/messages?template=${template}&mode=${mode}`}
                    className={`flex min-h-12 items-center gap-2 rounded-full border px-4 py-3 transition-all duration-300 group sm:px-5 ${ui.actionButton}`}
                    aria-label="رسائل الضيوف"
                >
                    <FaRegEnvelope className={`text-lg transition-transform duration-300 group-hover:scale-110 ${ui.actionIcon}`} />
                    <span className="font-cairo text-sm font-bold inherit-color">رسائل الضيوف</span>
                </Link>
            </motion.div>
        </main>
    )
}
