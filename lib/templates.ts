export const invitationTemplates = [
    {
        id: 'glassmorphism-luxury',
        name: 'Glassmorphism Luxury',
        shortName: 'Glass',
        description: 'زجاجي فاخر بخلفية وردية وبنفسجية وبطاقة شفافة.',
    },
    {
        id: 'neumorphism-soft',
        name: 'Neumorphism Soft',
        shortName: 'Soft',
        description: 'نيو مورفيزم ناعم بظلال مجسمة وألوان بيج هادئة.',
    },
    {
        id: 'gradient-wave-modern',
        name: 'Gradient Wave Modern',
        shortName: 'Wave',
        description: 'موجات متدرجة عصرية مع إطار ذهبي خفيف.',
    },
    {
        id: 'dark-elegant-premium',
        name: 'Dark Elegant Premium',
        shortName: 'Dark',
        description: 'داكن فاخر بخلفية سوداء وحواف ذهبية متوهجة.',
    },
    {
        id: 'floral-watercolor',
        name: 'Floral Watercolor',
        shortName: 'Floral',
        description: 'ورود ألوان مائية وخلفية بيضاء دافئة.',
    },
    {
        id: 'botanical-watercolor',
        name: 'Botanical Watercolor',
        shortName: 'Botanic',
        description: 'دعوة كريمية ناعمة بزخارف نباتية مائية ولمسات ذهبية.',
    },
    {
        id: 'pink-photo-floral',
        name: 'Pink Photo Floral',
        shortName: 'Pink',
        description: 'دعوة وردية مائية مع إطار دائري للصورة وزهور ناعمة.',
    },
    {
        id: 'burgundy-gold-floral',
        name: 'Burgundy Gold Floral',
        shortName: 'Royal',
        description: 'دعوة ملكية بزهور عنابية ووردية وإطار ذهبي رفيع.',
    },
    {
        id: 'sage-save-date',
        name: 'Sage Save The Date',
        shortName: 'Sage',
        description: 'دعوة Save the Date بيضاء وخضراء بأكاليل نباتية بسيطة.',
    },
    {
        id: 'arabic-blush-story',
        name: 'Arabic Blush Story',
        shortName: 'Arabic',
        description: 'تصميم عربي عمودي أبيض ووردي مناسب للستوري.',
    },
    {
        id: 'geometric-modern',
        name: 'Geometric Modern',
        shortName: 'Geo',
        description: 'هندسي عصري بألوان جريئة وتباين عال.',
    },
    {
        id: 'animated-particle',
        name: 'Animated Particle',
        shortName: 'Particle',
        description: 'جزيئات متحركة وبطاقة شفافة مركزية.',
    },
    {
        id: 'minimalist-japanese',
        name: 'Minimalist Japanese',
        shortName: 'Japan',
        description: 'بساطة يابانية ومساحات بيضاء ولمسة ذهبية.',
    },
] as const

export type InvitationTemplateId = (typeof invitationTemplates)[number]['id']

export const defaultInvitationTemplate: InvitationTemplateId = 'glassmorphism-luxury'

export type InvitationThemeMode = 'dark' | 'light'

export const defaultInvitationThemeMode: InvitationThemeMode = 'dark'

export type InvitationThemeVars = Record<`--invite-${string}`, string>

export const invitationThemeVars: Record<InvitationThemeMode, InvitationThemeVars> = {
    dark: {
        '--invite-bg': '#080808',
        '--invite-bg-soft': '#12100c',
        '--invite-surface': '#1a1a1a',
        '--invite-surface-soft': '#2d2d2d',
        '--invite-text': '#f8f3df',
        '--invite-text-muted': '#e8dfc0',
        '--invite-accent': '#FFD700',
        '--invite-accent-soft': '#fff5a8',
        '--invite-border': 'rgba(255,215,0,0.35)',
        '--invite-shadow': 'rgba(255,215,0,0.14)',
    },
    light: {
        '--invite-bg': '#fffaf0',
        '--invite-bg-soft': '#f6ecd8',
        '--invite-surface': '#ffffff',
        '--invite-surface-soft': '#f8efe0',
        '--invite-text': '#382d22',
        '--invite-text-muted': '#6e5d49',
        '--invite-accent': '#b79552',
        '--invite-accent-soft': '#e6d5ad',
        '--invite-border': 'rgba(183,149,82,0.42)',
        '--invite-shadow': 'rgba(110,82,36,0.16)',
    },
}

export function getInvitationThemeMode(mode?: string | null): InvitationThemeMode {
    return mode?.trim().toLowerCase() === 'light' ? 'light' : defaultInvitationThemeMode
}

export function getInvitationThemeVars(mode: InvitationThemeMode): InvitationThemeVars {
    return invitationThemeVars[mode]
}

export type InvitationTemplateUi = {
    pageBackground: string
    switcher: string
    switcherActive: string
    switcherIdle: string
    actionButton: string
    actionIcon: string
    countdownText: string
    digitBox: string
    digitText: string
    formLine: string
    formTitle: string
    formPanel: string
    formInput: string
    formButton: string
    formSuccess: string
}

export const invitationTemplateUi: Record<InvitationTemplateId, InvitationTemplateUi> = {
    'glassmorphism-luxury': {
        pageBackground: 'bg-[radial-gradient(circle_at_18%_18%,rgba(224,187,228,0.92)_0,transparent_30%),radial-gradient(circle_at_82%_12%,rgba(210,145,188,0.82)_0,transparent_28%),radial-gradient(circle_at_50%_88%,rgba(149,125,173,0.86)_0,transparent_34%),linear-gradient(135deg,#f4dcff_0%,#f8cfe5_46%,#c7b8ff_100%)]',
        switcher: 'border-white/55 bg-[#6f4aa0]/22 text-[#2f1f49] backdrop-blur-2xl shadow-[0_18px_50px_rgba(118,75,162,0.24)]',
        switcherActive: 'bg-[#4b2f73] text-white shadow-md',
        switcherIdle: 'bg-white/32 text-[#3b255c] hover:bg-white/52',
        actionButton: 'bg-[#6f4aa0]/24 border-white/55 text-[#2f1f49] backdrop-blur-xl shadow-[0_18px_45px_rgba(118,75,162,0.22)] hover:bg-white/42',
        actionIcon: 'text-[#6f2f80]',
        countdownText: 'text-[#3b255c]',
        digitBox: 'bg-[#f4e2ff]/55 border-white/65 backdrop-blur-xl shadow-[0_18px_45px_rgba(118,75,162,0.18)]',
        digitText: 'text-[#3b255c]',
        formLine: 'bg-[#764ba2]/42',
        formTitle: 'text-[#4b2f73]',
        formPanel: 'bg-[#f4e2ff]/42 border-white/60 backdrop-blur-xl shadow-[0_18px_45px_rgba(118,75,162,0.18)]',
        formInput: 'bg-white/48 border-white/65 text-[#3b255c] placeholder:text-[#674c77]/60 focus:ring-[#9b4f8f]/50',
        formButton: 'bg-[linear-gradient(135deg,#764ba2,#9b4f8f)] text-white shadow-[0_14px_35px_rgba(118,75,162,0.22)]',
        formSuccess: 'text-[#4b2f73]',
    },
    'neumorphism-soft': {
        pageBackground: 'bg-[#ede4db]',
        switcher: 'border-[#f8f1ea] bg-[#ede4db] text-[#6f5b4b] shadow-[8px_8px_22px_#d1c7bb,-8px_-8px_22px_#ffffff]',
        switcherActive: 'bg-[#C9B8A8] text-[#5d493b] shadow-[inset_3px_3px_8px_#ad9f91,inset_-3px_-3px_8px_#ead8c7]',
        switcherIdle: 'bg-[#ede4db] text-[#7b6654] hover:bg-[#f3ebe3]',
        actionButton: 'bg-[#ede4db] border-[#f8f1ea] text-[#6f5b4b] shadow-[8px_8px_18px_#d1c7bb,-8px_-8px_18px_#ffffff] hover:bg-[#f3ebe3]',
        actionIcon: 'text-[#8f7763]',
        countdownText: 'text-[#6f5b4b]',
        digitBox: 'bg-[#ede4db] border-[#f8f1ea] shadow-[inset_7px_7px_14px_#d1c7bb,inset_-7px_-7px_14px_#ffffff]',
        digitText: 'text-[#6f5b4b]',
        formLine: 'bg-[#C9B8A8]',
        formTitle: 'text-[#8f7763]',
        formPanel: 'bg-[#ede4db] border-[#f8f1ea] shadow-[10px_10px_24px_#d1c7bb,-10px_-10px_24px_#ffffff]',
        formInput: 'bg-[#ede4db] border-[#f8f1ea] text-[#6f5b4b] placeholder:text-[#9b806b]/60 focus:ring-[#C9B8A8]',
        formButton: 'bg-[#C9B8A8] text-[#5d493b] shadow-[8px_8px_18px_#d1c7bb,-8px_-8px_18px_#ffffff]',
        formSuccess: 'text-[#8f7763]',
    },
    'gradient-wave-modern': {
        pageBackground: 'bg-[linear-gradient(135deg,#FA709A_0%,#FEE140_38%,#30CFD0_70%,#330867_100%)] animate-[gradientShift_18s_ease_infinite] bg-[length:240%_240%]',
        switcher: 'border-[#D4AF37]/55 bg-[#330867]/50 text-white shadow-[0_18px_50px_rgba(51,8,103,0.22)]',
        switcherActive: 'bg-[#D4AF37] text-[#330867] shadow-md',
        switcherIdle: 'bg-[#330867]/35 text-white hover:bg-white/80 hover:text-[#330867]',
        actionButton: 'bg-[#330867]/42 border-[#D4AF37]/45 text-white backdrop-blur-xl shadow-[0_18px_45px_rgba(51,8,103,0.22)] hover:bg-white/85 hover:text-[#330867]',
        actionIcon: 'text-[#FEE140]',
        countdownText: 'text-white',
        digitBox: 'bg-[#330867]/38 border-[#D4AF37]/50 backdrop-blur-xl shadow-[0_18px_45px_rgba(51,8,103,0.22)]',
        digitText: 'text-white',
        formLine: 'bg-[#D4AF37]/60',
        formTitle: 'text-[#FEE140]',
        formPanel: 'bg-[#330867]/35 border-[#D4AF37]/45 backdrop-blur-xl shadow-[0_18px_45px_rgba(51,8,103,0.22)]',
        formInput: 'bg-[#330867]/35 border-[#D4AF37]/45 text-white placeholder:text-white/55 focus:ring-[#FEE140]/60',
        formButton: 'bg-[linear-gradient(135deg,#FA709A,#FEE140)] text-[#330867] shadow-[0_14px_35px_rgba(250,112,154,0.25)]',
        formSuccess: 'text-[#FEE140]',
    },
    'dark-elegant-premium': {
        pageBackground: 'bg-[var(--invite-bg)]',
        switcher: 'border-[var(--invite-border)] bg-[var(--invite-surface)]/90 text-[var(--invite-text)] shadow-[0_18px_50px_var(--invite-shadow)]',
        switcherActive: 'bg-[var(--invite-accent)] text-[var(--invite-bg)] shadow-[0_0_22px_var(--invite-shadow)]',
        switcherIdle: 'bg-[var(--invite-surface-soft)] text-[var(--invite-text)] hover:bg-[var(--invite-bg-soft)]',
        actionButton: 'bg-[var(--invite-surface)]/95 border-[var(--invite-border)] text-[var(--invite-text)] shadow-[0_18px_50px_var(--invite-shadow)] hover:bg-[var(--invite-surface-soft)]',
        actionIcon: 'text-[var(--invite-accent)]',
        countdownText: 'text-[var(--invite-text)]',
        digitBox: 'bg-[var(--invite-surface-soft)] border-[var(--invite-border)] shadow-[0_0_24px_var(--invite-shadow)]',
        digitText: 'text-[var(--invite-accent)]',
        formLine: 'bg-[var(--invite-accent)]/45',
        formTitle: 'text-[var(--invite-accent)]',
        formPanel: 'bg-[var(--invite-surface-soft)] border-[var(--invite-border)] shadow-[0_18px_45px_rgba(0,0,0,0.20)]',
        formInput: 'bg-[var(--invite-surface)] border-[var(--invite-border)] text-[var(--invite-text)] placeholder:text-[var(--invite-text-muted)] focus:ring-[var(--invite-accent)]/50',
        formButton: 'bg-[var(--invite-accent)] text-[var(--invite-bg)] shadow-[0_0_24px_var(--invite-shadow)]',
        formSuccess: 'text-[var(--invite-accent)]',
    },
    'floral-watercolor': {
        pageBackground: 'bg-[#FFFEF9]',
        switcher: 'border-[#FFE5E5] bg-white/80 text-[#7b4b52] shadow-[0_18px_50px_rgba(186,144,198,0.16)]',
        switcherActive: 'bg-[#E8A0BF] text-[#5d3441] shadow-md',
        switcherIdle: 'bg-white/75 text-[#7b4b52] hover:bg-[#FFE5E5]',
        actionButton: 'bg-white/85 border-[#FFE5E5] text-[#7b4b52] shadow-[0_18px_45px_rgba(232,160,191,0.16)] hover:bg-[#FFE5E5]',
        actionIcon: 'text-[#a24e7a]',
        countdownText: 'text-[#7b4b52]',
        digitBox: 'bg-white/80 border-[#FFE5E5] shadow-[0_16px_38px_rgba(232,160,191,0.16)]',
        digitText: 'text-[#8f5a9e]',
        formLine: 'bg-[#E8A0BF]/45',
        formTitle: 'text-[#8f5a9e]',
        formPanel: 'bg-white/80 border-[#FFE5E5] shadow-[0_18px_45px_rgba(232,160,191,0.13)]',
        formInput: 'bg-white/85 border-[#FFE5E5] text-[#7b4b52] placeholder:text-[#E8A0BF]/70 focus:ring-[#BA90C6]/40',
        formButton: 'bg-[linear-gradient(135deg,#E8A0BF,#BA90C6)] text-[#5d3441] shadow-[0_14px_35px_rgba(186,144,198,0.22)]',
        formSuccess: 'text-[#BA90C6]',
    },
    'botanical-watercolor': {
        pageBackground: 'bg-[radial-gradient(circle_at_12%_10%,rgba(199,218,193,0.72)_0,transparent_26%),radial-gradient(circle_at_88%_18%,rgba(241,203,211,0.72)_0,transparent_24%),radial-gradient(circle_at_14%_92%,rgba(233,213,178,0.58)_0,transparent_28%),linear-gradient(135deg,#fbf8ef_0%,#f6f0e4_48%,#eef5ed_100%)]',
        switcher: 'border-[#d8c79d]/55 bg-[#fbf8ef]/82 text-[#42563f] shadow-[0_18px_48px_rgba(66,86,63,0.13)]',
        switcherActive: 'bg-[#526a4e] text-[#fffaf0] shadow-md',
        switcherIdle: 'bg-white/55 text-[#526a4e] hover:bg-[#f3ead8]',
        actionButton: 'bg-[#fbf8ef]/84 border-[#d8c79d]/55 text-[#42563f] backdrop-blur-xl shadow-[0_18px_45px_rgba(66,86,63,0.13)] hover:bg-[#fffaf0]',
        actionIcon: 'text-[#b79552]',
        countdownText: 'text-[#42563f]',
        digitBox: 'bg-[#fffaf0]/86 border-[#d8c79d]/60 shadow-[0_14px_34px_rgba(82,106,78,0.12)]',
        digitText: 'text-[#42563f]',
        formLine: 'bg-[#b79552]/45',
        formTitle: 'text-[#526a4e]',
        formPanel: 'bg-[#fffaf0]/86 border-[#d8c79d]/50 shadow-[0_18px_45px_rgba(82,106,78,0.10)]',
        formInput: 'bg-white/72 border-[#d8c79d]/55 text-[#42563f] placeholder:text-[#7a8c70]/60 focus:ring-[#b79552]/40',
        formButton: 'bg-[#526a4e] text-[#fffaf0] shadow-[0_14px_32px_rgba(82,106,78,0.20)]',
        formSuccess: 'text-[#526a4e]',
    },
    'pink-photo-floral': {
        pageBackground: 'bg-[radial-gradient(circle_at_18%_8%,rgba(244,190,203,0.78)_0,transparent_28%),radial-gradient(circle_at_86%_88%,rgba(201,219,216,0.62)_0,transparent_26%),linear-gradient(135deg,#fff7f8_0%,#f9e7ec_50%,#fffaf7_100%)]',
        switcher: 'border-[#f0c6d0]/70 bg-white/75 text-[#7b4b58] shadow-[0_18px_48px_rgba(174,111,130,0.14)]',
        switcherActive: 'bg-[#8f4f5f] text-white shadow-md',
        switcherIdle: 'bg-white/60 text-[#7b4b58] hover:bg-[#f8e0e6]',
        actionButton: 'bg-white/78 border-[#f0c6d0]/75 text-[#7b4b58] backdrop-blur-xl shadow-[0_18px_45px_rgba(174,111,130,0.14)] hover:bg-[#fff7f8]',
        actionIcon: 'text-[#8f4f5f]',
        countdownText: 'text-[#6f4450]',
        digitBox: 'bg-white/84 border-[#f0c6d0]/70 shadow-[0_14px_34px_rgba(174,111,130,0.12)]',
        digitText: 'text-[#7b4b58]',
        formLine: 'bg-[#d8a0ac]/55',
        formTitle: 'text-[#9b6270]',
        formPanel: 'bg-white/84 border-[#f0c6d0]/65 shadow-[0_18px_45px_rgba(174,111,130,0.11)]',
        formInput: 'bg-white/82 border-[#f0c6d0]/70 text-[#6f4450] placeholder:text-[#b97788]/55 focus:ring-[#d8a0ac]/45',
        formButton: 'bg-[#8f4f5f] text-white shadow-[0_14px_32px_rgba(174,111,130,0.20)]',
        formSuccess: 'text-[#9b6270]',
    },
    'burgundy-gold-floral': {
        pageBackground: 'bg-[radial-gradient(circle_at_16%_12%,rgba(106,25,50,0.18)_0,transparent_28%),radial-gradient(circle_at_88%_12%,rgba(215,187,107,0.24)_0,transparent_24%),linear-gradient(135deg,#fffaf4_0%,#f7eee7_45%,#fffdf8_100%)]',
        switcher: 'border-[#d1ad55]/65 bg-[#fffaf4]/84 text-[#5b2130] shadow-[0_18px_48px_rgba(91,33,48,0.13)]',
        switcherActive: 'bg-[#6a1932] text-[#fff7e8] shadow-md',
        switcherIdle: 'bg-white/60 text-[#5b2130] hover:bg-[#f5e5d8]',
        actionButton: 'bg-[#fffaf4]/84 border-[#d1ad55]/60 text-[#5b2130] backdrop-blur-xl shadow-[0_18px_45px_rgba(91,33,48,0.13)] hover:bg-[#fff7e8]',
        actionIcon: 'text-[#b6933c]',
        countdownText: 'text-[#5b2130]',
        digitBox: 'bg-[#fffaf4]/90 border-[#d1ad55]/65 shadow-[0_14px_34px_rgba(91,33,48,0.12)]',
        digitText: 'text-[#6a1932]',
        formLine: 'bg-[#d1ad55]/60',
        formTitle: 'text-[#6a1932]',
        formPanel: 'bg-[#fffaf4]/88 border-[#d1ad55]/55 shadow-[0_18px_45px_rgba(91,33,48,0.10)]',
        formInput: 'bg-white/78 border-[#d1ad55]/55 text-[#5b2130] placeholder:text-[#8f6470]/55 focus:ring-[#d1ad55]/45',
        formButton: 'bg-[#6a1932] text-[#fff7e8] shadow-[0_14px_32px_rgba(91,33,48,0.20)]',
        formSuccess: 'text-[#6a1932]',
    },
    'sage-save-date': {
        pageBackground: 'bg-[radial-gradient(circle_at_50%_12%,rgba(170,194,151,0.42)_0,transparent_24%),radial-gradient(circle_at_14%_72%,rgba(225,233,218,0.76)_0,transparent_24%),linear-gradient(135deg,#fbfbf7_0%,#f5f8f1_52%,#ffffff_100%)]',
        switcher: 'border-[#c8d4bf]/75 bg-white/80 text-[#4e6548] shadow-[0_18px_48px_rgba(78,101,72,0.12)]',
        switcherActive: 'bg-[#4e6548] text-white shadow-md',
        switcherIdle: 'bg-white/65 text-[#4e6548] hover:bg-[#eef4ea]',
        actionButton: 'bg-white/84 border-[#c8d4bf]/75 text-[#4e6548] backdrop-blur-xl shadow-[0_18px_45px_rgba(78,101,72,0.12)] hover:bg-[#f5f8f1]',
        actionIcon: 'text-[#8b6d3b]',
        countdownText: 'text-[#4e6548]',
        digitBox: 'bg-white/90 border-[#c8d4bf]/80 shadow-[0_14px_34px_rgba(78,101,72,0.10)]',
        digitText: 'text-[#4e6548]',
        formLine: 'bg-[#88a97a]/48',
        formTitle: 'text-[#4e6548]',
        formPanel: 'bg-white/86 border-[#c8d4bf]/75 shadow-[0_18px_45px_rgba(78,101,72,0.09)]',
        formInput: 'bg-white/84 border-[#c8d4bf]/75 text-[#4e6548] placeholder:text-[#7f9276]/58 focus:ring-[#88a97a]/40',
        formButton: 'bg-[#4e6548] text-white shadow-[0_14px_32px_rgba(78,101,72,0.18)]',
        formSuccess: 'text-[#4e6548]',
    },
    'arabic-blush-story': {
        pageBackground: 'bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,198,0.48)_0,transparent_26%),radial-gradient(circle_at_50%_100%,rgba(200,224,218,0.68)_0,transparent_30%),linear-gradient(180deg,#ffffff_0%,#fff8f8_52%,#ffffff_100%)]',
        switcher: 'border-[#ead3d6]/80 bg-white/84 text-[#5c5955] shadow-[0_18px_48px_rgba(120,95,95,0.11)]',
        switcherActive: 'bg-[#6c6862] text-white shadow-md',
        switcherIdle: 'bg-white/68 text-[#5c5955] hover:bg-[#fff1f2]',
        actionButton: 'bg-white/86 border-[#ead3d6]/80 text-[#5c5955] backdrop-blur-xl shadow-[0_18px_45px_rgba(120,95,95,0.11)] hover:bg-[#fff8f8]',
        actionIcon: 'text-[#d69aa4]',
        countdownText: 'text-[#5c5955]',
        digitBox: 'bg-white/90 border-[#ead3d6]/80 shadow-[0_14px_34px_rgba(120,95,95,0.09)]',
        digitText: 'text-[#5c5955]',
        formLine: 'bg-[#d69aa4]/45',
        formTitle: 'text-[#6c6862]',
        formPanel: 'bg-white/88 border-[#ead3d6]/80 shadow-[0_18px_45px_rgba(120,95,95,0.09)]',
        formInput: 'bg-white/86 border-[#ead3d6]/80 text-[#5c5955] placeholder:text-[#a89999]/58 focus:ring-[#d69aa4]/38',
        formButton: 'bg-[#6c6862] text-white shadow-[0_14px_32px_rgba(120,95,95,0.18)]',
        formSuccess: 'text-[#6c6862]',
    },
    'geometric-modern': {
        pageBackground: 'bg-[#f8fbfa]',
        switcher: 'border-[#1A535C] bg-white text-[#1A535C] shadow-[8px_8px_0_#4ECDC4]',
        switcherActive: 'bg-[#FFE66D] text-[#1A535C] shadow-[4px_4px_0_#FF6B6B]',
        switcherIdle: 'bg-white text-[#1A535C] hover:bg-[#FFE66D]/60',
        actionButton: 'bg-white border-2 border-[#1A535C] text-[#1A535C] shadow-[5px_5px_0_#4ECDC4] hover:bg-[#FFE66D]/60',
        actionIcon: 'text-[#FF6B6B]',
        countdownText: 'text-[#1A535C]',
        digitBox: 'bg-[#FFE66D] border-[#1A535C] shadow-[5px_5px_0_#4ECDC4]',
        digitText: 'text-[#1A535C]',
        formLine: 'bg-[#FF6B6B]',
        formTitle: 'text-[#FF6B6B]',
        formPanel: 'bg-white border-2 border-[#1A535C] shadow-[8px_8px_0_#4ECDC4]',
        formInput: 'bg-white border-2 border-[#1A535C] text-[#1A535C] placeholder:text-[#1A535C]/45 focus:ring-[#FFE66D]',
        formButton: 'bg-[#1A535C] text-white shadow-[5px_5px_0_#FFE66D]',
        formSuccess: 'text-[#1A535C]',
    },
    'animated-particle': {
        pageBackground: 'bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]',
        switcher: 'border-white/65 bg-white/85 text-[#C44569] shadow-[0_18px_50px_rgba(102,126,234,0.18)]',
        switcherActive: 'bg-[#FF6B9D] text-[#5b1234] shadow-md',
        switcherIdle: 'bg-white/75 text-[#C44569] hover:bg-white',
        actionButton: 'bg-white/90 border-white text-[#C44569] shadow-[0_18px_45px_rgba(102,126,234,0.18)] hover:bg-white',
        actionIcon: 'text-[#C44569]',
        countdownText: 'text-[#C44569]',
        digitBox: 'bg-white/90 border-[#FF6B9D]/25 shadow-[0_16px_38px_rgba(255,107,157,0.16)]',
        digitText: 'text-[#C44569]',
        formLine: 'bg-[#FF6B9D]/45',
        formTitle: 'text-[#C44569]',
        formPanel: 'bg-white/90 border-white shadow-[0_18px_45px_rgba(102,126,234,0.16)]',
        formInput: 'bg-white border-[#FF6B9D]/25 text-[#C44569] placeholder:text-[#FF6B9D]/55 focus:ring-[#FF6B9D]/40',
        formButton: 'bg-[linear-gradient(135deg,#FF6B9D,#FFA07A,#FFD93D)] text-[#5b1234] shadow-[0_14px_35px_rgba(255,107,157,0.22)]',
        formSuccess: 'text-[#C44569]',
    },
    'minimalist-japanese': {
        pageBackground: 'bg-white',
        switcher: 'border-[#E0E0E0] bg-white text-black shadow-[0_18px_45px_rgba(0,0,0,0.08)]',
        switcherActive: 'bg-black text-white shadow-none',
        switcherIdle: 'bg-white text-black hover:bg-[#f7f7f7]',
        actionButton: 'bg-white border border-black text-black shadow-[0_18px_45px_rgba(0,0,0,0.08)] hover:bg-[#f7f7f7]',
        actionIcon: 'text-[#C9A96E]',
        countdownText: 'text-black',
        digitBox: 'bg-white border-black shadow-none',
        digitText: 'text-black',
        formLine: 'bg-[#E0E0E0]',
        formTitle: 'text-black',
        formPanel: 'bg-white border-[#E0E0E0] shadow-none',
        formInput: 'bg-white border-[#E0E0E0] text-black placeholder:text-black/35 focus:ring-[#C9A96E]/45',
        formButton: 'bg-white border border-black text-black shadow-none',
        formSuccess: 'text-[#C9A96E]',
    },
}

const templateAliases: Record<string, InvitationTemplateId> = {
    'romantic-envelope': 'glassmorphism-luxury',
    classic: 'minimalist-japanese',
    'arabic-luxury': 'dark-elegant-premium',
    minimal: 'minimalist-japanese',
    floral: 'floral-watercolor',
    botanical: 'botanical-watercolor',
    botanic: 'botanical-watercolor',
    pink: 'pink-photo-floral',
    royal: 'burgundy-gold-floral',
    burgundy: 'burgundy-gold-floral',
    sage: 'sage-save-date',
    arabic: 'arabic-blush-story',
}

export function getInvitationTemplateUi(template: InvitationTemplateId): InvitationTemplateUi {
    return invitationTemplateUi[template]
}

export function getInvitationTemplateId(template?: string | null): InvitationTemplateId {
    const normalizedTemplate = template?.trim().toLowerCase().replaceAll('_', '-').replaceAll(' ', '-')

    if (!normalizedTemplate) {
        return defaultInvitationTemplate
    }

    const match = invitationTemplates.find((item) => item.id === normalizedTemplate)

    return match?.id ?? templateAliases[normalizedTemplate] ?? defaultInvitationTemplate
}
