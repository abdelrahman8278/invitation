import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import type { GuestMessage } from '../../models/invitation.model';
import {
  getInvitationTemplateId,
  getInvitationTemplateUi,
  getInvitationThemeMode,
  getInvitationThemeVars,
  InvitationTemplateId,
  InvitationThemeMode,
} from '../../constants/templates';

@Component({
  selector: 'app-messages-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <main
      class="relative min-h-screen overflow-hidden px-4 py-24 {{ ui().pageBackground }}"
      [attr.data-invitation-mode]="mode()"
      [ngStyle]="themeVars()"
    >
      <!-- Back to Invitation Link -->
      <div class="fixed left-5 top-5 z-50 sm:left-6 sm:top-6 animate-fadeIn">
        <a
          [routerLink]="['/', slug()]"
          [queryParams]="{ template: currentTemplate(), mode: mode() }"
          class="flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 group hover:scale-105 active:scale-95 {{ ui().actionButton }}"
          aria-label="العودة للدعوة"
        >
          <svg class="h-4 w-4 fill-current transition-transform duration-300 group-hover:-translate-x-1 {{ ui().actionIcon }}" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <span class="font-cairo text-sm font-bold">الدعوة</span>
          <svg class="h-4 w-4 fill-current {{ ui().actionIcon }}" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>

      <!-- Password Lock Screen -->
      @if (!allowed()) {
        <section class="flex min-h-[calc(100vh-12rem)] items-center justify-center">
          <div class="w-full max-w-sm rounded-[2rem] border p-7 text-center sm:p-10 shadow-2xl {{ ui().formPanel }} animate-slideUp">
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border {{ ui().formInput }}">
              <svg class="h-7 w-7 fill-current {{ ui().actionIcon }}" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>

            <p class="mb-2 font-cairo text-xs font-bold {{ ui().formTitle }}">
              منطقة خاصة
            </p>
            <h1 class="mb-6 font-cairo text-2xl font-bold {{ ui().countdownText }}">
              رسائل الضيوف
            </h1>

            <div class="space-y-3">
              <input
                dir="rtl"
                type="password"
                placeholder="كلمة المرور"
                [ngModel]="password()"
                (ngModelChange)="onPasswordChange($event)"
                (keydown.enter)="checkPassword()"
                class="w-full rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 {{ ui().formInput }}"
              />

              @if (error()) {
                <p class="font-cairo text-sm text-rose-400 animate-fadeIn">
                  كلمة المرور غير صحيحة
                </p>
              }

              <button
                type="button"
                (click)="checkPassword()"
                [disabled]="loading() || !password().trim()"
                class="min-h-12 w-full rounded-2xl py-3 font-cairo text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 hover:scale-[1.01] {{ ui().formButton }}"
              >
                @if (loading()) {
                  <span>جار الدخول...</span>
                } @else {
                  <span>دخول</span>
                }
              </button>
            </div>
          </div>
        </section>
      } @else {
        <!-- Messages Display Section -->
        <section class="mx-auto max-w-2xl animate-fadeIn">
          <div class="mb-12 text-center">
            <p class="mb-2 font-cairo text-xs font-bold {{ ui().formTitle }}">
              رسائل الضيوف
            </p>
            <h1 class="font-cairo text-4xl font-bold {{ ui().countdownText }}">
              كلمات من القلب
            </h1>
            <div class="mt-4 flex items-center justify-center gap-3">
              <div class="h-px w-16 {{ ui().formLine }}"></div>
              <div class="h-1.5 w-1.5 rounded-full {{ ui().formLine }}"></div>
              <div class="h-px w-16 {{ ui().formLine }}"></div>
            </div>
          </div>

          @if (messages().length === 0) {
            <div class="py-20 text-center font-cairo text-lg {{ ui().formTitle }}">
              لا توجد رسائل بعد
            </div>
          } @else {
            <div class="space-y-4">
              @for (msg of messages(); track msg.id) {
                <article
                  class="rounded-3xl border p-6 {{ ui().formPanel }} transition-all duration-300 hover:scale-[1.01]"
                  dir="rtl"
                >
                  <div class="mb-3 flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full border font-cairo text-lg font-bold {{ ui().formInput }}">
                      {{ msg.name.charAt(0) }}
                    </div>
                    <h3 class="font-cairo text-sm font-bold {{ ui().countdownText }}">
                      {{ msg.name }}
                    </h3>
                  </div>
                  <p class="font-cairo text-sm leading-relaxed {{ ui().countdownText }}">
                    {{ msg.message }}
                  </p>
                </article>
              }
            </div>
          }
        </section>
      }
    </main>
  `,
  styles: [`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-slideUp {
      animation: slideUp 0.5s ease-out forwards;
    }
    .animate-fadeIn {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `]
})
export class MessagesPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabaseService = inject(SupabaseService);

  slug = signal<string>('');
  templateQuery = signal<string | null>(null);
  modeQuery = signal<string | null>(null);

  password = signal<string>('');
  messages = signal<GuestMessage[]>([]);
  allowed = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<boolean>(false);

  currentTemplate = computed<InvitationTemplateId>(() => {
    return getInvitationTemplateId(this.templateQuery());
  });

  mode = computed<InvitationThemeMode>(() => {
    return getInvitationThemeMode(this.modeQuery());
  });

  ui = computed(() => getInvitationTemplateUi(this.currentTemplate()));
  themeVars = computed(() => getInvitationThemeVars(this.mode()));

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug.set(params.get('slug') ?? '');
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.templateQuery.set(queryParams.get('template'));
      this.modeQuery.set(queryParams.get('mode'));
    });
  }

  onPasswordChange(val: string): void {
    this.password.set(val);
    this.error.set(false);
  }

  async checkPassword(): Promise<void> {
    const pwd = this.password().trim();
    if (!pwd) return;

    this.loading.set(true);
    this.error.set(false);

    const res = await this.supabaseService.getGuestMessages(this.slug(), pwd);

    this.loading.set(false);

    if (res.error) {
      this.error.set(true);
      return;
    }

    this.messages.set(res.messages);
    this.allowed.set(true);
  }
}
