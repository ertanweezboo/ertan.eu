'use client';

import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Works from '@/components/Works/Works';
import Experience, { Skills } from '@/components/About/About';
import Container from '@/components/UI/Container/Container';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      <Navbar />
      <Hero />
      <Works />
      <Experience />
      <Skills />

      {/* Contact Section */}
      <section id="contact" className="section" style={{ background: 'var(--muted)', padding: '8rem 0' }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '3rem', letterSpacing: '-0.04em' }}>
              {t('contact.title')}
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.25rem', color: 'var(--accent)' }}>
              {t('contact.subtitle')}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              <a href="mailto:hi@ertan.eu" className="hover-reveal" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                hi@ertan.eu
              </a>
              <a href="https://wa.me/447305906476" className="hover-reveal" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                {t('contact.whatsapp')}
              </a>
            </div>
          </div>
        </Container>
      </section>

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
