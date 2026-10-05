import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="min-h-screen flex items-center justify-center bg-stone-950 text-stone-200 px-4">
      <div class="text-center max-w-md p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl">
        <div class="text-6xl mb-4">💍</div>
        <h1 class="font-cairo text-3xl font-bold mb-2 text-amber-200">الصفحة غير موجودة</h1>
        <p class="font-cairo text-sm text-stone-400 mb-6">
          لم يتم العثور على الصفحة المطلوبة. يرجى التأكد من صحة الرابط.
        </p>
        <a
          routerLink="/alex-sarah"
          class="inline-block px-6 py-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 font-cairo text-sm font-bold transition hover:bg-amber-500/30"
        >
          الذهاب للدعوة الرئيسية
        </a>
      </div>
    </main>
  `,
})
export class NotFoundPageComponent {}
