'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';
import { Sparkles, Monitor, Smartphone, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../UI/Container/Container';

export default function Hero() {
    const { t } = useLanguage();
    const titles = t('hero.titles') as string[];
    const subtitles = t('hero.subtitles') as string[];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % titles.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [titles.length]);

    const currentTitleLines = titles[index].split('|').map(s => s.trim());

    return (
        <section className={styles.hero}>
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="badge"
                >
                    <Sparkles size={14} style={{ marginRight: '8px' }} />
                    {t('hero.badge')}
                </motion.div>

                <div className={styles.titleWrapper}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            className={styles.titleContainer}
                        >
                            {currentTitleLines.map((line, lineIdx) => (
                                <div key={lineIdx} className={styles.mask}>
                                    <motion.h1
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-100%" }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: lineIdx * 0.1
                                        }}
                                        className={styles.title}
                                    >
                                        {line}
                                    </motion.h1>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles.subtitleWrapper}>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className={styles.subtitle}
                        >
                            {subtitles[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className={styles.features}
                >
                    <div className={styles.feature}>
                        <Monitor size={20} />
                        <span>{t('hero.feature.web')}</span>
                    </div>
                    <div className={styles.feature}>
                        <Smartphone size={20} />
                        <span>{t('hero.feature.mobile')}</span>
                    </div>
                    <div className={styles.feature}>
                        <Cpu size={20} />
                        <span>{t('hero.feature.ai')}</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className={styles.cta}
                >
                    <a href="#works" className={styles.primaryBtn}>{t('nav.works')}</a>
                    <a href="#contact" className={styles.secondaryBtn}>{t('nav.contact')}</a>
                </motion.div>
            </Container>
        </section>
    );
}
