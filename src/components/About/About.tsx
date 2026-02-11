'use client';

import { useLanguage } from '@/context/LanguageContext';
import aboutData from '@/data/about.json';
import styles from './About.module.css';
import { Terminal, PenTool, Cpu, Layers, Code, ShieldCheck, Database, Zap } from 'lucide-react';
import Container from '../UI/Container/Container';
import { motion } from 'framer-motion';

const categoryIcons: { [key: string]: any } = {
    core: <Terminal size={18} />,
    arch: <Layers size={18} />,
    enterprise: <Database size={18} />,
    quality: <ShieldCheck size={18} />,
    data: <Zap size={18} />,
    design: <PenTool size={18} />,
    'ai-perspective': <Cpu size={18} />
};

export default function Experience() {
    const { locale, t } = useLanguage();
    const data = (aboutData as any)[locale];

    return (
        <section id="experience" className={styles.section}>
            <Container>
                {/* Intro Bio Section */}
                <div className={styles.bioSection}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.bioTitle}>{t('about.bioTitle')}</h2>
                        <p className={styles.bioText}>
                            {t('about.bioDescription')}
                        </p>
                    </motion.div>
                </div>

                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>{t('section.experience')}</h2>
                </div>
                <div className={styles.timeline}>
                    {data.experience.map((item: any, index: number) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.meta}>
                                <span className={styles.period}>{item.period}</span>
                                <span className={styles.company}>{item.company}</span>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.role}>{item.role}</h3>
                                <p className={styles.desc}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export function Skills() {
    const { locale, t } = useLanguage();
    const data = (aboutData as any)[locale];

    return (
        <section id="skills" className={styles.section} style={{ borderTop: '1px solid var(--border)' }}>
            <Container>
                <div className={styles.skillHeader}>
                    <h2 className={styles.sectionTitle}>{t('section.skills')}</h2>
                </div>

                <div className={styles.skillsGrid}>
                    {data.skillCategories.map((cat: any) => (
                        <motion.div
                            key={cat.id}
                            className={styles.skillCard}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.iconBox}>{categoryIcons[cat.id] || <Code size={18} />}</span>
                                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                            </div>
                            <p className={styles.metaphor}>{cat.metaphor}</p>
                            <div className={styles.tags}>
                                {cat.skills.map((s: string, i: number) => (
                                    <span key={i} className={styles.tag}>{s}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
