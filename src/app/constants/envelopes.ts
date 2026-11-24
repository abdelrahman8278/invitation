export type EnvelopeShapeId =
  | 'vertical-royal-embossed'   // دخلة الظرف الأولى: مثل فيديو فيسبوك - ظرف رأسي عاجي بنقوش رليف بارزة ثلاثية الأبعاد وختم البسملة
  | 'classic-horizontal'         // دخلة الظرف الثانية: ظرف أفقي كلاسيكي ملكي مع ختم شمع ملون بحسب الثيم
  | 'royal-curtain'              // دخلة الستارة الملكية: ستارة مسرح مخملية فاخرة بشراشيب وحبال ذهبية تفتح يميناً ويساراً
  | 'frosted-vellum-botanical'   // دخلة المظروف الشفاف المودرن: ورق كلك شفاف أنيق مع غصن زهور وشمع لؤلؤي (ستايل أوروبي وبنترست)
  | 'luxury-gift-box'            // دخلة صندوق الهدايا الملكي: علبة مخملية ثلاثية الأبعاد بشريط حريري ينفك عند اللمس
  | 'emerald-gold-pocket'        // دخلة بوكت الزمرد: بوكت رأسي باللون الزمردي الملكي مع زخارف أرابيسك مذهبة
  | 'royal-gatefold-doors';      // دخلة البوابات: بوابات ملكية تفتح من المنتصف يميناً ويساراً (Gatefold)

export interface EnvelopeShapeInfo {
  id: EnvelopeShapeId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  badge: string;
  orderNumber?: number;
}

export const envelopeShapes: EnvelopeShapeInfo[] = [
  {
    id: 'vertical-royal-embossed',
    name: 'دخلة الظرف الأولى (الملكي البارز)',
    shortName: 'الظرف الأول',
    icon: '💌',
    description: 'ظرف رأسي فاخر من الورق العاجي اللؤلؤي مع نقوش ورود وأغصان بارزة رليف 3D وختم شمع البسملة الملكي (مثل الفيديو).',
    badge: 'الظرف الأول (رليف 3D)',
    orderNumber: 1,
  },
  {
    id: 'frosted-vellum-botanical',
    name: 'المظروف الشفاف المودرن (Vellum Glass)',
    shortName: 'شفاف مودرن',
    icon: '🌿',
    description: 'ستايل عصري مينيمال من ورق الكلك الشفاف الضبابي، يظهر كارت الدعوة من خلفه بلمعان ناعم مع غصن نباتي مذهب وختم لؤلؤي.',
    badge: 'عصري وناعم ✨ (جديد)',
    orderNumber: 2,
  },
  {
    id: 'luxury-gift-box',
    name: 'صندوق الهدايا الملكي (Luxury Keepsake Box)',
    shortName: 'صندوق الهدايا',
    icon: '🎁',
    description: 'صندوق فاخر مخملي ثلاثي الأبعاد مربوط بشريط حريري مذهب، ينفك الشريط ويرتفع الغطاء لتخرج الدعوة كتحفة ثمينة.',
    badge: 'صندوق فاخر 🎀 (جديد)',
    orderNumber: 3,
  },
  {
    id: 'classic-horizontal',
    name: 'دخلة الظرف الثانية (الكلاسيكي الأفقي)',
    shortName: 'الظرف الثاني',
    icon: '✉️',
    description: 'التصميم الأفقي الأنيق المتناسق مع ألوان كل ثيم مع ختم شمعي متوهج وبطاقة داخلية ترتفع لأعلى.',
    badge: 'الظرف الثاني (كلاسيك)',
    orderNumber: 4,
  },
  {
    id: 'royal-curtain',
    name: 'دخلة الستارة الملكية (ستارة مخملية تفتح)',
    shortName: 'الستارة الملكية',
    icon: '🎭',
    description: 'ستارة مسرح ملكية فاخرة مخملية بأهداب وحبال ذهبية مجدولة وتاج علوي، تفتح دراماتيكياً إلى اليمين واليسار لتكشف الدعوة.',
    badge: 'ستارة مسرح ملكية ✨',
    orderNumber: 5,
  },
  {
    id: 'emerald-gold-pocket',
    name: 'دخلة بوكت الزمرد والأرابيسك المذهب',
    shortName: 'بوكت زمردي',
    icon: '📜',
    description: 'ظرف بوكت رأسي باللون الأخضر الزمردي الفاخر مع شبكة أرابيسك إسلامية وقوس مذهب وختم ملكي.',
    badge: 'بوكت أرابيسك مذهب',
    orderNumber: 6,
  },
  {
    id: 'royal-gatefold-doors',
    name: 'دخلة البوابات الملكية (Gatefold)',
    shortName: 'بوابات ملكية',
    icon: '🚪',
    description: 'يفتح من المنتصف بجناحين متطابقين كالأبواب الملكية مع نقوش فيكتورية وشريط وختم شمعي قرمزي.',
    badge: 'انفتاح ملكي مزدوج',
    orderNumber: 7,
  },
];

export function getEnvelopeShapeId(id?: string | null): EnvelopeShapeId {
  if (!id) return 'vertical-royal-embossed';
  const found = envelopeShapes.find(e => e.id === id);
  return found ? found.id : 'vertical-royal-embossed';
}

