'use client'

import { useEffect, useMemo, useState } from 'react'
import FlipDigit from './FlipDigit'
import { getInvitationTemplateUi } from '@/lib/templates'
import type { InvitationTemplateId } from '@/lib/templates'

function getTimeLeft(targetDate: Date) {
    const total = targetDate.getTime() - new Date().getTime()

    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)))
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24))
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60))
    const seconds = Math.max(0, Math.floor((total / 1000) % 60))

    return { days, hours, minutes, seconds }
}

type CountdownProps = {
    date?: string
    template: InvitationTemplateId
}

export default function Countdown({ date, template }: CountdownProps) {
    const ui = getInvitationTemplateUi(template)
    const targetDate = useMemo(
        () => (date ? new Date(date) : new Date('2026-12-31T18:00:00')),
        [date]
    )
    const [time, setTime] = useState(getTimeLeft(targetDate))

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTimeLeft(targetDate))
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <div className={`my-10 flex flex-col items-center gap-6 ${ui.countdownText}`}>
            <h2 className="max-w-full text-center font-cairo text-xl font-bold leading-relaxed sm:text-2xl">
                باقي على يومنا الجميل
            </h2>

            <div className="grid w-full max-w-[34rem] grid-cols-4 gap-2 sm:gap-5">
                <TimeBox label="يوم" value={time.days} boxClassName={ui.digitBox} textClassName={ui.digitText} />
                <TimeBox label="ساعة" value={time.hours} boxClassName={ui.digitBox} textClassName={ui.digitText} />
                <TimeBox label="دقيقة" value={time.minutes} boxClassName={ui.digitBox} textClassName={ui.digitText} />
                <TimeBox label="ثانية" value={time.seconds} boxClassName={ui.digitBox} textClassName={ui.digitText} />
            </div>
        </div>
    )
}

function TimeBox({
    label,
    value,
    boxClassName,
    textClassName,
}: {
    label: string
    value: number
    boxClassName: string
    textClassName: string
}) {
    const digits = String(value).padStart(2, '0')

    return (
        <div className="flex min-w-0 flex-col items-center gap-2">
            <div className="flex gap-1">
                <FlipDigit value={Number(digits[0])} boxClassName={boxClassName} textClassName={textClassName} />
                <FlipDigit value={Number(digits[1])} boxClassName={boxClassName} textClassName={textClassName} />
            </div>
            <span className="font-cairo text-[11px] font-bold leading-none opacity-70 sm:text-sm">
                {label}
            </span>
        </div>
    )
}
