'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { FaArrowLeft, FaLock, FaRegEnvelope } from 'react-icons/fa6'
import { supabase } from '@/lib/supabase'
import { getInvitationTemplateId, getInvitationTemplateUi } from '@/lib/templates'
import type { GuestMessage, Invitation } from '@/lib/types'

export default function MessagesPage() {
    const params = useParams<{ slug: string }>()
    const searchParams = useSearchParams()
    const slug = params.slug
    const template = getInvitationTemplateId(searchParams.get('template'))
    const ui = getInvitationTemplateUi(template)

    const [password, setPassword] = useState('')
    const [messages, setMessages] = useState<GuestMessage[]>([])
    const [allowed, setAllowed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const checkPassword = async () => {
        if (!password.trim()) return
        setLoading(true)
        setError(false)

        const { data } = await supabase
            .from('invitations')
            .select('*')
            .eq('slug', slug)
            .single<Invitation>()

        if (data?.access_password === password) {
            const { data: msgs } = await supabase
                .from('guest_messages')
                .select('*')
                .eq('invitation_id', data.id)
                .order('created_at', { ascending: false })
                .returns<GuestMessage[]>()

            setMessages(msgs || [])
            setAllowed(true)
        } else {
            setError(true)
        }

        setLoading(false)
    }

    return (
        <main className={`relative min-h-screen overflow-hidden px-4 py-24 ${ui.pageBackground}`}>
            <BackLink slug={slug} template={template} actionButton={ui.actionButton} actionIcon={ui.actionIcon} />

            {!allowed ? (
                <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`w-full max-w-sm rounded-[2rem] border p-7 text-center sm:p-10 ${ui.formPanel}`}
                    >
                        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border ${ui.formInput}`}>
                            <FaLock className={`text-2xl ${ui.actionIcon}`} />
                        </div>

                        <p className={`mb-2 font-cairo text-xs font-bold ${ui.formTitle}`}>
                            منطقة خاصة
                        </p>
                        <h1 className={`mb-6 font-cairo text-2xl font-bold ${ui.countdownText}`}>
                            رسائل الضيوف
                        </h1>

                        <div className="space-y-3">
                            <input
                                dir="rtl"
                                type="password"
                                placeholder="كلمة المرور"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                    setError(false)
                                }}
                                onKeyDown={(event) => event.key === 'Enter' && checkPassword()}
                                className={`w-full rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 ${ui.formInput}`}
                            />

                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="font-cairo text-sm text-rose-400"
                                    >
                                        كلمة المرور غير صحيحة
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="button"
                                onClick={checkPassword}
                                disabled={loading || !password.trim()}
                                whileTap={{ scale: 0.97 }}
                                whileHover={{ scale: 1.01 }}
                                className={`min-h-12 w-full rounded-2xl py-3 font-cairo text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${ui.formButton}`}
                            >
                                {loading ? 'جار الدخول...' : 'دخول'}
                            </motion.button>
                        </div>
                    </motion.div>
                </section>
            ) : (
                <section className="mx-auto max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <p className={`mb-2 font-cairo text-xs font-bold ${ui.formTitle}`}>
                            رسائل الضيوف
                        </p>
                        <h1 className={`font-cairo text-4xl font-bold ${ui.countdownText}`}>
                            كلمات من القلب
                        </h1>
                        <div className="mt-4 flex items-center justify-center gap-3">
                            <div className={`h-px w-16 ${ui.formLine}`} />
                            <div className={`h-1.5 w-1.5 rounded-full ${ui.formLine}`} />
                            <div className={`h-px w-16 ${ui.formLine}`} />
                        </div>
                    </motion.div>

                    {messages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`py-20 text-center font-cairo text-lg ${ui.formTitle}`}
                        >
                            لا توجد رسائل بعد
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <motion.article
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.4 }}
                                    className={`rounded-3xl border p-6 ${ui.formPanel}`}
                                    dir="rtl"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border font-cairo text-lg font-bold ${ui.formInput}`}>
                                            {msg.name?.charAt(0)}
                                        </div>
                                        <h3 className={`font-cairo text-sm font-bold ${ui.countdownText}`}>
                                            {msg.name}
                                        </h3>
                                    </div>
                                    <p className={`font-cairo text-sm leading-relaxed ${ui.countdownText}`}>
                                        {msg.message}
                                    </p>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </main>
    )
}

function BackLink({
    slug,
    template,
    actionButton,
    actionIcon,
}: {
    slug: string
    template: string
    actionButton: string
    actionIcon: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed left-5 top-5 z-50 sm:left-6 sm:top-6"
        >
            <Link
                href={`/${slug}?template=${template}`}
                className={`flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 group ${actionButton}`}
                aria-label="العودة للدعوة"
            >
                <FaArrowLeft className={`text-sm transition-transform duration-300 group-hover:-translate-x-1 ${actionIcon}`} />
                <span className="font-cairo text-sm font-bold">الدعوة</span>
                <FaRegEnvelope className={`text-sm ${actionIcon}`} />
            </Link>
        </motion.div>
    )
}
