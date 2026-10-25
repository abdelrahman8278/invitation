export type EventType =
  | 'wedding'
  | 'engagement'
  | 'katb_ketab'
  | 'henna'
  | 'graduation'
  | 'opening'
  | 'baby_shower';

export interface EventCategoryConfig {
  id: EventType;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  defaultEyebrow: string;
  countdownTitle: string;
  sealText: string;
  badge: string;
}

export const eventCategories: Record<EventType, EventCategoryConfig> = {
  wedding: {
    id: 'wedding',
    name: 'دعوة زفاف (Wedding)',
    shortName: 'زفاف',
    icon: '💍',
    description: 'دعوة زواج فاخرة للعريس والعروس بتفاصيل القاعة والزفة',
    defaultEyebrow: 'دعوة لحضور حفل زفاف',
    countdownTitle: 'باقي على يومنا الجميل',
    sealText: 'افتح\nالدعوة',
    badge: 'حفل زفاف',
  },
  engagement: {
    id: 'engagement',
    name: 'دعوة خطوبة (Engagement)',
    shortName: 'خطوبة',
    icon: '💖',
    description: 'دعوة خطوبة أنيقة ومبهجة بألوان رومانسية ناعمة',
    defaultEyebrow: 'يسعدنا دعوتكم لحفل خطوبتنا',
    countdownTitle: 'باقي على يوم الخطوبة',
    sealText: 'حفل\nخطوبة',
    badge: 'حفل خطوبة',
  },
  katb_ketab: {
    id: 'katb_ketab',
    name: 'عقد قران / كتب كتاب (Katb Ketab)',
    shortName: 'كتب كتاب',
    icon: '📜',
    description: 'دعوة عقد قران راقية بآيات قرآنية وزخارف إسلامية ذهبية',
    defaultEyebrow: '«بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا»',
    countdownTitle: 'باقي على عقد القران',
    sealText: 'عقد\nقران',
    badge: 'عقد قران مبارك',
  },
  henna: {
    id: 'henna',
    name: 'ليلة الحنة (Henna Party)',
    shortName: 'حنة',
    icon: '🪘',
    description: 'دعوة ليلة الحنة للبنات بألوان شرقية مبهجة ونغمات مرحة',
    defaultEyebrow: 'ليلة حنة العروسة',
    countdownTitle: 'باقي على ليلة الحنة',
    sealText: 'ليلة\nالحنة',
    badge: 'ليلة الحنة',
  },
  graduation: {
    id: 'graduation',
    name: 'حفل تخرج (Graduation)',
    shortName: 'تخرج',
    icon: '🎓',
    description: 'دعوة تخرج ملكية مع قبعة التخرج وشهادة التهنئة',
    defaultEyebrow: 'مبارك التخرج والنجاح',
    countdownTitle: 'باقي على حفل التخرج',
    sealText: 'حفل\nتخرج',
    badge: 'حفل تخرج دفعة جديدة',
  },
  opening: {
    id: 'opening',
    name: 'افتتاح رسمي (Grand Opening)',
    shortName: 'افتتاح',
    icon: '🏢',
    description: 'دعوة افتتاح مشروع أو مقر جديد بتصميم تجاري حديث',
    defaultEyebrow: 'يسرنا دعوتكم لحفل الافتتاح الرسمي',
    countdownTitle: 'باقي على موعد الافتتاح',
    sealText: 'حفل\nافتتاح',
    badge: 'الافتتاح الرسمي',
  },
  baby_shower: {
    id: 'baby_shower',
    name: 'بشارة مولود / سبوع (Baby Shower)',
    shortName: 'مولود',
    icon: '🍼',
    description: 'دعوة استقبال مولود جديد بألوان هادئة ورسومات طفولية لطيفة',
    defaultEyebrow: '«جَعَلَهُ اللَّهُ قُرَّةَ عَيْنٍ لِوَالِدَيْهِ»',
    countdownTitle: 'باقي على يوم الاستقبال',
    sealText: 'بشارة\nمولود',
    badge: 'أهلاً بالمولود الجديد',
  },
};

export function getEventCategoryConfig(type?: string | null): EventCategoryConfig {
  const normalized = (type || 'wedding').trim().toLowerCase().replaceAll('-', '_');
  return eventCategories[normalized as EventType] ?? eventCategories.wedding;
}
