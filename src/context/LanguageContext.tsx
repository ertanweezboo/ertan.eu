'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'en' | 'tr';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
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
        'section.contact': 'Next Chapter',
        'works.view': 'View Project',
        'contact.title': 'Get in Touch',
        'contact.subtitle': 'Available for freelance projects, consulting, or just a friendly chat.',
        'contact.whatsapp': 'WhatsApp',
        'contact.email': 'Email',
        'footer.rights': 'All rights reserved.',
        'about.bioTitle': 'AI-Ready Frontend Developer & UI/UX Engineer',
        'about.bioDescription': 'A frontend expert with a strong design background, developing scalable, accessible, and performance-oriented digital products in high-traffic global projects using React, TypeScript, and modern frontend architectures.',
        'project.notFound': 'Project not found',
        'project.back': 'Back to Works',
        'project.overview': 'Overview',
        'project.role': 'Role',
        'project.timeline': 'Timeline',
        'project.techStack': 'Tech Stack',
        'project.cta': 'Next project',
        'project.detailsNotAvailable': 'Detailed project content is being prepared. Stay tuned.',
        'nav.menu.dark': 'Dark Mode',
        'nav.menu.light': 'Light Mode',
        'nav.menu.turkish': 'Turkish',
        'nav.menu.english': 'English'
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
        'section.contact': 'İletişime Geç',
        'works.view': 'Projeyi İncele',
        'contact.title': 'Bana Ulaşın',
        'contact.subtitle': 'Freelance projeler, danışmanlık veya sadece sohbet etmek için ulaşabilirsiniz.',
        'contact.whatsapp': 'WhatsApp',
        'contact.email': 'E-posta',
        'footer.rights': 'Tüm hakları saklıdır.',
        'about.bioTitle': 'AI-Ready Frontend Developer & UI/UX Engineer',
        'about.bioDescription': 'React, TypeScript ve modern frontend mimarileriyle, yüksek trafikli global projelerde ölçeklenebilir, erişilebilir ve performans odaklı dijital ürünler geliştiren; güçlü tasarım geçmişine sahip frontend uzmanı.',
        'project.notFound': 'Proje bulunamadı',
        'project.back': 'Çalışmalara Dön',
        'project.overview': 'Genel Bakış',
        'project.role': 'Rol',
        'project.timeline': 'Zaman Çizelgesi',
        'project.techStack': 'Mutfaktaki Araçlar',
        'project.visit': 'Canlı Siteyi Gör',
        'project.cta': 'Sıradaki Proje',
        'project.detailsNotAvailable': 'Detaylı proje içeriği hazırlanıyor. Çok yakında.',
        'nav.menu.dark': 'Karanlık Tema',
        'nav.menu.light': 'Aydınlık Tema',
        'nav.menu.turkish': 'Türkçe',
        'nav.menu.english': 'İngilizce'
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en');

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') as Locale;
        if (savedLocale) {
            setLocale(savedLocale);
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'tr') setLocale('tr');
        }
    }, []);

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: string) => {
        return (translations[locale] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
