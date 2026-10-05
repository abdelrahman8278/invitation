import { Component, input, signal, computed, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  invitationTemplates,
  getInvitationTemplateUi,
  InvitationTemplateId
} from '../../constants/templates';

@Component({
  selector: 'app-template-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Desktop (lg+): Horizontal top bar -->
    <div class="fixed left-1/2 top-4 z-[80] hidden w-[calc(100vw-1.5rem)] max-w-5xl -translate-x-1/2 lg:block">
      <div class="scrollbar-none flex gap-2 overflow-x-auto rounded-2xl border p-2 backdrop-blur-2xl {{ ui().switcher }}">
        @for (template of templates; track template.id) {
          @let isActive = template.id === activeTemplate();
          <button
            type="button"
            (click)="selectTemplate(template.id)"
            [title]="template.description"
            class="min-h-9 shrink-0 rounded-xl px-3 py-2 font-montserrat text-xs font-bold transition-all duration-200 {{
              isActive ? ui().switcherActive : ui().switcherIdle
            }}"
          >
            <span class="inline-flex min-w-12 items-center justify-center gap-1.5">
              {{ template.shortName }}
            </span>
          </button>
        }
      </div>
    </div>

    <!-- Mobile / Tablet (< lg): Toggle Button -->
    <button
      type="button"
      (click)="toggleOpen()"
      aria-label="قائمة التصاميم"
      [attr.aria-expanded]="isOpen()"
      class="fixed left-4 top-4 z-[90] flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-2xl shadow-xl transition-all duration-300 lg:hidden active:scale-90 {{ ui().switcher }}"
    >
      @if (isOpen()) {
        <!-- Close Icon -->
        <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      } @else {
        <!-- Palette Icon -->
        <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.04-2.04C9.17 19.49 10.54 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
          <circle cx="9" cy="10" r="1.5"/>
          <circle cx="15" cy="10" r="1.5"/>
          <circle cx="12" cy="14" r="1.5"/>
        </svg>
      }
    </button>

    <!-- Mobile Backdrop -->
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-[80] bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden"
        (click)="close()"
        aria-hidden="true"
      ></div>
    }

    <!-- Mobile Drawer Panel -->
    <nav
      class="fixed left-0 top-0 z-[85] flex h-full w-64 flex-col border-r shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out lg:hidden {{ ui().switcher }} {{
        isOpen() ? 'translate-x-0' : '-translate-x-full'
      }}"
      aria-label="قائمة التصاميم"
    >
      <!-- Header -->
      <div class="flex items-center gap-3 border-b border-current/10 px-5 pb-4 pt-20">
        <svg class="h-4 w-4 shrink-0 opacity-60 fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.04-2.04C9.17 19.49 10.54 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
        </svg>
        <p class="font-cairo text-xs font-bold tracking-wider opacity-60">
          التصاميم المتاحة
        </p>
      </div>

      <!-- List -->
      <div class="flex flex-col gap-1 overflow-y-auto scrollbar-none px-3 py-3">
        @for (template of templates; track template.id) {
          @let isActive = template.id === activeTemplate();
          <button
            type="button"
            (click)="selectTemplate(template.id)"
            class="group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-cairo font-bold transition-all duration-200 {{
              isActive ? ui().switcherActive : ui().switcherIdle
            }}"
          >
            <span
              class="h-1.5 w-1.5 shrink-0 rounded-full bg-current transition-all duration-300 {{
                isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }}"
            ></span>
            <span class="flex-1 text-start text-sm font-bold leading-tight">
              {{ template.name }}
            </span>
            <span
              class="font-montserrat text-[10px] opacity-40 transition-opacity group-hover:opacity-70 {{
                isActive ? '!opacity-60' : ''
              }}"
            >
              {{ template.shortName }}
            </span>
          </button>
        }
      </div>

      <!-- Footer -->
      <div class="mt-auto border-t border-current/10 px-5 py-4">
        <p class="font-cairo text-[10px] leading-relaxed opacity-40">
          اختر تصميم الدعوة المناسب
        </p>
      </div>
    </nav>
  `,
})
export class TemplateSwitcherComponent {
  activeTemplate = input.required<InvitationTemplateId>();

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  templates = invitationTemplates;
  isOpen = signal<boolean>(false);

  ui = computed(() => getInvitationTemplateUi(this.activeTemplate()));

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.close();
  }

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  selectTemplate(templateId: InvitationTemplateId): void {
    if (templateId === this.activeTemplate()) {
      this.close();
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { template: templateId },
      queryParamsHandling: 'merge',
    });

    this.close();
  }
}
