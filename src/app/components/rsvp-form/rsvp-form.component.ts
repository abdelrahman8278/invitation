import { Component, input, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { getInvitationTemplateUi, InvitationTemplateId } from '../../constants/templates';

@Component({
  selector: 'app-rsvp-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mt-12 w-full" dir="rtl">
      <!-- Section Header -->
      <div class="mb-6 flex items-center gap-4">
        <div class="h-px flex-1 {{ ui().formLine }}"></div>
        <p class="font-cairo text-xs sm:text-sm font-bold {{ ui().formTitle }}">
          تأكيد الحضور (RSVP)
        </p>
        <div class="h-px flex-1 {{ ui().formLine }}"></div>
      </div>

      <div class="space-y-4 rounded-3xl border p-5 sm:p-7 {{ ui().formPanel }} shadow-xl">
        <p class="text-center font-cairo text-sm font-semibold opacity-80 mb-4">
          يسعدنا تأكيد حضوركم لمشاركتنا أجمل اللحظات
        </p>

        @if (submitted()) {
          <div class="py-6 text-center space-y-3 animate-fadeIn">
            <div class="text-4xl">
              {{ attending() === 'yes' ? '🎉' : '💌' }}
            </div>
            <h3 class="font-cairo text-lg font-bold {{ ui().countdownText }}">
              {{ attending() === 'yes' ? 'تم تأكيد حضورك بنجاح!' : 'شكراً لإبلاغنا، تمنينا تواجدكم!' }}
            </h3>
            <p class="font-cairo text-xs sm:text-sm opacity-75">
              {{ attending() === 'yes' ? 'نتطلع لرؤيتكم والاحتفال معكم بكل حب وفرحة.' : 'سعدنا بتواصلكم ونتمنى لكم دوام الصحة والسعادة.' }}
            </p>
            <button
              type="button"
              (click)="submitted.set(false)"
              class="mt-2 text-xs font-cairo underline opacity-60 hover:opacity-100"
            >
              تعديل الرد
            </button>
          </div>
        } @else {
          <!-- Attendance Choice Radio Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              (click)="attending.set('yes')"
              class="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 {{
                attending() === 'yes'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold scale-[1.02] shadow-md ring-2 ring-emerald-400/40'
                  : 'bg-current/5 border-current/15 opacity-70 hover:opacity-100'
              }}"
            >
              <span class="text-xl mb-1">💚</span>
              <span class="font-cairo text-xs sm:text-sm">سأحضر بالتأكيد</span>
            </button>

            <button
              type="button"
              (click)="attending.set('no')"
              class="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 {{
                attending() === 'no'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold scale-[1.02] shadow-md ring-2 ring-rose-400/40'
                  : 'bg-current/5 border-current/15 opacity-70 hover:opacity-100'
              }}"
            >
              <span class="text-xl mb-1">💔</span>
              <span class="font-cairo text-xs sm:text-sm">أعتذر عن الحضور</span>
            </button>
          </div>

          <!-- Guest Name -->
          <label class="block">
            <span class="sr-only">الاسم الكريم</span>
            <input
              dir="rtl"
              placeholder="الاسم الكريم *"
              [ngModel]="name()"
              (ngModelChange)="onNameChange($event)"
              class="w-full rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 {{ ui().formInput }}"
            />
          </label>

          <!-- Guest Phone (Optional) -->
          <label class="block">
            <span class="sr-only">رقم الهاتف (اختياري)</span>
            <input
              dir="ltr"
              type="tel"
              placeholder="رقم الهاتف (اختياري)"
              [ngModel]="phone()"
              (ngModelChange)="phone.set($event)"
              class="w-full text-right rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 {{ ui().formInput }}"
            />
          </label>

          <!-- Companion Count (If Attending) -->
          @if (attending() === 'yes') {
            <div class="space-y-1.5 animate-fadeIn">
              <label class="font-cairo text-xs font-semibold opacity-80 block">
                عدد الحضور الكلي (شاملاً حضرتك):
              </label>
              <div class="grid grid-cols-5 gap-2">
                @for (num of [1, 2, 3, 4, 5]; track num) {
                  <button
                    type="button"
                    (click)="guestsCount.set(num)"
                    class="py-2.5 rounded-xl border font-cairo text-xs font-bold transition-all {{
                      guestsCount() === num
                        ? ui().switcherActive
                        : ui().switcherIdle
                    }}"
                  >
                    {{ num }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- Notes / Wishes -->
          <label class="block">
            <span class="sr-only">ملاحظات أو تهنئة</span>
            <input
              dir="rtl"
              placeholder="ملاحظات أو تهنئة (اختياري)..."
              [ngModel]="notes()"
              (ngModelChange)="notes.set($event)"
              class="w-full rounded-2xl border px-5 py-3 font-cairo text-sm outline-none transition focus:ring-2 {{ ui().formInput }}"
            />
          </label>

          <!-- Submit Button -->
          <button
            type="button"
            (click)="handleRsvpSubmit()"
            [disabled]="loading() || !name().trim()"
            class="min-h-12 w-full rounded-2xl py-3 font-cairo text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] hover:scale-[1.01] {{ ui().formButton }}"
          >
            @if (loading()) {
              <span>جارِ تأكيد الحضور...</span>
            } @else {
              <span>إرسال تأكيد الحضور</span>
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
export class RsvpFormComponent implements OnInit {
  invitationId = input.required<string>();
  initialGuestName = input<string | null | undefined>('');
  template = input.required<InvitationTemplateId>();

  private supabaseService = inject(SupabaseService);

  ui = computed(() => getInvitationTemplateUi(this.template()));

  name = signal<string>('');
  phone = signal<string>('');
  attending = signal<'yes' | 'no'>('yes');
  guestsCount = signal<number>(1);
  notes = signal<string>('');
  loading = signal<boolean>(false);
  submitted = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit(): void {
    if (this.initialGuestName()) {
      this.name.set(this.initialGuestName()!);
    }
  }

  onNameChange(val: string): void {
    this.name.set(val);
    this.error.set('');
  }

  async handleRsvpSubmit(): Promise<void> {
    const trimmedName = this.name().trim();
    if (!trimmedName) {
      this.error.set('يرجى كتابة الاسم قبل الإرسال');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const res = await this.supabaseService.submitRsvp({
      invitation_id: this.invitationId(),
      name: trimmedName,
      phone: this.phone().trim(),
      attending: this.attending() === 'yes',
      guests_count: this.attending() === 'yes' ? this.guestsCount() : 0,
      notes: this.notes().trim(),
    });

    this.loading.set(false);

    if (!res.success) {
      this.error.set(res.error || 'حدث خطأ أثناء الإرسال، حاول مجدداً');
      return;
    }

    this.submitted.set(true);
  }
}
