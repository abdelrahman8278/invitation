'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [countdown, setCountdown] = useState({
    days: 20,
    hours: 5,
    minutes: 14,
    seconds: 52
  });

  useEffect(() => {
    const targetDate = new Date('2024-10-12T18:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* TopAppBar */}
      <header className="bg-[#faf9f8] dark:bg-[#002215] text-[#002215] dark:text-[#faf9f8] flex justify-between items-center w-full px-8 py-4 fixed top-0 z-50">
        <div className="text-xl font-serif text-[#002215] dark:text-[#775a19] font-bold">
          The Digital Atelier
        </div>
        <nav className="hidden md:flex space-x-8">
          <a className="text-[#002215]/60 dark:text-[#faf9f8]/60 hover:text-[#775a19] transition-colors duration-300" href="#">Dashboard</a>
          <a className="text-[#002215]/60 dark:text-[#faf9f8]/60 hover:text-[#775a19] transition-colors duration-300" href="#">Vendors</a>
          <a className="text-[#002215]/60 dark:text-[#faf9f8]/60 hover:text-[#775a19] transition-colors duration-300" href="#">RSVPs</a>
          <a className="text-[#775a19] border-b-2 border-[#775a19] pb-1" href="#">Invites</a>
        </nav>
        <div className="flex items-center space-x-4">
          <span className="material-symbols-outlined text-2xl cursor-pointer">notifications</span>
          <span className="material-symbols-outlined text-2xl cursor-pointer">settings</span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20">
            <div className="w-full h-full bg-gray-300" />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center relative px-4 overflow-hidden pt-16 pb-24 md:pb-0">
        {/* Artistic Background Element */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-secondary to-transparent rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary to-transparent rounded-full blur-[100px]"></div>
        </div>

        {/* The Invitation Experience */}
        <div className="w-full max-w-4xl grid md:grid-cols-12 gap-8 items-center z-10">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden md:flex flex-col h-full p-6 space-y-8 bg-[#faf9f8] dark:bg-[#002215] text-[#002215] dark:text-[#faf9f8] font-label manrope-caps text-xs min-h-screen w-64 border-r border-[#c0c9c2]/20 col-span-3 fixed left-0 top-0">
            <div className="space-y-1 mt-16">
              <h2 className="font-headline text-lg text-[#002215] dark:text-[#775a19] normal-case tracking-normal">Wedding Manager</h2>
              <p className="text-[10px] opacity-60">The Curated Heirloom</p>
            </div>
            <nav className="flex flex-col space-y-4">
              <a className="flex items-center space-x-3 p-3 text-[#002215]/70 dark:text-[#faf9f8]/70 hover:bg-[#f4f3f2] dark:hover:bg-[#043927] transition-all rounded-md" href="#">
                <span className="material-symbols-outlined">dashboard</span>
                <span>Overview</span>
              </a>
              <a className="flex items-center space-x-3 p-3 text-[#002215]/70 dark:text-[#faf9f8]/70 hover:bg-[#f4f3f2] dark:hover:bg-[#043927] transition-all rounded-md" href="#">
                <span className="material-symbols-outlined">group</span>
                <span>Guest List</span>
              </a>
              <a className="flex items-center space-x-3 p-3 text-[#775a19] font-bold bg-[#f4f3f2] dark:bg-[#043927] rounded-md" href="#">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                <span>Invites</span>
              </a>
              <a className="flex items-center space-x-3 p-3 text-[#002215]/70 dark:text-[#faf9f8]/70 hover:bg-[#f4f3f2] dark:hover:bg-[#043927] transition-all rounded-md" href="#">
                <span className="material-symbols-outlined">card_giftcard</span>
                <span>Registry</span>
              </a>
            </nav>
            <button className="mt-auto bg-primary text-on-primary py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-transform active:scale-95">
              <span className="material-symbols-outlined text-sm">add</span>
              <span className="text-[10px] font-bold tracking-widest">Create New Invite</span>
            </button>
          </aside>

          {/* Main Canvas: The Envelope & Card */}
          <section className="col-span-12 md:col-span-9 flex flex-col items-center md:ml-64">
            <div className="relative w-full max-w-xl group">
              {/* The Interactive Envelope */}
              <div className="relative w-full aspect-[4/3] bg-surface-container-low rounded-lg shadow-ambient overflow-hidden border border-outline-variant/10">
                {/* Top Flap (Open) */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e9e8e7] origin-top -translate-y-1 z-0 shadow-inner">
                  <div className="w-full h-full border-b border-outline-variant/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-secondary shadow-md flex items-center justify-center text-on-secondary">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </div>
                  </div>
                </div>

                {/* The Wedding Card Sliding Out */}
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-surface-container-lowest shadow-2xl rounded p-8 md:p-12 flex flex-col items-center justify-center text-center z-10 transform translate-y-[-10%] transition-transform group-hover:translate-y-[-15%] duration-700">
                  <div className="mb-2 manrope-caps text-[10px] text-secondary font-bold">
                    You are cordially invited to celebrate
                  </div>
                  <h1 className="serif-tight text-4xl md:text-5xl text-primary mb-6">
                    Omar <span className="text-secondary italic">&</span> Salma
                  </h1>
                  <div className="w-12 h-[1px] bg-outline-variant/40 mb-6"></div>
                  <div className="space-y-1 mb-8">
                    <div className="manrope-caps text-xs text-primary font-bold">Saturday, October 12, 2024</div>
                    <div className="manrope-caps text-[10px] text-on-surface-variant">At Six O'Clock in the Evening</div>
                  </div>

                  {/* Live Countdown */}
                  <div className="grid grid-cols-4 gap-4 mb-10 w-full max-w-sm">
                    <div className="flex flex-col">
                      <span className="serif-tight text-2xl text-primary font-bold">{String(countdown.days).padStart(2, '0')}</span>
                      <span className="manrope-caps text-[8px] text-on-surface-variant">Days</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="serif-tight text-2xl text-primary font-bold">{String(countdown.hours).padStart(2, '0')}</span>
                      <span className="manrope-caps text-[8px] text-on-surface-variant">Hours</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="serif-tight text-2xl text-primary font-bold">{String(countdown.minutes).padStart(2, '0')}</span>
                      <span className="manrope-caps text-[8px] text-on-surface-variant">Mins</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="serif-tight text-2xl text-primary font-bold">{String(countdown.seconds).padStart(2, '0')}</span>
                      <span className="manrope-caps text-[8px] text-on-surface-variant">Secs</span>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button className="flex-1 bg-primary text-on-primary py-3 rounded text-xs manrope-caps font-bold hover:bg-primary-container transition-all active:scale-95 shadow-md flex items-center justify-center space-x-2">
                      <span className="material-symbols-outlined text-sm">event_available</span>
                      <span>RSVP Today</span>
                    </button>
                    <button className="flex-1 bg-surface-container text-primary border border-outline-variant/20 py-3 rounded text-xs manrope-caps font-bold hover:bg-surface-container-high transition-all active:scale-95 flex items-center justify-center space-x-2">
                      <span className="material-symbols-outlined text-sm">map</span>
                      <span>View Location</span>
                    </button>
                  </div>
                </div>

                {/* Envelope Sides/Bottom (Overlay) */}
                <div className="absolute bottom-0 left-0 w-full h-3/4 bg-surface-container-low shadow-ambient z-20 pointer-events-none" style={{ clipPath: 'polygon(0% 20%, 50% 60%, 100% 20%, 100% 100%, 0% 100%)' }}>
                  <div className="w-full h-full border-t border-outline-variant/10"></div>
                </div>
              </div>
            </div>

            {/* Secondary Info Sections */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-16">
              <div className="bg-surface-container-low p-6 rounded-lg flex items-center space-x-6 group hover:shadow-ambient transition-all duration-500">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  {/* Venue image placeholder */}
                </div>
                <div className="flex-grow">
                  <h3 className="manrope-caps text-[10px] text-secondary font-bold mb-1">The Venue</h3>
                  <p className="serif-tight text-lg text-primary mb-2 leading-tight">The Heirloom Gardens, Tuscany</p>
                  <a className="text-[10px] manrope-caps text-on-surface-variant flex items-center group-hover:text-primary transition-colors" href="#">
                    Location Details <span className="material-symbols-outlined text-[12px] ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="bg-surface-container-low p-6 rounded-lg flex flex-col justify-center group hover:shadow-ambient transition-all duration-500">
                <h3 className="manrope-caps text-[10px] text-secondary font-bold mb-3 text-center">Location & Directions</h3>
                <div className="w-full h-24 bg-surface-container-highest rounded border border-outline-variant/10 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-secondary p-2 rounded-full shadow-lg">
                      <span className="material-symbols-outlined text-on-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 md:hidden bg-[#faf9f8]/60 dark:bg-[#002215]/60 backdrop-blur-xl z-50 border-t border-[#c0c9c2]/15 shadow-[0_-10px_40px_rgba(0,34,21,0.04)]">
        <a className="flex flex-col items-center text-[#002215]/40 dark:text-[#faf9f8]/40 hover:text-[#775a19] transition-transform scale-98 active:scale-95" href="#">
          <span className="material-symbols-outlined">favorite</span>
          <span className="font-label text-[10px] uppercase mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center text-[#775a19] font-bold transition-transform scale-98 active:scale-95" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
          <span className="font-label text-[10px] uppercase mt-1">RSVP</span>
        </a>
        <a className="flex flex-col items-center text-[#002215]/40 dark:text-[#faf9f8]/40 hover:text-[#775a19] transition-transform scale-98 active:scale-95" href="#">
          <span className="material-symbols-outlined">map</span>
          <span className="font-label text-[10px] uppercase mt-1">Map</span>
        </a>
        <a className="flex flex-col items-center text-[#002215]/40 dark:text-[#faf9f8]/40 hover:text-[#775a19] transition-transform scale-98 active:scale-95" href="#">
          <span className="material-symbols-outlined">schedule</span>
          <span className="font-label text-[10px] uppercase mt-1">Timer</span>
        </a>
      </nav>
    </>
  );
}
