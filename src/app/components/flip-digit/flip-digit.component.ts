import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flip-digit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative flex h-11 w-7 items-center justify-center overflow-hidden rounded-lg border sm:h-[4.5rem] sm:w-12 sm:rounded-xl {{ boxClassName() }}"
    >
      <div class="absolute top-1/2 z-20 h-px w-full -translate-y-1/2 bg-black/30"></div>
      <div class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>

      <div
        class="font-playfair text-xl font-bold tabular-nums sm:text-4xl transition-transform duration-300 {{ textClassName() }}"
      >
        {{ value() }}
      </div>
    </div>
  `,
})
export class FlipDigitComponent {
  value = input<number>(0);
  boxClassName = input<string>('bg-pink-900 border-pink-700/50 shadow-2xl');
  textClassName = input<string>('text-white');
}
