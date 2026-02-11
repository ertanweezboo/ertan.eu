'use client';

import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import worksData from '@/data/works.json';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Project.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Container from '@/components/UI/Container/Container';

interface Work {
    id: string;
    title: string;
    category: string;
    color: string;
    description: string;
    role: string;
    timeline: string;
    techStack: string;
    link?: string;
    image?: string;
}

export default function ProjectPage() {
    const { id } = useParams();
    const { locale, t } = useLanguage();
    const works = (worksData as Record<string, Work[]>)[locale];
    const currentIndex = works?.findIndex((p: Work) => p.id === id) ?? -1;
    const project = works?.[currentIndex];
    const nextProject = works && currentIndex !== -1 ? works[(currentIndex + 1) % works.length] : null;

    if (!project) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>{t('project.notFound')}</p>
        </div>
    );

    return (
        <main className={styles.container}>
            <Navbar />
            <Container>
                <header className={styles.header}>
                    <Link href="/#works" className={styles.backBtn}>
                        <ArrowLeft size={16} />
                        {t('project.back')}
                    </Link>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={styles.title}
                    >
                        {project.title}
                    </motion.h1>
                    <p className={styles.category}>{project.category}</p>
                </header>

                <section className={styles.content}>
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={styles.heroImage}
                        style={{ backgroundColor: project.color }}
                    >
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className={styles.heroImg}
                                priority
                            />
                        )}
                    </motion.div>

                    <div className={styles.details}>
                        <div className={styles.description}>
                            <h2>{t('project.overview')}</h2>
                            <p>{project.description}</p>
                            <p style={{ opacity: 0.6 }}>
                                {t('project.detailsNotAvailable')}
                            </p>
                        </div>

                        <aside className={styles.info}>
                            <div className={styles.infoItem}>
                                <span>{t('project.role')}</span>
                                <p>{project.role}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <span>{t('project.timeline')}</span>
                                <p>{project.timeline}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <span>{t('project.techStack')}</span>
                                <p>{project.techStack}</p>
                            </div>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.visitBtn}
                                >
                                    <span>{t('project.visit')}</span>
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </aside>
                    </div>
                </section>
            </Container>

            {nextProject && (
                <footer className={styles.footer}>
                    <Link href={`/works/${nextProject.id}`} className={styles.cta}>
                        <span className={styles.ctaSub}>{t('project.cta')}</span>
                        <h3 className={styles.ctaTitle}>{nextProject.title}</h3>
                    </Link>
                </footer>
            )}

            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <Container>
                    <p style={{ opacity: 0.5, fontSize: '0.875rem' }}>
                        © {new Date().getFullYear()} Ertan Yakub. {t('footer.rights')}
                    </p>
                </Container>
            </footer>
        </main>
    );
}
