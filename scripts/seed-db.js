const { createClient } = require('@supabase/supabase-js');

// استيراد إعدادات الاتصال بقاعدة بيانات Supabase
const supabaseUrl = 'https://thzpsbmvjnkvzeufchpy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoenBzYm12am5rdnpldWZjaHB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDU3MDA0NSwiZXhwIjoyMDk2MTQ2MDQ1fQ.0ZtP6AZPjAuSp33pWc7rNl4yKXDBiodyMV6pCywQORk';

const client = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('⏳ جارٍ إضافة وتحديث بيانات الدعوات في Supabase...\n');

  const defaultInvitations = [
    {
      slug: 'ahmed-tia',
      event_type: 'wedding',
      groom: 'أحمد محمود',
      bride: 'تيا عبد الرحمن',
      host_name: 'عائلتا محمود وعبد الرحمن',
      title: 'حفل زفاف العمر',
      eyebrow_text: 'دعوة كريمة لحضور حفل زفاف',
      quran_verse: '« وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً »',
      parents_note: 'يتشرف الحاج محمود والحاج عبد الرحمن بدعوة سيادتكم لمشاركتنا فرحتنا الكبرى بحفل زفاف قرة أعيننا',
      message: 'يسرنا ويسعدنا أن نتشرف بدعوتكم الكريمة لحضور حفل زفافنا المبارك ومشاركتنا أبهى لحظات العمر، فحضوركم يكتمل به سرورنا وتزدان به بهجتنا.',
      wedding_date: '2027-01-20T19:00:00+02:00',
      location_name: 'قصر البارون إمبان - القاعة الملكية',
      location_city: 'مصر الجديدة، القاهرة',
      google_maps_url: 'https://maps.google.com/?q=Baron+Empain+Palace+Cairo',
      waze_url: 'https://waze.com/ul?q=Baron+Empain+Palace+Cairo',
      dress_code: 'رسمي كامل (Formal / Black Tie)',
      template: 'royal-emerald-gold',
      template_id: 'royal-emerald-gold',
      music_url: 'shyryn_ya_lylt_byda.mp3',
      access_password: '123456',
      photos: [
        'wedding-1.jpeg',
        'wedding-2.jpeg',
        'wedding-3.jpeg',
        'wedding-4.jpeg',
        'wedding-5.jpeg',
        'wedding-6.jpeg'
      ],
      flags: {
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
        showGuestWishes: true
      },
      is_active: true
    },
    {
      slug: 'sarah-grad',
      event_type: 'graduation',
      groom: 'المهندسة سارة محمد',
      bride: '',
      host_name: 'المهندسة سارة محمد',
      title: 'بكالوريوس الهندسة المعمارية مع مرتبة الشرف',
      eyebrow_text: 'دعوة لحفل التخرج',
      quran_verse: '« وَقُل رَّبِّ زِدْنِي عِلْمًا »',
      message: 'أهلاً بكم لمشاركتي فرحة التخرج وجني ثمار سنين من الجد والاجتهاد. ننتظركم لنحتفل سوياً بهذه الليلة الاستثنائية!',
      wedding_date: '2026-10-15T18:00:00+02:00',
      location_name: 'قاعة الماسة للمؤتمرات',
      location_city: 'مدينة نصر، القاهرة',
      template: 'midnight-starlight',
      template_id: 'midnight-starlight',
      access_password: '123456',
      flags: {
        showEnvelope: false,
        showMusic: true,
        showEyebrow: true,
        showQuranVerse: false,
        showParentsNote: false,
        showNames: true,
        showMessage: true,
        showCalendar: true,
        showDressCode: false,
        showCountdown: true,
        showQrPass: true,
        showGallery: false,
        showMap: true,
        showRsvp: true,
        showGuestWishes: true
      },
      is_active: true
    }
  ];

  for (const inv of defaultInvitations) {
    const { data, error } = await client
      .from('invitations')
      .upsert(inv, { onConflict: 'slug' })
      .select('id, slug, groom, bride, host_name, is_active')
      .single();

    if (error) {
      console.error(`❌ خطأ أثناء إضافة الدعوة (${inv.slug}):`, error.message);
    } else {
      console.log(`✅ تم تحديث/إضافة الدعوة بنجاح:`);
      console.log(`   - الرابط: /${data.slug}`);
      console.log(`   - المعرف (UUID): ${data.id}`);
      console.log(`   - الاسم: ${data.groom ? `${data.groom} & ${data.bride}` : data.host_name}`);
      console.log(`   - تأكيد الحضور (RSVP): مفعل ✓`);
      console.log(`   - رسائل الضيوف: مفعل ✓\n`);
    }
  }

  console.log('🎉 اكتملت عملية التحديث بنجاح!');
}

seedDatabase().catch((err) => {
  console.error('حدث خطأ غير متوقع:', err);
  process.exit(1);
});
