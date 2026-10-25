import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationTemplateId, getInvitationTemplateUi } from '../../constants/templates';

@Component({
  selector: 'app-qr-ticket',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-8 text-center">
      <!-- Trigger Button -->
      <button
        type="button"
        (click)="isOpen.set(true)"
        class="inline-flex items-center gap-2 rounded-2xl border px-6 py-3 font-cairo text-xs sm:text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 bg-white/70 dark:bg-black/40 backdrop-blur-2xl border-current/25 text-current"
      >
        <svg class="h-5 w-5 fill-current text-amber-500" viewBox="0 0 24 24">
          <path d="M3 5v4h4V5H3zm2 2h0v0H5V7zm-2 8v4h4v-4H3zm2 2h0v0H5v0zm10-12v4h4V5h-4zm2 2h0v0h0V7zM3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-4 0h2v2h-2v-2zm-2-2h2v2h-2v-2z"/>
        </svg>
        <span>عرض بطاقة الدخول الذكية (QR Ticket)</span>
      </button>

      <!-- Modal Ticket Lightbox -->
      @if (isOpen()) {
        <div
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn"
          (click)="isOpen.set(false)"
        >
          <div
            class="relative w-full max-w-sm rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl text-center bg-[#0d1424]/95 text-white backdrop-blur-2xl"
            (click)="$event.stopPropagation()"
          >
            <!-- Close Button -->
            <button
              type="button"
              (click)="isOpen.set(false)"
              class="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              ✕
            </button>

            <!-- Pass Header with VIP Badge -->
            <div class="mb-4">
              <div class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 px-4 py-1 text-black font-extrabold text-[10px] tracking-wider shadow-md uppercase">
                <span>✦ VIP INVITATION PASS ✦</span>
              </div>
              <h3 class="font-playfair text-xl sm:text-2xl font-black mt-3 text-amber-300">
                {{ eventTitle() }}
              </h3>
            </div>

            <!-- Guest Name -->
            <div class="my-3 rounded-2xl bg-white/5 border border-white/15 py-2.5 px-4 backdrop-blur-md">
              <p class="font-cairo text-xs text-slate-300">الاسم / المدعو الكريم:</p>
              <p class="font-cairo text-base font-extrabold text-amber-400">
                {{ guestName() || 'ضيف كريم' }}
              </p>
            </div>

            <!-- QR Code Visual with Golden Frame -->
            <div class="my-4 inline-flex p-3 sm:p-4 rounded-2xl bg-white shadow-2xl border-2 border-amber-400/50 ring-2 ring-amber-300/30">
              <img
                [src]="qrCodeApiUrl()"
                [alt]="'QR Pass for ' + (guestName() || 'Guest')"
                class="h-40 w-40 sm:h-48 sm:w-48 object-contain"
                loading="lazy"
              />
            </div>

            <!-- Ticket Code -->
            <div class="font-montserrat text-[10px] tracking-widest uppercase text-slate-400 mb-2">
              PASS ID: #{{ slug().toUpperCase() }}-{{ invitationId().substring(0, 6).toUpperCase() }}
            </div>

            <p class="font-cairo text-xs text-slate-200 leading-relaxed">
              يرجى إبراز هذا الرمز عند مدخل القاعة لتسهيل الاستقبال.
            </p>

            <button
              type="button"
              (click)="printPass()"
              class="mt-5 w-full rounded-2xl py-3 font-cairo text-sm font-black shadow-xl transition hover:scale-[1.02] active:scale-95 {{ ui().formButton }}"
            >
              طباعة / حفظ التذكرة 🎫
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `]
})
export class QrTicketComponent {
  invitationId = input.required<string>();
  slug = input.required<string>();
  eventTitle = input.required<string>();
  guestName = input<string | null | undefined>('');
  template = input.required<InvitationTemplateId>();

  isOpen = signal<boolean>(false);

  ui = computed(() => getInvitationTemplateUi(this.template()));

  qrCodeApiUrl = computed(() => {
    const rawData = `INVITE:${this.slug()}:${encodeURIComponent(this.guestName() || 'Guest')}:${this.invitationId()}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(rawData)}&color=2e1065`;
  });

  printPass(): void {
    window.print();
  }
}
