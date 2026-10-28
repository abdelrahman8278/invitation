import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import type { RsvpResponse, Invitation } from '../../models/invitation.model';

@Component({
  selector: 'app-rsvp-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="dashboard-root min-h-screen bg-[#070b14] text-slate-100 font-cairo antialiased selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden" dir="rtl">
      
      <!-- Subtle ambient background glows -->
      <div class="pointer-events-none fixed -top-40 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px]"></div>
      <div class="pointer-events-none fixed top-1/3 -left-40 h-96 w-96 rounded-full bg-emerald-500/8 blur-[140px]"></div>
      <div class="pointer-events-none fixed -bottom-40 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[150px]"></div>

      <!-- Top Navigation Bar (Dark Glass) -->
      <header class="sticky top-0 z-40 border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-xl shadow-lg shadow-black/30 print:hidden">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 text-amber-400 text-xl border border-amber-500/30 shadow-inner">
              💌
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-base sm:text-lg font-black text-white leading-tight tracking-wide">
                  {{ eventTitle() }}
                </h1>
                <span class="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-black text-amber-300 border border-amber-400/20">
                  لوحة الحضور
                </span>
              </div>
              <p class="text-[11px] text-slate-400 font-medium">
                نظام إدارة ومتابعة تأكيدات الحضور الذكي
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            @if (allowed()) {
              <button
                type="button"
                (click)="lockDashboard()"
                class="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition active:scale-95"
                title="قفل لوحة التحكم"
              >
                <span>🔒 قفل</span>
              </button>
            }

            <a
              [routerLink]="['/', slug()]"
              class="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-300 shadow-sm hover:bg-amber-500/20 hover:border-amber-400 transition active:scale-95"
            >
              <span>بطاقة الدعوة</span>
              <span class="text-amber-400">←</span>
            </a>
          </div>
        </div>
      </header>

      <!-- Main Container -->
      <main class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

        <!-- 1. Password Lock Screen (Modern Dark Glass) -->
        @if (!allowed()) {
          <section class="flex min-h-[calc(100vh-14rem)] items-center justify-center">
            <div class="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0d1424]/90 backdrop-blur-2xl p-7 text-center sm:p-10 shadow-2xl shadow-black/80 animate-slideUp">
              <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-amber-500/30 text-amber-400 text-3xl shadow-inner">
                📊
              </div>

              <span class="inline-block rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-black text-amber-300 border border-amber-400/20 mb-2">
                منطقة المضيف الخاصة
              </span>
              <h2 class="text-2xl font-black text-white mb-2">
                تسجيل الدخول للوحة التحكم
              </h2>
              <p class="text-xs text-slate-400 font-medium mb-6">
                أدخل الرقم السري المسجل للدعوة لاستعراض قائمة الحضور والإحصائيات
              </p>

              <div class="space-y-4">
                <div class="relative">
                  <input
                    dir="rtl"
                    type="password"
                    placeholder="أدخل الرقم السري..."
                    [ngModel]="password()"
                    (ngModelChange)="onPasswordChange($event)"
                    (keydown.enter)="checkPassword()"
                    class="w-full rounded-2xl border border-slate-700/80 bg-slate-950/90 px-5 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-400 focus:bg-slate-900 focus:ring-4 focus:ring-amber-500/15"
                  />
                </div>

                @if (error()) {
                  <p class="text-xs font-bold text-rose-300 bg-rose-950/50 border border-rose-500/30 py-2.5 px-3 rounded-xl animate-fadeIn">
                    {{ error() }}
                  </p>
                }

                <button
                  type="button"
                  (click)="checkPassword()"
                  [disabled]="loading() || !password().trim()"
                  class="min-h-12 w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  @if (loading()) {
                    <span class="inline-flex items-center gap-2">
                      <span class="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent"></span>
                      جارِ التحقق...
                    </span>
                  } @else {
                    <span>عرض سجل الحضور</span>
                  }
                </button>
              </div>
            </div>
          </section>
        } @else {

          <!-- 2. Dashboard Authenticated View -->
          <div class="space-y-8 animate-fadeIn">

            <!-- Welcome & Quick Action Bar -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 print:border-none">
              <div>
                <h2 class="text-2xl sm:text-3xl font-black text-white">
                  سجل وإحصائيات المدعوين (RSVP)
                </h2>
                <p class="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                  عرض تفصيلي وتحديث مباشر للردود لتسهيل تنظيم الحفل مع القاعة
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-2 print:hidden">
                <button
                  type="button"
                  (click)="printList()"
                  class="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs font-bold text-slate-200 shadow-sm hover:bg-slate-800 hover:text-white transition active:scale-95"
                  title="طباعة الكشف للتقديم للقاعة"
                >
                  <span>🖨️ طباعة الكشف</span>
                </button>

                <button
                  type="button"
                  (click)="exportToCsv()"
                  class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/40 text-white px-4 py-2 text-xs font-bold shadow-lg shadow-emerald-950/50 transition active:scale-95"
                >
                  <span>📥 تصدير Excel (CSV)</span>
                </button>

                <button
                  type="button"
                  (click)="loadResponses()"
                  class="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-2 text-xs font-bold text-slate-200 shadow-sm hover:bg-slate-800 hover:text-white transition active:scale-95"
                  title="تحديث البيانات"
                >
                  <span>🔄 تحديث</span>
                </button>
              </div>
            </div>

            <!-- KPI Statistics Cards (Dark Luxury Palette) -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              
              <!-- Card 1: Total Confirmed People -->
              <div class="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#062c1d]/70 via-[#0a1f1a]/80 to-[#0d1424]/90 p-4 sm:p-5 shadow-lg shadow-emerald-950/30 transition hover:border-emerald-400/50 hover:shadow-emerald-950/50">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300">إجمالي الحضور المؤكدين</span>
                  <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-lg border border-emerald-500/30">
                    👥
                  </span>
                </div>
                <div class="mt-3 flex items-baseline gap-2">
                  <span class="font-playfair text-3xl sm:text-4xl font-black text-emerald-400">
                    {{ totalConfirmedGuests() }}
                  </span>
                  <span class="text-xs font-bold text-slate-400">فرد</span>
                </div>
                <div class="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-emerald-900/40 pt-2">
                  <span>شاملاً المدعوين والمرافقين</span>
                  <span class="font-bold text-emerald-400">مؤكد ✅</span>
                </div>
              </div>

              <!-- Card 2: Attending RSVPs -->
              <div class="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-[#0b2742]/70 via-[#091b2c]/80 to-[#0d1424]/90 p-4 sm:p-5 shadow-lg shadow-sky-950/30 transition hover:border-sky-400/50 hover:shadow-sky-950/50">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300">ردود بتأكيد الحضور</span>
                  <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 text-lg border border-sky-500/30">
                    💚
                  </span>
                </div>
                <div class="mt-3 flex items-baseline gap-2">
                  <span class="font-playfair text-3xl sm:text-4xl font-black text-sky-400">
                    {{ attendingCount() }}
                  </span>
                  <span class="text-xs font-bold text-slate-400">دعوة</span>
                </div>
                <div class="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-sky-900/40 pt-2">
                  <span>نسبة الحضور</span>
                  <span class="font-bold text-sky-400">{{ attendanceRate() }}%</span>
                </div>
              </div>

              <!-- Card 3: Declined RSVPs -->
              <div class="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-[#330f1d]/70 via-[#210c14]/80 to-[#0d1424]/90 p-4 sm:p-5 shadow-lg shadow-rose-950/30 transition hover:border-rose-400/50 hover:shadow-rose-950/50">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300">اعتذروا عن الحضور</span>
                  <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400 text-lg border border-rose-500/30">
                    💔
                  </span>
                </div>
                <div class="mt-3 flex items-baseline gap-2">
                  <span class="font-playfair text-3xl sm:text-4xl font-black text-rose-400">
                    {{ declinedCount() }}
                  </span>
                  <span class="text-xs font-bold text-slate-400">دعوة</span>
                </div>
                <div class="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-rose-900/40 pt-2">
                  <span>اعتذار بلطف</span>
                  <span class="font-bold text-rose-400">{{ declinedRate() }}%</span>
                </div>
              </div>

              <!-- Card 4: Total Responses -->
              <div class="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-[#1c1d2e]/70 via-[#131626]/80 to-[#0d1424]/90 p-4 sm:p-5 shadow-lg shadow-black/40 transition hover:border-slate-600 hover:shadow-black/60">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300">إجمالي الردود المسجلة</span>
                  <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-200 text-lg border border-slate-700">
                    📊
                  </span>
                </div>
                <div class="mt-3 flex items-baseline gap-2">
                  <span class="font-playfair text-3xl sm:text-4xl font-black text-white">
                    {{ responses().length }}
                  </span>
                  <span class="text-xs font-bold text-slate-400">رد كلي</span>
                </div>
                <!-- Mini Progress Bar -->
                <div class="mt-2.5">
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      class="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
                      [style.width.%]="attendanceRate()"
                    ></div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Filter & Controls Toolbar (Dark Glass) -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-[#0d1424]/90 p-3.5 shadow-lg shadow-black/30 print:hidden">
              <!-- Search Bar -->
              <div class="relative w-full sm:w-80">
                <span class="absolute inset-y-0 right-3 flex items-center text-slate-500">🔍</span>
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو رقم الهاتف..."
                  [ngModel]="searchQuery()"
                  (ngModelChange)="searchQuery.set($event)"
                  class="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 pr-9 pl-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-400 focus:bg-slate-900 focus:ring-2 focus:ring-amber-500/15"
                />
              </div>

              <!-- Filter Tabs and View Mode -->
              <div class="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                <div class="flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800/80">
                  <button
                    type="button"
                    (click)="filterStatus.set('all')"
                    class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
                    [ngClass]="filterStatus() === 'all'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'"
                  >
                    الكل ({{ responses().length }})
                  </button>
                  <button
                    type="button"
                    (click)="filterStatus.set('attending')"
                    class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
                    [ngClass]="filterStatus() === 'attending'
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/60'
                      : 'text-slate-400 hover:text-emerald-400'"
                  >
                    الحاضرون ({{ attendingCount() }})
                  </button>
                  <button
                    type="button"
                    (click)="filterStatus.set('declined')"
                    class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
                    [ngClass]="filterStatus() === 'declined'
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-950/60'
                      : 'text-slate-400 hover:text-rose-400'"
                  >
                    المعتذرون ({{ declinedCount() }})
                  </button>
                </div>

                <!-- Toggle Table / Cards View -->
                <div class="hidden sm:flex items-center border-r border-slate-800 pr-2 gap-1">
                  <button
                    type="button"
                    (click)="viewMode.set('table')"
                    class="flex h-8 w-8 items-center justify-center rounded-lg border transition"
                    [ngClass]="viewMode() === 'table' ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'"
                    title="عرض الجدول"
                  >
                    📑
                  </button>
                  <button
                    type="button"
                    (click)="viewMode.set('cards')"
                    class="flex h-8 w-8 items-center justify-center rounded-lg border transition"
                    [ngClass]="viewMode() === 'cards' ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'"
                    title="عرض البطاقات"
                  >
                    🗂️
                  </button>
                </div>
              </div>
            </div>

            <!-- Responses Section -->
            @if (filteredResponses().length === 0) {
              <div class="rounded-3xl border border-slate-800 bg-[#0d1424]/90 p-12 text-center shadow-lg space-y-3">
                <div class="text-4xl">📭</div>
                <h3 class="text-base font-bold text-white">لا توجد ردود مطابقة</h3>
                <p class="text-xs text-slate-400 font-medium">لم يتم تسجيل ردود حتى الآن أو لا توجد نتائج مطابقة لبحثك.</p>
              </div>
            } @else {

              <!-- Table View -->
              @if (viewMode() === 'table') {
                <div class="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1424]/90 shadow-xl">
                  <div class="overflow-x-auto">
                    <table class="w-full text-right text-xs sm:text-sm">
                      <thead class="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-black">
                        <tr>
                          <th class="py-3.5 px-4">#</th>
                          <th class="py-3.5 px-4">اسم الضيف</th>
                          <th class="py-3.5 px-4">الحالة</th>
                          <th class="py-3.5 px-4">عدد المرافقين</th>
                          <th class="py-3.5 px-4">رقم الهاتف</th>
                          <th class="py-3.5 px-4">ملاحظات / تهنئة</th>
                          <th class="py-3.5 px-4">تاريخ التسجيل</th>
                          <th class="py-3.5 px-4 text-center print:hidden">إجراء</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/60">
                        @for (item of filteredResponses(); track item.id || item.created_at; let idx = $index) {
                          <tr class="hover:bg-slate-800/40 transition">
                            <td class="py-3.5 px-4 font-mono text-slate-500">{{ idx + 1 }}</td>
                            <td class="py-3.5 px-4 font-black text-white">{{ item.name }}</td>
                            <td class="py-3.5 px-4">
                              <span
                                class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black"
                                [ngClass]="item.attending
                                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-xs'
                                  : 'bg-rose-950/70 text-rose-300 border border-rose-500/40 shadow-xs'"
                              >
                                <span>{{ item.attending ? '✅ سأحضر' : '❌ معتذر' }}</span>
                              </span>
                            </td>
                            <td class="py-3.5 px-4">
                              @if (item.attending) {
                                <span class="inline-flex items-center gap-1 font-bold text-amber-300 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded-lg text-xs">
                                  <span>👥</span>
                                  <span>{{ item.guests_count || 1 }}</span>
                                </span>
                              } @else {
                                <span class="text-slate-600">-</span>
                              }
                            </td>
                            <td class="py-3.5 px-4 font-mono text-xs text-slate-300" dir="ltr">
                              {{ item.phone || '-' }}
                            </td>
                            <td class="py-3.5 px-4 text-slate-300 max-w-xs truncate" [title]="item.notes || ''">
                              {{ item.notes || '-' }}
                            </td>
                            <td class="py-3.5 px-4 text-[11px] text-slate-400 font-medium">
                              {{ formatTime(item.created_at) }}
                            </td>
                            <td class="py-3.5 px-4 text-center print:hidden">
                              @if (item.phone) {
                                <a
                                  [href]="'https://wa.me/' + sanitizePhoneForWa(item.phone)"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/90 transition shadow-xs"
                                  title="مراسلة عبر واتساب"
                                >
                                  💬
                                </a>
                              } @else {
                                <span class="text-slate-600">-</span>
                              }
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              } @else {

                <!-- Cards View -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  @for (item of filteredResponses(); track item.id || item.created_at) {
                    <div class="rounded-2xl border border-slate-800 bg-[#0d1424]/90 p-4 sm:p-5 shadow-lg shadow-black/40 hover:border-slate-700 transition flex flex-col justify-between gap-3">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex items-start gap-3">
                          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                            [ngClass]="item.attending ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/70 text-rose-300 border border-rose-500/30'">
                            {{ item.attending ? '💚' : '💔' }}
                          </span>
                          <div>
                            <div class="flex flex-wrap items-center gap-2">
                              <h4 class="text-base font-black text-white">
                                {{ item.name }}
                              </h4>
                              <span
                                class="px-2.5 py-0.5 rounded-full text-[10px] font-black"
                                [ngClass]="item.attending
                                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-rose-950/70 text-rose-300 border border-rose-500/40'"
                              >
                                {{ item.attending ? 'سأحضر بالتأكيد' : 'معتذر' }}
                              </span>
                            </div>

                            @if (item.notes) {
                              <p class="text-xs text-slate-300 mt-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 font-medium leading-relaxed italic">
                                "{{ item.notes }}"
                              </p>
                            }
                            <span class="text-[11px] text-slate-400 block mt-1.5 font-medium">
                              🕒 {{ formatTime(item.created_at) }}
                            </span>
                          </div>
                        </div>

                        @if (item.attending) {
                          <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-amber-500/30 bg-amber-950/70 text-xs font-black text-amber-300">
                            <span>👥</span>
                            <span>{{ item.guests_count || 1 }}</span>
                          </div>
                        }
                      </div>

                      @if (item.phone) {
                        <div class="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-1">
                          <span class="font-mono text-xs text-slate-300" dir="ltr">📞 {{ item.phone }}</span>
                          <a
                            [href]="'https://wa.me/' + sanitizePhoneForWa(item.phone)"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 text-xs font-bold transition"
                          >
                            <span>واتساب</span>
                            <span>💬</span>
                          </a>
                        </div>
                      }
                    </div>
                  }
                </div>
              }

            }

          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slideUp {
      animation: slideUp 0.3s ease-out forwards;
    }
    @media print {
      body, .dashboard-root {
        background: white !important;
        color: #0f172a !important;
      }
      .dashboard-root * {
        color: #0f172a !important;
        border-color: #e2e8f0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }
    }
  `]
})
export class RsvpDashboardPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabaseService = inject(SupabaseService);

  slug = signal<string>('');
  invitation = signal<Invitation | null>(null);
  password = signal<string>('');
  allowed = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<string>('');

  responses = signal<RsvpResponse[]>([]);
  searchQuery = signal<string>('');
  filterStatus = signal<'all' | 'attending' | 'declined'>('all');
  viewMode = signal<'table' | 'cards'>('table');

  eventTitle = computed(() => {
    const inv = this.invitation();
    if (inv?.groom && inv?.bride) {
      return `${inv.groom} & ${inv.bride}`;
    }
    return inv?.title || inv?.host_name || 'لوحة تأكيدات الحضور';
  });

  // Statistics Computations
  attendingCount = computed(() => {
    return this.responses().filter(r => r.attending).length;
  });

  declinedCount = computed(() => {
    return this.responses().filter(r => !r.attending).length;
  });

  totalConfirmedGuests = computed(() => {
    return this.responses()
      .filter(r => r.attending)
      .reduce((sum, item) => sum + (item.guests_count || 1), 0);
  });

  attendanceRate = computed(() => {
    const total = this.responses().length;
    if (total === 0) return 0;
    return Math.round((this.attendingCount() / total) * 100);
  });

  declinedRate = computed(() => {
    const total = this.responses().length;
    if (total === 0) return 0;
    return Math.round((this.declinedCount() / total) * 100);
  });

  filteredResponses = computed(() => {
    let list = this.responses();
    const query = this.searchQuery().trim().toLowerCase();
    const status = this.filterStatus();

    if (status === 'attending') {
      list = list.filter(r => r.attending);
    } else if (status === 'declined') {
      list = list.filter(r => !r.attending);
    }

    if (query) {
      list = list.filter(r =>
        (r.name && r.name.toLowerCase().includes(query)) ||
        (r.phone && r.phone.toLowerCase().includes(query)) ||
        (r.notes && r.notes.toLowerCase().includes(query))
      );
    }

    return list;
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const s = params.get('slug') ?? '';
      this.slug.set(s);
      if (s) {
        this.fetchInvitationDetails(s);
      }
    });
  }

  async fetchInvitationDetails(slug: string): Promise<void> {
    const res = await this.supabaseService.getInvitationBySlug(slug);
    if (res.data) {
      this.invitation.set(res.data);
    }
  }

  onPasswordChange(val: string): void {
    this.password.set(val);
    this.error.set('');
  }

  async checkPassword(): Promise<void> {
    const pw = this.password().trim();
    if (!pw) return;

    this.loading.set(true);
    this.error.set('');

    await this.loadResponses();
  }

  async loadResponses(): Promise<void> {
    this.loading.set(true);
    const res = await this.supabaseService.getRsvpResponses(this.slug(), this.password());
    this.loading.set(false);

    if (res.error) {
      this.error.set(res.error);
      this.allowed.set(false);
      return;
    }

    this.responses.set(res.responses);
    this.allowed.set(true);
  }

  lockDashboard(): void {
    this.allowed.set(false);
    this.password.set('');
  }

  printList(): void {
    window.print();
  }

  formatTime(iso?: string): string {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleString('ar-EG', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return iso;
    }
  }

  sanitizePhoneForWa(phone: string): string {
    return phone.replace(/[^0-9]/g, '');
  }

  exportToCsv(): void {
    const items = this.filteredResponses();
    if (items.length === 0) return;

    const headers = ['#', 'الاسم', 'الحالة', 'عدد المرافقين', 'رقم الهاتف', 'ملاحظات', 'تاريخ التسجيل'];
    const rows = items.map((r, i) => [
      i + 1,
      `"${r.name.replaceAll('"', '""')}"`,
      r.attending ? 'حاضر' : 'معتذر',
      r.attending ? (r.guests_count || 1) : 0,
      `"${r.phone || ''}"`,
      `"${(r.notes || '').replaceAll('"', '""')}"`,
      `"${this.formatTime(r.created_at)}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `rsvp-${this.slug()}-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
