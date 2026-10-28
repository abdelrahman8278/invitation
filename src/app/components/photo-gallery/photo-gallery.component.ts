import { Component, input, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationTemplateId, getInvitationTemplateUi } from '../../constants/templates';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (photos().length > 0) {
      <section class="my-10 sm:my-14 w-full" dir="rtl">
        <!-- Section Header -->
        <div class="mb-5 sm:mb-7 flex items-center gap-3">
          <div class="h-px flex-1 {{ ui().formLine }}"></div>
          <div class="flex items-center gap-2">
            <span class="text-base sm:text-lg">📸</span>
            <h3 class="font-cairo text-sm sm:text-base font-extrabold {{ ui().formTitle }}">
              معرض الصور (Photo Gallery)
            </h3>
            <span
              class="rounded-full px-2.5 py-0.5 text-[10px] font-black border transition"
              [ngClass]="isLight()
                ? 'bg-amber-900/10 text-amber-950 border-amber-900/20'
                : 'bg-white/10 text-amber-300 border-white/20'"
            >
              {{ photos().length }} صور
            </span>
          </div>
          <div class="h-px flex-1 {{ ui().formLine }}"></div>
        </div>

        <!-- ============================================================= -->
        <!-- RESPONSIVE GRID VIEW (All Photos in Dynamic Grid)              -->
        <!-- ============================================================= -->
        <div
          class="grid gap-2.5 sm:gap-4 animate-fadeIn"
          [ngClass]="gridColumnsClass()"
        >
          @for (photo of photos(); track photo; let idx = $index) {
            <div
              (click)="openLightbox(idx)"
              class="group relative aspect-square overflow-hidden rounded-2xl border shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              [ngClass]="isLight()
                ? 'border-stone-200/90 bg-white/70 shadow-stone-200/50'
                : 'border-white/25 bg-black/35 backdrop-blur-sm shadow-black/40'"
            >
              <!-- Photo Image -->
              <img
                [src]="photo"
                [alt]="'Photo moment ' + (idx + 1)"
                class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />

              <!-- Number Tag -->
              <span class="absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md opacity-80 group-hover:opacity-100 transition">
                #{{ idx + 1 }}
              </span>

              <!-- Hover Overlay with Zoom Icon -->
              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white text-base shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                  🔍
                </span>
              </div>
            </div>
          }
        </div>

        <!-- ============================================================= -->
        <!-- FULLSCREEN INTERACTIVE LIGHTBOX MODAL                         -->
        <!-- ============================================================= -->
        @if (selectedImageIndex() !== null) {
          @let currentIdx = selectedImageIndex()!;
          <div
            class="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-fadeIn select-none"
            (click)="closeLightbox()"
            (touchstart)="onLightboxTouchStart($event)"
            (touchend)="onLightboxTouchEnd($event)"
          >
            <!-- Modal Body Container -->
            <div
              class="relative flex flex-col items-center justify-center max-w-4xl w-full max-h-[92vh] overflow-hidden"
              (click)="$event.stopPropagation()"
            >
              <!-- Top Controls Bar -->
              <div class="w-full flex items-center justify-between pb-3 text-white px-2">
                <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur-md border border-white/20">
                  صورة {{ currentIdx + 1 }} من {{ photos().length }}
                </span>

                <button
                  type="button"
                  (click)="closeLightbox()"
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition active:scale-90"
                  aria-label="إغلاق"
                >
                  ✕
                </button>
              </div>

              <!-- Main Fullscreen Image -->
              <div class="relative w-full flex items-center justify-center max-h-[78vh]">
                <img
                  [src]="photos()[currentIdx]"
                  [alt]="'Preview ' + (currentIdx + 1)"
                  class="max-h-[78vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
                />

                <!-- Prev Button (Inside Lightbox) -->
                @if (photos().length > 1) {
                  <button
                    type="button"
                    (click)="prevLightbox($event)"
                    class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white text-xl sm:text-2xl backdrop-blur-md border border-white/30 shadow-2xl transition active:scale-90"
                    aria-label="الصورة السابقة"
                  >
                    <span>›</span>
                  </button>

                  <!-- Next Button (Inside Lightbox) -->
                  <button
                    type="button"
                    (click)="nextLightbox($event)"
                    class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white text-xl sm:text-2xl backdrop-blur-md border border-white/30 shadow-2xl transition active:scale-90"
                    aria-label="الصورة التالية"
                  >
                    <span>‹</span>
                  </button>
                }
              </div>

              <!-- Bottom Indicator Dots -->
              @if (photos().length > 1) {
                <div class="flex items-center gap-1.5 pt-3">
                  @for (p of photos(); track $index; let idx = $index) {
                    <button
                      type="button"
                      (click)="selectedImageIndex.set(idx)"
                      class="h-2 rounded-full transition-all duration-300 {{
                        idx === currentIdx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                      }}"
                    ></button>
                  }
                </div>
              }
            </div>
          </div>
        }
      </section>
    }
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.25s ease-out forwards;
    }
  `]
})
export class PhotoGalleryComponent {
  photos = input<string[]>([]);
  template = input.required<InvitationTemplateId>();

  selectedImageIndex = signal<number | null>(null);

  ui = computed(() => getInvitationTemplateUi(this.template()));

  isLight = computed(() => {
    const t = this.template() || '';
    return [
      'bohemian-terracotta',
      'rose-gold-blush',
      'pearl-minimalist',
      'botanical-watercolor',
      'sage-save-date',
      'pink-photo-floral',
      'floral-watercolor',
      'champagne-royal-silk',
      'vintage-victorian-lace',
      'lavender-provence',
    ].includes(t);
  });

  gridColumnsClass = computed(() => {
    const count = this.photos().length;
    if (count === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-2 sm:grid-cols-3';
    if (count === 4) return 'grid-cols-2 sm:grid-cols-4';
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3';
  });

  private lightboxTouchStartX = 0;
  private lightboxTouchEndX = 0;

  // Keyboard navigation for Lightbox
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.selectedImageIndex() !== null) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        this.prevLightbox();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        this.nextLightbox();
      }
    }
  }

  // Lightbox Controls
  openLightbox(index: number): void {
    if (index >= 0 && index < this.photos().length) {
      this.selectedImageIndex.set(index);
    }
  }

  closeLightbox(): void {
    this.selectedImageIndex.set(null);
  }

  nextLightbox(event?: Event): void {
    event?.stopPropagation();
    const count = this.photos().length;
    if (count > 0) {
      this.selectedImageIndex.update(i => (i === null ? 0 : (i + 1) % count));
    }
  }

  prevLightbox(event?: Event): void {
    event?.stopPropagation();
    const count = this.photos().length;
    if (count > 0) {
      this.selectedImageIndex.update(i => (i === null ? 0 : (i - 1 + count) % count));
    }
  }

  // Lightbox Touch Events (for mobile swipe)
  onLightboxTouchStart(e: TouchEvent): void {
    this.lightboxTouchStartX = e.changedTouches[0].clientX;
  }

  onLightboxTouchEnd(e: TouchEvent): void {
    this.lightboxTouchEndX = e.changedTouches[0].clientX;
    const diff = this.lightboxTouchStartX - this.lightboxTouchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextLightbox();
      } else {
        this.prevLightbox();
      }
    }
  }
}
