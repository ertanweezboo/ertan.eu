'use client';

import { useLanguage } from '@/context/LanguageContext';
import worksData from '@/data/works.json';
import styles from './Works.module.css';
import { ArrowLeft, ArrowRight, Code, Layout, Smartphone, Cpu, Box, Globe, Activity, Car, Gamepad2, Music, Zap, TrendingUp } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../UI/Container/Container';

const categoryIcons: { [key: string]: any } = {
    "UI/UX Development": <Layout size={18} />,
    "UI/UX Geliştirme": <Layout size={18} />,
    "AI Systems": <Cpu size={18} />,
    "AI Sistemleri": <Cpu size={18} />,
    "Mobile App": <Smartphone size={18} />,
    "Mobil Uygulama": <Smartphone size={18} />,
    "IoT Interface": <Box size={18} />,
    "IoT Arayüzü": <Box size={18} />,
    "Web Application": <Globe size={18} />,
    "Web Uygulaması": <Globe size={18} />,
    "AI News Portal": <Globe size={18} />,
    "AI Haber Portalı": <Globe size={18} />,
    "Medical Platform": <Activity size={18} />,
    "Sağlık Platformu": <Activity size={18} />,
    "Automotive Configurator": <Car size={18} />,
    "Otomotiv Konfigüratör": <Car size={18} />,
    "iGaming Platform": <Gamepad2 size={18} />,
    "iGaming Platformu": <Gamepad2 size={18} />,
    "Cross-platform Streaming App": <Music size={18} />,
    "Çok Platformlu Yayın Uygulaması": <Music size={18} />,
    "Fuel & EV Station Finder": <Zap size={18} />,
    "Yakıt & EV Şarj İstasyonu Bulucu": <Zap size={18} />,
    "AI-Powered Asset Valuation": <TrendingUp size={18} />,
    "AI Destekli Varlık Değerleme": <TrendingUp size={18} />
};

export default function Works() {
    const { locale, t } = useLanguage();
    const works = worksData[locale as keyof typeof worksData];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Apple-like scroll amount: Width of one card + gap
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const cardWidth = window.innerWidth <= 768 ? 320 : 480;
            const gap = window.innerWidth <= 768 ? 12 : 20;
            const amount = cardWidth + gap;

            const { scrollLeft } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - amount : scrollLeft + amount;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const updateScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        updateScrollButtons();
        window.addEventListener('resize', updateScrollButtons);
        return () => window.removeEventListener('resize', updateScrollButtons);
    }, [works]);

    return (
        <section id="works" className={styles.section}>
            <Container>
                <div className={styles.header}>
                    <div className={styles.headerRow}>
                        <h2 className={styles.sectionTitle}>{t('section.works')}</h2>
                    </div>
                </div>
            </Container>

            {/* The Gallery Area */}
            <div className={styles.gallery}>
                <div
                    className={styles.scrollContainer}
                    onScroll={updateScrollButtons}
                    ref={scrollRef}
                >
                    <div className={styles.itemContainer}>
                        {works.map((work) => (
                            <Link
                                href={`/works/${work.id}`}
                                key={work.id}
                                className={styles.galleryItem}
                            >
                                <div
                                    className={styles.imageContainer}
                                    style={{ backgroundColor: work.color }}
                                >
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.meta}>
                                        {categoryIcons[work.category] || <Code size={18} />}
                                        <span>{work.category}</span>
                                    </div>
                                    <h3 className={styles.cardTitle}>{work.title}</h3>
                                    <p className={styles.cardDesc}>{work.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Container>
                <div className={styles.controls}>
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={styles.controlBtn}
                        aria-label="Previous items"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={styles.controlBtn}
                        aria-label="Next items"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </Container>
        </section>
    );
}
