import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3 my-6">
      <!-- Google Calendar Button -->
      <a
        [href]="googleCalendarUrl()"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-2xl border px-5 py-2.5 font-cairo text-xs sm:text-sm font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 dark:bg-black/30 backdrop-blur-xl border-current/20 text-current"
      >
        <svg class="h-4 w-4 fill-current text-blue-500" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
        </svg>
        <span>إضافة إلى تقويم Google</span>
      </a>

      <!-- Apple / Outlook .ics Download -->
      <button
        type="button"
        (click)="downloadIcsFile()"
        class="inline-flex items-center gap-2 rounded-2xl border px-5 py-2.5 font-cairo text-xs sm:text-sm font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 dark:bg-black/30 backdrop-blur-xl border-current/20 text-current"
      >
        <svg class="h-4 w-4 fill-current text-red-500" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.49 2.65-1.24z"/>
        </svg>
        <span>تقويم Apple / Outlook</span>
      </button>
    </div>
  `,
})
export class CalendarButtonComponent {
  title = input.required<string>();
  description = input<string>('');
  location = input<string>('');
  startDate = input.required<string>(); // ISO string or date

  private parsedDates = computed(() => {
    try {
      const start = new Date(this.startDate());
      const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

      const formatIsoForCal = (d: Date) =>
        d.toISOString().replace(/-|:|\.\d+/g, '');

      return {
        startIso: formatIsoForCal(start),
        endIso: formatIsoForCal(end),
        startFormatted: start.toISOString(),
      };
    } catch {
      const now = new Date();
      return {
        startIso: now.toISOString().replace(/-|:|\.\d+/g, ''),
        endIso: now.toISOString().replace(/-|:|\.\d+/g, ''),
        startFormatted: now.toISOString(),
      };
    }
  });

  googleCalendarUrl = computed(() => {
    const { startIso, endIso } = this.parsedDates();
    const text = encodeURIComponent(this.title());
    const details = encodeURIComponent(this.description() || 'يسعدنا ويشرفنا حضوركم ومشاركتنا فرحتنا');
    const loc = encodeURIComponent(this.location());

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startIso}/${endIso}&details=${details}&location=${loc}`;
  });

  downloadIcsFile(): void {
    const { startIso, endIso } = this.parsedDates();
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//AR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${this.title()}`,
      `DESCRIPTION:${this.description() || 'دعوة خاصة'}`,
      `LOCATION:${this.location()}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `invitation-${Date.now()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
