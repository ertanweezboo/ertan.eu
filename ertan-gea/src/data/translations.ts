export type Locale = 'en' | 'tr'

export const translations: Record<Locale, Record<string, any>> = {
  en: {
    'nav.works': 'Works',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.badge': '15+ Years of Digital Excellence',
    'hero.titles': [
      'Building | Scalable & | High-Traffic Systems.',
      'Bridging | Design Vision | & Engineering Power.',
      'Crafting | Future-Ready | AI-Powered UI.'
    ],
    'hero.subtitles': [
      'Expert in React, TypeScript and modern frontend architectures.',
      'Design-driven engineering for global-scale digital products.',
      'Leveraging AI-assisted workflows for rapid, reliable delivery.'
    ],
    'hero.feature.web': 'Web',
    'hero.feature.mobile': 'Mobile',
    'hero.feature.ai': 'AI Systems',
    'section.works': 'Selected Works',
    'section.experience': 'Experience',
    'section.skills': 'Skills',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Available for freelance projects, consulting, or just a friendly chat.',
    'contact.whatsapp': 'WhatsApp',
    'footer.rights': 'All rights reserved.',
    'nav.menu.dark': 'Dark Mode',
    'nav.menu.light': 'Light Mode',
    'about.bioDescription': 'A frontend expert with a strong design background, developing scalable, accessible, and performance-oriented digital products in high-traffic global projects using React, TypeScript, and modern frontend architectures.',
    'project.back': 'Back to Works',
    'project.overview': 'Project Overview',
    'project.role': 'Role',
    'project.timeline': 'Timeline',
    'project.techStack': 'Tech Stack',
    'project.visit': 'Visit Project',
    'project.next': 'Next Project',
    'project.previous': 'Previous Project',
  },
  tr: {
    'nav.works': 'Çalışmalar',
    'nav.experience': 'Deneyim',
    'nav.skills': 'Yetenekler',
    'nav.contact': 'İletişim',
    'hero.badge': '15+ Yıllık Dijital Deneyim',
    'hero.titles': [
      'Ölçeklenebilir ve | Yüksek Trafikli | Sistemler İnşası.',
      'Tasarım Vizyonu | ve Mühendislik | Arasında Köprü.',
      'Geleceğe Hazır | AI Destekli | Arayüz Tasarımı.'
    ],
    'hero.subtitles': [
      'React, TypeScript ve modern frontend mimarilerinde uzmanlık.',
      'Küresel ölçekli ürünler için tasarım odaklı mühendislik çözümleri.',
      'Hızlı ve güvenilir teslimat için AI destekli iş akışları.'
    ],
    'hero.feature.web': 'Web',
    'hero.feature.mobile': 'Mobil',
    'hero.feature.ai': 'AI Sistemleri',
    'section.works': 'Seçili Çalışmalar',
    'section.experience': 'Deneyim',
    'section.skills': 'Yetenek Seti',
    'contact.title': 'Bana Ulaşın',
    'contact.subtitle': 'Freelance projeler, danışmanlık veya sadece sohbet etmek için ulaşabilirsiniz.',
    'contact.whatsapp': 'WhatsApp',
    'footer.rights': 'Tüm hakları saklıdır.',
    'nav.menu.dark': 'Karanlık Tema',
    'nav.menu.light': 'Aydınlık Tema',
    'about.bioDescription': 'React, TypeScript ve modern frontend mimarileriyle, yüksek trafikli global projelerde ölçeklenebilir, erişilebilir ve performans odaklı dijital ürünler geliştiren; güçlü tasarım geçmişine sahip frontend uzmanı.',
    'project.back': 'Çalışmalara Dön',
    'project.overview': 'Proje Özeti',
    'project.role': 'Rol',
    'project.timeline': 'Süreç',
    'project.techStack': 'Teknoloji Yığını',
    'project.visit': 'Projeyi Görüntüle',
    'project.next': 'Sonraki Proje',
    'project.previous': 'Önceki Proje',
  }
}

export function translate(locale: any, key: string): string {
  // Deep Proxy values might fail direct comparison. Convert to string.
  const langKey = String(locale)
  const lang = (langKey === 'en' || langKey === 'tr') ? langKey : 'en'
  const dict = translations[lang as Locale]
  return dict?.[key] || key
}
