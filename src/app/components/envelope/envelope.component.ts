import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationTemplateId } from '../../constants/templates';
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
    line: 'bg-[#B4E7CE]',
    seal: 'bg-[#E8A0BF] border-[#FFE5E5]',
    sealInner: 'bg-[#BA90C6]',
    sealText: 'text-white',
    hint: 'text-[#7b4b6a]',
    decorClass: 'floral-decor',
  },
  'botanical-watercolor': {
    back: 'bg-[#fffaf0]/92 border-[#d8c79d]/65 shadow-[0_30px_82px_rgba(82,106,78,0.16)]',
    side: 'bg-[#dbe7d4]',
    bottom: 'bg-[#fffaf0] border-[#d8c79d]/55',
    top: 'bg-[linear-gradient(135deg,#f4eedf,#e4edd8)] border-[#d8c79d]/70',
    card: 'bg-[#fffaf0]/90 border-[#d8c79d]/55',
    names: 'text-[#526a4e] font-bold',
    line: 'bg-[#b79552]',
    seal: 'bg-[#526a4e] border-[#d8c79d]',
    sealInner: 'bg-[#b79552]',
    sealText: 'text-[#fffaf0]',
    hint: 'text-[#526a4e]',
  },
  'pink-photo-floral': {
    back: 'bg-white/88 border-[#f0c6d0]/75 shadow-[0_30px_82px_rgba(174,111,130,0.16)]',
    side: 'bg-[#f7dbe2]',
    bottom: 'bg-[#fff7f8] border-[#f0c6d0]/65',
    top: 'bg-[linear-gradient(135deg,#fbe4e9,#f8ecf0)] border-[#f0c6d0]/80',
    card: 'bg-white/92 border-[#f0c6d0]/70',
    names: 'text-[#8f4f5f] font-bold',
    line: 'bg-[#d8a0ac]',
    seal: 'bg-[#8f4f5f] border-[#f0c6d0]',
    sealInner: 'bg-[#d8a0ac]',
    sealText: 'text-white',
    hint: 'text-[#8f4f5f]',
  },
  'burgundy-gold-floral': {
    back: 'bg-[#fffaf4]/92 border-[#d1ad55]/65 shadow-[0_32px_85px_rgba(91,33,48,0.18)]',
    side: 'bg-[#eeded8]',
    bottom: 'bg-[#fffaf4] border-[#d1ad55]/55',
    top: 'bg-[linear-gradient(135deg,#6a1932,#8f2b47)] border-[#d1ad55]/80',
    card: 'bg-[#fffaf4]/92 border-[#d1ad55]/60',
    names: 'text-[#6a1932] font-black',
    line: 'bg-[#d1ad55]',
    seal: 'bg-[#6a1932] border-[#d1ad55]',
    sealInner: 'bg-[#d1ad55]',
    sealText: 'text-[#fff7e8]',
    hint: 'text-[#6a1932]',
  },
  'sage-save-date': {
    back: 'bg-white/90 border-[#c8d4bf]/80 shadow-[0_30px_82px_rgba(78,101,72,0.14)]',
    side: 'bg-[#e7eee1]',
    bottom: 'bg-[#fbfbf7] border-[#c8d4bf]/70',
    top: 'bg-[linear-gradient(135deg,#f2f6ee,#e2ecdc)] border-[#c8d4bf]/85',
    card: 'bg-white/92 border-[#c8d4bf]/75',
    names: 'text-[#4e6548] font-bold',
    line: 'bg-[#88a97a]',
    seal: 'bg-[#4e6548] border-[#c8d4bf]',
    sealInner: 'bg-[#88a97a]',
    sealText: 'text-white',
    hint: 'text-[#4e6548]',
  },
  'arabic-blush-story': {
    back: 'bg-white/92 border-[#ead3d6]/80 shadow-[0_30px_82px_rgba(120,95,95,0.14)]',
    side: 'bg-[#f6eaec]',
    bottom: 'bg-[#fff8f8] border-[#ead3d6]/75',
    top: 'bg-[linear-gradient(135deg,#fbf0f2,#f4e1e4)] border-[#ead3d6]/85',
    card: 'bg-white/92 border-[#ead3d6]/80',
    names: 'text-[#6c6862] font-bold',
    line: 'bg-[#d69aa4]',
    seal: 'bg-[#6c6862] border-[#ead3d6]',
    sealInner: 'bg-[#d69aa4]',
    sealText: 'text-white',
    hint: 'text-[#6c6862]',
  },
  'neumorphism-soft': {
    back: 'bg-[#ede4db] border-[#f8f1ea] shadow-[12px_12px_28px_#d1c7bb,-12px_-12px_28px_#ffffff]',
    side: 'bg-[#E8D5C4]',
    bottom: 'bg-[#ede4db] border-[#d1c7bb]',
    top: 'bg-[linear-gradient(135deg,#E8D5C4,#C9B8A8)] border-white/70',
    card: 'bg-[#ede4db] border-[#f8f1ea] shadow-[inset_8px_8px_18px_#d1c7bb,inset_-8px_-8px_18px_#ffffff]',
    names: 'text-[#8f7763] font-bold',
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
    seal: 'bg-slate-700 border-amber-400/60',
    sealInner: 'bg-[#080808]',
    sealText: 'text-amber-300',
    hint: 'text-slate-300',
    decorClass: 'dark-decor',
  },
  'emerald-velvet-botanical': {
    back: 'bg-[#041d14] border-emerald-400/60 shadow-[0_30px_90px_rgba(2,20,13,0.7)]',
    side: 'bg-[#072d20]',
    bottom: 'bg-[#02140e] border-emerald-400/50',
    top: 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 border-emerald-300',
    card: 'bg-[#062419] border-emerald-400/60 shadow-2xl',
    names: 'text-emerald-300 font-extrabold',
    line: 'bg-emerald-400',
    seal: 'bg-gradient-to-r from-emerald-400 to-teal-400 border-emerald-200',
    sealInner: 'bg-[#02140e]',
    sealText: 'text-emerald-300',
    hint: 'text-emerald-300',
    decorClass: 'emerald-decor',
  },
  'sunset-desert-glow': {
    back: 'bg-[#291207] border-orange-400/60 shadow-[0_30px_90px_rgba(41,18,7,0.7)]',
    side: 'bg-[#3b1b0b]',
    bottom: 'bg-[#1c0c04] border-orange-400/50',
    top: 'bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 border-orange-300',
    card: 'bg-[#311609] border-orange-400/60 shadow-2xl',
    names: 'text-orange-300 font-extrabold',
    line: 'bg-orange-400',
    seal: 'bg-orange-500 border-orange-200',
    sealInner: 'bg-[#1c0c04]',
    sealText: 'text-orange-300',
    hint: 'text-orange-300',
    decorClass: 'aurora-decor',
  },
  'vintage-victorian-lace': {
    back: 'bg-[#fcf8f0] border-amber-700/50 shadow-[0_30px_80px_rgba(180,83,9,0.18)]',
    side: 'bg-[#f4ebd9]',
    bottom: 'bg-[#ece0c8] border-amber-700/40',
    top: 'bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 border-white/80',
    card: 'bg-white border-amber-700/40 shadow-md',
    names: 'text-amber-950 font-black',
    line: 'bg-amber-700',
    seal: 'bg-amber-800 border-white',
    sealInner: 'bg-[#f4ebd9]',
    sealText: 'text-amber-950',
    hint: 'text-amber-950',
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
    <div class="flex flex-col items-center">
      <!-- Personalized Guest Banner (if ?to=... or ?guest=... is provided) -->
      @if (guestName()) {
        <div class="mb-4 rounded-full border border-white/60 bg-white/40 px-5 py-1.5 backdrop-blur-xl shadow-lg animate-fadeIn">
          <p class="font-cairo text-xs sm:text-sm font-bold text-current opacity-90">
            خاص إلى: <span class="text-amber-500 font-extrabold">{{ guestName() }}</span> 💌
          </p>
        </div>
      }

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

        <!-- Envelope Top Fold Flap (Folds behind to negative Z when opened) -->
        <div
          class="absolute inset-0 origin-top rounded-2xl border-t shadow-xl transition-all duration-[1000ms] {{ style().top }}"
          style="clip-path: polygon(0 0, 100% 0, 50% 55%); transform-style: preserve-3d;"
          [style.transform]="isOpened() ? 'rotateX(180deg) translateZ(-15px)' : 'rotateX(0deg) translateZ(8px)'"
          [style.zIndex]="isOpened() ? '0' : '30'"
        ></div>

        <!-- Sliding Card Inside (Emerge completely IN FRONT with translateZ(60px) and z-50) -->
        <div
          class="absolute inset-[10px] z-50 flex flex-col items-center justify-center overflow-hidden rounded-xl border shadow-inner sm:inset-[15px] transition-all duration-[2200ms] cubic-bezier {{ style().card }}"
          [style.transform]="isOpened() ? 'translate3d(0, -220px, 60px) scale(1.04)' : 'translate3d(0, 0, 2px) scale(1)'"
          [style.boxShadow]="isOpened() ? '0 35px 90px rgba(0,0,0,0.7)' : ''"
        >
          <div class="text-2xl sm:text-3xl mb-1">
            {{ eventConfig().icon }}
          </div>
          <div class="font-playfair text-xl sm:text-3xl text-center px-4 transition-all duration-1000 {{ style().names }}">
            {{ cardTitle() }}
          </div>
          <div class="mt-2 h-0.5 w-12 rounded-full transition-all duration-1000 {{ style().line }}"></div>
        </div>

        <!-- Wax Seal with Glowing Aura & Royal Crest -->
        <div
          class="absolute left-1/2 top-[55%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-20 sm:w-20 transition-all duration-700"
          style="transform: translateZ(10px);"
          [class.opacity-0]="isOpened()"
          [class.scale-0]="isOpened()"
          [class.pointer-events-none]="isOpened()"
        >
          <!-- Pulsing Golden Halo Aura -->
          <div class="absolute -inset-2 rounded-full bg-amber-400/30 blur-md animate-pulse-aura pointer-events-none"></div>
          
          <!-- Outer Wax Ring -->
          <div class="absolute inset-0 rounded-full border-2 shadow-2xl {{ style().seal }}"></div>
          
          <!-- Inner Wax Emboss Layer -->
          <div class="absolute inset-1.5 rounded-full border border-white/40 shadow-inner flex flex-col items-center justify-center {{ style().sealInner }}">
            <span class="text-amber-400 text-xs sm:text-sm drop-shadow leading-none">⚜</span>
            <span class="relative z-10 text-center font-cairo text-[9px] sm:text-[10px] font-black leading-tight tracking-tight drop-shadow-md whitespace-pre-line mt-0.5 {{ style().sealText }}">
              {{ eventConfig().sealText }}
            </span>
          </div>
        </div>
      </button>
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
  template = input.required<InvitationTemplateId>();
  eventType = input<string | null | undefined>('wedding');
  groom = input<string | null | undefined>('');
  bride = input<string | null | undefined>('');
  hostName = input<string | null | undefined>('');
  title = input<string | null | undefined>('');
  guestName = input<string | null | undefined>('');

  opened = output<void>();

  isOpened = signal<boolean>(false);

  style = computed(() => envelopeStyles[this.template()] ?? envelopeStyles['royal-emerald-gold']);
  eventConfig = computed(() => getEventCategoryConfig(this.eventType()));

  cardTitle = computed(() => {
    const type = this.eventType() || 'wedding';
    if (type === 'wedding' || type === 'engagement' || type === 'katb_ketab') {
      const g = this.groom()?.charAt(0) ?? '';
      const b = this.bride()?.charAt(0) ?? '';
      return g && b ? `${g} & ${b}`.toUpperCase() : (this.groom() || this.bride() || 'دعوة');
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

    setTimeout(() => {
      this.opened.emit();
    }, 2800);
  }
}
