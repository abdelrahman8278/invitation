import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationTemplateId } from '../../constants/templates';
import { EnvelopeShapeId } from '../../constants/envelopes';
import { getEventCategoryConfig } from '../../constants/events';

interface EnvelopeStyle {
  back: string;
  side: string;
  bottom: string;
  top: string;
  card: string;
  names: string;
  line: string;
  seal: string;
  sealInner: string;
  sealText: string;
  hint: string;
  decorClass?: string;
}

const envelopeStyles: Record<InvitationTemplateId, EnvelopeStyle> = {
  'royal-emerald-gold': {
    back: 'bg-[#06261b] border-amber-400/60 shadow-[0_30px_90px_rgba(2,20,13,0.6)]',
    side: 'bg-[#093828]',
    bottom: 'bg-[#051f15] border-amber-400/50',
    top: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border-amber-300',
    card: 'bg-[#072a1e] border-amber-400/60 shadow-2xl',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-amber-400',
    seal: 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-200',
    sealInner: 'bg-[#051f15]',
    sealText: 'text-amber-300',
    hint: 'text-amber-300',
    decorClass: 'emerald-decor',
  },
  'midnight-starlight': {
    back: 'bg-[#0a1228] border-sky-400/60 shadow-[0_30px_90px_rgba(3,7,18,0.7)]',
    side: 'bg-[#0f1d42]',
    bottom: 'bg-[#070e20] border-sky-400/50',
    top: 'bg-gradient-to-r from-sky-400 via-blue-400 to-amber-300 border-sky-300',
    card: 'bg-[#0d1838] border-sky-400/50 shadow-2xl',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-sky-400',
    seal: 'bg-gradient-to-r from-sky-400 to-amber-300 border-white',
    sealInner: 'bg-[#070e20]',
    sealText: 'text-sky-200',
    hint: 'text-sky-300',
    decorClass: 'midnight-decor',
  },
  'rose-gold-blush': {
    back: 'bg-[#fff5f7] border-[#e09fae] shadow-[0_30px_80px_rgba(183,80,105,0.18)]',
    side: 'bg-[#fcd2dc]',
    bottom: 'bg-[#fee6ec] border-[#e09fae]',
    top: 'bg-gradient-to-r from-[#e09fae] via-[#f7cad5] to-[#c97187] border-white/80',
    card: 'bg-white border-[#e09fae] shadow-md',
    names: 'text-[#8c2a42] font-black',
    line: 'bg-[#b75069]',
    seal: 'bg-[#b75069] border-white',
    sealInner: 'bg-[#fee6ec]',
    sealText: 'text-[#8c2a42]',
    hint: 'text-[#8c2a42]',
  },
  'arabic-islamic-gold': {
    back: 'bg-[#18120a] border-amber-400/60 shadow-[0_30px_90px_rgba(0,0,0,0.6)]',
    side: 'bg-[#241c10]',
    bottom: 'bg-[#120e07] border-amber-400/50',
    top: 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 border-amber-300',
    card: 'bg-[#1d160c] border-amber-400/60 shadow-2xl',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-amber-400',
    seal: 'bg-amber-400 border-amber-200',
    sealInner: 'bg-[#120e07]',
    sealText: 'text-amber-300',
    hint: 'text-amber-300',
    decorClass: 'islamic-decor',
  },
  'bohemian-terracotta': {
    back: 'bg-[#fcf7f2] border-[#c97d60]/50 shadow-[0_30px_80px_rgba(201,125,96,0.18)]',
    side: 'bg-[#f5e9de]',
    bottom: 'bg-[#ebd7c7] border-[#c97d60]/40',
    top: 'bg-gradient-to-r from-[#c97d60] via-[#e2a288] to-[#b35d3d] border-white/80',
    card: 'bg-white border-[#c97d60]/40 shadow-md',
    names: 'text-[#5e2e1e] font-black',
    line: 'bg-[#c97d60]',
    seal: 'bg-[#c97d60] border-white',
    sealInner: 'bg-[#f5e9de]',
    sealText: 'text-[#5e2e1e]',
    hint: 'text-[#5e2e1e]',
  },
  'pearl-minimalist': {
    back: 'bg-white border-stone-300 shadow-[0_24px_70px_rgba(0,0,0,0.08)]',
    side: 'bg-stone-50',
    bottom: 'bg-stone-100 border-stone-200',
    top: 'bg-gradient-to-r from-stone-200 via-white to-stone-300 border-stone-300',
    card: 'bg-white border-stone-300 shadow-sm',
    names: 'text-stone-900 font-extrabold',
    line: 'bg-stone-800',
    seal: 'bg-stone-900 border-stone-400',
    sealInner: 'bg-white',
    sealText: 'text-stone-900',
    hint: 'text-stone-700',
  },
  'violet-aurora': {
    back: 'bg-[#1e0b36] border-fuchsia-400/50 shadow-[0_30px_90px_rgba(30,11,54,0.6)]',
    side: 'bg-[#2d124d]',
    bottom: 'bg-[#150627] border-fuchsia-400/40',
    top: 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 border-fuchsia-300',
    card: 'bg-[#270e47] border-fuchsia-400/50 shadow-2xl',
    names: 'text-fuchsia-200 font-extrabold',
    line: 'bg-fuchsia-400',
    seal: 'bg-gradient-to-r from-fuchsia-500 to-pink-500 border-white',
    sealInner: 'bg-[#150627]',
    sealText: 'text-fuchsia-200',
    hint: 'text-fuchsia-300',
    decorClass: 'aurora-decor',
  },
  'glassmorphism-luxury': {
    back: 'bg-[#f4e2ff]/48 border-white/60 backdrop-blur-xl shadow-[0_30px_90px_rgba(118,75,162,0.24)]',
    side: 'bg-[#d9b4e3]/82',
    bottom: 'bg-[#f6d7ea]/70 border-[#b98ccf]/55',
    top: 'bg-[linear-gradient(135deg,#e0bbe4,#d291bc,#957dad)] border-white/65',
    card: 'bg-white/60 border-white/75',
    names: 'text-[#3b255c] font-black',
    line: 'bg-[#764ba2]',
    seal: 'bg-[#764ba2] border-[#e0bbe4]',
    sealInner: 'bg-[#d291bc]',
    sealText: 'text-white',
    hint: 'text-[#3b255c]/85',
  },
  'dark-elegant-premium': {
    back: 'bg-[#141414] border-amber-400/60 shadow-[0_35px_95px_rgba(0,0,0,0.7)]',
    side: 'bg-[#1e1e1e]',
    bottom: 'bg-[#0a0a0a] border-amber-400/50',
    top: 'bg-[linear-gradient(135deg,#2a2a2a,#1a1a1a)] border-amber-400/60',
    card: 'bg-[#181818] border-amber-400/60',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-amber-400',
    seal: 'bg-amber-400 border-amber-200',
    sealInner: 'bg-[#0a0a0a]',
    sealText: 'text-amber-300',
    hint: 'text-amber-300',
    decorClass: 'dark-decor',
  },
  'floral-watercolor': {
    back: 'bg-[#FFFEF9] border-[#FFE5E5] shadow-[0_32px_80px_rgba(186,144,198,0.18)]',
    side: 'bg-[#FFE5E5]',
    bottom: 'bg-[#FFFEF9] border-[#E8A0BF]/40',
    top: 'bg-[linear-gradient(135deg,#FFE5E5,#C8E7ED,#B4E7CE)] border-white/70',
    card: 'bg-white/85 border-[#E8A0BF]/35',
    names: 'text-[#7b4b6a] font-bold',
    line: 'bg-[#E8A0BF]',
    seal: 'bg-[#E8A0BF] border-white',
    sealInner: 'bg-[#FFE5E5]',
    sealText: 'text-[#7b4b6a]',
    hint: 'text-[#7b4b6a]',
    decorClass: 'floral-decor',
  },
  'burgundy-gold-floral': {
    back: 'bg-[#1f030a] border-amber-400/60 shadow-[0_35px_95px_rgba(31,3,10,0.65)]',
    side: 'bg-[#2d0711]',
    bottom: 'bg-[#170207] border-amber-400/50',
    top: 'bg-gradient-to-r from-amber-400 via-rose-300 to-amber-500 border-amber-300',
    card: 'bg-[#24050d] border-amber-400/60 shadow-2xl',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-amber-400',
    seal: 'bg-amber-400 border-amber-200',
    sealInner: 'bg-[#170207]',
    sealText: 'text-amber-300',
    hint: 'text-amber-300',
    decorClass: 'emerald-decor',
  },
  'botanical-watercolor': {
    back: 'bg-[#fcfdfa] border-[#84a98c]/50 shadow-[0_28px_80px_rgba(132,169,140,0.18)]',
    side: 'bg-[#e9f0ea]',
    bottom: 'bg-[#dfebe1] border-[#84a98c]/40',
    top: 'bg-gradient-to-r from-[#84a98c] via-[#b5c99a] to-[#52796f] border-white/80',
    card: 'bg-white border-[#84a98c]/40 shadow-md',
    names: 'text-[#2f3e46] font-black',
    line: 'bg-[#52796f]',
    seal: 'bg-[#52796f] border-white',
    sealInner: 'bg-[#e9f0ea]',
    sealText: 'text-[#2f3e46]',
    hint: 'text-[#2f3e46]',
  },
  'sage-save-date': {
    back: 'bg-[#f7faf5] border-[#4e6548]/40 shadow-[0_28px_80px_rgba(78,101,72,0.18)]',
    side: 'bg-[#eaf2e6]',
    bottom: 'bg-[#dce8d6] border-[#4e6548]/35',
    top: 'bg-gradient-to-r from-[#4e6548] via-[#738e6c] to-[#3a4d35] border-white/80',
    card: 'bg-white border-[#4e6548]/35 shadow-md',
    names: 'text-[#283f25] font-black',
    line: 'bg-[#4e6548]',
    seal: 'bg-[#4e6548] border-white',
    sealInner: 'bg-[#eaf2e6]',
    sealText: 'text-[#283f25]',
    hint: 'text-[#283f25]',
  },
  'pink-photo-floral': {
    back: 'bg-[#fffafb] border-[#f43f5e]/40 shadow-[0_28px_80px_rgba(244,63,94,0.18)]',
    side: 'bg-[#ffe4ea]',
    bottom: 'bg-[#ffd1dc] border-[#f43f5e]/35',
    top: 'bg-gradient-to-r from-[#f43f5e] via-[#fb7185] to-[#e11d48] border-white/80',
    card: 'bg-white border-[#f43f5e]/35 shadow-md',
    names: 'text-[#881337] font-black',
    line: 'bg-[#f43f5e]',
    seal: 'bg-[#f43f5e] border-white',
    sealInner: 'bg-[#ffe4ea]',
    sealText: 'text-[#881337]',
    hint: 'text-[#881337]',
  },
  'arabic-blush-story': {
    back: 'bg-[#fff8f9] border-[#e11d48]/40 shadow-[0_28px_80px_rgba(225,29,72,0.18)]',
    side: 'bg-[#ffe4e8]',
    bottom: 'bg-[#fecdd3] border-[#e11d48]/35',
    top: 'bg-gradient-to-r from-[#e11d48] via-[#f43f5e] to-[#be123c] border-white/80',
    card: 'bg-white border-[#e11d48]/35 shadow-md',
    names: 'text-[#4c0519] font-black',
    line: 'bg-[#e11d48]',
    seal: 'bg-[#e11d48] border-white',
    sealInner: 'bg-[#ffe4e8]',
    sealText: 'text-[#4c0519]',
    hint: 'text-[#4c0519]',
  },
  'neumorphism-soft': {
    back: 'bg-[#ede4db] border-[#f7eee5] shadow-[18px_18px_42px_#d1c7bb,-18px_-18px_42px_#ffffff]',
    side: 'bg-[#e5dcd3]',
    bottom: 'bg-[#ede4db] border-[#f8f1ea]',
    top: 'bg-gradient-to-r from-[#ede4db] via-[#f4ebe2] to-[#dfd5cb] border-[#f7eee5]',
    card: 'bg-[#ede4db] border-[#f8f1ea]',
    names: 'text-[#3e3025] font-black',
    line: 'bg-[#8f7763]',
    seal: 'bg-[#ede4db] border-[#f8f1ea]',
    sealInner: 'bg-[#ede4db]',
    sealText: 'text-[#3e3025]',
    hint: 'text-[#4a3b2f]',
  },
  'gradient-wave-modern': {
    back: 'bg-[#1b0336] border-amber-400/60 shadow-[0_35px_95px_rgba(51,8,103,0.7)]',
    side: 'bg-[#2a0654]',
    bottom: 'bg-[#0e011d] border-amber-400/50',
    top: 'bg-[linear-gradient(135deg,#FA709A,#FEE140,#30CFD0)] border-[#D4AF37]/70',
    card: 'bg-white/15 border-[#D4AF37]/60 backdrop-blur-xl',
    names: 'text-white font-black',
    line: 'bg-[#D4AF37]',
    seal: 'bg-[#D4AF37] border-white/80',
    sealInner: 'bg-[#330867]',
    sealText: 'text-white',
    hint: 'text-white',
  },
  'geometric-modern': {
    back: 'bg-[#1A535C] border-[#FFE66D] shadow-[0_35px_80px_rgba(26,83,92,0.28)]',
    side: 'bg-[#4ECDC4]',
    bottom: 'bg-[#FF6B6B] border-[#FFE66D]',
    top: 'bg-[linear-gradient(135deg,#FF6B6B,#FFE66D,#4ECDC4)] border-white/60',
    card: 'bg-[#f8fbfa] border-[#1A535C]',
    names: 'text-[#1A535C] font-black',
    line: 'bg-[#FF6B6B]',
    seal: 'bg-[#FFE66D] border-[#1A535C]',
    sealInner: 'bg-[#FF6B6B]',
    sealText: 'text-[#1A535C]',
    hint: 'text-[#1A535C]',
  },
  'animated-particle': {
    back: 'bg-white/80 border-white/80 shadow-[0_35px_95px_rgba(102,126,234,0.28)]',
    side: 'bg-[#FF6B9D]/80',
    bottom: 'bg-white/90 border-[#FFA07A]/50',
    top: 'bg-[linear-gradient(135deg,#FF6B9D,#FFA07A,#FFD93D)] border-white/70',
    card: 'bg-white/95 border-white',
    names: 'text-[#C44569] font-black',
    line: 'bg-[#FFD93D]',
    seal: 'bg-[#C44569] border-[#FFD93D]',
    sealInner: 'bg-[#FF6B9D]',
    sealText: 'text-white',
    hint: 'text-white',
    decorClass: 'particle-decor',
  },
  'minimalist-japanese': {
    back: 'bg-white border-black shadow-[0_24px_70px_rgba(0,0,0,0.12)]',
    side: 'bg-white',
    bottom: 'bg-white border-[#E0E0E0]',
    top: 'bg-white border-black',
    card: 'bg-white border-[#E0E0E0]',
    names: 'text-black font-black',
    line: 'bg-[#C9A96E]',
    seal: 'bg-white border-black',
    sealInner: 'bg-[#C9A96E]',
    sealText: 'text-black',
    hint: 'text-black/80',
  },
  'champagne-royal-silk': {
    back: 'bg-[#fffaf0] border-amber-400/60 shadow-[0_30px_90px_rgba(212,175,55,0.2)]',
    side: 'bg-[#fcedd2]',
    bottom: 'bg-[#fff7e6] border-amber-400/50',
    top: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border-amber-300',
    card: 'bg-white border-amber-400/60 shadow-2xl',
    names: 'text-amber-900 font-extrabold',
    line: 'bg-amber-400',
    seal: 'bg-gradient-to-r from-amber-400 to-yellow-500 border-amber-200',
    sealInner: 'bg-[#fff7e6]',
    sealText: 'text-amber-900',
    hint: 'text-amber-900',
    decorClass: 'emerald-decor',
  },
  'sapphire-midnight-gold': {
    back: 'bg-[#081730] border-sky-400/60 shadow-[0_30px_90px_rgba(8,23,48,0.7)]',
    side: 'bg-[#0e2448]',
    bottom: 'bg-[#050f20] border-sky-400/50',
    top: 'bg-gradient-to-r from-sky-400 via-blue-500 to-amber-300 border-sky-300',
    card: 'bg-[#0a1e3e] border-sky-400/50 shadow-2xl',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-sky-400',
    seal: 'bg-gradient-to-r from-sky-400 to-amber-300 border-white',
    sealInner: 'bg-[#050f20]',
    sealText: 'text-sky-200',
    hint: 'text-sky-300',
    decorClass: 'midnight-decor',
  },
  'lavender-provence-dream': {
    back: 'bg-[#faf5ff] border-purple-300 shadow-[0_30px_80px_rgba(168,85,247,0.18)]',
    side: 'bg-[#e9d5ff]',
    bottom: 'bg-[#f3e8ff] border-purple-300',
    top: 'bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-500 border-white/80',
    card: 'bg-white border-purple-300 shadow-md',
    names: 'text-purple-950 font-black',
    line: 'bg-purple-400',
    seal: 'bg-purple-500 border-white',
    sealInner: 'bg-[#f3e8ff]',
    sealText: 'text-purple-950',
    hint: 'text-purple-950',
  },
  'andalusian-palace-moroccan': {
    back: 'bg-[#1c0f06] border-amber-500/60 shadow-[0_30px_90px_rgba(0,0,0,0.6)]',
    side: 'bg-[#29170a]',
    bottom: 'bg-[#140b04] border-amber-500/50',
    top: 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 border-amber-300',
    card: 'bg-[#221308] border-amber-500/60 shadow-2xl',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-amber-500',
    seal: 'bg-amber-500 border-amber-200',
    sealInner: 'bg-[#140b04]',
    sealText: 'text-amber-300',
    hint: 'text-amber-300',
    decorClass: 'islamic-decor',
  },
  'obsidian-black-diamond': {
    back: 'bg-[#101010] border-slate-600 shadow-[0_35px_95px_rgba(0,0,0,0.85)]',
    side: 'bg-[#1a1a1a]',
    bottom: 'bg-[#080808] border-slate-700',
    top: 'bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 border-amber-400/50',
    card: 'bg-[#121212] border-slate-700 shadow-2xl',
    names: 'text-slate-100 font-extrabold',
    line: 'bg-slate-400',
    seal: 'bg-slate-300 border-amber-400',
    sealInner: 'bg-[#080808]',
    sealText: 'text-slate-200',
    hint: 'text-slate-300',
    decorClass: 'dark-decor',
  },
  'emerald-velvet-botanical': {
    back: 'bg-[#051c14] border-emerald-400/50 shadow-[0_30px_90px_rgba(5,28,20,0.7)]',
    side: 'bg-[#092d20]',
    bottom: 'bg-[#03130d] border-emerald-400/40',
    top: 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 border-emerald-300',
    card: 'bg-[#07241a] border-emerald-400/50 shadow-2xl',
    names: 'text-emerald-200 font-extrabold',
    line: 'bg-emerald-400',
    seal: 'bg-emerald-400 border-white',
    sealInner: 'bg-[#03130d]',
    sealText: 'text-emerald-200',
    hint: 'text-emerald-300',
    decorClass: 'emerald-decor',
  },
  'sunset-desert-glow': {
    back: 'bg-[#2e1308] border-amber-500/50 shadow-[0_30px_90px_rgba(46,19,8,0.7)]',
    side: 'bg-[#401c0c]',
    bottom: 'bg-[#1f0b04] border-amber-500/40',
    top: 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 border-amber-300',
    card: 'bg-[#351609] border-amber-500/50 shadow-2xl',
    names: 'text-amber-200 font-extrabold',
    line: 'bg-amber-400',
    seal: 'bg-amber-500 border-white',
    sealInner: 'bg-[#1f0b04]',
    sealText: 'text-amber-200',
    hint: 'text-amber-300',
  },
  'vintage-victorian-lace': {
    back: 'bg-[#fdfaf4] border-amber-600/40 shadow-[0_28px_80px_rgba(180,83,9,0.15)]',
    side: 'bg-[#f7efe0]',
    bottom: 'bg-[#ede2ce] border-amber-600/35',
    top: 'bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 border-white/80',
    card: 'bg-white border-amber-600/35 shadow-md',
    names: 'text-[#451a03] font-black',
    line: 'bg-amber-600',
    seal: 'bg-amber-600 border-white',
    sealInner: 'bg-[#f7efe0]',
    sealText: 'text-[#451a03]',
    hint: 'text-[#451a03]',
  },
  'monaco-yacht-glamour': {
    back: 'bg-[#071930] border-amber-400/60 shadow-[0_30px_90px_rgba(7,25,48,0.7)]',
    side: 'bg-[#0c274c]',
    bottom: 'bg-[#041020] border-amber-400/50',
    top: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border-amber-300',
    card: 'bg-[#08203e] border-amber-400/60 shadow-2xl',
    names: 'text-amber-300 font-extrabold',
    line: 'bg-amber-400',
    seal: 'bg-amber-400 border-amber-200',
    sealInner: 'bg-[#041020]',
    sealText: 'text-amber-300',
    hint: 'text-amber-300',
    decorClass: 'emerald-decor',
  },
  'celestial-moonlight-silver': {
    back: 'bg-[#0c1524] border-slate-400/60 shadow-[0_30px_90px_rgba(12,21,36,0.7)]',
    side: 'bg-[#142136]',
    bottom: 'bg-[#070d17] border-slate-400/50',
    top: 'bg-gradient-to-r from-slate-300 via-sky-200 to-slate-400 border-slate-200',
    card: 'bg-[#0e192c] border-slate-400/50 shadow-2xl',
    names: 'text-slate-100 font-extrabold',
    line: 'bg-slate-400',
    seal: 'bg-gradient-to-r from-slate-200 to-slate-400 border-white',
    sealInner: 'bg-[#070d17]',
    sealText: 'text-slate-100',
    hint: 'text-slate-200',
    decorClass: 'midnight-decor',
  },
};

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center select-none" dir="rtl">
      <!-- Personalized Guest Banner (if ?to=... or ?guest=... is provided) -->
      @if (guestName()) {
        <div class="mb-5 rounded-full border border-white/60 bg-white/45 px-6 py-2 backdrop-blur-xl shadow-xl animate-fadeIn">
          <p class="font-cairo text-xs sm:text-sm font-black text-slate-800">
            خاص إلى: <span class="text-amber-700 font-extrabold">{{ guestName() }}</span> 💌
          </p>
        </div>
      }

      <!-- ================================================================= -->
      <!-- SHAPE 1: VERTICAL ROYAL EMBOSSED ENVELOPE (LIKE FACEBOOK REEL)     -->
      <!-- ================================================================= -->
      @if (shape() === 'vertical-royal-embossed') {
        <button
          type="button"
          (click)="handleOpen()"
          [attr.aria-label]="'افتح الدعوة'"
          class="relative w-[310px] h-[520px] sm:w-[360px] sm:h-[600px] cursor-pointer text-left outline-none rounded-3xl transition-transform duration-500 {{
            !isOpened() ? 'hover:scale-[1.02] hover:-translate-y-1.5 animate-float' : ''
          }}"
          style="perspective: 2800px; transform-style: preserve-3d;"
        >
          <!-- Soft Ground Shadow -->
          <div
            class="absolute -bottom-8 left-1/2 h-10 w-[85%] -translate-x-1/2 scale-y-50 rounded-full bg-stone-900/35 blur-2xl transition-all duration-1000 {{
              isOpened() ? 'opacity-30 scale-x-75 translate-y-3' : 'opacity-100 scale-x-100'
            }}"
          ></div>

          <!-- SVG Defs for 3D Bas-Relief Embossed Carvings & Wax Seal Shadows -->
          <svg class="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
            <defs>
              <!-- 3D Bas-Relief Carving Dual Lighting Filter (Plaster / Paper Emboss) -->
              <filter id="reliefEmboss" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="1.5" dy="2.2" stdDeviation="1.2" flood-color="#46382a" flood-opacity="0.3" />
                <feDropShadow dx="-1.5" dy="-1.5" stdDeviation="1" flood-color="#ffffff" flood-opacity="0.95" />
              </filter>

              <!-- Deep Organic Wax Seal Drop Shadow -->
              <filter id="waxShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#3c2f21" flood-opacity="0.45" />
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#ffffff" flood-opacity="0.6" />
              </filter>

              <!-- Luxury Ivory Wax Radial Gradient -->
              <radialGradient id="ivoryWaxGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="25%" stop-color="#FBF7F0" />
                <stop offset="65%" stop-color="#EBE3D3" />
                <stop offset="90%" stop-color="#D8CCB7" />
                <stop offset="100%" stop-color="#BCAB91" />
              </radialGradient>

              <!-- Gold Calligraphy Inscription Gradient -->
              <linearGradient id="goldScriptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFF4B8" />
                <stop offset="40%" stop-color="#D4AF37" />
                <stop offset="80%" stop-color="#AA7C11" />
                <stop offset="100%" stop-color="#7A5604" />
              </linearGradient>
            </defs>
          </svg>

          <!-- 1. Envelope Back Plate (Warm Luxury Ivory Cotton Paper Texture) -->
          <div
            class="absolute inset-0 rounded-3xl border border-[#d6cebf] shadow-2xl overflow-hidden bg-gradient-to-b from-[#fbf8f2] via-[#efe8dc] to-[#e4dcd0]"
            style="transform: translateZ(0px);"
          >
            <!-- Delicate Paper Grain Noise Background -->
            <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#b8a992_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>

          <!-- 2. Sliding Card Inside (Revealed on Open, Sliding Out Upwards AFTER Flap Opens) -->
          <div
            class="absolute inset-2.5 sm:inset-3.5 z-20 flex flex-col items-center justify-between rounded-2xl border-2 border-[#d4af37]/70 p-4 sm:p-5 shadow-2xl bg-gradient-to-b from-[#fffdfa] via-[#fbf6ee] to-[#f3e9db] overflow-hidden"
            [style.transition]="isOpened() ? 'transform 1900ms cubic-bezier(0.18, 0.95, 0.3, 1) 950ms, box-shadow 1900ms cubic-bezier(0.18, 0.95, 0.3, 1) 950ms' : 'transform 700ms ease, box-shadow 700ms ease'"
            [style.transform]="isOpened() ? 'translate3d(0, -320px, 85px) rotate(-1.2deg) scale(1.05)' : 'translate3d(0, 0, 3px) rotate(0deg) scale(1)'"
            [style.boxShadow]="isOpened() ? '0 45px 110px -15px rgba(45,30,15,0.65), 0 15px 35px rgba(0,0,0,0.18)' : ''"
          >
            <!-- Gold Filigree Inner Corner Ornaments -->
            <div class="pointer-events-none absolute inset-1.5 border border-[#d4af37]/40 rounded-xl"></div>
            <div class="pointer-events-none absolute inset-2.5 border border-[#d4af37]/20 rounded-lg"></div>

            <!-- Header: Crown & Quran Verse -->
            <div class="flex flex-col items-center text-center">
              <span class="text-2xl drop-shadow">👑</span>
              <p class="font-aref text-[11px] sm:text-xs text-[#8c6d37] font-bold mt-1">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              @if (quranVerse()) {
                <p class="font-aref text-[9px] sm:text-[10px] text-[#705638] mt-1 max-w-[260px] line-clamp-2 italic leading-relaxed">
                  {{ quranVerse() }}
                </p>
              }
            </div>

            <!-- Parents / Invitation Note -->
            @if (parentsNote()) {
              <p class="font-cairo text-[9px] sm:text-[10px] text-[#705638] font-bold text-center px-2 line-clamp-1">
                {{ parentsNote() }}
              </p>
            } @else {
              <p class="font-cairo text-[9px] sm:text-[10px] text-[#8c6d37] font-bold text-center">
                يتشرف العائلتان بدعوة سيادتكم لمشاركتنا فرحة العمر
              </p>
            }

            <!-- Couple Names in Grand Gilded Typography -->
            <div class="flex flex-col items-center justify-center my-1 text-center">
              @if (groom() && bride()) {
                <h4 class="font-cairo text-base sm:text-xl font-black text-[#3d2c19] tracking-wide">
                  {{ groom() }}
                </h4>
                <div class="flex items-center gap-2 my-0.5">
                  <span class="h-px w-6 bg-[#d4af37]/60"></span>
                  <span class="font-playfair text-base text-[#b8860b] font-bold">&</span>
                  <span class="h-px w-6 bg-[#d4af37]/60"></span>
                </div>
                <h4 class="font-cairo text-base sm:text-xl font-black text-[#3d2c19] tracking-wide">
                  {{ bride() }}
                </h4>
              } @else {
                <h4 class="font-cairo text-lg sm:text-2xl font-black text-[#3d2c19]">
                  {{ cardTitle() }}
                </h4>
              }
            </div>

            <!-- Date & Location Badges -->
            <div class="flex flex-col items-center gap-1.5 w-full px-2 text-center">
              <!-- Date Badge -->
              <div class="inline-flex items-center gap-1.5 rounded-full bg-[#ede2cf] border border-[#d4af37]/40 px-3 py-1 shadow-sm">
                <span class="text-xs">📅</span>
                <span class="font-cairo text-[10px] sm:text-[11px] font-black text-[#42311c]">
                  {{ formattedDate() }}
                </span>
                <span class="text-[9px] font-bold text-[#705638]">({{ formattedTime() }})</span>
              </div>

              <!-- Venue Location -->
              @if (locationName()) {
                <div class="inline-flex items-center gap-1 text-[#705638] text-[9px] sm:text-[10px] font-bold">
                  <span>📍</span>
                  <span class="truncate max-w-[220px]">{{ locationName() }}</span>
                  @if (locationCity()) {
                    <span>- {{ locationCity() }}</span>
                  }
                </div>
              }
            </div>

            <!-- Bottom Invitation Greeting -->
            <div class="mt-1 flex items-center justify-center gap-2 text-[#8c6d37]">
              <span class="h-px w-8 bg-[#d4af37]/40"></span>
              <span class="font-cairo text-[9px] font-black">حضوركم يسعدنا ويشرفنا</span>
              <span class="h-px w-8 bg-[#d4af37]/40"></span>
            </div>
          </div>

          <!-- 3. Envelope Left Flap (With Climbing Floral Bas-Relief Vines) -->
          <div
            class="pointer-events-none absolute inset-0 z-30 rounded-3xl overflow-hidden bg-gradient-to-r from-[#e7dfd3] to-[#ded5c6]"
            style="clip-path: polygon(0 0, 50% 48%, 0 100%); transform: translateZ(6px);"
          >
            <!-- Left Floral Relief Garland -->
            <svg viewBox="0 0 180 600" class="absolute left-0 top-0 h-full w-full opacity-90" filter="url(#reliefEmboss)">
              <g fill="#f7f3ec" stroke="#ffffff" stroke-width="0.8">
                <!-- Climbing leaves and flower buds along the left border -->
                <path d="M15 120 C25 110, 40 115, 35 130 C30 145, 15 135, 15 120 Z"/>
                <circle cx="28" cy="145" r="7"/>
                <circle cx="45" cy="190" r="9"/>
                <path d="M12 210 C30 200, 48 220, 32 235 C18 245, 12 225, 12 210 Z"/>
                <path d="M18 290 C35 280, 52 300, 38 315 C20 325, 15 305, 18 290 Z"/>
                <circle cx="32" cy="340" r="8"/>
                <path d="M15 380 C32 370, 45 390, 32 405 C15 415, 12 395, 15 380 Z"/>
              </g>
            </svg>
          </div>

          <!-- 4. Envelope Right Flap (With Climbing Floral Bas-Relief Vines) -->
          <div
            class="pointer-events-none absolute inset-0 z-30 rounded-3xl overflow-hidden bg-gradient-to-l from-[#e7dfd3] to-[#ded5c6]"
            style="clip-path: polygon(100% 0, 50% 48%, 100% 100%); transform: translateZ(6px);"
          >
            <!-- Right Floral Relief Garland (Mirrored) -->
            <svg viewBox="0 0 180 600" class="absolute right-0 top-0 h-full w-full opacity-90 -scale-x-100" filter="url(#reliefEmboss)">
              <g fill="#f7f3ec" stroke="#ffffff" stroke-width="0.8">
                <path d="M15 120 C25 110, 40 115, 35 130 C30 145, 15 135, 15 120 Z"/>
                <circle cx="28" cy="145" r="7"/>
                <circle cx="45" cy="190" r="9"/>
                <path d="M12 210 C30 200, 48 220, 32 235 C18 245, 12 225, 12 210 Z"/>
                <path d="M18 290 C35 280, 52 300, 38 315 C20 325, 15 305, 18 290 Z"/>
                <circle cx="32" cy="340" r="8"/>
                <path d="M15 380 C32 370, 45 390, 32 405 C15 415, 12 395, 15 380 Z"/>
              </g>
            </svg>
          </div>

          <!-- 5. Envelope Bottom Flap (With Lower Floral Relief Spray) -->
          <div
            class="pointer-events-none absolute inset-0 z-40 rounded-3xl overflow-hidden shadow-[0_-8px_20px_rgba(70,55,40,0.06)] bg-gradient-to-t from-[#e4ded3] via-[#ede6dc] to-[#f4eee6]"
            style="clip-path: polygon(0 100%, 50% 48%, 100% 100%); transform: translateZ(9px);"
          >
            <!-- Bottom Symmetrical Floral Medallion -->
            <svg viewBox="0 0 360 300" class="absolute bottom-0 left-0 w-full opacity-95" filter="url(#reliefEmboss)">
              <g fill="#f7f3ec" stroke="#ffffff" stroke-width="0.8">
                <!-- Center bottom rosette bouquet -->
                <circle cx="180" cy="235" r="14"/>
                <circle cx="160" cy="225" r="8"/>
                <circle cx="200" cy="225" r="8"/>
                <circle cx="170" cy="250" r="7"/>
                <circle cx="190" cy="250" r="7"/>
                <!-- Foliage spreading diagonally -->
                <path d="M150 215 C130 200, 115 220, 135 230 C155 240, 160 225, 150 215 Z"/>
                <path d="M210 215 C230 200, 245 220, 225 230 C205 240, 200 225, 210 215 Z"/>
                <path d="M130 190 C105 175, 95 198, 118 208 C140 215, 142 198, 130 190 Z"/>
                <path d="M230 190 C255 175, 265 198, 242 208 C220 215, 218 198, 230 190 Z"/>
                <circle cx="95" cy="175" r="6"/>
                <circle cx="265" cy="175" r="6"/>
              </g>
            </svg>
          </div>

          <!-- 6. Envelope Top Triangular Fold Flap (With Grand Upper Floral Bas-Relief Medallion) -->
          <div
            class="absolute inset-0 origin-top rounded-3xl overflow-hidden shadow-2xl transition-all duration-[850ms] ease-in-out bg-gradient-to-b from-[#fbf8f3] via-[#f2ece2] to-[#e4ddd2]"
            style="clip-path: polygon(0 0, 100% 0, 50% 48%); transform-style: preserve-3d;"
            [style.transform]="isOpened() ? 'rotateX(180deg) translateZ(-25px)' : 'rotateX(0deg) translateZ(14px)'"
            [style.zIndex]="isOpened() ? '10' : '45'"
          >
            <!-- Top Flap Symmetrical Grand Floral Carving (Like Facebook Video) -->
            <svg viewBox="0 0 360 300" class="absolute top-0 left-0 w-full opacity-95" filter="url(#reliefEmboss)">
              <g fill="#f8f4ed" stroke="#ffffff" stroke-width="0.9">
                <!-- Center Floral Rosette (Blooming Peony/Camellia) -->
                <circle cx="180" cy="105" r="18" fill="#faf7f2"/>
                <circle cx="180" cy="105" r="11" fill="#fffdfa"/>
                <circle cx="180" cy="105" r="5" fill="#e8dfd0"/>
                
                <!-- Petal Rays Around Center -->
                <circle cx="160" cy="95" r="9"/>
                <circle cx="200" cy="95" r="9"/>
                <circle cx="160" cy="115" r="9"/>
                <circle cx="200" cy="115" r="9"/>
                <circle cx="180" cy="80" r="10"/>
                <circle cx="180" cy="130" r="10"/>

                <!-- Left Floral Spray and Botanical Vines -->
                <path d="M150 90 C125 75, 110 95, 130 108 C150 120, 158 105, 150 90 Z"/>
                <path d="M130 65 C100 48, 85 70, 110 85 C135 98, 140 78, 130 65 Z"/>
                <path d="M110 45 C80 30, 68 52, 90 68 C112 80, 118 60, 110 45 Z"/>
                <circle cx="80" cy="38" r="6"/>
                <circle cx="65" cy="52" r="5"/>

                <!-- Right Floral Spray and Botanical Vines (Mirrored) -->
                <path d="M210 90 C235 75, 250 95, 230 108 C210 120, 202 105, 210 90 Z"/>
                <path d="M230 65 C260 48, 275 70, 250 85 C225 98, 220 78, 230 65 Z"/>
                <path d="M250 45 C280 30, 292 52, 270 68 C248 80, 242 60, 250 45 Z"/>
                <circle cx="280" cy="38" r="6"/>
                <circle cx="295" cy="52" r="5"/>

                <!-- Delicate Point Accent Flap Tip -->
                <circle cx="180" cy="155" r="6"/>
                <circle cx="180" cy="170" r="4"/>
              </g>
            </svg>
          </div>

          <!-- 7. Center Organic Wax Seal With Arabic Calligraphy (بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ) -->
          <div
            class="absolute left-1/2 top-[48%] z-50 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center transition-all duration-500 ease-out"
            style="transform: translateZ(24px);"
            [style.transform]="isOpened() ? 'translate3d(-50%, -62%, 24px) scale(1.18) rotate(-8deg)' : 'translate3d(-50%, -50%, 24px) scale(1) rotate(0deg)'"
            [style.opacity]="isOpened() ? '0' : '1'"
            [class.pointer-events-none]="isOpened()"
          >
            <!-- Pulsing Golden Ripple Aura -->
            <div class="absolute -inset-3 rounded-full bg-amber-400/25 blur-lg animate-pulse-aura pointer-events-none"></div>

            <!-- Organic Melted Wax Seal (SVG) with Basmala Inscription -->
            <svg viewBox="0 0 100 100" class="h-full w-full drop-shadow-2xl" filter="url(#waxShadow)">
              <!-- Natural Scalloped Melted Wax Shape -->
              <path
                d="M50 4 C59 2, 67 7, 75 13 C83 18, 92 20, 95 29 C98 38, 94 46, 96 55 C97 64, 98 73, 93 80 C88 87, 80 88, 73 93 C65 98, 56 97, 49 97 C41 97, 32 99, 25 94 C18 89, 13 83, 8 76 C3 69, 4 60, 4 51 C4 42, 2 33, 7 25 C12 17, 20 15, 27 10 C34 5, 41 6, 50 4 Z"
                fill="url(#ivoryWaxGrad)"
              />

              <!-- Outer Wax Bevel Ridge -->
              <circle cx="50" cy="50" r="37" fill="none" stroke="#D8CCB7" stroke-width="1.8" opacity="0.85"/>
              <circle cx="50" cy="50" r="35" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0.9"/>

              <!-- Inner Pressed Wax Basin -->
              <circle cx="50" cy="50" r="31" fill="#EBE3D3" stroke="#B8A78D" stroke-width="0.8"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" stroke-width="0.6" opacity="0.7"/>

              <!-- Central Gold Basmala (بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ) Calligraphy Artwork -->
              <g id="wax-basmala" transform="translate(18, 25) scale(0.64)">
                <!-- Arabic Calligraphic Crown Arch -->
                <path d="M50 8 Q30 8 20 20 Q50 15 80 20 Q70 8 50 8 Z" fill="url(#goldScriptGrad)"/>
                <!-- Calligraphy Strokes -->
                <text
                  x="50"
                  y="40"
                  text-anchor="middle"
                  font-family="'Aref Ruqaa', 'Amiri', serif"
                  font-size="16"
                  font-weight="bold"
                  fill="url(#goldScriptGrad)"
                  filter="drop-shadow(0.5px 0.8px 0.5px rgba(90,70,40,0.5))"
                >
                  بِسْمِ اللهِ
                </text>
                <text
                  x="50"
                  y="58"
                  text-anchor="middle"
                  font-family="'Aref Ruqaa', 'Amiri', serif"
                  font-size="13"
                  font-weight="bold"
                  fill="url(#goldScriptGrad)"
                  filter="drop-shadow(0.5px 0.8px 0.5px rgba(90,70,40,0.5))"
                >
                  الرَّحْمٰنِ الرَّحِيمِ
                </text>
              </g>

              <!-- Subtle Wax Shine Highlight -->
              <ellipse cx="36" cy="30" rx="10" ry="5" fill="#FFFFFF" opacity="0.45" transform="rotate(-30 36 30)"/>
            </svg>

            <!-- Touch / Click Hint Pill below the seal (Modern & Sleek) -->
            <div class="absolute -bottom-9 whitespace-nowrap rounded-full bg-stone-900/85 px-4 py-1 text-[11px] font-bold text-amber-200 border border-amber-300/35 shadow-lg backdrop-blur-md tracking-wide">
              انقر للفتح ✦
            </div>
          </div>
        </button>
      }

      <!-- ================================================================= -->
      <!-- SHAPE: MODERN FROSTED VELLUM & BOTANICAL WAX SEAL (VELLUM GLASS)   -->
      <!-- ================================================================= -->
      @else if (shape() === 'frosted-vellum-botanical') {
        <button
          type="button"
          (click)="handleOpen()"
          [attr.aria-label]="'افتح الدعوة'"
          class="relative w-[310px] h-[520px] sm:w-[360px] sm:h-[580px] cursor-pointer text-left outline-none rounded-3xl transition-transform duration-500 {{
            !isOpened() ? 'hover:scale-[1.02] hover:-translate-y-1.5 animate-float' : ''
          }}"
          style="perspective: 2500px; transform-style: preserve-3d;"
        >
          <!-- Soft Ambient Shadow -->
          <div
            class="absolute -bottom-8 left-1/2 h-10 w-[85%] -translate-x-1/2 scale-y-50 rounded-full bg-stone-900/25 blur-2xl transition-all duration-1000 {{
              isOpened() ? 'opacity-30 scale-x-75 translate-y-3' : 'opacity-100 scale-x-100'
            }}"
          ></div>

          <!-- Base Backplate (Fine Textured Cotton Linen) -->
          <div
            class="absolute inset-0 rounded-3xl border border-stone-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden bg-gradient-to-b from-[#fbfbfa] via-[#f7f5f0] to-[#eeeae2]"
            style="transform: translateZ(0px);"
          >
            <!-- Delicate Modern Grid Accent Lines -->
            <div class="pointer-events-none absolute inset-3 rounded-2xl border border-stone-300/40"></div>
          </div>

          <!-- The Realistic Inner Invitation Card (Glides forward and up AFTER vellum opens) -->
          <div
            class="absolute inset-3 sm:inset-4 z-20 flex flex-col items-center justify-between rounded-2xl border border-[#d4af37]/60 p-5 sm:p-6 shadow-xl bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f7f3ec] overflow-hidden"
            [style.transition]="isOpened() ? 'transform 1800ms cubic-bezier(0.16, 1, 0.3, 1) 900ms, box-shadow 1800ms cubic-bezier(0.16, 1, 0.3, 1) 900ms' : 'transform 700ms ease, box-shadow 700ms ease'"
            [style.transform]="isOpened() ? 'translate3d(0, -260px, 60px) scale(1.04)' : 'translate3d(0, 0, 2px) scale(1)'"
            [style.boxShadow]="isOpened() ? '0 30px 80px rgba(0,0,0,0.25)' : ''"
          >
            <!-- Modern Minimal Corner Lines -->
            <div class="pointer-events-none absolute inset-2 border border-[#d4af37]/30 rounded-xl"></div>

            <!-- Top Monogram & Bismillah -->
            <div class="flex flex-col items-center text-center">
              <span class="text-2xl drop-shadow">🌿</span>
              <p class="font-aref text-xs text-[#8c6d37] font-bold mt-1 tracking-widest">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              @if (quranVerse()) {
                <p class="font-aref text-[9px] sm:text-[10px] text-[#6e583e] mt-1 max-w-[250px] line-clamp-2 italic leading-relaxed">
                  {{ quranVerse() }}
                </p>
              }
            </div>

            <!-- Intro text -->
            <p class="font-cairo text-[9px] sm:text-[10px] text-[#8c6d37] font-semibold text-center">
              {{ parentsNote() || 'يسعدنا ويشرفنا دعوتكم لحضور حفل زفافنا المبارك' }}
            </p>

            <!-- Couple Names in Clean Modern Serif -->
            <div class="flex flex-col items-center justify-center my-1 text-center">
              @if (groom() && bride()) {
                <h4 class="font-playfair text-xl sm:text-2xl font-black text-[#2e2315] tracking-wide">
                  {{ groom() }}
                </h4>
                <div class="flex items-center gap-2 my-0.5">
                  <span class="h-px w-6 bg-[#d4af37]/60"></span>
                  <span class="font-playfair text-base text-[#b8860b] italic">&</span>
                  <span class="h-px w-6 bg-[#d4af37]/60"></span>
                </div>
                <h4 class="font-playfair text-xl sm:text-2xl font-black text-[#2e2315] tracking-wide">
                  {{ bride() }}
                </h4>
              } @else {
                <h4 class="font-cairo text-lg sm:text-2xl font-black text-[#2e2315]">
                  {{ cardTitle() }}
                </h4>
              }
            </div>

            <!-- Date & Venue Location Badges -->
            <div class="flex flex-col items-center gap-1.5 w-full text-center">
              <div class="inline-flex items-center gap-1.5 rounded-full bg-[#f4ece1] border border-[#d4af37]/40 px-3.5 py-1 shadow-sm">
                <span class="text-xs">📅</span>
                <span class="font-cairo text-[10px] sm:text-[11px] font-black text-[#382b1b]">
                  {{ formattedDate() }}
                </span>
                <span class="text-[9px] font-bold text-[#705638]">({{ formattedTime() }})</span>
              </div>

              @if (locationName()) {
                <div class="inline-flex items-center gap-1 text-[#665037] text-[9px] sm:text-[10px] font-bold">
                  <span>📍</span>
                  <span class="truncate max-w-[220px]">{{ locationName() }}</span>
                  @if (locationCity()) {
                    <span>- {{ locationCity() }}</span>
                  }
                </div>
              }
            </div>

            <!-- Footer Message -->
            <div class="mt-1 flex items-center justify-center gap-2 text-[#8c6d37]">
              <span class="h-px w-8 bg-[#d4af37]/40"></span>
              <span class="font-cairo text-[9px] font-black">حضوركم يكتمل به سرورنا</span>
              <span class="h-px w-8 bg-[#d4af37]/40"></span>
            </div>
          </div>

          <!-- Frosted Vellum Left Flap (Translucent Frosted Glass) -->
          <div
            class="pointer-events-none absolute inset-y-0 left-0 w-[54%] z-30 rounded-l-3xl border-r border-white/60 bg-white/45 backdrop-blur-md shadow-[4px_0_20px_rgba(0,0,0,0.06)] origin-left transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            [style.transform]="isOpened() ? 'rotateY(-115deg) translateZ(8px)' : 'rotateY(0deg) translateZ(6px)'"
          >
            <!-- Frosted paper texture highlights -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent"></div>
          </div>

          <!-- Frosted Vellum Right Flap (Translucent Frosted Glass) -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 w-[54%] z-30 rounded-r-3xl border-l border-white/60 bg-white/45 backdrop-blur-md shadow-[-4px_0_20px_rgba(0,0,0,0.06)] origin-right transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            [style.transform]="isOpened() ? 'rotateY(115deg) translateZ(8px)' : 'rotateY(0deg) translateZ(6px)'"
          >
            <!-- Frosted paper texture highlights -->
            <div class="absolute inset-0 bg-gradient-to-l from-white/30 via-white/10 to-transparent"></div>
          </div>

          <!-- Botanical Sprig (Gold Foil Olive Branch across center seam) -->
          <div
            class="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700"
            [class.opacity-0]="isOpened()"
            [class.scale-90]="isOpened()"
          >
            <span class="text-4xl text-amber-500/80 drop-shadow-md">🌿</span>
          </div>

          <!-- Center Champagne Pearl Wax Seal -->
          <div
            class="absolute left-1/2 top-1/2 z-50 flex h-20 w-20 sm:h-22 sm:w-22 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-700"
            style="transform: translateZ(24px);"
            [class.opacity-0]="isOpened()"
            [class.scale-75]="isOpened()"
            [class.pointer-events-none]="isOpened()"
          >
            <div class="absolute -inset-2 rounded-full bg-amber-400/25 blur-md animate-pulse pointer-events-none"></div>
            <div class="h-full w-full rounded-full border-2 border-amber-300/80 bg-gradient-to-tr from-[#ede4d3] via-[#f9f5ed] to-[#dfd5c2] shadow-[0_10px_25px_rgba(70,55,40,0.25)] flex flex-col items-center justify-center text-[#5c472d]">
              <span class="text-xl">🕊️</span>
              <span class="font-cairo text-[9px] font-black mt-0.5 tracking-wider">دعوة خاصة</span>
            </div>
            <!-- Sleek Minimal Modern Pill Prompt -->
            <div class="absolute -bottom-9 whitespace-nowrap rounded-full bg-stone-900/85 px-4 py-1 text-[11px] font-bold text-amber-200 border border-amber-300/35 shadow-lg backdrop-blur-md tracking-wide">
              انقر للفتح ✦
            </div>
          </div>
        </button>
      }

      <!-- ================================================================= -->
      <!-- SHAPE: LUXURY GIFT / JEWELRY BOX WITH SILK SATIN RIBBON          -->
      <!-- ================================================================= -->
      @else if (shape() === 'luxury-gift-box') {
        <button
          type="button"
          (click)="handleOpen()"
          [attr.aria-label]="'افتح الصندوق'"
          class="relative w-[310px] h-[520px] sm:w-[360px] sm:h-[580px] cursor-pointer text-left outline-none rounded-3xl transition-transform duration-500 {{
            !isOpened() ? 'hover:scale-[1.02] hover:-translate-y-1.5 animate-float' : ''
          }}"
          style="perspective: 2600px; transform-style: preserve-3d;"
        >
          <!-- Deep Box Shadow -->
          <div
            class="absolute -bottom-8 left-1/2 h-12 w-[88%] -translate-x-1/2 scale-y-50 rounded-full bg-black/60 blur-2xl transition-all duration-1000 {{
              isOpened() ? 'opacity-40 scale-x-80 translate-y-3' : 'opacity-100 scale-x-100'
            }}"
          ></div>

          <!-- Box Body (Matte Black / Velvet Box Base) -->
          <div
            class="absolute inset-0 rounded-3xl border-2 border-amber-400/60 shadow-2xl overflow-hidden bg-gradient-to-b from-[#1c1815] via-[#120f0d] to-[#080706]"
            style="transform: translateZ(0px);"
          >
            <!-- Interior Velvet Cushion Texture & Ambient Light Ray -->
            <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.5)_0%,transparent_70%)]"></div>
            <div class="pointer-events-none absolute inset-3 rounded-2xl border border-amber-400/30"></div>
          </div>

          <!-- Inside Keepsake Card (Rises up out of the cushion AFTER lid opens) -->
          <div
            class="absolute inset-3 sm:inset-4 z-20 flex flex-col items-center justify-between rounded-2xl border-2 border-amber-400/70 p-5 sm:p-6 shadow-2xl bg-gradient-to-b from-[#241e19] via-[#1a1511] to-[#100d0a] text-white overflow-hidden"
            [style.transition]="isOpened() ? 'transform 1900ms cubic-bezier(0.18, 0.95, 0.3, 1) 1000ms, box-shadow 1900ms cubic-bezier(0.18, 0.95, 0.3, 1) 1000ms' : 'transform 700ms ease, box-shadow 700ms ease'"
            [style.transform]="isOpened() ? 'translate3d(0, -295px, 85px) rotate(0.9deg) scale(1.05)' : 'translate3d(0, 0, 2px) rotate(0deg) scale(1)'"
            [style.boxShadow]="isOpened() ? '0 45px 120px rgba(0,0,0,0.95), 0 0 45px rgba(245,158,11,0.3)' : ''"
          >
            <div class="pointer-events-none absolute inset-1.5 border border-amber-400/40 rounded-xl"></div>

            <div class="flex flex-col items-center text-center">
              <span class="text-3xl text-amber-400 mb-1">🎁</span>
              <p class="font-aref text-xs text-amber-300 font-bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              @if (quranVerse()) {
                <p class="font-aref text-[9px] sm:text-[10px] text-amber-200/80 mt-1 max-w-[250px] line-clamp-2 italic">
                  {{ quranVerse() }}
                </p>
              }
            </div>

            <!-- Couple Names -->
            <div class="my-1 text-center">
              <p class="font-cairo text-[9px] text-amber-400/80 font-bold mb-1">
                {{ parentsNote() || 'يسعدنا مشاركتكم فرحة العمر' }}
              </p>
              <h4 class="font-cairo text-lg sm:text-2xl font-black text-amber-200 drop-shadow-md">
                {{ cardTitle() }}
              </h4>
              <p class="font-cairo text-xs text-amber-400/90 font-bold mt-1">{{ eventConfig().name }}</p>
            </div>

            <!-- Date & Location -->
            <div class="flex flex-col items-center gap-1.5 w-full text-center">
              <div class="inline-flex items-center gap-1.5 rounded-full bg-amber-950/70 border border-amber-400/50 px-3.5 py-1 text-xs font-black text-amber-300">
                <span>📅</span>
                <span>{{ formattedDate() }}</span>
              </div>
              @if (locationName()) {
                <p class="text-[10px] text-amber-200/80">📍 {{ locationName() }} - {{ locationCity() }}</p>
              }
            </div>

            <p class="font-cairo text-[9px] text-amber-300 font-bold">حضوركم يكتمل به سرورنا ✨</p>
          </div>

          <!-- Box Front Lid (Swings open upward on open with realistic 3D perspective) -->
          <div
            class="absolute inset-0 origin-top rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#251f1a] via-[#1a1511] to-[#120e0b] shadow-2xl transition-all duration-[950ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            style="transform-style: preserve-3d;"
            [style.transform]="isOpened() ? 'rotateX(115deg) translateZ(-35px)' : 'rotateX(0deg) translateZ(8px)'"
            [style.zIndex]="isOpened() ? '10' : '35'"
          >
            <!-- Satin Ribbon Horizontal -->
            <div class="absolute inset-y-0 left-1/2 w-12 -translate-x-1/2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 shadow-lg"></div>
            <!-- Satin Ribbon Vertical -->
            <div class="absolute inset-x-0 top-1/2 h-12 -translate-y-1/2 bg-gradient-to-b from-amber-600 via-yellow-400 to-amber-500 shadow-lg"></div>

            <!-- Lid Interior Satin Quilted Lining Backing (Visible when tilted open) -->
            <div class="pointer-events-none absolute inset-3 rounded-2xl border border-amber-400/40 opacity-40"></div>
          </div>

          <!-- Centered Gold Silk Bow & Gift Medallion (Unties gracefully) -->
          <div
            class="absolute left-1/2 top-1/2 z-50 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center transition-all duration-500 ease-out"
            style="transform: translateZ(28px);"
            [style.transform]="isOpened() ? 'translate3d(-50%, -60%, 28px) scale(1.2) rotate(15deg)' : 'translate3d(-50%, -50%, 28px) scale(1) rotate(0deg)'"
            [style.opacity]="isOpened() ? '0' : '1'"
            [class.pointer-events-none]="isOpened()"
          >
            <div class="absolute -inset-3 rounded-full bg-amber-400/35 blur-xl animate-pulse pointer-events-none"></div>
            <div class="relative flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-[0_10px_35px_rgba(212,175,55,0.7)] text-black">
              <span class="text-2xl drop-shadow">🎀</span>
              <span class="font-cairo text-[10px] font-black mt-0.5">افتح الصندوق</span>
            </div>
            <div class="absolute -bottom-9 whitespace-nowrap rounded-full bg-black/85 px-3.5 py-1 text-[11px] font-bold text-amber-300 border border-amber-400/30 shadow-lg backdrop-blur-md">
              انقر لفك الشريط ✦
            </div>
          </div>
        </button>
      }

      <!-- ================================================================= -->
      <!-- SHAPE 2: EMERALD GOLD ARABESQUE POCKET ENVELOPE                   -->
      <!-- ================================================================= -->
      @else if (shape() === 'emerald-gold-pocket') {
        <button
          type="button"
          (click)="handleOpen()"
          [attr.aria-label]="'افتح الدعوة'"
          class="relative w-[310px] h-[520px] sm:w-[360px] sm:h-[600px] cursor-pointer text-left outline-none rounded-3xl transition-transform duration-500 {{
            !isOpened() ? 'hover:scale-[1.02] hover:-translate-y-1.5 animate-float' : ''
          }}"
          style="perspective: 2800px; transform-style: preserve-3d;"
        >
          <!-- Shadow -->
          <div class="absolute -bottom-8 left-1/2 h-10 w-[85%] -translate-x-1/2 scale-y-50 rounded-full bg-black/50 blur-2xl"></div>

          <!-- Pocket Back -->
          <div
            class="absolute inset-0 rounded-3xl border-2 border-amber-400/60 shadow-2xl overflow-hidden bg-gradient-to-b from-[#072c1f] via-[#041d14] to-[#02100b]"
            style="transform: translateZ(0px);"
          >
            <!-- Islamic Arabesque Tessellation Background -->
            <div class="absolute inset-0 opacity-20 [background-image:radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px]"></div>
          </div>

          <!-- Sliding Card Inside (Rises AFTER Flap Opens) -->
          <div
            class="absolute inset-2.5 sm:inset-3.5 z-20 flex flex-col items-center justify-between rounded-2xl border-2 border-amber-400/70 p-4 sm:p-5 shadow-2xl bg-gradient-to-b from-[#083022] via-[#052218] to-[#02130d] text-white overflow-hidden"
            [style.transition]="isOpened() ? 'transform 1800ms cubic-bezier(0.16, 1, 0.3, 1) 900ms, box-shadow 1800ms cubic-bezier(0.16, 1, 0.3, 1) 900ms' : 'transform 700ms ease, box-shadow 700ms ease'"
            [style.transform]="isOpened() ? 'translate3d(0, -310px, 80px) scale(1.05)' : 'translate3d(0, 0, 3px) scale(1)'"
            [style.boxShadow]="isOpened() ? '0 40px 100px rgba(0,0,0,0.7)' : ''"
          >
            <div class="pointer-events-none absolute inset-1.5 border border-amber-400/40 rounded-xl"></div>
            <div class="flex flex-col items-center text-center">
              <span class="text-2xl text-amber-400 mb-1">⚜️</span>
              <p class="font-aref text-[11px] sm:text-xs text-amber-300 font-bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              @if (quranVerse()) {
                <p class="font-aref text-[9px] text-emerald-200/90 mt-1 max-w-[240px] line-clamp-2 italic">
                  {{ quranVerse() }}
                </p>
              }
            </div>

            <div class="my-1 text-center">
              <h4 class="font-cairo text-base sm:text-xl font-black text-amber-200 drop-shadow">
                {{ cardTitle() }}
              </h4>
              <p class="font-cairo text-[10px] text-amber-400/80 font-bold mt-0.5">{{ eventConfig().name }}</p>
            </div>

            <div class="flex flex-col items-center gap-1 w-full text-center">
              <div class="inline-flex items-center gap-1.5 rounded-full bg-[#021810] border border-amber-400/50 px-3 py-1 text-[10px] font-black text-amber-300">
                <span>📅</span>
                <span>{{ formattedDate() }}</span>
              </div>
              @if (locationName()) {
                <p class="text-[9px] text-slate-300">📍 {{ locationName() }}</p>
              }
            </div>

            <p class="font-cairo text-[9px] text-amber-300 font-bold">حضوركم سر سعادتنا ✨</p>
          </div>

          <!-- Bottom Pocket Sleeve (Holding Card) -->
          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] z-30 rounded-b-3xl border-2 border-t-0 border-amber-400/70 bg-gradient-to-t from-[#031810] to-[#083526] shadow-xl overflow-hidden"
            style="clip-path: polygon(0 25%, 50% 0, 100% 25%, 100% 100%, 0 100%); transform: translateZ(10px);"
          >
            <!-- Gold Arabesque border line -->
            <div class="absolute inset-x-4 bottom-4 top-10 border border-amber-400/40 rounded-xl"></div>
          </div>

          <!-- Top Fold Flap with Mihrab Arch Point -->
          <div
            class="absolute inset-x-0 top-0 h-[50%] origin-top rounded-t-3xl border-2 border-b-0 border-amber-400/80 shadow-2xl transition-all duration-[850ms] ease-in-out bg-gradient-to-b from-[#083827] to-[#041d14]"
            style="clip-path: polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%); transform-style: preserve-3d;"
            [style.transform]="isOpened() ? 'rotateX(180deg) translateZ(-25px)' : 'rotateX(0deg) translateZ(14px)'"
            [style.zIndex]="isOpened() ? '10' : '45'"
          >
            <div class="absolute inset-x-4 top-4 bottom-8 border border-amber-400/40 rounded-t-xl"></div>
          </div>

          <!-- Imperial Ruby/Gold Wax Seal -->
          <div
            class="absolute left-1/2 top-[48%] z-50 flex h-20 w-20 sm:h-24 sm:w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-700"
            style="transform: translateZ(24px);"
            [class.opacity-0]="isOpened()"
            [class.scale-0]="isOpened()"
            [class.pointer-events-none]="isOpened()"
          >
            <div class="absolute -inset-2 rounded-full bg-amber-400/30 blur-md animate-pulse pointer-events-none"></div>
            <div class="h-full w-full rounded-full border-2 border-amber-300 bg-gradient-to-tr from-[#991b1b] via-[#dc2626] to-[#b91c1c] shadow-2xl flex flex-col items-center justify-center text-amber-200">
              <span class="text-xl">⚜️</span>
              <span class="font-cairo text-[9px] font-black mt-0.5">دعوة زفاف</span>
            </div>
            <div class="absolute -bottom-9 whitespace-nowrap rounded-full bg-stone-900/85 px-4 py-1 text-[11px] font-bold text-amber-200 border border-amber-300/35 shadow-lg backdrop-blur-md tracking-wide">
              انقر للفتح ✦
            </div>
          </div>
        </button>
      }

      <!-- ================================================================= -->
      <!-- SHAPE 3: ROYAL GATEFOLD DOORS ENVELOPE (OPENS FROM CENTER)        -->
      <!-- ================================================================= -->
      @else if (shape() === 'royal-gatefold-doors') {
        <button
          type="button"
          (click)="handleOpen()"
          [attr.aria-label]="'افتح الدعوة'"
          class="relative w-[310px] h-[520px] sm:w-[360px] sm:h-[600px] cursor-pointer text-left outline-none rounded-3xl transition-transform duration-500 {{
            !isOpened() ? 'hover:scale-[1.02] hover:-translate-y-1.5 animate-float' : ''
          }}"
          style="perspective: 2800px; transform-style: preserve-3d;"
        >
          <!-- Ground Shadow -->
          <div class="absolute -bottom-8 left-1/2 h-10 w-[85%] -translate-x-1/2 scale-y-50 rounded-full bg-black/45 blur-2xl"></div>

          <!-- Base Backplate -->
          <div
            class="absolute inset-0 rounded-3xl border border-amber-400/50 shadow-2xl bg-gradient-to-b from-[#1a1209] via-[#0f0a05] to-[#080502]"
            style="transform: translateZ(0px);"
          >
            <!-- Inner Card Content (Revealed when Palace Doors Open) -->
            <div
              class="absolute inset-3 sm:inset-4 flex flex-col items-center justify-between p-4 sm:p-6 text-center text-amber-100 rounded-2xl border border-amber-400/50 bg-gradient-to-b from-[#1c1309] via-[#120c05] to-[#080502] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.2,0.9,0.3,1)]"
              [style.transform]="isOpened() ? 'scale(1.03) translateZ(40px)' : 'scale(0.97) translateZ(0px)'"
              [style.boxShadow]="isOpened() ? '0 30px 90px rgba(0,0,0,0.95), 0 0 50px rgba(245,158,11,0.25)' : ''"
            >
              <!-- Ambient Palace Chandelier Spotlight -->
              <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.3)_0%,transparent_75%)]"></div>
              <div class="pointer-events-none absolute inset-1.5 border border-amber-400/30 rounded-xl"></div>
              
              <div class="flex flex-col items-center">
                <span class="text-3xl mb-1">👑</span>
                <p class="font-aref text-xs text-amber-400 font-bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                @if (quranVerse()) {
                  <p class="font-aref text-[10px] text-amber-200/85 mt-1 max-w-[250px] line-clamp-2 italic">
                    {{ quranVerse() }}
                  </p>
                }
              </div>

              <div class="my-1.5">
                <h3 class="font-cairo text-lg sm:text-2xl font-black text-white drop-shadow-md">
                  {{ cardTitle() }}
                </h3>
                <p class="font-cairo text-xs text-amber-400 font-bold mt-1">{{ eventConfig().name }}</p>
              </div>

              <div class="flex flex-col items-center gap-1.5 w-full">
                <div class="inline-flex items-center gap-1.5 rounded-full bg-amber-950/60 border border-amber-400/50 px-3.5 py-1 text-xs font-black text-amber-300">
                  <span>📅</span>
                  <span>{{ formattedDate() }}</span>
                </div>
                @if (locationName()) {
                  <p class="text-[10px] text-amber-200/80">📍 {{ locationName() }} - {{ locationCity() }}</p>
                }
              </div>

              <div class="mt-1 h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <p class="font-cairo text-[10px] text-amber-300 font-bold">حضوركم يشرفنا ويسعدنا</p>
            </div>
          </div>

          <!-- Left Door Wing (Gatefold) with Ornate Palace Panel & Brass Knocker -->
          <div
            class="absolute inset-y-0 left-0 w-1/2 rounded-l-3xl border-2 border-r border-amber-400/80 shadow-[10px_0_35px_rgba(0,0,0,0.9)] transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.45,1)] bg-gradient-to-r from-[#2c1b0c] via-[#1f1207] to-[#150b04] origin-left"
            style="transform-style: preserve-3d;"
            [style.transform]="isOpened() ? 'rotateY(-118deg) translateZ(10px)' : 'rotateY(0deg) translateZ(8px)'"
            [style.zIndex]="isOpened() ? '5' : '30'"
          >
            <!-- Heavy Brass Outer Hinges (Left) -->
            <div class="absolute left-1 top-12 h-10 w-2 rounded-r-md bg-gradient-to-r from-amber-600 to-yellow-400 shadow-md border-y border-amber-300"></div>
            <div class="absolute left-1 bottom-12 h-10 w-2 rounded-r-md bg-gradient-to-r from-amber-600 to-yellow-400 shadow-md border-y border-amber-300"></div>

            <!-- Palace Arabesque Door Molding -->
            <div class="absolute inset-3.5 border-2 border-amber-400/40 rounded-l-2xl flex flex-col items-center justify-between py-8 px-2 bg-gradient-to-b from-[#221307]/50 to-transparent">
              <span class="text-2xl text-amber-400/70 drop-shadow">⚜️</span>
              
              <!-- 3D Heavy Brass Door Knocker / Ring Handle (Left) -->
              <div class="relative flex flex-col items-center my-auto">
                <div class="h-6 w-6 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 border border-yellow-200 shadow-lg flex items-center justify-center">
                  <div class="h-2 w-2 rounded-full bg-amber-950"></div>
                </div>
                <div class="h-12 w-10 -mt-2 rounded-full border-4 border-amber-400 bg-transparent shadow-[0_5px_15px_rgba(0,0,0,0.6)]"></div>
              </div>

              <div class="h-0.5 w-10 bg-amber-400/40 rounded-full"></div>
            </div>
          </div>

          <!-- Right Door Wing (Gatefold) with Ornate Palace Panel & Brass Knocker -->
          <div
            class="absolute inset-y-0 right-0 w-1/2 rounded-r-3xl border-2 border-l border-amber-400/80 shadow-[-10px_0_35px_rgba(0,0,0,0.9)] transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.45,1)] bg-gradient-to-l from-[#2c1b0c] via-[#1f1207] to-[#150b04] origin-right"
            style="transform-style: preserve-3d;"
            [style.transform]="isOpened() ? 'rotateY(118deg) translateZ(10px)' : 'rotateY(0deg) translateZ(8px)'"
            [style.zIndex]="isOpened() ? '5' : '30'"
          >
            <!-- Heavy Brass Outer Hinges (Right) -->
            <div class="absolute right-1 top-12 h-10 w-2 rounded-l-md bg-gradient-to-l from-amber-600 to-yellow-400 shadow-md border-y border-amber-300"></div>
            <div class="absolute right-1 bottom-12 h-10 w-2 rounded-l-md bg-gradient-to-l from-amber-600 to-yellow-400 shadow-md border-y border-amber-300"></div>

            <!-- Palace Arabesque Door Molding -->
            <div class="absolute inset-3.5 border-2 border-amber-400/40 rounded-r-2xl flex flex-col items-center justify-between py-8 px-2 bg-gradient-to-b from-[#221307]/50 to-transparent">
              <span class="text-2xl text-amber-400/70 drop-shadow">⚜️</span>
              
              <!-- 3D Heavy Brass Door Knocker / Ring Handle (Right) -->
              <div class="relative flex flex-col items-center my-auto">
                <div class="h-6 w-6 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 border border-yellow-200 shadow-lg flex items-center justify-center">
                  <div class="h-2 w-2 rounded-full bg-amber-950"></div>
                </div>
                <div class="h-12 w-10 -mt-2 rounded-full border-4 border-amber-400 bg-transparent shadow-[0_5px_15px_rgba(0,0,0,0.6)]"></div>
              </div>

              <div class="h-0.5 w-10 bg-amber-400/40 rounded-full"></div>
            </div>
          </div>

          <!-- Center Wax Seal / Palace Lock (Unlocks with Golden Burst) -->
          <div
            class="absolute left-1/2 top-1/2 z-40 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center transition-all duration-500 ease-out"
            style="transform: translateZ(26px);"
            [style.transform]="isOpened() ? 'translate3d(-50%, -60%, 26px) scale(1.2) rotate(10deg)' : 'translate3d(-50%, -50%, 26px) scale(1) rotate(0deg)'"
            [style.opacity]="isOpened() ? '0' : '1'"
            [class.pointer-events-none]="isOpened()"
          >
            <div class="absolute -inset-2 rounded-full bg-amber-400/35 blur-md animate-pulse pointer-events-none"></div>
            <div class="h-full w-full rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-2xl flex flex-col items-center justify-center text-black font-black">
              <span class="text-xl">⚜️</span>
              <span class="font-cairo text-[9px] font-black mt-0.5">افتح البوابات</span>
            </div>
            <div class="absolute -bottom-9 whitespace-nowrap rounded-full bg-stone-900/85 px-4 py-1 text-[11px] font-bold text-amber-200 border border-amber-300/35 shadow-lg backdrop-blur-md tracking-wide">
              انقر لفتح البوابات ✦
            </div>
          </div>
        </button>
      }

      <!-- ================================================================= -->
      <!-- SHAPE: ROYAL THEATRE VELVET CURTAINS (OPENS RIGHT AND LEFT)       -->
      <!-- ================================================================= -->
      @else if (shape() === 'royal-curtain') {
        <div
          class="relative w-[320px] h-[540px] sm:w-[410px] sm:h-[620px] cursor-pointer text-center outline-none rounded-3xl select-none transition-all duration-700 shadow-[0_25px_90px_rgba(0,0,0,0.85)] border-2 border-amber-400/60 overflow-hidden bg-gradient-to-b from-[#140307] via-[#24060f] to-[#0a0104]"
          style="perspective: 2500px; transform-style: preserve-3d;"
          (click)="handleOpen()"
          role="button"
          tabindex="0"
          (keydown.enter)="handleOpen()"
          (keydown.space)="handleOpen()"
          [attr.aria-label]="'افتح الستارة الملكية'"
        >
          <!-- Stage Background Ambient Glow & Particles -->
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(245,158,11,0.22)_0%,transparent_70%)]"></div>
          <div class="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(251,191,36,0.8)_1.5px,transparent_1.5px)] [background-size:28px_28px] animate-[floatParticles_12s_linear_infinite]"></div>

          <!-- Stage Golden Arch Inner Frame -->
          <div class="pointer-events-none absolute inset-3 rounded-2xl border border-amber-400/40 z-0"></div>

          <!-- ============================================================= -->
          <!-- INNER REVEAL CARD (BEHIND CURTAINS - THE ACTUAL INVITATION)   -->
          <!-- ============================================================= -->
          <div
            class="absolute inset-4 sm:inset-5 z-10 flex flex-col items-center justify-between p-5 sm:p-7 text-center text-amber-200 transition-all duration-1000 ease-[cubic-bezier(0.2,0.9,0.3,1)] rounded-2xl bg-gradient-to-b from-[#1f050c]/95 via-[#2d0711]/95 to-[#120206]/95 border-2 border-amber-400/60 shadow-2xl backdrop-blur-md overflow-hidden"
            [style.transform]="isOpened() ? 'scale(1.02) translateZ(40px)' : 'scale(0.95) translateZ(0px)'"
            [style.boxShadow]="isOpened() ? '0 30px 90px rgba(0,0,0,0.95), 0 0 50px rgba(245,158,11,0.25)' : ''"
          >
            <!-- Ornate Inner Frame -->
            <div class="pointer-events-none absolute inset-2 border border-amber-400/40 rounded-xl"></div>
            <div class="pointer-events-none absolute inset-3.5 border border-amber-400/20 rounded-lg"></div>

            <!-- Top Crown & Verse -->
            <div class="flex flex-col items-center">
              <div class="mb-1.5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-[0_0_25px_rgba(245,158,11,0.6)] text-black text-2xl font-black animate-pulse">
                👑
              </div>
              <p class="font-aref text-xs sm:text-sm text-amber-300 font-bold tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              @if (quranVerse()) {
                <p class="font-aref text-[9px] sm:text-[10px] text-amber-200/90 mt-1 max-w-[270px] line-clamp-2 italic leading-relaxed">
                  {{ quranVerse() }}
                </p>
              }
            </div>

            <!-- Parents Note & Couple Names -->
            <div class="my-1 text-center">
              @if (parentsNote()) {
                <p class="font-cairo text-[9px] sm:text-[10px] text-amber-300/80 font-bold mb-1 line-clamp-1">
                  {{ parentsNote() }}
                </p>
              } @else {
                <p class="font-cairo text-[9px] sm:text-[10px] text-amber-300/80 font-bold mb-1">
                  يتشرف العائلتان بدعوة سيادتكم لمشاركتنا فرحة العمر
                </p>
              }

              @if (groom() && bride()) {
                <h3 class="font-cairo text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]">
                  {{ groom() }}
                </h3>
                <div class="flex items-center justify-center gap-2 my-0.5">
                  <span class="h-px w-6 bg-amber-400/60"></span>
                  <span class="font-playfair text-base text-amber-400 font-bold">&</span>
                  <span class="h-px w-6 bg-amber-400/60"></span>
                </div>
                <h3 class="font-cairo text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]">
                  {{ bride() }}
                </h3>
              } @else {
                <h3 class="font-cairo text-xl sm:text-2xl font-black text-white tracking-wide">
                  {{ cardTitle() }}
                </h3>
              }

              <p class="font-cairo text-[11px] text-amber-300 font-bold mt-1">
                {{ eventConfig().name }}
              </p>
            </div>

            <!-- Date & Venue Location Badges -->
            <div class="flex flex-col items-center gap-1.5 w-full">
              <div class="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/50 px-3.5 py-1 shadow-md">
                <span class="text-xs">📅</span>
                <span class="font-cairo text-xs font-black text-amber-200">
                  {{ formattedDate() }}
                </span>
                <span class="text-[9px] text-amber-300/80">({{ formattedTime() }})</span>
              </div>

              @if (locationName()) {
                <div class="inline-flex items-center gap-1 text-[10px] text-slate-300 font-bold">
                  <span>📍</span>
                  <span>{{ locationName() }}</span>
                  @if (locationCity()) {
                    <span>- {{ locationCity() }}</span>
                  }
                </div>
              }
            </div>

            <!-- Royal Welcome Footer -->
            <div class="mt-1 flex items-center justify-center gap-2 text-amber-300">
              <span class="h-px w-10 bg-amber-400/50"></span>
              <span class="font-cairo text-[10px] sm:text-xs font-black">يسعدنا ويشرفنا حضوركم</span>
              <span class="h-px w-10 bg-amber-400/50"></span>
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- LEFT ROYAL VELVET CURTAIN (GATHERS ELEGANTLY TO LEFT)         -->
          <!-- ============================================================= -->
          <div
            class="absolute inset-y-0 left-0 w-[53%] z-30 shadow-[10px_0_35px_rgba(0,0,0,0.85)] origin-left transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            [style.transform]="isOpened() ? 'translateX(-74%) scaleX(0.32)' : 'translateX(0%) scaleX(1)'"
            style="background: repeating-linear-gradient(90deg, #32030c 0%, #590918 5%, #7a0e22 10%, #9e142d 15%, #6e0c1e 20%, #3f0510 25%, #250207 30%);"
          >
            <!-- Gold Trim on Inner Border -->
            <div class="absolute inset-y-0 right-0 w-2.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 shadow-lg"></div>

            <!-- Braided Golden Tie-Back Rope & Tassel (Left) -->
            <div class="absolute right-2 top-[58%] -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-95">
              <div class="h-10 w-2.5 rounded-full bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 shadow-md"></div>
              <div class="h-3 w-3 rounded-full bg-amber-400 border border-yellow-200 -mt-1"></div>
              <div class="w-1.5 h-7 bg-amber-500 rounded-b-md shadow-sm"></div>
            </div>

            <!-- Velvet Wave Highlights & Shadows -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
          </div>

          <!-- ============================================================= -->
          <!-- RIGHT ROYAL VELVET CURTAIN (GATHERS ELEGANTLY TO RIGHT)       -->
          <!-- ============================================================= -->
          <div
            class="absolute inset-y-0 right-0 w-[53%] z-30 shadow-[-10px_0_35px_rgba(0,0,0,0.85)] origin-right transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            [style.transform]="isOpened() ? 'translateX(74%) scaleX(0.32)' : 'translateX(0%) scaleX(1)'"
            style="background: repeating-linear-gradient(90deg, #250207 0%, #3f0510 5%, #6e0c1e 10%, #9e142d 15%, #7a0e22 20%, #590918 25%, #32030c 30%);"
          >
            <!-- Gold Trim on Inner Border -->
            <div class="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 shadow-lg"></div>

            <!-- Braided Golden Tie-Back Rope & Tassel (Right) -->
            <div class="absolute left-2 top-[58%] -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-95">
              <div class="h-10 w-2.5 rounded-full bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 shadow-md"></div>
              <div class="h-3 w-3 rounded-full bg-amber-400 border border-yellow-200 -mt-1"></div>
              <div class="w-1.5 h-7 bg-amber-500 rounded-b-md shadow-sm"></div>
            </div>

            <!-- Velvet Wave Highlights & Shadows -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
          </div>

          <!-- ============================================================= -->
          <!-- TOP ROYAL VALANCE (برقع الستارة العلوي الفاخر يظل ثابتاً ومؤطراً للمسرح) -->
          <!-- ============================================================= -->
          <div
            class="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-32 z-40 origin-top shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          >
            <!-- Scalloped Velvet Drapery -->
            <div
              class="h-full w-full bg-gradient-to-b from-[#420410] via-[#590918] to-[#2b020a] shadow-[0_12px_30px_rgba(0,0,0,0.85)] border-b-2 border-amber-400/80"
              style="clip-path: polygon(0 0, 100% 0, 100% 75%, 85% 95%, 70% 75%, 50% 100%, 30% 75%, 15% 95%, 0 75%);"
            >
              <!-- Gold Drapery Trim -->
              <div class="absolute inset-x-0 bottom-1 flex justify-around px-2 text-amber-300 text-xs">
                <span>⚜️</span>
                <span>⚜️</span>
                <span>⚜️</span>
              </div>
            </div>

            <!-- Center Royal Crown on Valance -->
            <div class="absolute left-1/2 top-4 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 border border-yellow-200 shadow-xl text-base text-black font-black">
              👑
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- CENTER MEDALLION & OPENING PULL BUTTON (OPENS WITH GOLDEN BURST) -->
          <!-- ============================================================= -->
          <div
            class="absolute left-1/2 top-[52%] z-50 flex items-center justify-center transition-all duration-500 ease-out"
            style="transform: translateZ(30px);"
            [style.transform]="isOpened() ? 'translate3d(-50%, -60%, 30px) scale(1.2) rotate(-8deg)' : 'translate3d(-50%, -50%, 30px) scale(1) rotate(0deg)'"
            [style.opacity]="isOpened() ? '0' : '1'"
            [class.pointer-events-none]="isOpened()"
          >
            <!-- Pulsing Golden Aura -->
            <div class="absolute -inset-4 rounded-full bg-amber-400/40 blur-xl animate-pulse pointer-events-none"></div>

            <!-- Royal Crest Seal Button -->
            <div class="group/seal relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-[0_12px_45px_rgba(212,175,55,0.7)] transition-transform duration-300 group-hover:scale-105 active:scale-95">
              <div class="flex h-[88%] w-[88%] flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#2a040b] to-[#120104] border border-amber-300/60 shadow-inner text-center px-1">
                <span class="text-2xl drop-shadow">🎭</span>
                <span class="font-cairo text-[10px] sm:text-[11px] font-black text-amber-300 mt-1 leading-tight">
                  افتح الستارة
                </span>
                <span class="font-cairo text-[8px] text-amber-400/80 font-bold">
                  لمشاهدة الدعوة
                </span>
              </div>
            </div>

            <!-- Floating Action Pill (Modern & Sleek) -->
            <div class="mt-4 flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-stone-900/85 px-4 py-1.5 text-amber-200 font-cairo font-bold text-xs sm:text-sm shadow-xl backdrop-blur-md tracking-wide">
              <span>انقر لفتح الستارة</span>
              <span class="text-amber-400">✦</span>
            </div>
          </div>
        </div>
      }

      <!-- ================================================================= -->
      <!-- SHAPE 4: CLASSIC HORIZONTAL ENVELOPE (THEMED TO SELECTED TEMPLATE)-->
      <!-- ================================================================= -->
      @else {
        <button
          type="button"
          (click)="handleOpen()"
          [attr.aria-label]="'افتح الدعوة'"
          class="relative h-[220px] w-[320px] cursor-pointer text-left outline-none focus-visible:ring-4 focus-visible:ring-white/55 sm:h-[280px] sm:w-[440px] transition-transform duration-300 {{
            !isOpened() ? 'hover:scale-[1.025] hover:-translate-y-1 animate-float' : ''
          }}"
          style="perspective: 2200px; transform-style: preserve-3d;"
        >
          <!-- Shadow below envelope -->
          <div
            class="absolute -bottom-10 left-1/2 h-10 w-[90%] -translate-x-1/2 scale-y-50 rounded-full bg-black/20 blur-2xl transition-all duration-1000 {{
              isOpened() ? 'opacity-40 scale-x-75 translate-y-3' : 'opacity-100 scale-x-100'
            }}"
          ></div>

          <!-- Envelope Back -->
          <div class="absolute inset-0 rounded-2xl border {{ style().back }}" style="transform: translateZ(0px);"></div>

          <!-- Special Decor -->
          @if (style().decorClass === 'emerald-decor') {
            <div class="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(251,191,36,0.8)_1px,transparent_1px)] [background-size:24px_24px]"></div>
          } @else if (style().decorClass === 'midnight-decor') {
            <div class="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(56,189,248,0.8)_1px,transparent_1px)] [background-size:28px_28px]"></div>
          } @else if (style().decorClass === 'islamic-decor') {
            <div class="absolute inset-2 border border-amber-400/30 opacity-70"></div>
          } @else if (style().decorClass === 'dark-decor') {
            <div class="absolute inset-0 opacity-45 [background-image:radial-gradient(var(--invite-accent)_1px,transparent_1px)] [background-size:38px_38px]"></div>
          } @else if (style().decorClass === 'floral-decor') {
            <div class="absolute -left-6 -top-6 text-6xl text-[#E8A0BF]/45">✿</div>
          } @else if (style().decorClass === 'particle-decor') {
            <div class="absolute inset-0 animate-[floatParticles_9s_linear_infinite] opacity-45 [background-image:radial-gradient(#FFD93D_2px,transparent_2px),radial-gradient(#FF6B9D_2px,transparent_2px)] [background-position:0_0,22px_28px] [background-size:48px_48px]"></div>
          }

          <!-- Envelope Left & Right flaps -->
          <div
            class="pointer-events-none absolute inset-0 z-10 rounded-2xl {{ style().side }}"
            style="clip-path: polygon(0 0, 50% 50%, 0 100%); transform: translateZ(4px);"
          ></div>
          <div
            class="pointer-events-none absolute inset-0 z-10 rounded-2xl {{ style().side }}"
            style="clip-path: polygon(100% 0, 50% 50%, 100% 100%); transform: translateZ(4px);"
          ></div>

          <!-- Envelope Bottom flap -->
          <div
            class="pointer-events-none absolute inset-0 z-20 rounded-2xl border-b shadow-[0_-5px_15px_rgba(0,0,0,0.03)] {{ style().bottom }}"
            style="clip-path: polygon(0 100%, 50% 55%, 100% 100%); transform: translateZ(6px);"
          ></div>

          <!-- Envelope Top Fold Flap -->
          <div
            class="absolute inset-0 origin-top rounded-2xl border-t shadow-xl transition-all duration-[850ms] ease-in-out {{ style().top }}"
            style="clip-path: polygon(0 0, 100% 0, 50% 55%); transform-style: preserve-3d;"
            [style.transform]="isOpened() ? 'rotateX(180deg) translateZ(-15px)' : 'rotateX(0deg) translateZ(8px)'"
            [style.zIndex]="isOpened() ? '0' : '30'"
          ></div>

          <!-- Sliding Card Inside (Emerges AFTER Flap Opens) -->
          <div
            class="absolute inset-[8px] sm:inset-[12px] z-50 flex flex-col items-center justify-between p-3.5 sm:p-5 overflow-hidden rounded-xl border shadow-inner {{ style().card }}"
            [style.transition]="isOpened() ? 'transform 1900ms cubic-bezier(0.18, 0.95, 0.3, 1) 900ms, box-shadow 1900ms cubic-bezier(0.18, 0.95, 0.3, 1) 900ms' : 'transform 700ms ease, box-shadow 700ms ease'"
            [style.transform]="isOpened() ? 'translate3d(0, -230px, 70px) rotate(-0.8deg) scale(1.05)' : 'translate3d(0, 0, 2px) rotate(0deg) scale(1)'"
            [style.boxShadow]="isOpened() ? '0 45px 110px rgba(0,0,0,0.85)' : ''"
          >
            <div class="flex items-center justify-center gap-2 text-center">
              <span class="text-xl sm:text-2xl">{{ eventConfig().icon }}</span>
              <p class="font-aref text-xs font-bold text-amber-400">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </div>
            
            <div class="text-center px-3 my-0.5">
              <div class="font-playfair text-lg sm:text-2xl font-black leading-tight {{ style().names }}">
                {{ cardTitle() }}
              </div>
              <div class="mt-1 h-0.5 w-16 mx-auto rounded-full {{ style().line }}"></div>
            </div>

            <div class="flex flex-col items-center gap-1 text-center">
              <span class="font-cairo text-[10px] sm:text-xs font-black text-amber-300">
                📅 {{ formattedDate() }} - {{ formattedTime() }}
              </span>
              @if (locationName()) {
                <span class="font-cairo text-[9px] text-slate-300">
                  📍 {{ locationName() }}
                </span>
              }
            </div>
          </div>

          <!-- Wax Seal (Pops open on tap) -->
          <div
            class="absolute left-1/2 top-[55%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-20 sm:w-20 transition-all duration-500 ease-out"
            style="transform: translateZ(10px);"
            [style.transform]="isOpened() ? 'translate3d(-50%, -60%, 10px) scale(1.2) rotate(-8deg)' : 'translate3d(-50%, -50%, 10px) scale(1) rotate(0deg)'"
            [style.opacity]="isOpened() ? '0' : '1'"
            [class.pointer-events-none]="isOpened()"
          >
            <div class="absolute -inset-2 rounded-full bg-amber-400/30 blur-md animate-pulse-aura pointer-events-none"></div>
            <div class="absolute inset-0 rounded-full border-2 shadow-2xl {{ style().seal }}"></div>
            <div class="absolute inset-1.5 rounded-full border border-white/40 shadow-inner flex flex-col items-center justify-center {{ style().sealInner }}">
              <span class="text-amber-400 text-xs sm:text-sm drop-shadow leading-none">⚜</span>
              <span class="relative z-10 text-center font-cairo text-[9px] sm:text-[10px] font-black leading-tight tracking-tight drop-shadow-md whitespace-pre-line mt-0.5 {{ style().sealText }}">
                {{ eventConfig().sealText }}
              </span>
            </div>
            <div class="absolute -bottom-9 whitespace-nowrap rounded-full bg-stone-900/85 px-4 py-1 text-[11px] font-bold text-amber-200 border border-amber-300/35 shadow-lg backdrop-blur-md tracking-wide">
              انقر للفتح ✦
            </div>
          </div>
        </button>
      }
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(0.4deg); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .cubic-bezier {
      transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes pulseAura {
      0%, 100% { transform: scale(1); opacity: 0.4; }
      50% { transform: scale(1.15); opacity: 0.8; }
    }
    .animate-pulse-aura {
      animation: pulseAura 2.2s infinite ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `]
})
export class EnvelopeComponent {
  shape = input<EnvelopeShapeId>('vertical-royal-embossed');
  template = input.required<InvitationTemplateId>();
  eventType = input<string | null | undefined>('wedding');
  groom = input<string | null | undefined>('');
  bride = input<string | null | undefined>('');
  hostName = input<string | null | undefined>('');
  title = input<string | null | undefined>('');
  guestName = input<string | null | undefined>('');
  weddingDate = input<string | null | undefined>('');
  locationName = input<string | null | undefined>('');
  locationCity = input<string | null | undefined>('');
  quranVerse = input<string | null | undefined>('');
  message = input<string | null | undefined>('');
  parentsNote = input<string | null | undefined>('');

  opened = output<void>();
  openingStarted = output<void>();

  isOpened = signal<boolean>(false);

  style = computed(() => envelopeStyles[this.template()] ?? envelopeStyles['royal-emerald-gold']);
  eventConfig = computed(() => getEventCategoryConfig(this.eventType()));

  formattedDate = computed(() => {
    const raw = this.weddingDate();
    if (!raw) return 'الأربعاء، ٢٠ يناير ٢٠٢٧';
    try {
      const d = new Date(raw);
      return d.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'الجمعة، ٢٠ نوفمبر ٢٠٢٦';
    }
  });

  formattedTime = computed(() => {
    const raw = this.weddingDate();
    if (!raw) return 'الساعة ٧:٠٠ مساءً';
    try {
      const d = new Date(raw);
      return d.toLocaleTimeString('ar-EG', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return 'الساعة ٧:٠٠ مساءً';
    }
  });

  cardTitle = computed(() => {
    const type = this.eventType() || 'wedding';
    if (type === 'wedding' || type === 'engagement' || type === 'katb_ketab') {
      const g = this.groom()?.charAt(0) ?? '';
      const b = this.bride()?.charAt(0) ?? '';
      return g && b ? `${this.groom()} & ${this.bride()}` : (this.groom() || this.bride() || 'دعوة');
    }
    if (type === 'henna') {
      return this.bride() ? `حنة ${this.bride()}` : 'ليلة الحنة';
    }
    if (type === 'graduation') {
      return this.hostName() ? `${this.hostName()}` : 'حفل التخرج';
    }
    if (type === 'opening') {
      return this.title() || 'الافتتاح الرسمي';
    }
    if (type === 'baby_shower') {
      return this.hostName() ? `المولود ${this.hostName()}` : 'بشارة مولود';
    }
    return this.groom() || this.hostName() || 'دعوة خاصة';
  });

  handleOpen(): void {
    if (this.isOpened()) return;
    this.isOpened.set(true);
    this.openingStarted.emit();

    setTimeout(() => {
      this.opened.emit();
    }, 4000);
  }
}
