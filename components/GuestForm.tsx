'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { getInvitationTemplateUi } from '@/lib/templates'
import type { InvitationTemplateId } from '@/lib/templates'

type GuestFormProps = {
    invitationId: string
    template: InvitationTemplateId
}

export default function GuestForm({ invitationId, template }: GuestFormProps) {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const ui = getInvitationTemplateUi(template)

    const handleSubmit = async () => {
        const trimmedName = name.trim()
        const trimmedMessage = message.trim()

        if (!trimmedName || !trimmedMessage) {
            setError('اكتب اسمك ورسالتك قبل الإرسال')
            return
        }

        setLoading(true)
        setError('')

        const { error: submitError } = await supabase.from('guest_messages').insert([
            { invitation_id: invitationId, name: trimmedName, message: trimmedMessage },
        ])

        setLoading(false)

        if (submitError) {
            setError('حدث خطأ أثناء الإرسال، حاول مرة أخرى')
            return
        }

        setSent(true)
        setName('')
        setMessage('')

        setTimeout(() => setSent(false), 4000)
    }

    return (
        <div className="mt-10 w-full">
            <div className="mb-6 flex items-center gap-4">
                <div className={`h-px flex-1 ${ui.formLine}`} />
                <p className={`font-cairo text-xs font-bold ${ui.formTitle}`}>
                    رسالتك لنا
                </p>
                <div className={`h-px flex-1 ${ui.formLine}`} />
            </div>

            <div className={`space-y-4 rounded-3xl border p-5 sm:p-6 ${ui.formPanel}`}>
                <label className="block">
                    <span className="sr-only">اسمك</span>
                    <input
                        dir="rtl"
                        placeholder="اسمك"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value)
                            setError('')
                        }}
                        className={`w-full rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 ${ui.formInput}`}
                    />
                </label>

                <label className="block">
                    <span className="sr-only">رسالتك للعروسين</span>
                    <textarea
                        dir="rtl"
                        rows={4}
                        placeholder="رسالتك للعروسين..."
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value)
                            setError('')
                        }}
                        className={`w-full resize-none rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 ${ui.formInput}`}
                    />
                </label>

                <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !name.trim() || !message.trim()}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    className={`min-h-12 w-full rounded-2xl py-3 font-cairo text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${ui.formButton}`}
                >
                    {loading ? 'جار الإرسال...' : 'إرسال الرسالة'}
                </motion.button>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="pt-1 text-center font-cairo text-sm text-rose-400"
                        >
                            {error}
                        </motion.div>
                    )}

                    {sent && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className={`pt-1 text-center font-cairo text-sm ${ui.formSuccess}`}
                        >
                            تم إرسال رسالتك بنجاح
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
