import { Component, input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { getInvitationTemplateUi, InvitationTemplateId } from '../../constants/templates';

@Component({
  selector: 'app-guest-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mt-10 w-full" dir="rtl">
      <div class="mb-6 flex items-center gap-4">
        <div class="h-px flex-1 {{ ui().formLine }}"></div>
        <p class="font-cairo text-xs font-bold {{ ui().formTitle }}">
          رسالتك لنا
        </p>
        <div class="h-px flex-1 {{ ui().formLine }}"></div>
      </div>

      <div class="space-y-4 rounded-3xl border p-5 sm:p-6 {{ ui().formPanel }}">
        @if (sent()) {
          <div class="py-8 px-4 text-center space-y-3.5 animate-fadeIn">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-3xl border border-emerald-400/40 text-emerald-300 shadow-inner">
              💌
            </div>
            <h3 class="font-cairo text-xl sm:text-2xl font-black {{ ui().countdownText }}">
              تم إرسال تهنئتكم بنجاح! ✨
            </h3>
            <p class="font-cairo text-sm leading-relaxed max-w-sm mx-auto opacity-90 {{ ui().countdownText }}">
              شكراً لمشاركتكم العروسين فرحتهم بهذه الكلمات الطيبة والتهنئة الغالية.
            </p>
            <div class="pt-2">
              <button
                type="button"
                (click)="resetForm()"
                class="inline-flex items-center gap-2 rounded-2xl border border-amber-400/50 bg-amber-400/10 px-5 py-2.5 text-xs sm:text-sm font-bold font-cairo text-amber-300 shadow-sm hover:bg-amber-400/20 hover:border-amber-400 transition active:scale-95"
              >
                <span>✍️ إرسال تهنئة أخرى</span>
              </button>
            </div>
          </div>
        } @else {
          <label class="block">
            <span class="sr-only">اسمك</span>
            <input
              dir="rtl"
              placeholder="اسمك الكريم"
              [ngModel]="name()"
              (ngModelChange)="onNameChange($event)"
              class="w-full rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 {{ ui().formInput }}"
            />
          </label>

          <label class="block">
            <span class="sr-only">رسالتك للعروسين</span>
            <textarea
              dir="rtl"
              rows="4"
              placeholder="اكتب تهنئتك وكلماتك الطيبة للعروسين..."
              [ngModel]="message()"
              (ngModelChange)="onMessageChange($event)"
              class="w-full resize-none rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 {{ ui().formInput }}"
            ></textarea>
          </label>

          <button
            type="button"
            (click)="handleSubmit()"
            [disabled]="loading() || !name().trim() || !message().trim()"
            class="min-h-12 w-full rounded-2xl py-3 font-cairo text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] hover:scale-[1.01] {{ ui().formButton }}"
          >
            @if (loading()) {
              <span class="inline-flex items-center gap-2">
                <span class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                <span>جارٍ إرسال التهنئة...</span>
              </span>
            } @else {
              <span>إرسال التهنئة 💌</span>
            }
          </button>

          @if (error()) {
            <div class="pt-1 text-center font-cairo text-sm text-rose-400 animate-fadeIn">
              {{ error() }}
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `]
})
export class GuestFormComponent {
  invitationId = input.required<string>();
  template = input.required<InvitationTemplateId>();

  private supabaseService = inject(SupabaseService);

  ui = computed(() => getInvitationTemplateUi(this.template()));

  name = signal<string>('');
  message = signal<string>('');
  loading = signal<boolean>(false);
  sent = signal<boolean>(false);
  error = signal<string>('');

  onNameChange(val: string): void {
    this.name.set(val);
    this.error.set('');
  }

  onMessageChange(val: string): void {
    this.message.set(val);
    this.error.set('');
  }

  async handleSubmit(): Promise<void> {
    const trimmedName = this.name().trim();
    const trimmedMessage = this.message().trim();

    if (!trimmedName || !trimmedMessage) {
      this.error.set('اكتب اسمك ورسالتك قبل الإرسال');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const res = await this.supabaseService.submitGuestMessage(
      this.invitationId(),
      trimmedName,
      trimmedMessage
    );

    this.loading.set(false);

    if (!res.success) {
      this.error.set(res.error || 'حدث خطأ أثناء الإرسال، حاول مرة أخرى');
      return;
    }

    this.sent.set(true);
    this.name.set('');
    this.message.set('');
  }

  resetForm(): void {
    this.sent.set(false);
    this.name.set('');
    this.message.set('');
    this.error.set('');
  }
}
