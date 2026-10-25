import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CountdownComponent } from '../countdown/countdown.component';
import { GuestFormComponent } from '../guest-form/guest-form.component';
import { CalendarButtonComponent } from '../calendar-button/calendar-button.component';
import { RsvpFormComponent } from '../rsvp-form/rsvp-form.component';
import { QrTicketComponent } from '../qr-ticket/qr-ticket.component';
import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';
import { InvitationTemplateId } from '../../constants/templates';
import { getEventCategoryConfig } from '../../constants/events';

interface CardDesign {
  frame: string;
  eyebrow: string;
  heading: string;
  ampersand: string;
  message: string;
  dateBox: string;
  dateText: string;
  map: string;
  mapFrame: string;
  align?: string;
  decorType?: string;
  label: string;
}

const cardDesigns: Record<InvitationTemplateId, CardDesign> = {
  'royal-emerald-gold': {
    frame: 'bg-gradient-to-b from-[#062319] via-[#041a12] to-[#020d09] border-2 border-amber-400/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(4,36,25,0.7)] text-center text-amber-50 ring-1 ring-amber-300/40',
    eyebrow: 'text-amber-400 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-[0_4px_16px_rgba(217,175,55,0.4)] font-playfair font-black',
    ampersand: 'text-amber-400 font-serif',
    message: 'text-emerald-100/95 font-cairo',
    dateBox: 'bg-[#082d20]/90 border border-amber-400/60 shadow-[0_14px_34px_rgba(0,0,0,0.5)] backdrop-blur-xl',
    dateText: 'text-amber-300',
    map: 'bg-[#082d20]/90 border border-amber-400/50 text-amber-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-amber-400/30',
    label: 'Royal Emerald Gold',
    decorType: 'royal-emerald',
  },
  'midnight-starlight': {
    frame: 'bg-gradient-to-b from-[#0c1630] via-[#070d1e] to-[#03060f] border-2 border-sky-400/70 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(15,23,42,0.8)] text-center text-sky-100 ring-1 ring-sky-300/40',
    eyebrow: 'text-amber-300 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-amber-200 drop-shadow-[0_4px_20px_rgba(56,189,248,0.4)] font-playfair font-black',
    ampersand: 'text-amber-300 font-serif',
    message: 'text-slate-100/95 font-cairo',
    dateBox: 'bg-[#0f1d40]/90 border border-sky-400/60 shadow-xl backdrop-blur-xl',
    dateText: 'text-amber-300',
    map: 'bg-[#0f1d40]/90 border border-sky-400/40 text-sky-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-sky-400/30',
    label: 'Midnight Starlight',
    decorType: 'midnight',
  },
  'rose-gold-blush': {
    frame: 'bg-gradient-to-b from-[#fffbfc] via-[#fff5f7] to-[#feecef] border-2 border-[#e09fae] p-6 sm:p-14 rounded-[2rem] shadow-[0_35px_100px_rgba(224,159,174,0.35)] text-center text-[#4a1220] ring-1 ring-[#e09fae]/40',
    eyebrow: 'text-[#b75069] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-[#9e334d] via-[#b75069] to-[#781e33] drop-shadow-sm font-playfair font-black',
    ampersand: 'text-[#b75069] font-serif',
    message: 'text-[#5a1c2a] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#e09fae]/80 shadow-md backdrop-blur-xl',
    dateText: 'text-[#781e33]',
    map: 'bg-white/90 border border-[#e09fae]/70 text-[#4a1220] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#e09fae]/40',
    label: 'Rose Gold Blush',
    decorType: 'rose-gold',
  },
  'arabic-islamic-gold': {
    frame: 'bg-gradient-to-b from-[#171107] via-[#0f0b04] to-[#080602] border-2 border-amber-400/80 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_45px_120px_rgba(20,15,7,0.85)] text-center text-amber-100 ring-2 ring-amber-400/30',
    eyebrow: 'text-amber-400 font-cairo text-lg sm:text-xl font-bold',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 font-aref font-black drop-shadow-[0_4px_16px_rgba(251,191,36,0.35)]',
    ampersand: 'text-amber-400 font-aref',
    message: 'text-amber-100/95 font-cairo',
    dateBox: 'bg-[#1c150a]/95 border border-amber-400/70 shadow-xl backdrop-blur-xl',
    dateText: 'text-amber-300 font-cairo font-bold',
    map: 'bg-[#1c150a]/90 border border-amber-400/50 text-amber-100 rounded-xl shadow-xl',
    mapFrame: 'rounded-lg border border-amber-400/30',
    label: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ',
    decorType: 'arabic-gold',
  },
  'bohemian-terracotta': {
    frame: 'bg-gradient-to-b from-[#fffcf9] via-[#fcf6f0] to-[#f7ece2] border-2 border-[#c97d60]/60 p-6 sm:p-14 rounded-[2.5rem] shadow-[0_35px_90px_rgba(201,125,96,0.22)] text-center text-[#3e190e] ring-1 ring-[#c97d60]/30',
    eyebrow: 'text-[#c97d60] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#481e13] font-playfair font-black drop-shadow-sm',
    ampersand: 'text-[#c97d60] font-serif',
    message: 'text-[#4f271a] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#c97d60]/50 shadow-md backdrop-blur-xl',
    dateText: 'text-[#3e190e] font-bold',
    map: 'bg-white/90 border border-[#c97d60]/50 text-[#3e190e] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#c97d60]/30',
    label: 'Bohemian Terracotta',
    decorType: 'boho',
  },
  'pearl-minimalist': {
    frame: 'bg-gradient-to-b from-[#ffffff] via-[#fafaf8] to-[#f4f2ee] border-2 border-stone-300 p-6 sm:p-16 rounded-[1.25rem] shadow-[0_30px_90px_rgba(0,0,0,0.08)] text-center text-stone-900 ring-1 ring-stone-200',
    eyebrow: 'text-stone-700 tracking-[0.35em] font-bold font-montserrat',
    heading: 'text-stone-950 font-playfair font-black',
    ampersand: 'text-amber-800 font-serif',
    message: 'text-stone-800 font-cairo leading-relaxed font-medium',
    dateBox: 'bg-white/95 border border-stone-300 shadow-sm backdrop-blur-xl',
    dateText: 'text-stone-950 font-bold',
    map: 'bg-white/90 border border-stone-300 text-stone-900 rounded-xl shadow-md',
    mapFrame: 'rounded-lg border border-stone-200',
    label: 'Pearl Minimalist',
    decorType: 'pearl',
  },
  'violet-aurora': {
    frame: 'bg-gradient-to-b from-[#1f0a38] via-[#150527] to-[#0b0214] border-2 border-fuchsia-400/70 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(45,18,77,0.7)] text-center text-fuchsia-100 ring-1 ring-fuchsia-400/40',
    eyebrow: 'text-fuchsia-300 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-pink-200 to-amber-200 drop-shadow-[0_4px_20px_rgba(217,70,239,0.4)] font-playfair font-black',
    ampersand: 'text-pink-400 font-serif',
    message: 'text-fuchsia-100/95 font-cairo',
    dateBox: 'bg-[#290d4a]/90 border border-fuchsia-400/60 shadow-xl backdrop-blur-xl',
    dateText: 'text-fuchsia-200 font-bold',
    map: 'bg-[#290d4a]/90 border border-fuchsia-400/40 text-fuchsia-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-fuchsia-400/30',
    label: 'Violet Aurora',
    decorType: 'violet-aurora',
  },
  'glassmorphism-luxury': {
    frame: 'bg-gradient-to-b from-white/70 via-white/50 to-white/40 backdrop-blur-3xl border-2 border-white/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(118,75,162,0.3)] text-center text-[#2d154d] ring-1 ring-purple-200/50',
    eyebrow: 'text-[#4b2f73] tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-[#2a1045] drop-shadow-[0_4px_16px_rgba(118,75,162,0.2)] font-playfair font-black',
    ampersand: 'text-[#7b3e88] font-serif',
    message: 'text-[#3f2268] font-cairo font-medium',
    dateBox: 'bg-white/80 border border-white shadow-md backdrop-blur-xl',
    dateText: 'text-[#2a1045] font-bold',
    map: 'bg-white/80 border border-white text-[#2d154d] backdrop-blur-xl rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-white/60',
    label: 'Glassmorphism Luxury',
    decorType: 'glass',
  },
  'dark-elegant-premium': {
    frame: 'bg-gradient-to-b from-[#181818] via-[#0f0f0f] to-[#070707] border-2 border-amber-400/70 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_45px_120px_rgba(0,0,0,0.9)] text-center text-stone-100 ring-1 ring-amber-400/30',
    eyebrow: 'text-amber-400 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 drop-shadow-[0_4px_20px_rgba(234,179,8,0.3)] font-playfair font-black',
    ampersand: 'text-amber-400 font-serif',
    message: 'text-stone-200 font-cairo',
    dateBox: 'bg-[#1c1c1c] border border-amber-400/50 shadow-xl backdrop-blur-xl',
    dateText: 'text-amber-300 font-bold',
    map: 'bg-[#1c1c1c] border border-amber-400/40 text-stone-200 rounded-xl shadow-xl',
    mapFrame: 'rounded-lg border border-amber-400/30',
    label: 'Dark Elegant Premium',
    decorType: 'dark',
  },
  'burgundy-gold-floral': {
    frame: 'bg-gradient-to-b from-[#fffbfc] via-[#fff4f6] to-[#fee9ec] border-2 border-[#9f1239]/60 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_35px_95px_rgba(159,18,57,0.25)] text-center text-[#4c0519] ring-1 ring-amber-400/40',
    eyebrow: 'text-[#9f1239] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#6b0924] font-playfair font-black drop-shadow-sm',
    ampersand: 'text-amber-600 font-serif',
    message: 'text-[#5a0c22] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#9f1239]/40 shadow-md backdrop-blur-xl',
    dateText: 'text-[#6b0924] font-bold',
    map: 'bg-white/90 border border-[#9f1239]/40 text-[#4c0519] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#9f1239]/30',
    label: 'Burgundy Royal Gold',
    decorType: 'burgundy',
  },
  'botanical-watercolor': {
    frame: 'bg-gradient-to-b from-[#fffdf7] via-[#f7f9f2] to-[#eff5e9] border-2 border-[#526a4e]/50 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_32px_90px_rgba(82,106,78,0.2)] text-center text-[#21381e] ring-1 ring-[#526a4e]/30',
    eyebrow: 'text-[#476343] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#2a4526] font-playfair font-black',
    ampersand: 'text-[#b79552] font-serif',
    message: 'text-[#324f2e] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#526a4e]/40 shadow-md backdrop-blur-xl',
    dateText: 'text-[#2a4526] font-bold',
    map: 'bg-white/90 border border-[#526a4e]/40 text-[#21381e] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#526a4e]/30',
    label: 'Botanical Watercolor',
    decorType: 'botanical',
  },
  'sage-save-date': {
    frame: 'bg-gradient-to-b from-[#fafcf9] via-[#f3f7f0] to-[#eaf2e5] border-2 border-[#4e6548]/50 p-6 sm:p-14 rounded-[2rem] shadow-[0_32px_90px_rgba(78,101,72,0.22)] text-center text-[#233520] ring-1 ring-[#4e6548]/30',
    eyebrow: 'text-[#4e6548] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#283f25] font-playfair font-black drop-shadow-sm',
    ampersand: 'text-[#b45309] font-serif',
    message: 'text-[#314c2d] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#4e6548]/40 shadow-md backdrop-blur-xl',
    dateText: 'text-[#283f25] font-bold',
    map: 'bg-white/90 border border-[#4e6548]/40 text-[#233520] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#4e6548]/30',
    label: 'Sage Save The Date',
    decorType: 'sage',
  },
  'floral-watercolor': {
    frame: 'bg-gradient-to-b from-[#fffbfc] via-[#fff5f9] to-[#fcedf5] border-2 border-[#db2777]/50 p-6 sm:p-14 rounded-[2rem] shadow-[0_35px_100px_rgba(219,39,119,0.2)] text-center text-[#500724] ring-1 ring-[#db2777]/30',
    eyebrow: 'text-[#db2777] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#700a35] font-playfair font-black',
    ampersand: 'text-[#db2777] font-serif',
    message: 'text-[#5c0d2e] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#db2777]/40 shadow-md backdrop-blur-xl',
    dateText: 'text-[#700a35] font-bold',
    map: 'bg-white/90 border border-[#db2777]/40 text-[#500724] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#db2777]/30',
    label: 'Floral Watercolor',
    decorType: 'floral',
  },
  'pink-photo-floral': {
    frame: 'bg-gradient-to-b from-[#fffafd] via-[#fff1f5] to-[#ffe4eb] border-2 border-[#f43f5e]/50 p-6 sm:p-14 rounded-[2rem] shadow-[0_32px_90px_rgba(244,63,94,0.22)] text-center text-[#4c0519] ring-1 ring-[#f43f5e]/30',
    eyebrow: 'text-[#f43f5e] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#881337] font-playfair font-black',
    ampersand: 'text-[#f43f5e] font-serif',
    message: 'text-[#580b20] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#f43f5e]/40 shadow-md backdrop-blur-xl',
    dateText: 'text-[#881337] font-bold',
    map: 'bg-white/90 border border-[#f43f5e]/40 text-[#4c0519] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#f43f5e]/30',
    label: 'Pink Photo Floral',
    decorType: 'pink',
  },
  'arabic-blush-story': {
    frame: 'bg-gradient-to-b from-[#ffffff] via-[#fff9f9] to-[#fff0f2] border-2 border-[#e11d48]/50 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_30px_86px_rgba(225,29,72,0.2)] text-center text-[#400613] ring-1 ring-[#e11d48]/30',
    eyebrow: 'text-[#e11d48] font-cairo text-lg sm:text-xl font-bold',
    heading: 'text-[#4c0519] font-aref font-black',
    ampersand: 'text-[#e11d48] font-aref',
    message: 'text-[#500e1e] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-[#e11d48]/40 shadow-md backdrop-blur-xl',
    dateText: 'text-[#4c0519] font-cairo font-bold',
    map: 'bg-white/90 border border-[#e11d48]/40 text-[#400613] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-[#e11d48]/30',
    label: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ',
    decorType: 'arabic',
  },
  'neumorphism-soft': {
    frame: 'bg-[#ede4db] border-2 border-[#f7eee5] p-6 sm:p-14 rounded-[2.5rem] shadow-[18px_18px_42px_#d1c7bb,-18px_-18px_42px_#ffffff] text-center text-[#4a3b2f]',
    eyebrow: 'text-[#8f7763] tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#3e3025] font-playfair font-black',
    ampersand: 'text-[#8f7763] font-serif',
    message: 'text-[#4a3b2f] font-cairo font-medium',
    dateBox: 'bg-[#ede4db] border border-[#f8f1ea] shadow-[inset_6px_6px_14px_#d1c7bb,inset_-6px_-6px_14px_#ffffff]',
    dateText: 'text-[#3e3025] font-bold',
    map: 'bg-[#ede4db] border border-[#f8f1ea] text-[#4a3b2f] rounded-[2rem] shadow-[inset_5px_5px_12px_#d1c7bb,inset_-5px_-5px_12px_#ffffff]',
    mapFrame: 'rounded-2xl border border-[#f8f1ea]',
    label: 'Neumorphism Soft',
    decorType: 'neumorphism',
  },
  'gradient-wave-modern': {
    frame: 'bg-gradient-to-b from-[#2a0654] via-[#1b0336] to-[#0e011d] border-2 border-amber-400/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(51,8,103,0.7)] text-center text-white ring-1 ring-amber-300/40',
    eyebrow: 'text-[#FEE140] tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 drop-shadow-[0_4px_20px_rgba(254,225,64,0.4)] font-playfair font-black',
    ampersand: 'text-[#FEE140] font-serif',
    message: 'text-white/95 font-cairo',
    dateBox: 'bg-[#330867]/80 border border-amber-400/70 shadow-xl backdrop-blur-xl',
    dateText: 'text-[#FEE140] font-bold',
    map: 'bg-[#330867]/80 border border-amber-400/50 text-white backdrop-blur-xl rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-amber-400/30',
    label: 'Gradient Wave Modern',
    decorType: 'gradient',
  },
  'geometric-modern': {
    frame: 'bg-white border-4 border-[#1A535C] p-6 sm:p-14 rounded-[1.75rem] shadow-[18px_18px_0_#4ECDC4] text-center text-[#0e353b]',
    eyebrow: 'text-[#FF6B6B] tracking-[0.25em] font-black font-montserrat',
    heading: 'text-[#1A535C] font-montserrat font-black',
    ampersand: 'text-[#FF6B6B] font-serif',
    message: 'text-[#1A535C] font-cairo font-bold',
    dateBox: 'bg-[#FFE66D] border-2 border-[#1A535C] shadow-[4px_4px_0_#1A535C]',
    dateText: 'text-[#1A535C] font-black',
    map: 'bg-white border-2 border-[#1A535C] text-[#1A535C] rounded-xl shadow-[4px_4px_0_#1A535C]',
    mapFrame: 'rounded-none border-2 border-[#1A535C]',
    label: 'Geometric Modern',
    decorType: 'geo',
  },
  'animated-particle': {
    frame: 'bg-gradient-to-b from-white/95 via-white/90 to-[#fff5fa]/90 backdrop-blur-3xl border-2 border-pink-400/60 p-6 sm:p-14 rounded-[2rem] shadow-[0_40px_110px_rgba(102,126,234,0.3)] text-center text-[#4c0519] ring-1 ring-pink-200',
    eyebrow: 'text-[#ec4899] tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-[#be185d] via-[#ec4899] to-[#831843] font-playfair font-black',
    ampersand: 'text-[#ec4899] font-serif',
    message: 'text-[#500724] font-cairo font-medium',
    dateBox: 'bg-white/90 border border-pink-400/50 shadow-md backdrop-blur-xl',
    dateText: 'text-[#be185d] font-bold',
    map: 'bg-white/90 border border-pink-400/40 text-[#4c0519] rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-pink-400/30',
    label: 'Animated Particle',
    decorType: 'particle',
  },
  'minimalist-japanese': {
    frame: 'bg-white border-2 border-black p-6 sm:p-16 rounded-none shadow-[0_28px_90px_rgba(0,0,0,0.12)] text-center text-black',
    eyebrow: 'text-black tracking-[0.4em] font-bold font-montserrat',
    heading: 'text-black font-playfair font-black',
    ampersand: 'text-[#ca8a04] font-serif',
    message: 'text-black font-cairo leading-relaxed font-medium',
    dateBox: 'bg-white border-2 border-black shadow-none',
    dateText: 'text-black font-black',
    map: 'bg-white border-2 border-black text-black rounded-none shadow-sm',
    mapFrame: 'rounded-none border border-black',
    label: 'Minimalist Japanese',
    decorType: 'japan',
  },
  'champagne-royal-silk': {
    frame: 'bg-gradient-to-b from-[#fffdfa] via-[#fcf6ea] to-[#f7eedc] border-2 border-amber-400/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_35px_100px_rgba(212,175,55,0.3)] text-center text-amber-950 ring-1 ring-amber-300/40',
    eyebrow: 'text-amber-700 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 drop-shadow-sm font-playfair font-black',
    ampersand: 'text-amber-600 font-serif',
    message: 'text-amber-950 font-cairo font-medium',
    dateBox: 'bg-white/95 border border-amber-400/60 shadow-md backdrop-blur-xl',
    dateText: 'text-amber-900 font-bold',
    map: 'bg-white/90 border border-amber-400/50 text-amber-950 rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-amber-400/40',
    label: 'Champagne Royal Silk',
    decorType: 'royal-emerald',
  },
  'sapphire-midnight-gold': {
    frame: 'bg-gradient-to-b from-[#091834] via-[#050f20] to-[#02060d] border-2 border-sky-400/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(9,24,52,0.85)] text-center text-sky-100 ring-1 ring-amber-400/40',
    eyebrow: 'text-amber-300 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-amber-200 to-yellow-400 drop-shadow-[0_4px_20px_rgba(56,189,248,0.4)] font-playfair font-black',
    ampersand: 'text-amber-300 font-serif',
    message: 'text-slate-100/95 font-cairo',
    dateBox: 'bg-[#0b1c3d]/90 border border-sky-400/60 shadow-xl backdrop-blur-xl',
    dateText: 'text-amber-300 font-bold',
    map: 'bg-[#0b1c3d]/90 border border-sky-400/40 text-sky-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-sky-400/30',
    label: 'Sapphire Midnight Gold',
    decorType: 'midnight',
  },
  'lavender-provence-dream': {
    frame: 'bg-gradient-to-b from-[#fffbfc] via-[#fbf7ff] to-[#f3e8ff] border-2 border-purple-300/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_35px_100px_rgba(168,85,247,0.25)] text-center text-purple-950 ring-1 ring-purple-200',
    eyebrow: 'text-purple-700 tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-fuchsia-700 to-purple-900 font-playfair font-black',
    ampersand: 'text-purple-600 font-serif',
    message: 'text-purple-950 font-cairo font-medium',
    dateBox: 'bg-white/95 border border-purple-300 shadow-md backdrop-blur-xl',
    dateText: 'text-purple-900 font-bold',
    map: 'bg-white/90 border border-purple-300 text-purple-950 rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-purple-200',
    label: 'Lavender Provence Dream',
    decorType: 'rose-gold',
  },
  'andalusian-palace-moroccan': {
    frame: 'bg-gradient-to-b from-[#1f1106] via-[#140b04] to-[#0a0502] border-2 border-amber-500/80 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_45px_120px_rgba(31,17,6,0.9)] text-center text-amber-100 ring-2 ring-amber-500/30',
    eyebrow: 'text-amber-400 font-cairo text-lg sm:text-xl font-bold',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400 font-aref font-black drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]',
    ampersand: 'text-amber-400 font-aref',
    message: 'text-amber-100/95 font-cairo',
    dateBox: 'bg-[#251508]/95 border border-amber-500/70 shadow-xl backdrop-blur-xl',
    dateText: 'text-amber-300 font-cairo font-bold',
    map: 'bg-[#251508]/90 border border-amber-500/50 text-amber-100 rounded-xl shadow-xl',
    mapFrame: 'rounded-lg border border-amber-500/30',
    label: 'Andalusian Palace Moroccan',
    decorType: 'arabic-gold',
  },
  'obsidian-black-diamond': {
    frame: 'bg-gradient-to-b from-[#141414] via-[#0a0a0a] to-[#000000] border-2 border-slate-500/70 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_50px_130px_rgba(0,0,0,0.95)] text-center text-slate-100 ring-1 ring-amber-400/30',
    eyebrow: 'text-slate-300 tracking-[0.35em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-200 to-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)] font-playfair font-black',
    ampersand: 'text-amber-400 font-serif',
    message: 'text-slate-200 font-cairo',
    dateBox: 'bg-[#141414] border border-slate-600 shadow-xl backdrop-blur-xl',
    dateText: 'text-amber-300 font-bold',
    map: 'bg-[#141414] border border-slate-700 text-slate-200 rounded-xl shadow-xl',
    mapFrame: 'rounded-lg border border-slate-700',
    label: 'Obsidian Black Diamond',
    decorType: 'dark',
  },
  'emerald-velvet-botanical': {
    frame: 'bg-gradient-to-b from-[#05281c] via-[#031c13] to-[#010e0a] border-2 border-emerald-400/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(5,40,28,0.75)] text-center text-emerald-50 ring-1 ring-emerald-300/40',
    eyebrow: 'text-emerald-300 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-amber-200 drop-shadow-[0_4px_16px_rgba(74,222,128,0.35)] font-playfair font-black',
    ampersand: 'text-amber-400 font-serif',
    message: 'text-emerald-100/95 font-cairo',
    dateBox: 'bg-[#073324]/90 border border-emerald-400/60 shadow-xl backdrop-blur-xl',
    dateText: 'text-emerald-300 font-bold',
    map: 'bg-[#073324]/90 border border-emerald-400/50 text-emerald-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-emerald-400/30',
    label: 'Emerald Velvet Botanical',
    decorType: 'royal-emerald',
  },
  'sunset-desert-glow': {
    frame: 'bg-gradient-to-b from-[#34160a] via-[#210c05] to-[#110502] border-2 border-orange-400/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(52,22,10,0.8)] text-center text-orange-100 ring-1 ring-amber-400/40',
    eyebrow: 'text-orange-400 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-amber-300 to-yellow-300 drop-shadow-[0_4px_20px_rgba(251,146,60,0.4)] font-playfair font-black',
    ampersand: 'text-amber-400 font-serif',
    message: 'text-orange-100/95 font-cairo',
    dateBox: 'bg-[#2e1207]/90 border border-orange-400/60 shadow-xl backdrop-blur-xl',
    dateText: 'text-orange-300 font-bold',
    map: 'bg-[#2e1207]/90 border border-orange-400/40 text-orange-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-orange-400/30',
    label: 'Sunset Desert Glow',
    decorType: 'boho',
  },
  'vintage-victorian-lace': {
    frame: 'bg-gradient-to-b from-[#fffcf7] via-[#fcf5e6] to-[#f4e8d3] border-2 border-amber-700/60 p-6 sm:p-14 rounded-[1.75rem] shadow-[0_35px_95px_rgba(180,83,9,0.2)] text-center text-amber-950 ring-1 ring-amber-700/30',
    eyebrow: 'text-amber-800 tracking-[0.25em] font-bold font-montserrat',
    heading: 'text-[#451a03] font-playfair font-black drop-shadow-sm',
    ampersand: 'text-amber-700 font-serif',
    message: 'text-[#582407] font-cairo font-medium',
    dateBox: 'bg-white/95 border border-amber-700/40 shadow-md backdrop-blur-xl',
    dateText: 'text-[#451a03] font-bold',
    map: 'bg-white/90 border border-amber-700/40 text-amber-950 rounded-2xl shadow-lg',
    mapFrame: 'rounded-xl border border-amber-700/30',
    label: 'Vintage Victorian Lace',
    decorType: 'rose-gold',
  },
  'monaco-yacht-glamour': {
    frame: 'bg-gradient-to-b from-[#081e3a] via-[#041021] to-[#02070f] border-2 border-amber-400/80 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(8,30,58,0.8)] text-center text-sky-100 ring-1 ring-amber-300/40',
    eyebrow: 'text-amber-400 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white drop-shadow-[0_4px_20px_rgba(234,179,8,0.4)] font-playfair font-black',
    ampersand: 'text-amber-400 font-serif',
    message: 'text-sky-100/95 font-cairo',
    dateBox: 'bg-[#092244]/90 border border-amber-400/60 shadow-xl backdrop-blur-xl',
    dateText: 'text-amber-300 font-bold',
    map: 'bg-[#092244]/90 border border-amber-400/50 text-sky-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-amber-400/30',
    label: 'Monaco Yacht Glamour',
    decorType: 'royal-emerald',
  },
  'celestial-moonlight-silver': {
    frame: 'bg-gradient-to-b from-[#0f172a] via-[#090f1a] to-[#04070d] border-2 border-slate-400/70 p-6 sm:p-14 rounded-[2rem] shadow-[0_45px_120px_rgba(15,23,42,0.8)] text-center text-slate-100 ring-1 ring-slate-300/40',
    eyebrow: 'text-slate-300 tracking-[0.3em] font-bold font-montserrat',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-100 to-white drop-shadow-[0_4px_20px_rgba(203,213,225,0.4)] font-playfair font-black',
    ampersand: 'text-slate-300 font-serif',
    message: 'text-slate-200/95 font-cairo',
    dateBox: 'bg-[#131e33]/90 border border-slate-400/60 shadow-xl backdrop-blur-xl',
    dateText: 'text-slate-100 font-bold',
    map: 'bg-[#131e33]/90 border border-slate-400/40 text-slate-100 rounded-2xl shadow-xl',
    mapFrame: 'rounded-xl border border-slate-400/30',
    label: 'Celestial Moonlight Silver',
    decorType: 'midnight',
  },
};

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [
    CommonModule,
    CountdownComponent,
    GuestFormComponent,
    CalendarButtonComponent,
    RsvpFormComponent,
    QrTicketComponent,
    PhotoGalleryComponent,
  ],
  template: `
    <div class="relative z-50 mx-auto w-full max-w-3xl animate-cardEntrance">
      <div class="relative overflow-hidden {{ design().frame }}">
        
        <!-- ================================================================= -->
        <!-- RICH IN-CARD BACKGROUND GRAPHICS & TEXTURES (MATCHING THEME)       -->
        <!-- ================================================================= -->

        <!-- 1. ISLAMIC ARABESQUE & GOLD DAMASK LACE (royal-emerald, arabic-gold, dark) -->
        @if (decorType() === 'royal-emerald' || decorType() === 'arabic-gold' || decorType() === 'dark') {
          <!-- Full Card Repeating Islamic 8-Point Star Tessellation Grid -->
          <svg class="pointer-events-none absolute inset-0 h-full w-full opacity-20 select-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-arabesque-pattern" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M32 0 L64 32 L32 64 L0 32 Z" fill="none" stroke="#d4af37" stroke-width="1" stroke-opacity="0.8"/>
                <path d="M0 0 L64 64 M64 0 L0 64" stroke="#d4af37" stroke-width="0.6" stroke-opacity="0.6"/>
                <circle cx="32" cy="32" r="14" fill="none" stroke="#d4af37" stroke-width="1.2" stroke-opacity="0.9"/>
                <polygon points="32,20 35,29 44,32 35,35 32,44 29,35 20,32 29,29" fill="#fde047" opacity="0.45"/>
                <circle cx="0" cy="0" r="7" fill="none" stroke="#d4af37" stroke-width="0.8" stroke-opacity="0.7"/>
                <circle cx="64" cy="0" r="7" fill="none" stroke="#d4af37" stroke-width="0.8" stroke-opacity="0.7"/>
                <circle cx="0" cy="64" r="7" fill="none" stroke="#d4af37" stroke-width="0.8" stroke-opacity="0.7"/>
                <circle cx="64" cy="64" r="7" fill="none" stroke="#d4af37" stroke-width="0.8" stroke-opacity="0.7"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-arabesque-pattern)"/>
          </svg>

          <!-- Top Islamic Mihrab Arch Outline -->
          <div class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md opacity-35 text-amber-400 select-none z-0">
            <svg viewBox="0 0 500 160" fill="none" class="w-full">
              <path d="M40,160 L40,80 Q40,15 250,5 Q460,15 460,80 L460,160" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6 3"/>
              <path d="M60,160 L60,85 Q60,30 250,20 Q440,30 440,85 L440,160" stroke="currentColor" stroke-width="1.2"/>
              <circle cx="250" cy="5" r="5" fill="currentColor"/>
              <path d="M250,20 L250,45" stroke="currentColor" stroke-width="2"/>
              <polygon points="250,50 242,65 258,65" fill="currentColor"/>
            </svg>
          </div>

          <!-- Central Grand Golden Arabesque Mandala (Behind Names) -->
          <div class="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[440px] h-80 sm:h-[440px] opacity-20 text-amber-400 select-none z-0">
            <svg viewBox="0 0 200 200" fill="none" class="w-full h-full animate-[spinSlow_60s_linear_infinite]">
              <circle cx="100" cy="100" r="95" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
              <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="1"/>
              <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="1"/>
              <path d="M100 15 C112 50 150 88 185 100 C150 112 112 150 100 185 C88 150 50 112 15 100 C50 88 88 50 100 15 Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.08"/>
              <path d="M40 40 C70 70 130 70 160 40 C130 70 130 130 160 160 C130 130 70 130 40 160 C70 130 70 70 40 40 Z" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.08"/>
              <circle cx="100" cy="100" r="16" fill="currentColor" fill-opacity="0.25"/>
            </svg>
          </div>
        }

        <!-- 2. CELESTIAL STARLIGHT & GALAXY MAP (midnight, violet-aurora, gradient) -->
        @else if (decorType() === 'midnight' || decorType() === 'violet-aurora' || decorType() === 'gradient') {
          <svg class="pointer-events-none absolute inset-0 h-full w-full opacity-30 select-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="celestial-starlight-pattern" width="90" height="90" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="20" r="1.5" fill="#fde047"/>
                <circle cx="75" cy="65" r="2" fill="#38bdf8"/>
                <circle cx="45" cy="80" r="1" fill="#ffffff"/>
                <circle cx="80" cy="20" r="1.5" fill="#ffffff"/>
                <circle cx="25" cy="60" r="1.2" fill="#f472b6"/>
                <path d="M15 20 L45 80 L75 65" stroke="rgba(255,255,255,0.2)" stroke-width="0.8" stroke-dasharray="2 2"/>
                <polygon points="45,35 47,40 52,40 48,43 50,48 45,45 40,48 42,43 38,40 43,40" fill="#fde047" opacity="0.75"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#celestial-starlight-pattern)"/>
          </svg>
          <!-- Center Luminous Starlight Burst -->
          <div class="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[460px] h-80 sm:h-[460px] rounded-full bg-radial from-amber-400/20 via-sky-500/10 to-transparent blur-2xl z-0"></div>
          <!-- Celestial Orbital Rings -->
          <div class="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[400px] h-72 sm:h-[400px] opacity-25 text-amber-300 select-none z-0">
            <svg viewBox="0 0 200 200" fill="none" class="w-full h-full animate-[spinSlow_50s_linear_infinite]">
              <ellipse cx="100" cy="100" rx="90" ry="40" stroke="currentColor" stroke-width="1.2" transform="rotate(-30 100 100)"/>
              <ellipse cx="100" cy="100" rx="90" ry="40" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 4" transform="rotate(45 100 100)"/>
              <circle cx="100" cy="100" r="50" stroke="currentColor" stroke-width="1"/>
            </svg>
          </div>
        }

        <!-- 3. BOTANICAL & FLORAL WATERCOLOR LACE (rose-gold, burgundy, botanical, sage, floral, pink, arabic) -->
        @else if (decorType() === 'rose-gold' || decorType() === 'burgundy' || decorType() === 'botanical' || decorType() === 'sage' || decorType() === 'floral' || decorType() === 'pink' || decorType() === 'arabic') {
          <!-- Repeating Botanical Leaf Vine Lace -->
          <svg class="pointer-events-none absolute inset-0 h-full w-full opacity-20 select-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="botanical-vine-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M10,30 Q20,10 30,10 Q40,10 50,30 Q40,50 30,50 Q20,50 10,30 Z" fill="none" stroke="currentColor" stroke-width="1"/>
                <path d="M30,10 L30,50" stroke="currentColor" stroke-width="0.6"/>
                <path d="M18,22 Q30,26 42,22" stroke="currentColor" stroke-width="0.6"/>
                <path d="M18,38 Q30,34 42,38" stroke="currentColor" stroke-width="0.6"/>
                <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.35"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#botanical-vine-pattern)"/>
          </svg>

          <!-- Top Botanical Floral Arch Garland -->
          <div class="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-full max-w-sm opacity-35 text-current select-none z-0">
            <svg viewBox="0 0 300 80" fill="none" class="w-full">
              <path d="M20,60 Q150,10 280,60" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M70,36 Q80,18 95,28 Q80,38 70,36 Z" fill="currentColor" opacity="0.7"/>
              <path d="M135,20 Q150,2 165,20 Q150,25 135,20 Z" fill="currentColor" opacity="0.8"/>
              <path d="M205,28 Q220,18 230,36 Q220,38 205,28 Z" fill="currentColor" opacity="0.7"/>
              <circle cx="150" cy="15" r="4" fill="currentColor"/>
            </svg>
          </div>

          <!-- Circular Olive & Leaf Wreath Framing Behind Names -->
          <div class="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[420px] h-80 sm:h-[420px] opacity-25 text-current select-none z-0">
            <svg viewBox="0 0 200 200" fill="none" class="w-full h-full">
              <!-- Left branch -->
              <path d="M100,185 C45,180 20,135 20,100 C20,65 45,20 100,15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <!-- Right branch -->
              <path d="M100,185 C155,180 180,135 180,100 C180,65 155,20 100,15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <!-- Leaves on wreath -->
              <circle cx="100" cy="15" r="3.5" fill="currentColor"/>
              <circle cx="100" cy="185" r="3.5" fill="currentColor"/>
              <path d="M30,70 Q40,65 42,75 Q32,80 30,70 Z" fill="currentColor"/>
              <path d="M25,120 Q35,115 37,125 Q27,130 25,120 Z" fill="currentColor"/>
              <path d="M170,70 Q160,65 158,75 Q168,80 170,70 Z" fill="currentColor"/>
              <path d="M175,120 Q165,115 163,125 Q173,130 175,120 Z" fill="currentColor"/>
            </svg>
          </div>
        }

        <!-- 4. BOHEMIAN TERRACOTTA ARCH & SUNBURST (boho) -->
        @else if (decorType() === 'boho') {
          <div class="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md opacity-25 text-[#c97d60] select-none z-0">
            <!-- Sunburst Rays Arch -->
            <svg viewBox="0 0 400 200" fill="none" class="w-full">
              <path d="M50,200 A150,150 0 0,1 350,200" stroke="currentColor" stroke-width="3"/>
              <path d="M80,200 A120,120 0 0,1 320,200" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
              <line x1="200" y1="50" x2="200" y2="10" stroke="currentColor" stroke-width="2"/>
              <line x1="140" y1="65" x2="115" y2="30" stroke="currentColor" stroke-width="2"/>
              <line x1="260" y1="65" x2="285" y2="30" stroke="currentColor" stroke-width="2"/>
              <line x1="90" y1="110" x2="55" y2="90" stroke="currentColor" stroke-width="2"/>
              <line x1="310" y1="110" x2="345" y2="90" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <!-- Boho Organic Arch Graphic behind Names -->
          <div class="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[380px] h-88 sm:h-[460px] rounded-t-full border-2 border-[#c97d60]/30 bg-[#c97d60]/5 z-0"></div>
        }

        <!-- 5. ART DECO & LUXURY MINIMALIST GRID (pearl, japan, geo, particle, glass, neumorphism) -->
        @else {
          <svg class="pointer-events-none absolute inset-0 h-full w-full opacity-15 select-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="deco-diamond-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" stroke-width="0.8"/>
                <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#deco-diamond-grid)"/>
          </svg>
          <!-- Modern Symmetry Circles -->
          <div class="pointer-events-none absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[380px] h-72 sm:h-[380px] rounded-full border border-current/25 z-0"></div>
        }

        <!-- 4 Sharp Gold Filigree Corners (Crisp & High Contrast) -->
        <div class="pointer-events-none absolute top-3 left-3 z-10 select-none text-amber-400 opacity-95 drop-shadow">
          <svg class="h-8 w-8 sm:h-12 sm:w-12" viewBox="0 0 40 40" fill="currentColor">
            <path d="M2,2 L14,2 C10,5 5,10 2,14 Z M2,2 C6,6 6,14 2,18 C10,10 10,2 2,2 Z M2,2 C2,10 10,10 18,2 C14,6 6,6 2,2 Z M6,6 C9,9 9,14 6,17 C14,9 14,6 6,6 Z"/>
            <circle cx="5" cy="5" r="2" />
          </svg>
        </div>
        <div class="pointer-events-none absolute top-3 right-3 z-10 select-none text-amber-400 opacity-95 drop-shadow -scale-x-100">
          <svg class="h-8 w-8 sm:h-12 sm:w-12" viewBox="0 0 40 40" fill="currentColor">
            <path d="M2,2 L14,2 C10,5 5,10 2,14 Z M2,2 C6,6 6,14 2,18 C10,10 10,2 2,2 Z M2,2 C2,10 10,10 18,2 C14,6 6,6 2,2 Z M6,6 C9,9 9,14 6,17 C14,9 14,6 6,6 Z"/>
            <circle cx="5" cy="5" r="2" />
          </svg>
        </div>
        <div class="pointer-events-none absolute bottom-3 left-3 z-10 select-none text-amber-400 opacity-95 drop-shadow -scale-y-100">
          <svg class="h-8 w-8 sm:h-12 sm:w-12" viewBox="0 0 40 40" fill="currentColor">
            <path d="M2,2 L14,2 C10,5 5,10 2,14 Z M2,2 C6,6 6,14 2,18 C10,10 10,2 2,2 Z M2,2 C2,10 10,10 18,2 C14,6 6,6 2,2 Z M6,6 C9,9 9,14 6,17 C14,9 14,6 6,6 Z"/>
            <circle cx="5" cy="5" r="2" />
          </svg>
        </div>
        <div class="pointer-events-none absolute bottom-3 right-3 z-10 select-none text-amber-400 opacity-95 drop-shadow -scale-100">
          <svg class="h-8 w-8 sm:h-12 sm:w-12" viewBox="0 0 40 40" fill="currentColor">
            <path d="M2,2 L14,2 C10,5 5,10 2,14 Z M2,2 C6,6 6,14 2,18 C10,10 10,2 2,2 Z M2,2 C2,10 10,10 18,2 C14,6 6,6 2,2 Z M6,6 C9,9 9,14 6,17 C14,9 14,6 6,6 Z"/>
            <circle cx="5" cy="5" r="2" />
          </svg>
        </div>

        <!-- Inner Ornamental Border Frame -->
        <div class="pointer-events-none absolute inset-2.5 sm:inset-4 rounded-[1.5rem] border border-amber-400/40 z-0"></div>

        <!-- Card Content -->
        <div class="relative z-10 {{ design().align ?? '' }} pt-2">

          <!-- Personalized Guest Welcome Banner -->
          @if (guestName()) {
            <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-6 py-2 backdrop-blur-md shadow-md">
              <span class="text-base animate-bounce">✨</span>
              <p class="font-cairo text-sm font-black">
                أهلاً وسهلاً بك، <span class="text-amber-400 font-black">{{ guestName() }}</span>
              </p>
            </div>
          }

          <!-- Opening Calligraphy: Basmala (﷽) in Luxury Ornamental Arch -->
          <div class="mb-6 flex flex-col items-center justify-center">
            <div class="relative inline-flex flex-col items-center justify-center rounded-2xl border border-amber-400/40 bg-black/20 px-8 py-3 backdrop-blur-md shadow-md">
              <span class="font-aref text-2xl sm:text-3xl tracking-wide opacity-95 drop-shadow">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <div class="mt-2 flex items-center justify-center gap-3 opacity-70">
                <div class="h-px w-10 bg-amber-400"></div>
                <span class="text-xs text-amber-400">⚜</span>
                <div class="h-px w-10 bg-amber-400"></div>
              </div>
            </div>
          </div>

          <!-- Event Category Badge -->
          <div class="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-black font-cairo bg-amber-400/15 border border-amber-400/40 shadow-sm backdrop-blur-md">
            <span>{{ eventConfig().icon }}</span>
            <span>{{ eventConfig().badge }}</span>
          </div>

          <!-- Header Eyebrow / Slogan -->
          <div class="mb-6">
            <p class="font-montserrat uppercase text-xs sm:text-sm font-bold tracking-widest mb-2 {{ design().eyebrow }}">
              {{ eventConfig().defaultEyebrow }}
            </p>
            <div class="mx-auto h-0.5 w-16 bg-amber-400/60 rounded-full"></div>
          </div>

          <!-- Quranic / Poetic Verse Banner (For Couples / Wedding / Engagement) -->
          @if (isCouplesEvent()) {
            <div class="mx-auto mb-8 max-w-xl rounded-2xl border-2 border-amber-400/30 bg-black/15 px-6 py-4 backdrop-blur-md shadow-md relative">
              <span class="absolute -top-3 right-6 rounded-full bg-amber-400 text-black px-3 py-0.5 text-[10px] font-black shadow">
                📖 آية كريمة
              </span>
              <p class="font-amiri text-base sm:text-lg italic leading-relaxed opacity-95 pt-1">
                « وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً »
              </p>
            </div>
          }

          <!-- Parents Note (if present) -->
          @if (parentsNote()) {
            <p class="mb-6 font-cairo text-sm sm:text-base font-bold opacity-90 leading-relaxed" dir="rtl">
              {{ parentsNote() }}
            </p>
          }

          <!-- Main Dynamic Title / Names Section -->
          <div class="my-6">
            @if (isCouplesEvent()) {
              <div class="flex flex-col items-center justify-center gap-1 sm:gap-2">
                <h1 class="text-4xl sm:text-6xl md:text-7xl {{ design().heading }} tracking-wide leading-tight">
                  {{ groom() }}
                </h1>
                <div class="my-3 flex items-center justify-center gap-3">
                  <div class="h-px w-14 bg-amber-400/60"></div>
                  <span class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-400/20 text-xl font-bold shadow-lg {{ design().ampersand }}">
                    &
                  </span>
                  <div class="h-px w-14 bg-amber-400/60"></div>
                </div>
                <h1 class="text-4xl sm:text-6xl md:text-7xl {{ design().heading }} tracking-wide leading-tight">
                  {{ bride() }}
                </h1>
              </div>
            } @else if (eventType() === 'henna') {
              <div class="space-y-2">
                <span class="inline-block font-aref text-2xl font-bold opacity-80">ليلة حنة العروسة الجميلة</span>
                <h1 class="text-4xl sm:text-6xl {{ design().heading }}">
                  {{ bride() || hostName() }}
                </h1>
              </div>
            } @else if (eventType() === 'graduation') {
              <div class="space-y-3">
                <div class="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/15 px-5 py-1.5 font-cairo text-xs sm:text-sm font-black text-amber-400 shadow-md">
                  <span>🎓</span>
                  <span>مبارك التخرج والنجاح الباهر</span>
                </div>
                <h1 class="text-4xl sm:text-6xl md:text-7xl {{ design().heading }}">
                  {{ hostName() || groom() }}
                </h1>
                @if (title()) {
                  <p class="font-cairo text-base sm:text-lg font-extrabold text-amber-400 mt-1">
                    {{ title() }}
                  </p>
                }
              </div>
            } @else if (eventType() === 'opening') {
              <div class="space-y-2">
                <span class="inline-block font-cairo text-lg font-bold opacity-80">الافتتاح الرسمي لـ</span>
                <h1 class="text-3xl sm:text-5xl md:text-6xl {{ design().heading }}">
                  {{ title() || hostName() }}
                </h1>
              </div>
            } @else if (eventType() === 'baby_shower') {
              <div class="space-y-2">
                <span class="inline-block font-aref text-2xl font-bold opacity-80">أهلاً بقدوم أميرنا الغالي</span>
                <h1 class="text-4xl sm:text-6xl {{ design().heading }}">
                  {{ hostName() }}
                </h1>
              </div>
            } @else {
              <h1 class="text-4xl sm:text-7xl {{ design().heading }}">
                {{ hostName() || groom() }}
              </h1>
            }
          </div>

          <!-- Message Block (Prestigious Card Frame) -->
          <div class="my-8 rounded-2xl border border-current/20 bg-current/5 p-6 sm:p-8 backdrop-blur-md shadow-inner">
            <p class="font-cairo text-base sm:text-xl {{ design().message }} leading-relaxed whitespace-pre-line font-medium" dir="rtl">
              {{ message() }}
            </p>
            <div class="mt-6 flex items-center justify-center gap-4">
              <div class="h-px w-12 bg-amber-400/50"></div>
              <div class="w-2 h-2 rounded-full bg-amber-400 shadow"></div>
              <div class="h-px w-12 bg-amber-400/50"></div>
            </div>
          </div>

          <!-- Date Container -->
          <div class="my-8 rounded-2xl border px-6 py-6 {{ design().dateBox }}">
            <p class="mb-2 font-cairo text-xs font-black uppercase tracking-widest opacity-80 {{ design().dateText }}">
              📅 موعد المناسبة السعيدة
            </p>
            <p class="font-playfair text-2xl sm:text-3xl font-black {{ design().dateText }}">
              {{ formattedDate() }}
            </p>
          </div>

          <!-- Feature 1: Add to Google / Apple Calendar Button -->
          <app-calendar-button
            [title]="displayTitle()"
            [description]="message()"
            [location]="location_name() + ' - ' + location_city()"
            [startDate]="date()"
          />

          <!-- Dress Code Badge (if present) -->
          @if (dressCode()) {
            <div class="my-6 inline-flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-current/5 px-6 py-3 shadow-md backdrop-blur-md">
              <span class="text-lg">👔</span>
              <p class="font-cairo text-xs sm:text-sm font-bold">
                كود اللبس (Dress Code): <span class="font-black text-amber-400">{{ dressCode() }}</span>
              </p>
            </div>
          }

          <!-- Countdown -->
          <div class="my-8">
            <app-countdown [date]="date()" [title]="eventConfig().countdownTitle" [template]="template()" />
          </div>

          <!-- Feature 2: Smart QR Code Entry Pass -->
          <app-qr-ticket
            [invitationId]="id()"
            [slug]="slug()"
            [eventTitle]="displayTitle()"
            [guestName]="guestName()"
            [template]="template()"
          />

          <!-- Feature 3: Photo Gallery Showcase -->
          <app-photo-gallery
            [photos]="demoPhotos"
            [template]="template()"
          />

          <!-- Location & Map with GPS Direct Links -->
          <div class="mt-12">
            <div class="relative p-6 sm:p-8 border shadow-sm overflow-hidden {{ design().map }}">
              <h2 class="font-playfair font-bold text-2xl mb-2 tracking-wide">
                {{ location_name() }}
              </h2>
              <p class="font-montserrat tracking-widest text-sm mb-4 opacity-65">
                {{ location_city() }}
              </p>

              <!-- Map Navigation Links (Google Maps & Waze) -->
              <div class="mb-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  [href]="googleMapsDirectionsUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-cairo text-xs font-bold shadow-sm transition hover:scale-105 active:scale-95 bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-400/30"
                >
                  <span>📍 فتح في خرائط Google</span>
                </a>
                <a
                  [href]="wazeDirectionsUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-cairo text-xs font-bold shadow-sm transition hover:scale-105 active:scale-95 bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-400/30"
                >
                  <span>🚗 التوجيه عبر Waze</span>
                </a>
              </div>

              <!-- Map Iframe -->
              <div class="relative overflow-hidden shadow-md border {{ design().mapFrame }}">
                <iframe
                  [title]="location_name() + ' map'"
                  class="w-full h-48 filter grayscale-[0.25] contrast-[1.05] hover:grayscale-0 transition-all duration-700 border-none"
                  [src]="mapUrl()"
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Feature 4: RSVP Attendance Confirmation -->
          <app-rsvp-form
            [invitationId]="id()"
            [initialGuestName]="guestName()"
            [template]="template()"
          />

          <!-- Guest Message Form (Wishes) -->
          <div class="mt-12">
            <app-guest-form [invitationId]="id()" [template]="template()" />
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes cardEntrance {
      from {
        opacity: 0;
        transform: scale(0.96) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .animate-cardEntrance {
      animation: cardEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class InvitationCardComponent {
  id = input.required<string>();
  slug = input<string>('invitation');
  eventType = input<string | null | undefined>('wedding');
  groom = input<string | null | undefined>('');
  bride = input<string | null | undefined>('');
  hostName = input<string | null | undefined>('');
  title = input<string | null | undefined>('');
  message = input.required<string>();
  date = input.required<string>();
  location_name = input.required<string>();
  location_city = input.required<string>();
  dressCode = input<string | null | undefined>('');
  parentsNote = input<string | null | undefined>('');
  guestName = input<string | null | undefined>('');
  photos = input<string[] | undefined>([]);
  template = input.required<InvitationTemplateId>();

  private sanitizer = inject(DomSanitizer);

  // Curated demo photoshoot gallery
  demoPhotos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80',
  ];

  design = computed(() => cardDesigns[this.template()] ?? cardDesigns['glassmorphism-luxury']);
  decorType = computed(() => this.design().decorType || 'royal-emerald');
  eventConfig = computed(() => getEventCategoryConfig(this.eventType()));

  displayTitle = computed(() => {
    if (this.groom() && this.bride()) {
      return `${this.groom()} & ${this.bride()}`;
    }
    return this.hostName() || this.title() || this.groom() || 'دعوة خاصة';
  });

  isCouplesEvent = computed(() => {
    const type = this.eventType() || 'wedding';
    return type === 'wedding' || type === 'engagement' || type === 'katb_ketab';
  });

  formattedDate = computed(() => {
    try {
      const d = new Date(this.date());
      return d.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return this.date();
    }
  });

  mapUrl = computed<SafeResourceUrl>(() => {
    const query = encodeURIComponent(`${this.location_name()} ${this.location_city()}`);
    const rawUrl = `https://maps.google.com/maps?q=${query}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  });

  googleMapsDirectionsUrl = computed(() => {
    const query = encodeURIComponent(`${this.location_name()} ${this.location_city()}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  });

  wazeDirectionsUrl = computed(() => {
    const query = encodeURIComponent(`${this.location_name()} ${this.location_city()}`);
    return `https://waze.com/ul?q=${query}&navigate=yes`;
  });
}
