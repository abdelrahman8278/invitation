import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CountdownComponent } from '../countdown/countdown.component';
import { GuestFormComponent } from '../guest-form/guest-form.component';
import { InvitationTemplateId } from '../../constants/templates';

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
    decorType: 'glass',
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
    decorType: 'gradient',
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
    decorType: 'dark',
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
    decorType: 'floral',
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
    decorType: 'botanical',
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
    decorType: 'pink',
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
    decorType: 'burgundy',
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
    decorType: 'sage',
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
    decorType: 'arabic',
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
    decorType: 'geo',
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
    decorType: 'particle',
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
    decorType: 'japan',
  },
};

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule, CountdownComponent, GuestFormComponent],
  template: `
    <div class="relative z-50 mx-4 w-full max-w-3xl overflow-hidden animate-cardEntrance">
      <div class="relative overflow-hidden {{ design().frame }}">
        
        <!-- Theme-specific background decorations -->
        @if (design().decorType === 'glass') {
          <div class="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#e0bbe4]/35 blur-2xl pointer-events-none"></div>
          <div class="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#957dad]/24 blur-2xl pointer-events-none"></div>
          <div class="absolute inset-x-10 top-0 h-px bg-white/70 pointer-events-none"></div>
          <div class="absolute inset-y-10 right-0 w-px bg-white/45 pointer-events-none"></div>
        } @else if (design().decorType === 'gradient') {
          <div class="absolute -left-20 top-8 h-40 w-[120%] rotate-[-8deg] bg-white/10 pointer-events-none"></div>
          <div class="absolute -right-20 bottom-10 h-32 w-[110%] rotate-[7deg] bg-[#30CFD0]/20 pointer-events-none"></div>
        } @else if (design().decorType === 'dark') {
          <div class="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--invite-accent)_1px,transparent_1px)] [background-size:34px_34px] pointer-events-none"></div>
        } @else if (design().decorType === 'floral') {
          <div class="absolute -left-4 top-6 text-7xl text-[#E8A0BF]/45 pointer-events-none">✿</div>
          <div class="absolute right-8 top-10 text-5xl text-[#BA90C6]/35 pointer-events-none">✽</div>
          <div class="absolute bottom-8 right-10 text-6xl text-[#B4E7CE]/60 pointer-events-none">✿</div>
        } @else if (design().decorType === 'botanical') {
          <div class="absolute inset-5 border border-[#d8c79d]/55 pointer-events-none"></div>
          <div class="absolute left-8 top-6 h-24 w-px -rotate-[35deg] bg-[#6f8a67]/55 pointer-events-none"></div>
          <div class="absolute right-10 top-7 text-6xl leading-none text-[#526a4e]/20 pointer-events-none">✿</div>
          <div class="absolute bottom-8 left-6 text-7xl leading-none text-[#526a4e]/15 pointer-events-none">✿</div>
        } @else if (design().decorType === 'pink') {
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(244,190,203,0.30)_0,transparent_28%)] pointer-events-none"></div>
          <div class="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f4becb]/72 pointer-events-none"></div>
          <div class="absolute right-0 -top-10 h-40 w-40 rounded-full bg-[#f4becb]/64 pointer-events-none"></div>
        } @else if (design().decorType === 'burgundy') {
          <div class="absolute inset-5 border border-[#d1ad55]/65 pointer-events-none"></div>
          <div class="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#6a1932]/78 pointer-events-none"></div>
          <div class="absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-[#6a1932]/82 pointer-events-none"></div>
        } @else if (design().decorType === 'sage') {
          <div class="absolute left-1/2 top-8 h-36 w-72 -translate-x-1/2 rounded-[50%] border-2 border-[#b79552]/70 pointer-events-none"></div>
        } @else if (design().decorType === 'arabic') {
          <div class="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_20%_30%,rgba(214,154,164,0.36)_0,transparent_24%)] pointer-events-none"></div>
        } @else if (design().decorType === 'geo') {
          <div class="absolute left-7 top-8 h-16 w-16 rotate-45 bg-[#FFE66D] pointer-events-none"></div>
          <div class="absolute right-10 top-12 h-20 w-20 rounded-full bg-[#4ECDC4] pointer-events-none"></div>
        } @else if (design().decorType === 'particle') {
          <div class="absolute inset-0 animate-[floatParticles_10s_linear_infinite] opacity-45 [background-image:radial-gradient(#FFD93D_2px,transparent_2px),radial-gradient(#FF6B9D_2px,transparent_2px)] [background-position:0_0,28px_24px] [background-size:54px_54px] pointer-events-none"></div>
        } @else if (design().decorType === 'japan') {
          <div class="absolute left-10 top-10 h-16 w-px bg-[#C9A96E] pointer-events-none"></div>
        }

        <!-- Card Content -->
        <div class="relative z-10 {{ design().align ?? '' }}">
          <!-- Header Eyebrow -->
          <div class="mb-8">
            <p class="font-montserrat uppercase text-xs sm:text-sm font-bold mb-3 {{ design().eyebrow }}">
              {{ design().label }}
            </p>
            <div class="mx-auto h-px w-16 bg-current opacity-30"></div>
          </div>

          <!-- Groom & Bride Names -->
          <h1 class="mb-8 font-playfair text-4xl leading-tight sm:text-7xl {{ design().heading }}">
            {{ groom() }}
            <span class="my-3 block text-3xl sm:text-4xl {{ design().ampersand }}">&</span>
            {{ bride() }}
          </h1>

          <!-- Message Block -->
          <div class="mb-10">
            <p class="font-cairo text-lg sm:text-2xl {{ design().message }} leading-relaxed mb-6 whitespace-pre-line" dir="rtl">
              {{ message() }}
            </p>
            <div class="flex items-center justify-center gap-4">
              <div class="h-px w-8 bg-current opacity-20"></div>
              <div class="w-2 h-2 rounded-full bg-current opacity-30"></div>
              <div class="h-px w-8 bg-current opacity-20"></div>
            </div>
          </div>

          <!-- Date Container -->
          <div class="my-10 rounded-2xl border px-5 py-6 {{ design().dateBox }}">
            <p class="mb-3 font-cairo text-xs font-bold opacity-70 {{ design().dateText }}">
              موعد الحفل
            </p>
            <p class="font-playfair text-3xl {{ design().dateText }}">
              {{ formattedDate() }}
            </p>
          </div>

          <!-- Countdown -->
          <div>
            <app-countdown [date]="date()" [template]="template()" />
          </div>

          <!-- Location & Map -->
          <div class="mt-12">
            <div class="relative p-6 sm:p-8 border shadow-sm overflow-hidden {{ design().map }}">
              <h2 class="font-playfair font-bold text-2xl mb-2 tracking-wide">
                {{ location_name() }}
              </h2>
              <p class="font-montserrat tracking-widest text-sm mb-6 opacity-65">
                {{ location_city() }}
              </p>

              <div class="relative overflow-hidden shadow-md border {{ design().mapFrame }}">
                <iframe
                  [title]="location_name() + ' map'"
                  class="w-full h-48 filter grayscale-[0.25] contrast-[1.05] hover:grayscale-0 transition-all duration-700 border-none"
                  [src]="mapUrl()"
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Guest Message Form -->
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
  groom = input.required<string>();
  bride = input.required<string>();
  message = input.required<string>();
  date = input.required<string>();
  location_name = input.required<string>();
  location_city = input.required<string>();
  template = input.required<InvitationTemplateId>();

  private sanitizer = inject(DomSanitizer);

  design = computed(() => cardDesigns[this.template()] ?? cardDesigns['glassmorphism-luxury']);

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
}
