import type { EventType } from './events';
import type { Invitation } from '../models/invitation.model';

export interface InvitationFlags {
  showEnvelope?: boolean;
  showMusic?: boolean;
  showEyebrow?: boolean;
  showQuranVerse?: boolean;
  showParentsNote?: boolean;
  showNames?: boolean;
  showMessage?: boolean;
  showCalendar?: boolean;
  showDressCode?: boolean;
  showCountdown?: boolean;
  showQrPass?: boolean;
  showGallery?: boolean;
  showMap?: boolean;
  showRsvp?: boolean;
  showGuestWishes?: boolean;
}

export const DEFAULT_INVITATION_FLAGS: Required<InvitationFlags> = {
  showEnvelope: true,
  showMusic: true,
  showEyebrow: true,
  showQuranVerse: true,
  showParentsNote: true,
  showNames: true,
  showMessage: true,
  showCalendar: true,
  showDressCode: true,
  showCountdown: true,
  showQrPass: true,
  showGallery: true,
  showMap: true,
  showRsvp: true,
  showGuestWishes: true,
};

export interface EventQuoteConfig {
  badge: string;
  quote: string;
  source?: string;
}

export const DEFAULT_EVENT_QUOTES: Record<EventType, EventQuoteConfig> = {
  wedding: {
    badge: '📖 آية كريمة',
    quote: '« وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً »',
    source: 'سورة الروم - الآية 21',
  },
  engagement: {
    badge: '💍 مودة ورحمة',
    quote: '« وَمِنْ كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُونَ »',
    source: 'سورة الذاريات - الآية 49',
  },
  katb_ketab: {
    badge: '📜 ميثاق غليظ',
    quote: '« بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ »',
    source: 'حديث شريف',
  },
  henna: {
    badge: '🌸 فرحة العمر',
    quote: '« يَا طَيْر طَايِر فِي الْفَضَا، وَصِّل سَلامِي وَالْهَنَا، لِعَرُوسَتِنَا حِلْوَة الْحِلَى »',
    source: 'تراث شعبي أصيل',
  },
  graduation: {
    badge: '🎓 ثمرة النجاح',
    quote: '« وَقُل رَّبِّ زِدْنِي عِلْمًا »',
    source: 'سورة طه - الآية 114',
  },
  opening: {
    badge: '🏢 على بركة الله',
    quote: '« وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ »',
    source: 'سورة التوبة - الآية 105',
  },
  baby_shower: {
    badge: '🍼 قرة عين',
    quote: '« رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ »',
    source: 'سورة آل عمران - الآية 38',
  },
};

export const DEFAULT_FALLBACK_MUSIC = 'music.mp3';

export const DEFAULT_CLIENT_SLUG = 'ahmed-tia';

export const DEFAULT_PHOTOS: string[] = [
  'wedding-1.jpeg',
  'wedding-2.jpeg',
  'wedding-3.jpeg',
];

/**
 * حل رابط أو اسم الأغنية: الأغنية الأساسية الافتراضية هي music (music.mp3)
 */
export function resolveMusicUrl(music?: string | null): string {
  if (!music || !music.trim() || music.trim() === 'music' || music.trim() === 'music.mp3') {
    return 'music.mp3';
  }
  const trimmed = music.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed;
  }
  if (!trimmed.includes('.')) {
    return `${trimmed}.mp3`;
  }
  return trimmed;
}

/**
 * تحويل اسم الصورة إلى مسار كامل؛ إذا كان اسم ملف عادي يوجه إلى /images/
 */
export function resolvePhotoUrl(photo: string): string {
  if (!photo) return '';
  const trimmed = photo.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed;
  }
  return `/images/${trimmed}`;
}

/**
 * تجهيز مصفوفة الصور للعميل مع إكمالها إلى 3 صور من الـ default إذا جاء أقل من 3 صور
 */
export function resolvePhotoList(photos?: string[] | null): string[] {
  const result: string[] = [];
  const validPhotos = (photos || []).filter(p => typeof p === 'string' && p.trim().length > 0);

  // 1. إضافة الصور الممررة من الباك إند
  for (const p of validPhotos) {
    result.push(resolvePhotoUrl(p));
  }

  // 2. إذا كان العدد أقل من 3 صور، نكمله حتى يصل إلى 3 من الصور الافتراضية
  let defaultIdx = 0;
  while (result.length < 3 && defaultIdx < DEFAULT_PHOTOS.length) {
    const candidate = resolvePhotoUrl(DEFAULT_PHOTOS[defaultIdx]);
    if (!result.includes(candidate)) {
      result.push(candidate);
    }
    defaultIdx++;
  }

  return result;
}

/**
 * دمج إعدادات الـ flags الخاصة بالعميل مع الإعدادات الافتراضية
 */
export function resolveFlags(clientFlags?: Partial<InvitationFlags> | null): Required<InvitationFlags> {
  if (!clientFlags || typeof clientFlags !== 'object') {
    return { ...DEFAULT_INVITATION_FLAGS };
  }
  return {
    showEnvelope: clientFlags.showEnvelope ?? DEFAULT_INVITATION_FLAGS.showEnvelope,
    showMusic: clientFlags.showMusic ?? DEFAULT_INVITATION_FLAGS.showMusic,
    showEyebrow: clientFlags.showEyebrow ?? DEFAULT_INVITATION_FLAGS.showEyebrow,
    showQuranVerse: clientFlags.showQuranVerse ?? DEFAULT_INVITATION_FLAGS.showQuranVerse,
    showParentsNote: clientFlags.showParentsNote ?? DEFAULT_INVITATION_FLAGS.showParentsNote,
    showNames: clientFlags.showNames ?? DEFAULT_INVITATION_FLAGS.showNames,
    showMessage: clientFlags.showMessage ?? DEFAULT_INVITATION_FLAGS.showMessage,
    showCalendar: clientFlags.showCalendar ?? DEFAULT_INVITATION_FLAGS.showCalendar,
    showDressCode: clientFlags.showDressCode ?? DEFAULT_INVITATION_FLAGS.showDressCode,
    showCountdown: clientFlags.showCountdown ?? DEFAULT_INVITATION_FLAGS.showCountdown,
    showQrPass: clientFlags.showQrPass ?? DEFAULT_INVITATION_FLAGS.showQrPass,
    showGallery: clientFlags.showGallery ?? DEFAULT_INVITATION_FLAGS.showGallery,
    showMap: clientFlags.showMap ?? DEFAULT_INVITATION_FLAGS.showMap,
    showRsvp: clientFlags.showRsvp ?? DEFAULT_INVITATION_FLAGS.showRsvp,
    showGuestWishes: clientFlags.showGuestWishes ?? DEFAULT_INVITATION_FLAGS.showGuestWishes,
  };
}

/**
 * الحصول على الآية أو العبارة الترحيبية (المخصصة أو الافتراضية حسب نوع المناسبة)
 */
export function resolveQuote(
  eventType: string | undefined | null,
  customVerse?: string | null
): EventQuoteConfig {
  const typeKey = (eventType || 'wedding') as EventType;
  const defaultQuote = DEFAULT_EVENT_QUOTES[typeKey] || DEFAULT_EVENT_QUOTES.wedding;

  if (customVerse && customVerse.trim()) {
    return {
      badge: defaultQuote.badge,
      quote: customVerse.trim(),
      source: undefined,
    };
  }

  return defaultQuote;
}

/**
 * سد أي بيانات ناقصة قادمة من الباك إند بالقيم الافتراضية الذكية
 */
export function resolveInvitationDefaults(
  inv: Partial<Invitation> | null | undefined,
  slug: string
): Invitation {
  const eventType = (inv?.event_type || 'wedding') as EventType;
  const quote = resolveQuote(eventType, inv?.quran_verse);
  const flags = resolveFlags(inv?.flags);
  const photos = resolvePhotoList(inv?.photos);
  const music_url = resolveMusicUrl(inv?.music_url);

  const defaultGroom = 'أحمد محمود';
  const defaultBride = 'تيا عبد الرحمن';
  const defaultHost = 'أحمد محمود';
  const defaultTitle = eventType === 'wedding' ? 'حفل زفاف العمر' : 'دعوة خاصة ومباركة';
  const defaultMessage =
    inv?.message?.trim() ||
    'يسرنا ويسعدنا أن نتشرف بدعوتكم الكريمة لحضور حفلنا المبارك ومشاركتنا أبهى لحظات العمر، فحضوركم يكتمل به سرورنا وتزدان به بهجتنا.';
  const defaultDate = inv?.wedding_date || '2026-11-20T19:00:00+02:00';
  const defaultLocationName = inv?.location_name || 'قصر البارون إمبان - القاعة الكبرى';
  const defaultLocationCity = inv?.location_city || 'القاهرة، مصر';
  const defaultTemplate = (inv?.template || inv?.template_id || 'royal-emerald-gold') as any;

  return {
    id: inv?.id || `inv-${slug || 'default'}`,
    slug: inv?.slug || slug || DEFAULT_CLIENT_SLUG,
    event_type: eventType,
    groom: inv?.groom?.trim() || (eventType === 'wedding' || eventType === 'engagement' || eventType === 'katb_ketab' ? defaultGroom : ''),
    bride: inv?.bride?.trim() || (eventType === 'wedding' || eventType === 'engagement' || eventType === 'katb_ketab' ? defaultBride : ''),
    host_name: inv?.host_name?.trim() || inv?.groom?.trim() || defaultHost,
    title: inv?.title?.trim() || defaultTitle,
    eyebrow_text: inv?.eyebrow_text?.trim() || undefined,
    quran_verse: inv?.quran_verse?.trim() || quote.quote,
    parents_note: inv?.parents_note?.trim() || undefined,
    message: defaultMessage,
    wedding_date: defaultDate,
    location_name: defaultLocationName,
    location_city: defaultLocationCity,
    google_maps_url: inv?.google_maps_url || null,
    waze_url: inv?.waze_url || null,
    dress_code: inv?.dress_code?.trim() || (flags.showDressCode ? 'رسمي فاخر (Formal / Black Tie)' : undefined),
    template: defaultTemplate,
    template_id: defaultTemplate,
    music_url: music_url,
    photos: photos,
    video_url: inv?.video_url || null,
    flags: flags,
    is_active: inv?.is_active ?? true,
  };
}
