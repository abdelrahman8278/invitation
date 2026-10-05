import { Component, input, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipDigitComponent } from '../flip-digit/flip-digit.component';
import { getInvitationTemplateUi, InvitationTemplateId } from '../../constants/templates';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const total = targetDate.getTime() - new Date().getTime();
  const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
  const seconds = Math.max(0, Math.floor((total / 1000) % 60));

  return { days, hours, minutes, seconds };
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, FlipDigitComponent],
  template: `
    <div class="my-10 flex flex-col items-center gap-6 {{ ui().countdownText }}">
      <h2 class="max-w-full text-center font-cairo text-xl font-bold leading-relaxed sm:text-2xl">
        باقي على يومنا الجميل
      </h2>

      <div class="grid w-full max-w-[34rem] grid-cols-4 gap-2 sm:gap-5" dir="rtl">
        <!-- Days -->
        <div class="flex min-w-0 flex-col items-center gap-2">
          <div class="flex gap-1" dir="ltr">
            <app-flip-digit
              [value]="daysDigits()[0]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
            <app-flip-digit
              [value]="daysDigits()[1]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
          </div>
          <span class="font-cairo text-[11px] font-bold leading-none opacity-70 sm:text-sm">
            يوم
          </span>
        </div>

        <!-- Hours -->
        <div class="flex min-w-0 flex-col items-center gap-2">
          <div class="flex gap-1" dir="ltr">
            <app-flip-digit
              [value]="hoursDigits()[0]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
            <app-flip-digit
              [value]="hoursDigits()[1]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
          </div>
          <span class="font-cairo text-[11px] font-bold leading-none opacity-70 sm:text-sm">
            ساعة
          </span>
        </div>

        <!-- Minutes -->
        <div class="flex min-w-0 flex-col items-center gap-2">
          <div class="flex gap-1" dir="ltr">
            <app-flip-digit
              [value]="minutesDigits()[0]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
            <app-flip-digit
              [value]="minutesDigits()[1]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
          </div>
          <span class="font-cairo text-[11px] font-bold leading-none opacity-70 sm:text-sm">
            دقيقة
          </span>
        </div>

        <!-- Seconds -->
        <div class="flex min-w-0 flex-col items-center gap-2">
          <div class="flex gap-1" dir="ltr">
            <app-flip-digit
              [value]="secondsDigits()[0]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
            <app-flip-digit
              [value]="secondsDigits()[1]"
              [boxClassName]="ui().digitBox"
              [textClassName]="ui().digitText"
            />
          </div>
          <span class="font-cairo text-[11px] font-bold leading-none opacity-70 sm:text-sm">
            ثانية
          </span>
        </div>
      </div>
    </div>
  `,
})
export class CountdownComponent implements OnInit, OnDestroy {
  date = input<string | undefined>();
  template = input.required<InvitationTemplateId>();

  ui = computed(() => getInvitationTemplateUi(this.template()));

  timeLeft = signal<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  private timerId?: ReturnType<typeof setInterval>;

  daysDigits = computed(() => {
    const s = String(this.timeLeft().days).padStart(2, '0');
    return [Number(s[0]), Number(s[1])];
  });

  hoursDigits = computed(() => {
    const s = String(this.timeLeft().hours).padStart(2, '0');
    return [Number(s[0]), Number(s[1])];
  });

  minutesDigits = computed(() => {
    const s = String(this.timeLeft().minutes).padStart(2, '0');
    return [Number(s[0]), Number(s[1])];
  });

  secondsDigits = computed(() => {
    const s = String(this.timeLeft().seconds).padStart(2, '0');
    return [Number(s[0]), Number(s[1])];
  });

  ngOnInit(): void {
    const target = this.date() ? new Date(this.date()!) : new Date('2026-12-31T18:00:00');
    this.timeLeft.set(calculateTimeLeft(target));

    this.timerId = setInterval(() => {
      this.timeLeft.set(calculateTimeLeft(target));
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
