'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { InvitationTemplateId } from '@/lib/templates'
import type { ReactNode } from 'react'

type EnvelopeProps = {
    onOpen: () => void
    template: InvitationTemplateId
    groom: string
    bride: string
}

type EnvelopeStyle = {
    back: string
    side: string
    bottom: string
    top: string
    card: string
    names: string
    line: string
    seal: string
    sealInner: string
    sealText: string
    hint: string
    decor?: ReactNode
}

const envelopeStyles: Record<InvitationTemplateId, EnvelopeStyle> = {
    'glassmorphism-luxury': {
        back: 'bg-[#f4e2ff]/48 border-white/60 backdrop-blur-xl shadow-[0_30px_90px_rgba(118,75,162,0.24)]',
        side: 'bg-[#d9b4e3]/82',
        bottom: 'bg-[#f6d7ea]/70 border-[#b98ccf]/55',
        top: 'bg-[linear-gradient(135deg,#e0bbe4,#d291bc,#957dad)] border-white/65',
        card: 'bg-white/60 border-white/75',
        names: 'text-[#3b255c]',
        line: 'bg-[#764ba2]',
        seal: 'bg-[#764ba2] border-[#e0bbe4]',
        sealInner: 'bg-[#d291bc]',
        sealText: 'text-white',
        hint: 'text-[#3b255c]/75',
    },
    'neumorphism-soft': {
        back: 'bg-[#ede4db] border-[#f8f1ea] shadow-[12px_12px_28px_#d1c7bb,-12px_-12px_28px_#ffffff]',
        side: 'bg-[#E8D5C4]',
        bottom: 'bg-[#ede4db] border-[#d1c7bb]',
        top: 'bg-[linear-gradient(135deg,#E8D5C4,#C9B8A8)] border-white/70',
        card: 'bg-[#ede4db] border-[#f8f1ea] shadow-[inset_8px_8px_18px_#d1c7bb,inset_-8px_-8px_18px_#ffffff]',
        names: 'text-[#8f7763]',
        line: 'bg-[#C9B8A8]',
        seal: 'bg-[#C9B8A8] border-white',
        sealInner: 'bg-[#E8D5C4]',
        sealText: 'text-[#6f5b4b]',
        hint: 'text-[#8f7763]',
    },
    'gradient-wave-modern': {
        back: 'bg-white/10 border-[#D4AF37]/50 backdrop-blur-lg shadow-[0_35px_100px_rgba(51,8,103,0.3)]',
        side: 'bg-white/20',
        bottom: 'bg-white/20 border-[#D4AF37]/45',
        top: 'bg-[linear-gradient(135deg,#FA709A,#FEE140,#30CFD0)] border-[#D4AF37]/70',
        card: 'bg-white/15 border-[#D4AF37]/60 backdrop-blur-xl',
        names: 'text-white',
        line: 'bg-[#D4AF37]',
        seal: 'bg-[#D4AF37] border-white/80',
        sealInner: 'bg-[#330867]',
        sealText: 'text-white',
        hint: 'text-white/85',
    },
    'dark-elegant-premium': {
        back: 'bg-[var(--invite-surface)] border-[var(--invite-border)] shadow-[0_35px_95px_var(--invite-shadow)]',
        side: 'bg-[var(--invite-surface-soft)]',
        bottom: 'bg-[var(--invite-bg-soft)] border-[var(--invite-border)]',
        top: 'bg-[linear-gradient(135deg,var(--invite-surface-soft),var(--invite-surface))] border-[var(--invite-border)]',
        card: 'bg-[var(--invite-surface-soft)] border-[var(--invite-border)]',
        names: 'text-[var(--invite-accent)]',
        line: 'bg-[var(--invite-accent)]',
        seal: 'bg-[var(--invite-accent)] border-[var(--invite-accent-soft)]',
        sealInner: 'bg-[var(--invite-surface)]',
        sealText: 'text-[var(--invite-accent)]',
        hint: 'text-[var(--invite-accent)]/80',
        decor: <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(var(--invite-accent)_1px,transparent_1px)] [background-size:38px_38px]" />,
    },
    'floral-watercolor': {
        back: 'bg-[#FFFEF9] border-[#FFE5E5] shadow-[0_32px_80px_rgba(186,144,198,0.18)]',
        side: 'bg-[#FFE5E5]',
        bottom: 'bg-[#FFFEF9] border-[#E8A0BF]/40',
        top: 'bg-[linear-gradient(135deg,#FFE5E5,#C8E7ED,#B4E7CE)] border-white/70',
        card: 'bg-white/85 border-[#E8A0BF]/35',
        names: 'text-[#7b4b6a]',
        line: 'bg-[#B4E7CE]',
        seal: 'bg-[#E8A0BF] border-[#FFE5E5]',
        sealInner: 'bg-[#BA90C6]',
        sealText: 'text-white',
        hint: 'text-[#7b4b6a]',
        decor: <div className="absolute -left-6 -top-6 text-6xl text-[#E8A0BF]/45">✿</div>,
    },
    'botanical-watercolor': {
        back: 'bg-[#fffaf0]/92 border-[#d8c79d]/65 shadow-[0_30px_82px_rgba(82,106,78,0.16)]',
        side: 'bg-[#dbe7d4]',
        bottom: 'bg-[#fffaf0] border-[#d8c79d]/55',
        top: 'bg-[linear-gradient(135deg,#fffaf0,#e7eddc,#f1cbd3)] border-[#d8c79d]/55',
        card: 'bg-[#fffaf0]/90 border-[#d8c79d]/50',
        names: 'text-[#526a4e]',
        line: 'bg-[#b79552]',
        seal: 'bg-[#526a4e] border-[#d8c79d]',
        sealInner: 'bg-[#b79552]',
        sealText: 'text-[#fffaf0]',
        hint: 'text-[#42563f]',
        decor: (
            <>
                <div className="absolute left-5 top-5 h-16 w-px -rotate-[36deg] bg-[#6f8a67]/55" />
                <div className="absolute left-7 top-7 h-6 w-3 -rotate-[60deg] rounded-[100%_0] bg-[#6f8a67]/55" />
                <div className="absolute right-5 bottom-5 h-16 w-px rotate-[42deg] bg-[#6f8a67]/45" />
                <div className="absolute right-8 bottom-8 h-6 w-3 rotate-[18deg] rounded-[100%_0] bg-[#6f8a67]/45" />
            </>
        ),
    },
    'pink-photo-floral': {
        back: 'bg-white/86 border-[#f0c6d0]/70 shadow-[0_30px_82px_rgba(174,111,130,0.16)]',
        side: 'bg-[#f8d8df]',
        bottom: 'bg-white/92 border-[#f0c6d0]/65',
        top: 'bg-[linear-gradient(135deg,#ffffff,#f4becb,#d7ddd9)] border-[#f0c6d0]/65',
        card: 'bg-white/86 border-[#f0c6d0]/60',
        names: 'text-[#9b6270]',
        line: 'bg-[#b97788]',
        seal: 'bg-[#b97788] border-[#f0c6d0]',
        sealInner: 'bg-[#f4becb]',
        sealText: 'text-white',
        hint: 'text-[#7b4b58]',
        decor: (
            <>
                <div className="absolute -left-5 -top-5 h-20 w-20 rounded-full bg-[#f4becb]/60" />
                <div className="absolute right-4 bottom-4 h-16 w-px rotate-[45deg] bg-[#8fa7a2]/45" />
                <div className="absolute right-8 bottom-8 h-7 w-4 rotate-[35deg] rounded-[100%_0] bg-[#8fa7a2]/45" />
            </>
        ),
    },
    'burgundy-gold-floral': {
        back: 'bg-[#fffaf4]/92 border-[#d1ad55]/70 shadow-[0_30px_82px_rgba(91,33,48,0.16)]',
        side: 'bg-[#f1e1d7]',
        bottom: 'bg-[#fffaf4] border-[#d1ad55]/60',
        top: 'bg-[linear-gradient(135deg,#fffaf4,#d1ad55,#6a1932)] border-[#d1ad55]/70',
        card: 'bg-[#fffaf4]/90 border-[#d1ad55]/55',
        names: 'text-[#6a1932]',
        line: 'bg-[#d1ad55]',
        seal: 'bg-[#6a1932] border-[#d1ad55]',
        sealInner: 'bg-[#d1ad55]',
        sealText: 'text-[#fff7e8]',
        hint: 'text-[#5b2130]',
        decor: (
            <>
                <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-[#6a1932]/75" />
                <div className="absolute -left-4 bottom-0 h-20 w-20 rounded-full bg-[#d8a0ac]/65" />
                <div className="absolute left-5 top-5 h-16 w-px rotate-[38deg] bg-[#d1ad55]/60" />
            </>
        ),
    },
    'sage-save-date': {
        back: 'bg-white/92 border-[#c8d4bf]/75 shadow-[0_30px_82px_rgba(78,101,72,0.14)]',
        side: 'bg-[#e2ebdd]',
        bottom: 'bg-white border-[#c8d4bf]/70',
        top: 'bg-[linear-gradient(135deg,#ffffff,#eef4ea,#aac297)] border-[#c8d4bf]/75',
        card: 'bg-white/90 border-[#c8d4bf]/65',
        names: 'text-[#4e6548]',
        line: 'bg-[#8b6d3b]',
        seal: 'bg-[#4e6548] border-[#c8d4bf]',
        sealInner: 'bg-[#8b6d3b]',
        sealText: 'text-white',
        hint: 'text-[#4e6548]',
        decor: (
            <>
                <div className="absolute left-10 top-6 h-14 w-28 rounded-[50%] border border-[#8b6d3b]/55" />
                <div className="absolute right-10 top-6 h-14 w-28 rounded-[50%] border border-[#8b6d3b]/55" />
                <div className="absolute left-6 bottom-6 h-16 w-px -rotate-[50deg] bg-[#78a46f]/45" />
                <div className="absolute right-6 bottom-6 h-16 w-px rotate-[50deg] bg-[#78a46f]/45" />
            </>
        ),
    },
    'arabic-blush-story': {
        back: 'bg-white/92 border-[#ead3d6]/80 shadow-[0_30px_82px_rgba(120,95,95,0.13)]',
        side: 'bg-[#fff1f2]',
        bottom: 'bg-white border-[#ead3d6]/75',
        top: 'bg-[linear-gradient(135deg,#ffffff,#fff1f2,#dce9e5)] border-[#ead3d6]/80',
        card: 'bg-white/90 border-[#ead3d6]/70',
        names: 'text-[#5c5955]',
        line: 'bg-[#d69aa4]',
        seal: 'bg-[#6c6862] border-[#ead3d6]',
        sealInner: 'bg-[#d69aa4]',
        sealText: 'text-white',
        hint: 'text-[#5c5955]',
        decor: (
            <>
                <div className="absolute inset-x-0 top-0 h-12 bg-[#fff1f2]" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-[#dce9e5]/65" />
                <div className="absolute left-8 top-4 h-14 w-px -rotate-[58deg] bg-[#8ba9a0]/45" />
                <div className="absolute right-8 top-4 h-14 w-px rotate-[58deg] bg-[#8ba9a0]/45" />
            </>
        ),
    },
    'geometric-modern': {
        back: 'bg-[#1A535C] border-[#FFE66D] shadow-[0_35px_80px_rgba(26,83,92,0.28)]',
        side: 'bg-[#4ECDC4]',
        bottom: 'bg-[#FF6B6B] border-[#FFE66D]',
        top: 'bg-[linear-gradient(135deg,#FF6B6B,#FFE66D,#4ECDC4)] border-white/60',
        card: 'bg-[#f8fbfa] border-[#1A535C]',
        names: 'text-[#1A535C]',
        line: 'bg-[#FF6B6B]',
        seal: 'bg-[#FFE66D] border-[#1A535C]',
        sealInner: 'bg-[#FF6B6B]',
        sealText: 'text-[#1A535C]',
        hint: 'text-[#1A535C]',
        decor: <div className="absolute right-6 top-6 h-14 w-14 rotate-45 bg-[#FFE66D]" />,
    },
    'animated-particle': {
        back: 'bg-white/80 border-white/80 shadow-[0_35px_95px_rgba(102,126,234,0.28)]',
        side: 'bg-[#FF6B9D]/80',
        bottom: 'bg-white/90 border-[#FFA07A]/50',
        top: 'bg-[linear-gradient(135deg,#FF6B9D,#FFA07A,#FFD93D)] border-white/70',
        card: 'bg-white/95 border-white',
        names: 'text-[#C44569]',
        line: 'bg-[#FFD93D]',
        seal: 'bg-[#C44569] border-[#FFD93D]',
        sealInner: 'bg-[#FF6B9D]',
        sealText: 'text-white',
        hint: 'text-white/85',
        decor: <div className="absolute inset-0 animate-[floatParticles_9s_linear_infinite] opacity-45 [background-image:radial-gradient(#FFD93D_2px,transparent_2px),radial-gradient(#FF6B9D_2px,transparent_2px)] [background-position:0_0,22px_28px] [background-size:48px_48px]" />,
    },
    'minimalist-japanese': {
        back: 'bg-white border-black shadow-[0_24px_70px_rgba(0,0,0,0.12)]',
        side: 'bg-white',
        bottom: 'bg-white border-[#E0E0E0]',
        top: 'bg-white border-black',
        card: 'bg-white border-[#E0E0E0]',
        names: 'text-black',
        line: 'bg-[#C9A96E]',
        seal: 'bg-white border-black',
        sealInner: 'bg-[#C9A96E]',
        sealText: 'text-black',
        hint: 'text-black/65',
    },
}

export default function Envelope({ onOpen, template, groom, bride }: EnvelopeProps) {
    const [isOpened, setIsOpened] = useState(false)
    const floatControls = useAnimation()
    const style = envelopeStyles[template]
    const initials = `${groom?.charAt(0) ?? ''} & ${bride?.charAt(0) ?? ''}`.toUpperCase()

    useEffect(() => {
        if (isOpened) return
        floatControls.start({
            y: [0, -10, 0],
            rotate: [0, 0.4, 0, -0.4, 0],
            transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        })
    }, [isOpened, floatControls])

    const handleClick = () => {
        if (isOpened) return
        floatControls.stop()
        setIsOpened(true)
        setTimeout(() => {
            onOpen()
        }, 3200)
    }

    return (
        <motion.button
            type="button"
            className="relative h-[220px] w-[320px] cursor-pointer text-left outline-none focus-visible:ring-4 focus-visible:ring-white/55 sm:h-[280px] sm:w-[440px]"
            onClick={handleClick}
            animate={floatControls}
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            whileHover={!isOpened ? { scale: 1.025, y: -4, transition: { duration: 0.3, ease: 'easeOut' } } : {}}
            whileTap={!isOpened ? { scale: 0.96, transition: { duration: 0.1 } } : {}}
            exit={{
                opacity: 0,
                scale: 1.08,
                y: -80,
                filter: 'blur(4px)',
                transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] },
            }}
            style={{ perspective: 2200, transformStyle: 'preserve-3d' }}
            aria-label="افتح الدعوة"
        >
            <motion.div
                className="absolute -bottom-10 left-1/2 h-10 w-[90%] -translate-x-1/2 scale-y-50 rounded-full bg-black/20 blur-2xl"
                animate={isOpened ? { opacity: 0.4, scaleX: 0.7, y: 10 } : { opacity: 1, scaleX: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            <div className={`absolute inset-0 rounded-2xl border ${style.back}`} />
            {style.decor}

            <motion.div
                layoutId="invitation-card"
                initial={{ y: 0, rotateZ: 0 }}
                animate={isOpened
                    ? { y: -210, zIndex: 25, scale: 0.88, rotateZ: -1.5, filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.22))' }
                    : { y: 0, rotateZ: 0, filter: 'drop-shadow(0 0px 0px rgba(0,0,0,0))' }
                }
                transition={{
                    y: { duration: 2.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 2.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
                    rotateZ: { duration: 2.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
                    filter: { duration: 1.2, delay: 1.2 },
                }}
                className={`absolute inset-[10px] z-[5] flex flex-col items-center justify-center overflow-hidden rounded-xl border shadow-inner sm:inset-[15px] ${style.card}`}
            >
                <motion.div
                    animate={isOpened ? { scale: 1.08, opacity: 0.9 } : { scale: 1, opacity: 0.75 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className={`font-playfair text-3xl sm:text-4xl ${style.names}`}
                >
                    {initials}
                </motion.div>
                <motion.div
                    animate={isOpened ? { width: '4rem', opacity: 1 } : { width: '3rem', opacity: 0.75 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                    className={`mt-2 h-0.5 rounded-full ${style.line}`}
                />
            </motion.div>

            <div className={`pointer-events-none absolute inset-0 z-10 rounded-2xl ${style.side}`} style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }} />
            <div className={`pointer-events-none absolute inset-0 z-10 rounded-2xl ${style.side}`} style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }} />

            <div className={`pointer-events-none absolute inset-0 z-20 rounded-2xl border-b shadow-[0_-5px_15px_rgba(0,0,0,0.03)] ${style.bottom}`} style={{ clipPath: 'polygon(0 100%, 50% 55%, 100% 100%)' }} />

            <motion.div
                className={`absolute inset-0 z-30 origin-top rounded-2xl border-t shadow-xl ${style.top}`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)', transformStyle: 'preserve-3d' }}
                initial={{ rotateX: 0 }}
                animate={isOpened ? { rotateX: 172, zIndex: 0 } : { rotateX: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 13,
                    delay: 0.05,
                }}
            />

            <motion.div
                initial={{ scale: 1, rotate: 0, opacity: 1 }}
                animate={isOpened
                    ? { scale: 0, rotate: 180, opacity: 0 }
                    : { scale: 1, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.5, ease: [0.36, 0, 0.66, -0.56] }}
                className="absolute left-1/2 top-[55%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-20 sm:w-20"
            >
                <motion.div
                    animate={!isOpened ? { rotate: [0, 8, -8, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                    className={`absolute inset-0 rounded-full border-2 shadow-lg ${style.seal}`}
                />
                <div className={`absolute inset-1 rounded-full border border-white/35 ${style.sealInner}`} />
                <span className={`relative z-10 text-center font-cairo text-[10px] font-bold leading-tight tracking-tight drop-shadow-md sm:text-[11px] ${style.sealText}`}>
                    افتح<br />الدعوة
                </span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isOpened ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-16 left-0 w-full text-center"
            >
                <motion.span
                    animate={!isOpened ? { opacity: [1, 0.55, 1] } : {}}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className={`font-cairo text-xs font-bold tracking-wide sm:text-sm ${style.hint}`}
                >
                    اضغط لفتح الدعوة
                </motion.span>
            </motion.div>
        </motion.button>
    )
}
