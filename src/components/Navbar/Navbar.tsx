'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import Container from '../UI/Container/Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { locale, setLocale, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Smooth scroll handler
    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        const element = document.getElementById(id);

        if (pathname === '/' && element) {
            e.preventDefault();
            const offset = 80; // offset for fixed navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            closeMenu();
        } else {
            // If not on home page or element doesn't exist, let the Link handle it
            // No e.preventDefault() here
            closeMenu();
        }
    };

    // Logo click handler
    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMenu();
        }
    };

    const navLinks = [
        { id: 'works', label: t('nav.works') },
        { id: 'experience', label: t('nav.experience') },
        { id: 'skills', label: t('nav.skills') },
        { id: 'contact', label: t('nav.contact') },
    ];

    return (
        <nav className={styles.nav}>
            <Container>
                <div className={styles.inner}>
                    <Link href="/" className={styles.logo} onClick={handleLogoClick}>
                        <svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="90" fill="currentColor" />
                            <g fill="var(--background)">
                                <rect x="65" y="60" width="20" height="80" rx="4" />
                                <rect x="65" y="60" width="70" height="18" rx="4" />
                                <rect x="65" y="91" width="55" height="18" rx="4" />
                                <rect x="65" y="122" width="70" height="18" rx="4" />
                            </g>
                        </svg>
                        <span>ERTAN YAKUB</span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className={styles.menu}>
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link
                                    href={`/#${link.id}`}
                                    onClick={(e) => handleNavigation(e, link.id)}
                                    className={styles.link}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.actions}>
                        <button
                            onClick={() => setLocale(locale === 'en' ? 'tr' : 'en')}
                            className={styles.iconBtn}
                            title={locale === 'en' ? 'Türkçe' : 'English'}
                        >
                            <Globe size={18} />
                            <span className={styles.langLabel}>{locale.toUpperCase()}</span>
                        </button>
                        <button onClick={toggleTheme} className={styles.iconBtn}>
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button className={styles.mobileToggle} onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.mobileMenu}
                    >
                        <Container>
                            <ul className={styles.mobileLinks}>
                                {navLinks.map((link) => (
                                    <li key={link.id}>
                                        <Link
                                            href={`/#${link.id}`}
                                            onClick={(e) => handleNavigation(e, link.id)}
                                            className={styles.mobileLink}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.mobileActions}>
                                <button
                                    onClick={() => setLocale(locale === 'en' ? 'tr' : 'en')}
                                    className={styles.mobileActionBtn}
                                >
                                    <Globe size={20} />
                                    <span>{locale === 'en' ? t('nav.menu.turkish') : t('nav.menu.english')}</span>
                                </button>
                                <button onClick={toggleTheme} className={styles.mobileActionBtn}>
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                    <span>{theme === 'light' ? t('nav.menu.dark') : t('nav.menu.light')}</span>
                                </button>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
