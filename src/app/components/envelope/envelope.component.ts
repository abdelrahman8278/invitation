import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationTemplateId } from '../../constants/templates';

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
    decorClass: 'dark-decor',
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
    decorClass: 'floral-decor',
  },
  'botanical-watercolor': {
    back: 'bg-[#fffaf0]/92 border-[#d8c79d]/65 shadow-[0_30px_82px_rgba(82,106,78,0.16)]',
    side: 'bg-[#dbe7d4]',
    bottom: 'bg-[#fffaf0] border-[#d8c79d]/55',
    top: 'bg-[linear-gradient(135deg,#f4eedf,#e4edd8)] border-[#d8c79d]/70',
    card: 'bg-[#fffaf0]/90 border-[#d8c79d]/55',
    names: 'text-[#526a4e]',
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
    names: 'text-[#8f4f5f]',
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
    names: 'text-[#6a1932]',
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
    names: 'text-[#4e6548]',
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
    names: 'text-[#6c6862]',
    line: 'bg-[#d69aa4]',
    seal: 'bg-[#6c6862] border-[#ead3d6]',
    sealInner: 'bg-[#d69aa4]',
    sealText: 'text-white',
    hint: 'text-[#6c6862]',
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
    decorClass: 'particle-decor',
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
};

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  template: `
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
      <div class="absolute inset-0 rounded-2xl border {{ style().back }}"></div>

      <!-- Special Decor -->
      @if (style().decorClass === 'dark-decor') {
        <div class="absolute inset-0 opacity-45 [background-image:radial-gradient(var(--invite-accent)_1px,transparent_1px)] [background-size:38px_38px]"></div>
      } @else if (style().decorClass === 'floral-decor') {
        <div class="absolute -left-6 -top-6 text-6xl text-[#E8A0BF]/45">✿</div>
      } @else if (style().decorClass === 'particle-decor') {
        <div class="absolute inset-0 animate-[floatParticles_9s_linear_infinite] opacity-45 [background-image:radial-gradient(#FFD93D_2px,transparent_2px),radial-gradient(#FF6B9D_2px,transparent_2px)] [background-position:0_0,22px_28px] [background-size:48px_48px]"></div>
      }

      <!-- Sliding Card Inside -->
      <div
        class="absolute inset-[10px] z-[5] flex flex-col items-center justify-center overflow-hidden rounded-xl border shadow-inner sm:inset-[15px] transition-all duration-[2400ms] cubic-bezier {{ style().card }} {{
          isOpened()
            ? '-translate-y-[210px] scale-[0.92] -rotate-1 shadow-2xl z-20'
            : 'translate-y-0 rotate-0'
        }}"
      >
        <div class="font-playfair text-3xl sm:text-4xl transition-all duration-1000 {{ style().names }}">
          {{ initials() }}
        </div>
        <div class="mt-2 h-0.5 w-12 rounded-full transition-all duration-1000 {{ style().line }}"></div>
      </div>

      <!-- Envelope Left & Right flaps -->
      <div
        class="pointer-events-none absolute inset-0 z-10 rounded-2xl {{ style().side }}"
        style="clip-path: polygon(0 0, 50% 50%, 0 100%);"
      ></div>
      <div
        class="pointer-events-none absolute inset-0 z-10 rounded-2xl {{ style().side }}"
        style="clip-path: polygon(100% 0, 50% 50%, 100% 100%);"
      ></div>

      <!-- Envelope Bottom flap -->
      <div
        class="pointer-events-none absolute inset-0 z-20 rounded-2xl border-b shadow-[0_-5px_15px_rgba(0,0,0,0.03)] {{ style().bottom }}"
        style="clip-path: polygon(0 100%, 50% 55%, 100% 100%);"
      ></div>

      <!-- Envelope Top Fold Flap -->
      <div
        class="absolute inset-0 z-30 origin-top rounded-2xl border-t shadow-xl transition-transform duration-[1200ms] {{ style().top }}"
        style="clip-path: polygon(0 0, 100% 0, 50% 55%); transform-style: preserve-3d;"
        [style.transform]="isOpened() ? 'rotateX(172deg)' : 'rotateX(0deg)'"
        [style.zIndex]="isOpened() ? '0' : '30'"
      ></div>

      <!-- Wax Seal -->
      <div
        class="absolute left-1/2 top-[55%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-20 sm:w-20 transition-all duration-500 {{
          isOpened() ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }}"
      >
        <div class="absolute inset-0 rounded-full border-2 shadow-lg {{ style().seal }}"></div>
        <div class="absolute inset-1 rounded-full border border-white/35 {{ style().sealInner }}"></div>
        <span class="relative z-10 text-center font-cairo text-[10px] font-bold leading-tight tracking-tight drop-shadow-md sm:text-[11px] {{ style().sealText }}">
          افتح<br />الدعوة
        </span>
      </div>

      <!-- Hint Text -->
      <div
        class="absolute -bottom-16 left-0 w-full text-center transition-opacity duration-300 {{
          isOpened() ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
        }}"
      >
        <span class="font-cairo text-xs font-bold tracking-wide sm:text-sm animate-pulse {{ style().hint }}">
          اضغط لفتح الدعوة
        </span>
      </div>
    </button>
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
  `]
})
export class EnvelopeComponent {
  template = input.required<InvitationTemplateId>();
  groom = input<string>('');
  bride = input<string>('');

  opened = output<void>();

  isOpened = signal<boolean>(false);

  style = computed(() => envelopeStyles[this.template()] ?? envelopeStyles['glassmorphism-luxury']);

  initials = computed(() => {
    const g = this.groom()?.charAt(0) ?? '';
    const b = this.bride()?.charAt(0) ?? '';
    return `${g} & ${b}`.toUpperCase();
  });

  handleOpen(): void {
    if (this.isOpened()) return;
    this.isOpened.set(true);

    setTimeout(() => {
      this.opened.emit();
    }, 2800);
  }
}
