'use client'

import { motion } from 'framer-motion'
import Countdown from './Countdown'
import GuestForm from './GuestForm'
import type { InvitationCardProps } from '@/lib/types'
import type { InvitationTemplateId } from '@/lib/templates'
import type { ReactNode } from 'react'

type TemplateRendererProps = InvitationCardProps & {
    formattedDate: string
    itemVariants: typeof itemVariants
}

type CardDesign = {
    frame: string
    eyebrow: string
    heading: string
    ampersand: string
    message: string
    dateBox: string
    dateText: string
    map: string
    mapFrame: string
    align?: string
    decor?: ReactNode
    label: string
}

const containerVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.07
        }
    }
}

const itemVariants = {
    hidden: { y: 14, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
}

const cardDesigns: Record<InvitationTemplateId, CardDesign> = {
    'glassmorphism-luxury': {
        frame: 'bg-[#f4e2ff]/46 backdrop-blur-3xl border border-white/62 p-8 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(118,75,162,0.26)] text-center text-[#3b255c]',
        eyebrow: 'text-[#4b2f73] tracking-[0.38em]',
        heading: 'text-[#2f1f49] drop-shadow-[0_12px_30px_rgba(118,75,162,0.12)]',
        ampersand: 'text-[#7b3e88]',
        message: 'text-[#4b356a]',
        dateBox: 'bg-white/42 border-white/65 backdrop-blur-xl shadow-[0_14px_32px_rgba(118,75,162,0.16)]',
        dateText: 'text-[#4b2f73]',
        map: 'bg-white/42 border-white/65 text-[#3b255c] backdrop-blur-xl rounded-2xl',
        mapFrame: 'rounded-xl border-white/60',
        label: 'Glassmorphism Luxury',
        decor: (
            <>
                <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#e0bbe4]/35 blur-2xl" />
                <div className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#957dad]/24 blur-2xl" />
                <div className="absolute inset-x-10 top-0 h-px bg-white/70" />
                <div className="absolute inset-y-10 right-0 w-px bg-white/45" />
            </>
        ),
    },
    'neumorphism-soft': {
        frame: 'bg-[#ede4db] border border-[#f7eee5] p-8 sm:p-14 rounded-[2.5rem] shadow-[18px_18px_42px_#d1c7bb,-18px_-18px_42px_#ffffff] text-center text-[#6f5b4b]',
        eyebrow: 'text-[#9b806b] tracking-[0.34em]',
        heading: 'text-[#6a5545]',
        ampersand: 'text-[#8f7763]',
        message: 'text-[#7b6654]',
        dateBox: 'bg-[#ede4db] border-[#f8f1ea] shadow-[inset_8px_8px_18px_#d1c7bb,inset_-8px_-8px_18px_#ffffff]',
        dateText: 'text-[#6a5545]',
        map: 'bg-[#ede4db] border-[#f8f1ea] text-[#6a5545] rounded-[2rem] shadow-[inset_7px_7px_16px_#d1c7bb,inset_-7px_-7px_16px_#ffffff]',
        mapFrame: 'rounded-2xl border-[#f8f1ea]',
        label: 'Neumorphism Soft',
    },
    'gradient-wave-modern': {
        frame: 'bg-[#330867]/52 backdrop-blur-2xl border border-[#D4AF37]/70 p-8 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(51,8,103,0.28)] text-center text-white',
        eyebrow: 'text-[#FEE140] tracking-[0.35em]',
        heading: 'text-white',
        ampersand: 'text-[#D4AF37]',
        message: 'text-white/90',
        dateBox: 'bg-[#330867]/34 border-[#D4AF37]/60 backdrop-blur-xl',
        dateText: 'text-[#FEE140]',
        map: 'bg-[#330867]/34 border-[#D4AF37]/55 text-white backdrop-blur-xl rounded-2xl',
        mapFrame: 'rounded-xl border-[#D4AF37]/35',
        label: 'Gradient Wave Modern',
        decor: (
            <>
                <div className="absolute -left-20 top-8 h-40 w-[120%] rotate-[-8deg] bg-white/10" />
                <div className="absolute -right-20 bottom-10 h-32 w-[110%] rotate-[7deg] bg-[#30CFD0]/20" />
            </>
        ),
    },
    'dark-elegant-premium': {
        frame: 'bg-[var(--invite-surface)] border border-[var(--invite-border)] p-8 sm:p-14 rounded-[1.5rem] shadow-[0_45px_120px_var(--invite-shadow)] text-center text-[var(--invite-text)]',
        eyebrow: 'text-[var(--invite-accent)] tracking-[0.36em]',
        heading: 'text-[var(--invite-text)] drop-shadow-[0_0_24px_var(--invite-shadow)]',
        ampersand: 'text-[var(--invite-accent)]',
        message: 'text-[var(--invite-text-muted)]',
        dateBox: 'bg-[var(--invite-surface-soft)] border-[var(--invite-border)]',
        dateText: 'text-[var(--invite-accent)]',
        map: 'bg-[var(--invite-surface-soft)] border-[var(--invite-border)] text-[var(--invite-text)] rounded-xl',
        mapFrame: 'rounded-lg border-[var(--invite-border)]',
        label: 'Dark Elegant Premium',
        decor: <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--invite-accent)_1px,transparent_1px)] [background-size:34px_34px]" />,
    },
    'floral-watercolor': {
        frame: 'bg-[#FFFEF9]/95 border border-[#FFE5E5] p-8 sm:p-14 rounded-[2rem] shadow-[0_35px_100px_rgba(186,144,198,0.16)] text-center text-[#7b4b52]',
        eyebrow: 'text-[#8f5a9e] tracking-[0.34em]',
        heading: 'text-[#5d3441]',
        ampersand: 'text-[#a24e7a]',
        message: 'text-[#7b4b52]',
        dateBox: 'bg-white/75 border-[#FFE5E5]',
        dateText: 'text-[#8f5a9e]',
        map: 'bg-white/75 border-[#FFE5E5] text-[#5d3441] rounded-2xl',
        mapFrame: 'rounded-xl border-[#FFE5E5]',
        label: 'Floral Watercolor',
        decor: (
            <>
                <div className="absolute -left-4 top-6 text-7xl text-[#E8A0BF]/45">✿</div>
                <div className="absolute right-8 top-10 text-5xl text-[#BA90C6]/35">✽</div>
                <div className="absolute bottom-8 right-10 text-6xl text-[#B4E7CE]/60">✿</div>
            </>
        ),
    },
    'botanical-watercolor': {
        frame: 'bg-[#fffaf0]/96 border border-[#d8c79d]/65 p-8 sm:p-14 rounded-none shadow-[0_32px_90px_rgba(82,106,78,0.14)] text-center text-[#42563f]',
        eyebrow: 'font-cairo normal-case tracking-normal text-xl sm:text-2xl text-[#566452] font-normal',
        heading: 'text-[#526a4e] italic',
        ampersand: 'text-[#b79552]',
        message: 'text-[#5f6255]',
        dateBox: 'bg-transparent border-[#b79552]/35 rounded-none',
        dateText: 'text-[#526a4e]',
        map: 'bg-[#fffaf0]/72 border-[#d8c79d]/55 text-[#42563f] rounded-none',
        mapFrame: 'rounded-none border-[#d8c79d]/45',
        label: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ',
        decor: (
            <>
                <div className="absolute inset-5 border border-[#d8c79d]/55" />
                <div className="absolute left-8 top-6 h-24 w-px -rotate-[35deg] bg-[#6f8a67]/55" />
                <div className="absolute left-9 top-6 h-8 w-4 -rotate-[55deg] rounded-[100%_0] bg-[#6f8a67]/55" />
                <div className="absolute left-16 top-12 h-7 w-4 -rotate-[18deg] rounded-[100%_0] bg-[#6f8a67]/45" />
                <div className="absolute right-6 top-4 h-24 w-24 rounded-full bg-[#f1cbd3]/45 blur-sm" />
                <div className="absolute right-12 top-10 h-16 w-16 rounded-full border border-[#d8c79d]/45" />
                <div className="absolute right-10 top-7 text-6xl leading-none text-white/75">✿</div>
                <div className="absolute bottom-5 left-4 h-28 w-28 rounded-full bg-[#f1cbd3]/35 blur-sm" />
                <div className="absolute bottom-8 left-6 text-7xl leading-none text-white/70">✿</div>
                <div className="absolute bottom-6 right-8 h-28 w-px rotate-[42deg] bg-[#6f8a67]/50" />
                <div className="absolute bottom-16 right-12 h-8 w-4 rotate-[18deg] rounded-[100%_0] bg-[#6f8a67]/45" />
                <div className="absolute bottom-8 right-20 h-7 w-4 rotate-[58deg] rounded-[100%_0] bg-[#6f8a67]/40" />
            </>
        ),
    },
    'pink-photo-floral': {
        frame: 'bg-white/94 border border-[#f0c6d0]/70 p-8 sm:p-14 rounded-none shadow-[0_32px_90px_rgba(174,111,130,0.16)] text-center text-[#6f4450]',
        eyebrow: 'text-[#2f2b2b] tracking-[0.2em]',
        heading: 'text-[#9b6270] italic',
        ampersand: 'text-[#7b4b58]',
        message: 'text-[#7b4b58]',
        dateBox: 'bg-transparent border-[#7b4b58]/35 rounded-full max-w-sm mx-auto',
        dateText: 'text-[#2f2b2b]',
        map: 'bg-white/76 border-[#f0c6d0]/65 text-[#6f4450] rounded-none',
        mapFrame: 'rounded-none border-[#f0c6d0]/45',
        label: 'YOU ARE INVITED TO THE WEDDING OF',
        decor: (
            <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(244,190,203,0.30)_0,transparent_28%)]" />
                <div className="absolute left-1/2 top-28 h-40 w-40 -translate-x-1/2 rounded-full border border-[#b97788]/45 bg-[linear-gradient(135deg,#f7d8de,#ffffff)] shadow-[0_18px_45px_rgba(174,111,130,0.12)]" />
                <div className="absolute left-1/2 top-32 h-32 w-32 -translate-x-1/2 rounded-full bg-[#d7ddd9]/55" />
                <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f4becb]/72" />
                <div className="absolute left-5 top-3 h-20 w-20 rounded-full border border-[#d8a0ac]/45" />
                <div className="absolute right-0 -top-10 h-40 w-40 rounded-full bg-[#f4becb]/64" />
                <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#f4becb]/55" />
                <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-[#f4becb]/55" />
                <div className="absolute left-8 bottom-12 h-24 w-px -rotate-[48deg] bg-[#8fa7a2]/45" />
                <div className="absolute right-8 bottom-12 h-24 w-px rotate-[48deg] bg-[#8fa7a2]/45" />
                <div className="absolute left-10 bottom-24 h-9 w-5 -rotate-[35deg] rounded-[100%_0] bg-[#8fa7a2]/45" />
                <div className="absolute right-10 bottom-24 h-9 w-5 rotate-[35deg] rounded-[100%_0] bg-[#8fa7a2]/45" />
            </>
        ),
    },
    'burgundy-gold-floral': {
        frame: 'bg-[#fffaf4]/96 border border-[#d1ad55]/75 p-8 sm:p-14 rounded-none shadow-[0_34px_92px_rgba(91,33,48,0.16)] text-center text-[#5b2130]',
        eyebrow: 'font-cairo normal-case tracking-normal text-xl sm:text-2xl text-[#8f6470] font-normal italic',
        heading: 'text-[#8a5260] italic',
        ampersand: 'text-[#6a1932]',
        message: 'text-[#5b2130]',
        dateBox: 'bg-transparent border-[#d1ad55]/55 rounded-none',
        dateText: 'text-[#6a1932]',
        map: 'bg-[#fffaf4]/78 border-[#d1ad55]/55 text-[#5b2130] rounded-none',
        mapFrame: 'rounded-none border-[#d1ad55]/45',
        label: 'Together with their families',
        decor: (
            <>
                <div className="absolute inset-5 border border-[#d1ad55]/65" />
                <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#6a1932]/78" />
                <div className="absolute right-20 -top-8 h-28 w-28 rounded-full bg-[#d8a0ac]/75" />
                <div className="absolute left-10 -top-8 h-28 w-28 rounded-full bg-white/92" />
                <div className="absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-[#6a1932]/82" />
                <div className="absolute left-20 -bottom-8 h-28 w-28 rounded-full bg-[#d8a0ac]/70" />
                <div className="absolute right-24 -bottom-8 h-28 w-28 rounded-full bg-white/88" />
                <div className="absolute left-4 top-16 h-24 w-px rotate-[34deg] bg-[#d1ad55]/55" />
                <div className="absolute right-5 bottom-24 h-28 w-px rotate-[34deg] bg-[#d1ad55]/55" />
                <div className="absolute left-9 top-18 h-9 w-5 rotate-[55deg] rounded-[100%_0] border border-[#d1ad55]/70" />
                <div className="absolute right-10 bottom-24 h-9 w-5 rotate-[55deg] rounded-[100%_0] border border-[#d1ad55]/70" />
            </>
        ),
    },
    'sage-save-date': {
        frame: 'bg-white/96 border border-[#dbe4d5] p-8 sm:p-14 rounded-none shadow-[0_30px_86px_rgba(78,101,72,0.13)] text-center text-[#4e6548]',
        eyebrow: 'text-[#4e6548] tracking-[0.16em]',
        heading: 'text-[#4e6548] italic',
        ampersand: 'text-[#8b6d3b]',
        message: 'text-[#576650]',
        dateBox: 'bg-transparent border-[#4e6548]/30 rounded-none max-w-md mx-auto',
        dateText: 'text-[#4e6548]',
        map: 'bg-white/76 border-[#c8d4bf]/70 text-[#4e6548] rounded-none',
        mapFrame: 'rounded-none border-[#c8d4bf]/55',
        label: 'SAVE THE DATE',
        decor: (
            <>
                <div className="absolute left-1/2 top-8 h-36 w-72 -translate-x-1/2 rounded-[50%] border-2 border-[#b79552]/70" />
                <div className="absolute left-[42%] top-8 h-36 w-56 -translate-x-1/2 rounded-[50%] border-2 border-[#b79552]/70" />
                <div className="absolute left-20 top-12 h-24 w-px -rotate-[62deg] bg-[#78a46f]/55" />
                <div className="absolute right-20 top-12 h-24 w-px rotate-[62deg] bg-[#78a46f]/55" />
                <div className="absolute left-24 top-10 h-8 w-4 -rotate-[35deg] rounded-[100%_0] bg-[#78a46f]/55" />
                <div className="absolute right-24 top-10 h-8 w-4 rotate-[35deg] rounded-[100%_0] bg-[#78a46f]/55" />
                <div className="absolute left-4 top-52 h-28 w-px rotate-[54deg] bg-[#7f9276]/35" />
                <div className="absolute right-4 bottom-24 h-32 w-px rotate-[54deg] bg-[#7f9276]/35" />
                <div className="absolute left-6 top-56 h-12 w-7 rotate-[36deg] rounded-[100%_0] border border-[#7f9276]/45" />
                <div className="absolute right-8 bottom-28 h-12 w-7 rotate-[36deg] rounded-[100%_0] border border-[#7f9276]/45" />
            </>
        ),
    },
    'arabic-blush-story': {
        frame: 'bg-white/96 border border-[#ead3d6]/75 p-8 sm:p-14 rounded-none shadow-[0_30px_86px_rgba(120,95,95,0.12)] text-center text-[#5c5955]',
        eyebrow: 'font-cairo normal-case tracking-normal text-2xl sm:text-3xl text-[#5c5955] font-bold',
        heading: 'font-cairo text-[#5c5955]',
        ampersand: 'text-[#8a8580]',
        message: 'text-[#6c6862]',
        dateBox: 'bg-transparent border-[#ead3d6]/75 rounded-none max-w-sm mx-auto',
        dateText: 'font-cairo text-[#6c6862]',
        map: 'bg-white/78 border-[#ead3d6]/75 text-[#5c5955] rounded-none',
        mapFrame: 'rounded-none border-[#ead3d6]/55',
        label: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ',
        decor: (
            <>
                <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_20%_30%,rgba(214,154,164,0.36)_0,transparent_24%),radial-gradient(circle_at_78%_28%,rgba(139,169,160,0.34)_0,transparent_24%)]" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_50%_70%,rgba(214,154,164,0.34)_0,transparent_32%),radial-gradient(circle_at_24%_58%,rgba(139,169,160,0.36)_0,transparent_26%),radial-gradient(circle_at_78%_60%,rgba(139,169,160,0.34)_0,transparent_26%)]" />
                <div className="absolute left-6 top-4 h-28 w-px -rotate-[64deg] bg-[#8ba9a0]/45" />
                <div className="absolute right-6 top-4 h-28 w-px rotate-[64deg] bg-[#8ba9a0]/45" />
                <div className="absolute left-10 bottom-14 h-32 w-px -rotate-[58deg] bg-[#8ba9a0]/45" />
                <div className="absolute right-10 bottom-14 h-32 w-px rotate-[58deg] bg-[#8ba9a0]/45" />
                <div className="absolute left-1/2 bottom-14 h-24 w-28 -translate-x-1/2 rounded-t-full bg-[#d69aa4]/24" />
            </>
        ),
    },
    'geometric-modern': {
        frame: 'bg-[#f8fbfa] border-4 border-[#1A535C] p-8 sm:p-14 rounded-[1.25rem] shadow-[18px_18px_0_#4ECDC4] text-center text-[#1A535C]',
        eyebrow: 'text-[#FF6B6B] tracking-[0.28em]',
        heading: 'text-[#1A535C]',
        ampersand: 'text-[#FF6B6B]',
        message: 'text-[#1A535C]',
        dateBox: 'bg-[#FFE66D] border-[#1A535C]',
        dateText: 'text-[#1A535C]',
        map: 'bg-white border-[#1A535C] text-[#1A535C] rounded-xl',
        mapFrame: 'rounded-none border-[#1A535C]',
        label: 'Geometric Modern',
        decor: (
            <>
                <div className="absolute left-7 top-8 h-16 w-16 rotate-45 bg-[#FFE66D]" />
                <div className="absolute right-10 top-12 h-20 w-20 rounded-full bg-[#4ECDC4]" />
                <div className="absolute bottom-10 left-10 h-0 w-0 border-l-[34px] border-r-[34px] border-b-[58px] border-l-transparent border-r-transparent border-b-[#FF6B6B]" />
            </>
        ),
    },
    'animated-particle': {
        frame: 'bg-white/95 border border-white p-8 sm:p-14 rounded-[2rem] shadow-[0_40px_110px_rgba(102,126,234,0.28)] text-center text-[#C44569]',
        eyebrow: 'text-[#FF6B9D] tracking-[0.34em]',
        heading: 'text-[#C44569]',
        ampersand: 'text-[#b8563d]',
        message: 'text-[#7c3551]',
        dateBox: 'bg-[#fff7fb] border-[#FF6B9D]/25',
        dateText: 'text-[#C44569]',
        map: 'bg-[#fff7fb] border-[#FF6B9D]/25 text-[#C44569] rounded-2xl',
        mapFrame: 'rounded-xl border-[#FF6B9D]/20',
        label: 'Animated Particle',
        decor: <div className="absolute inset-0 animate-[floatParticles_10s_linear_infinite] opacity-45 [background-image:radial-gradient(#FFD93D_2px,transparent_2px),radial-gradient(#FF6B9D_2px,transparent_2px)] [background-position:0_0,28px_24px] [background-size:54px_54px]" />,
    },
    'minimalist-japanese': {
        frame: 'bg-white border border-[#E0E0E0] p-8 sm:p-16 rounded-none shadow-[0_28px_90px_rgba(0,0,0,0.09)] text-center text-black',
        eyebrow: 'text-black tracking-[0.42em]',
        heading: 'text-black',
        ampersand: 'text-[#C9A96E]',
        message: 'text-black/75',
        dateBox: 'bg-white border-[#E0E0E0]',
        dateText: 'text-[#C9A96E]',
        map: 'bg-white border-[#E0E0E0] text-black rounded-none',
        mapFrame: 'rounded-none border-[#E0E0E0]',
        label: 'Minimalist Japanese',
        decor: <div className="absolute left-10 top-10 h-16 w-px bg-[#C9A96E]" />,
    },
}

export default function InvitationCard(props: InvitationCardProps) {
    const formattedDate = new Date(props.date).toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const templateProps = {
        ...props,
        formattedDate,
        itemVariants
    }

    return (
        <motion.div
            layoutId="invitation-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-50 mx-4 w-full max-w-3xl overflow-hidden"
        >
            <ModernTemplate {...templateProps} design={cardDesigns[props.template]} />
        </motion.div>
    )
}

function ModernTemplate(props: TemplateRendererProps & { design: CardDesign }) {
    const { design } = props

    return (
        <TemplateFrame className={design.frame}>
            {design.decor}
            <div className={`relative z-10 ${design.align ?? ''}`}>
                <motion.div variants={props.itemVariants} className="mb-8">
                    <p className={`font-montserrat uppercase text-xs sm:text-sm font-bold mb-3 ${design.eyebrow}`}>
                        {design.label}
                    </p>
                    <div className="mx-auto h-px w-16 bg-current opacity-30" />
                </motion.div>

                <motion.h1 variants={props.itemVariants} className={`mb-8 font-playfair text-4xl leading-tight sm:text-7xl ${design.heading}`}>
                    {props.groom}
                    <span className={`my-3 block text-3xl sm:text-4xl ${design.ampersand}`}>&</span>
                    {props.bride}
                </motion.h1>

                <MessageBlock {...props} className={`font-cairo text-lg sm:text-2xl ${design.message}`} />

                <motion.div variants={props.itemVariants} className={`my-10 rounded-2xl border px-5 py-6 ${design.dateBox}`}>
                    <p className={`mb-3 font-cairo text-xs font-bold opacity-70 ${design.dateText}`}>
                        موعد الحفل
                    </p>
                    <p className={`font-playfair text-3xl ${design.dateText}`}>{props.formattedDate}</p>
                </motion.div>

                <SharedSections {...props} mapClassName={design.map} mapFrameClassName={design.mapFrame} />
            </div>
        </TemplateFrame>
    )
}

function TemplateFrame({ children, className }: { children: ReactNode; className: string }) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>
}

function MessageBlock(props: TemplateRendererProps & { className: string }) {
    return (
        <motion.div variants={props.itemVariants} className="mb-10">
            <p className={`${props.className} leading-relaxed mb-6 whitespace-pre-line`} dir="rtl">
                {props.message}
            </p>
            <div className="flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-current opacity-20" />
                <div className="w-2 h-2 rounded-full bg-current opacity-30" />
                <div className="h-px w-8 bg-current opacity-20" />
            </div>
        </motion.div>
    )
}

function SharedSections({
    id,
    date,
    template,
    location_name,
    location_city,
    itemVariants,
    mapClassName,
    mapFrameClassName,
}: TemplateRendererProps & { mapClassName: string; mapFrameClassName: string }) {
    return (
        <>
            <motion.div variants={itemVariants}>
                <Countdown date={date} template={template} />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12">
                <div className={`relative p-6 sm:p-8 border shadow-sm overflow-hidden ${mapClassName}`}>
                    <h2 className="font-playfair font-bold text-2xl mb-2 tracking-wide">
                        {location_name}
                    </h2>
                    <p className="font-montserrat tracking-widest text-sm mb-6 opacity-65">
                        {location_city}
                    </p>

                    <div className={`relative overflow-hidden shadow-md border ${mapFrameClassName}`}>
                        <iframe
                            title={`${location_name} map`}
                            className="w-full h-48 filter grayscale-[0.25] contrast-[1.05] hover:grayscale-0 transition-all duration-700 border-none"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(location_name + ' ' + location_city)}&output=embed`}
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12">
                <GuestForm invitationId={id} template={template} />
            </motion.div>
        </>
    )
}
