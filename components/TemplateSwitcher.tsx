'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPalette, FaXmark } from 'react-icons/fa6'
import { getInvitationTemplateUi, invitationTemplates } from '@/lib/templates'
import type { InvitationTemplateId } from '@/lib/templates'

type TemplateSwitcherProps = {
    activeTemplate: InvitationTemplateId
    activeMode?: string
}

export default function TemplateSwitcher({ activeTemplate }: TemplateSwitcherProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [pendingTemplate, setPendingTemplate] = useState<InvitationTemplateId | null>(null)
    const [isOpen, setIsOpen] = useState(true)
    const isMounted = useRef(false)
    const ui = getInvitationTemplateUi(activeTemplate)
    const isLoading = isPending || pendingTemplate !== null

    useEffect(() => {
        if (!pendingTemplate || pendingTemplate !== activeTemplate) return
        const t = window.setTimeout(() => setPendingTemplate(null), 250)
        return () => window.clearTimeout(t)
    }, [activeTemplate, pendingTemplate])

    // Close sidebar when template changes (skip first render)
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        setIsOpen(false)
    }, [activeTemplate])

    // Close on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const selectTemplate = (template: InvitationTemplateId) => {
        if (template === activeTemplate || isLoading) return
        const next = new URLSearchParams(searchParams.toString())
        next.set('template', template)
        setPendingTemplate(template)
        startTransition(() => {
            router.replace(`${pathname}?${next.toString()}`, { scroll: false })
        })
    }

    const prefetchTemplate = (template: InvitationTemplateId) => {
        if (template === activeTemplate) return
        const next = new URLSearchParams(searchParams.toString())
        next.set('template', template)
        router.prefetch(`${pathname}?${next.toString()}`)
    }

    return (
        <>
            {/* ══════════════════════════════════════════
                DESKTOP (lg+): Horizontal top bar
            ══════════════════════════════════════════ */}
            <div className="fixed left-1/2 top-4 z-[80] hidden w-[calc(100vw-1.5rem)] max-w-5xl -translate-x-1/2 lg:block">
                <div className={`scrollbar-none flex gap-2 overflow-x-auto rounded-2xl border p-2 backdrop-blur-2xl ${ui.switcher}`}>
                    {invitationTemplates.map((template) => {
                        const isActive = template.id === activeTemplate
                        const isTemplateLoading = pendingTemplate === template.id
                        return (
                            <button
                                key={template.id}
                                type="button"
                                onClick={() => selectTemplate(template.id)}
                                onMouseEnter={() => prefetchTemplate(template.id)}
                                disabled={isLoading}
                                title={template.description}
                                className={`min-h-9 shrink-0 rounded-xl px-3 py-2 font-montserrat text-xs font-bold transition-all duration-200 ${
                                    isActive ? ui.switcherActive : ui.switcherIdle
                                } ${isLoading ? 'cursor-wait' : ''}`}
                            >
                                <span className="inline-flex min-w-12 items-center justify-center gap-1.5">
                                    {isTemplateLoading && (
                                        <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    )}
                                    {template.shortName}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ══════════════════════════════════════════
                MOBILE / TABLET (< lg): Sidebar drawer
            ══════════════════════════════════════════ */}

            {/* Toggle Button */}
            <motion.button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.06 }}
                aria-label="قائمة التصاميم"
                aria-expanded={isOpen}
                className={`fixed left-4 top-4 z-[90] flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-2xl shadow-xl transition-shadow duration-300 lg:hidden ${ui.switcher}`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                        <motion.span
                            key="x"
                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.18 }}
                        >
                            <FaXmark className="text-base" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="palette"
                            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.18 }}
                        >
                            <FaPalette className="text-base" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-[80] bg-black/25 backdrop-blur-[2px] lg:hidden"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        key="sidebar"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                        className={`fixed left-0 top-0 z-[85] flex h-full w-64 flex-col border-r shadow-2xl backdrop-blur-2xl lg:hidden ${ui.switcher}`}
                        aria-label="قائمة التصاميم"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b border-current/10 px-5 pb-4 pt-20">
                            <FaPalette className="shrink-0 text-sm opacity-60" />
                            <p className="font-cairo text-xs font-bold tracking-wider opacity-60">
                                التصاميم المتاحة
                            </p>
                        </div>

                        {/* List */}
                        <div className="flex flex-col gap-1 overflow-y-auto scrollbar-none px-3 py-3">
                            {invitationTemplates.map((template, index) => {
                                const isActive = template.id === activeTemplate
                                const isTemplateLoading = pendingTemplate === template.id
                                return (
                                    <motion.button
                                        key={template.id}
                                        type="button"
                                        onClick={() => selectTemplate(template.id)}
                                        onMouseEnter={() => prefetchTemplate(template.id)}
                                        disabled={isLoading}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                        className={`group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-cairo font-bold transition-all duration-200 ${
                                            isActive ? ui.switcherActive : ui.switcherIdle
                                        } ${isLoading && !isActive ? 'cursor-wait opacity-70' : ''}`}
                                    >
                                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full bg-current transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                                        <span className="flex-1 text-start text-sm font-bold leading-tight">
                                            {template.name}
                                        </span>
                                        {isTemplateLoading ? (
                                            <span className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        ) : (
                                            <span className={`font-montserrat text-[10px] opacity-40 transition-opacity group-hover:opacity-70 ${isActive ? '!opacity-60' : ''}`}>
                                                {template.shortName}
                                            </span>
                                        )}
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto border-t border-current/10 px-5 py-4">
                            <p className="font-cairo text-[10px] leading-relaxed opacity-40">
                                اختر تصميم الدعوة المناسب
                            </p>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}
