import { Component, input, signal, computed, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  invitationTemplates,
  getInvitationTemplateUi,
  InvitationTemplateId
} from '../../constants/templates';
import { eventCategories, EventType } from '../../constants/events';

interface ThemeColorInfo {
  accent: string;
  bg: string;
  badge: string;
}

const themeColors: Record<InvitationTemplateId, ThemeColorInfo> = {
  'royal-emerald-gold': { accent: '#f59e0b', bg: '#062319', badge: 'زمردي وذهب' },
  'midnight-starlight': { accent: '#38bdf8', bg: '#0b1329', badge: 'كحلي وليلي' },
  'rose-gold-blush': { accent: '#b75069', bg: '#fff0f3', badge: 'روز جولد' },
  'arabic-islamic-gold': { accent: '#fbbf24', bg: '#140f07', badge: 'إسلامي ملكي' },
  'bohemian-terracotta': { accent: '#c97d60', bg: '#fbf4ee', badge: 'بوهيمي دافئ' },
  'pearl-minimalist': { accent: '#78716c', bg: '#fafaf9', badge: 'لؤلؤي ناصع' },
  'violet-aurora': { accent: '#e879f9', bg: '#19082e', badge: 'أورورا بنفسجي' },
  'glassmorphism-luxury': { accent: '#a855f7', bg: '#f3e8ff', badge: 'زجاجي شفاف' },
  'dark-elegant-premium': { accent: '#eab308', bg: '#121212', badge: 'أسود ملكي' },
  'burgundy-gold-floral': { accent: '#9f1239', bg: '#fff1f2', badge: 'عنابي وذهب' },
  'botanical-watercolor': { accent: '#4d7c0f', bg: '#f7fee7', badge: 'نباتي مائي' },
  'sage-save-date': { accent: '#4e6548', bg: '#f4f7f2', badge: 'أخضر ميرمية' },
  'floral-watercolor': { accent: '#db2777', bg: '#fdf2f8', badge: 'زهور مائية' },
  'pink-photo-floral': { accent: '#f43f5e', bg: '#ffe4e6', badge: 'وردي ناعم' },
  'arabic-blush-story': { accent: '#e11d48', bg: '#fff1f2', badge: 'ستوري عربي' },
  'neumorphism-soft': { accent: '#8f7763', bg: '#ede4db', badge: 'نيومورفيزم' },
  'gradient-wave-modern': { accent: '#f59e0b', bg: '#330867', badge: 'موجات عصرية' },
  'geometric-modern': { accent: '#14b8a6', bg: '#f0fdfa', badge: 'هندسي مودرن' },
  'animated-particle': { accent: '#ec4899', bg: '#fdf4ff', badge: 'جزيئات سحرية' },
  'minimalist-japanese': { accent: '#18181b', bg: '#ffffff', badge: 'بساطة مينيمال' },
  'champagne-royal-silk': { accent: '#d4af37', bg: '#faf6ee', badge: 'شامبين حرير' },
  'sapphire-midnight-gold': { accent: '#38bdf8', bg: '#09162c', badge: 'ياقوت أزرق' },
  'lavender-provence-dream': { accent: '#a855f7', bg: '#faf5ff', badge: 'لافندر فرنسي' },
  'andalusian-palace-moroccan': { accent: '#f59e0b', bg: '#1c0f06', badge: 'أندلسي مغربي' },
  'obsidian-black-diamond': { accent: '#cbd5e1', bg: '#101010', badge: 'أوبسيديان داكن' },
  'emerald-velvet-botanical': { accent: '#4ade80', bg: '#062016', badge: 'مخمل زمردي' },
  'sunset-desert-glow': { accent: '#fb923c', bg: '#2b1207', badge: 'غروب صحراوي' },
  'vintage-victorian-lace': { accent: '#b45309', bg: '#fdfbf6', badge: 'فيكتوري كلاسيك' },
  'monaco-yacht-glamour': { accent: '#eab308', bg: '#081d38', badge: 'موناكو جلامور' },
  'celestial-moonlight-silver': { accent: '#94a3b8', bg: '#0d1624', badge: 'ضوء القمر' },
};

@Component({
  selector: 'app-template-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating Luxury Control Pill (Always accessible, never clutters) -->
    <div class="fixed top-4 left-4 z-[90] flex items-center gap-2">
      <button
        type="button"
        (click)="toggleOpen()"
        aria-label="تخصيص الثيم والمناسبة"
        [attr.aria-expanded]="isOpen()"
        class="group flex items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 {{ ui().switcher }}"
      >
        <span class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-black shadow-md text-xs font-black animate-pulse">
          🎨
        </span>
        <span class="font-cairo text-xs font-bold sm:text-sm">
          تخصيص الثيم ({{ templates.length }} تصميم)
        </span>
        <span class="hidden sm:inline-block rounded-full bg-current/15 px-2 py-0.5 text-[10px] font-bold">
          {{ currentThemeBadge() }}
        </span>
      </button>
    </div>

    <!-- Backdrop Blur Overlay -->
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-[95] bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        (click)="close()"
        aria-hidden="true"
      ></div>
    }

    <!-- Luxury Slide-out / Modal Drawer -->
    <div
      class="fixed inset-y-0 left-0 z-[100] flex w-full max-w-md flex-col shadow-2xl backdrop-blur-3xl transition-transform duration-300 ease-out sm:max-w-lg {{ ui().switcher }} {{
        isOpen() ? 'translate-x-0' : '-translate-x-full'
      }}"
    >
      <!-- Drawer Header -->
      <div class="flex items-center justify-between border-b border-current/15 px-6 py-5">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-lg font-black text-lg">
            ✨
          </div>
          <div>
            <h2 class="font-cairo text-base font-extrabold sm:text-lg">لوحة تخصيص الدعوة</h2>
            <p class="font-cairo text-xs opacity-70">اختر المناسبة والثيم المناسب لذوقك</p>
          </div>
        </div>

        <button
          type="button"
          (click)="close()"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-current/10 hover:bg-current/20 transition active:scale-90"
          aria-label="إغلاق"
        >
          ✕
        </button>
      </div>

      <!-- Drawer Content (Scrollable) -->
      <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6 scrollbar-none">
        
        <!-- Section 1: Event Category Selector -->
        <div>
          <div class="mb-3 flex items-center justify-between">
            <h3 class="font-cairo text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <span>🎯</span>
              <span>1. نوع المناسبة (Event Type)</span>
            </h3>
            <span class="font-cairo text-[11px] opacity-60">7 مناسبات</span>
          </div>

          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            @for (cat of eventList; track cat.id) {
              @let isCatActive = cat.id === activeEvent();
              <button
                type="button"
                (click)="selectEvent(cat.id)"
                class="flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-center transition-all duration-200 active:scale-95 {{
                  isCatActive
                    ? 'border-amber-400 bg-amber-400/20 shadow-lg ring-2 ring-amber-400 font-extrabold'
                    : 'border-current/15 bg-current/5 hover:bg-current/10 font-bold opacity-80'
                }}"
              >
                <span class="text-2xl">{{ cat.icon }}</span>
                <span class="font-cairo text-xs leading-tight font-bold">{{ cat.shortName }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Section 2: All 20 Luxury Themes Grid -->
        <div>
          <div class="mb-3 flex items-center justify-between">
            <h3 class="font-cairo text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <span>💎</span>
              <span>2. تصاميم وثيمات الدعوة ({{ templates.length }} ثيم)</span>
            </h3>
            <span class="font-cairo text-[11px] opacity-60">اختر للتطبيق المباشر</span>
          </div>

          <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            @for (item of templates; track item.id) {
              @let isThemeActive = item.id === activeTemplate();
              @let colors = getThemeColors(item.id);
              <button
                type="button"
                (click)="selectTemplate(item.id)"
                class="group relative flex items-start gap-3 rounded-2xl border p-3.5 text-start transition-all duration-200 active:scale-95 {{
                  isThemeActive
                    ? 'border-amber-400 bg-amber-400/20 shadow-xl ring-2 ring-amber-400'
                    : 'border-current/15 bg-current/5 hover:bg-current/10'
                }}"
              >
                <!-- Color Swatch Circle -->
                <div
                  class="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/40 shadow-inner"
                  [style.backgroundColor]="colors.bg"
                >
                  <div
                    class="h-3 w-3 rounded-full shadow"
                    [style.backgroundColor]="colors.accent"
                  ></div>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-1">
                    <p class="font-cairo text-xs font-black truncate leading-tight">
                      {{ item.name }}
                    </p>
                    @if (isThemeActive) {
                      <span class="rounded-full bg-amber-400 text-black px-1.5 py-0.2 text-[9px] font-black shrink-0">
                        مفعّل ✓
                      </span>
                    }
                  </div>
                  <p class="font-montserrat text-[10px] opacity-60 truncate">
                    {{ item.shortName }} • {{ colors.badge }}
                  </p>
                  <p class="font-cairo text-[10px] opacity-75 line-clamp-2 mt-1 leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>
              </button>
            }
          </div>
        </div>

      </div>

      <!-- Drawer Footer -->
      <div class="border-t border-current/15 p-4 text-center">
        <button
          type="button"
          (click)="close()"
          class="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 font-cairo text-sm font-black text-black shadow-xl transition hover:brightness-110 active:scale-98"
        >
          تم، عرض الدعوة بالتصميم المختار ✨
        </button>
      </div>
    </div>
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
export class TemplateSwitcherComponent {
  activeTemplate = input.required<InvitationTemplateId>();
  activeEvent = input<string>('wedding');

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  templates = invitationTemplates;
  eventList = Object.values(eventCategories);

  isOpen = signal<boolean>(false);

  ui = computed(() => getInvitationTemplateUi(this.activeTemplate()));

  currentThemeBadge = computed(() => {
    return themeColors[this.activeTemplate()]?.badge || this.activeTemplate();
  });

  getThemeColors(id: InvitationTemplateId): ThemeColorInfo {
    return themeColors[id] ?? { accent: '#eab308', bg: '#18181b', badge: 'ملكي' };
  }

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

  selectEvent(eventType: EventType): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { event: eventType },
      queryParamsHandling: 'merge',
    });
  }

  selectTemplate(templateId: InvitationTemplateId): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { template: templateId },
      queryParamsHandling: 'merge',
    });
    this.close();
  }
}

