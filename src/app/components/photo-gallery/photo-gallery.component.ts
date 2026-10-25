import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationTemplateId, getInvitationTemplateUi } from '../../constants/templates';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (photos().length > 0) {
      <div class="my-12 w-full" dir="rtl">
        <!-- Section Title -->
        <div class="mb-6 flex items-center gap-4">
          <div class="h-px flex-1 {{ ui().formLine }}"></div>
          <p class="font-cairo text-xs sm:text-sm font-bold {{ ui().formTitle }}">
            معرض الصور (Photo Gallery)
          </p>
          <div class="h-px flex-1 {{ ui().formLine }}"></div>
        </div>

        <!-- Photos Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          @for (photo of photos(); track photo; let idx = $index) {
            <div
              (click)="openLightbox(idx)"
              class="group relative aspect-square overflow-hidden rounded-2xl border border-white/50 shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              <img
                [src]="photo"
                alt="Photoshoot Moment"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="text-white text-xl">🔍</span>
              </div>
            </div>
          }
        </div>

        <!-- Lightbox Modal -->
        @if (selectedImage()) {
          <div
            class="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
            (click)="closeLightbox()"
          >
            <div
              class="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl"
              (click)="$event.stopPropagation()"
            >
              <img
                [src]="selectedImage()!"
                alt="Selected Preview"
                class="max-h-[80vh] w-auto object-contain rounded-2xl"
              />
              <button
                type="button"
                (click)="closeLightbox()"
                class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.25s ease-out forwards;
    }
  `]
})
export class PhotoGalleryComponent {
  photos = input<string[]>([]);
  template = input.required<InvitationTemplateId>();

  selectedImage = signal<string | null>(null);

  ui = computed(() => getInvitationTemplateUi(this.template()));

  openLightbox(index: number): void {
    const list = this.photos();
    if (list[index]) {
      this.selectedImage.set(list[index]);
    }
  }

  closeLightbox(): void {
    this.selectedImage.set(null);
  }
}
