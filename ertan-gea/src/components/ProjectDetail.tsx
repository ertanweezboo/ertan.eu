import { Component } from '@geajs/core'
import languageStore from '../stores/language-store'
import { translate } from '../data/translations'
import navigationStore from '../stores/navigation-store'
import ArrowLeft from '../icons/ArrowLeft'
import ArrowRight from '../icons/ArrowRight'
import ExternalLink from '../icons/ExternalLink'

interface Work {
  id: string
  title: string
  category: string
  description: string
  color: string
  link: string
  image?: string
  role?: string
  timeline?: string
  techStack?: string
}

const fullWorksData: Record<string, Work[]> = {
  en: [
    { id: 'fuelspy', title: 'FuelSpy', category: 'Fuel & EV Station Finder', description: 'A comprehensive real-time fuel price and EV charging station finder for the UK. Features include precision radar for nearby stations, live price updates from major networks, and progressive web app support.', color: '#0284c7', link: 'https://www.fuelspy.uk/', image: '/images/fuelspy.png', role: 'Product Owner and Developer', timeline: '2026 - Present', techStack: 'Next.js, TypeScript, Drizzle ORM, Turso (SQLite), Leaflet Maps, PWA' },
    { id: 'degerim', title: 'degerim.com', category: 'AI-Powered Asset Valuation', description: 'A comprehensive AI-driven career and asset valuation platform for the Turkish market. Features include natural language property descriptions, real-time market data analysis via Serper.dev, and instant professional valuation reports.', color: '#C45C1A', link: 'https://degerim.com', image: '/images/degerim.png', role: 'Product Owner and Developer', timeline: '2026 - Present', techStack: 'Next.js, TypeScript, Supabase, Gemini AI, Serper.dev' },
    { id: 'radio-free', title: 'RadioFree', category: 'Cross-platform Streaming App', description: 'A modern streaming platform dedicated to Balkan music and global radio stations. Features include category-based discovery, geographic exploration, and a seamless cross-platform experience.', color: '#E11D48', link: 'https://radio-free.com/', image: '/images/radiofree.png', role: 'Product Owner and Developer', timeline: '2026 - Present', techStack: 'Next.js, TypeScript, Zustand, i18next, Vercel, Supabase' },
    { id: 'chalga-party', title: 'ChalgaParty', category: 'Web Application', description: 'A modern platform to discover and share local events like music, dance, and festivals.', color: '#FD7E14', link: 'https://www.chalgaparty.com/', image: '/images/chalga.jpg', role: 'Product Owner and Developer', timeline: '2025 - Present', techStack: 'Next.js, TypeScript, Mantine UI' },
    { id: 'bulgaristan-gundem', title: 'Bulgaristan Gündem', category: 'AI News Portal', description: 'An AI-powered news platform that automatically aggregates and translates Bulgarian news.', color: '#1a365d', link: 'https://bulgaristan-gundem.com/', image: '/images/bg.png', role: 'Software Architect and Developer', timeline: '2024 - Present', techStack: 'Next.js, TypeScript, AI/LLM, Vercel' },
    { id: 'land-rover', title: 'Land Rover Configurator', category: 'Automotive Configurator', description: 'High-end 3D vehicle customization tool for global markets.', color: '#222222', link: 'https://buildyour.landrover.co.uk/', image: '/images/land_rover.png', role: 'Frontend Developer', timeline: '2023 - 2024', techStack: 'React, Redux, WebGL, Micro-frontends' },
    { id: 'space-casino', title: 'SpaceCasino', category: 'iGaming Platform', description: 'A modern futuristic online gaming platform with a focus on user experience.', color: '#7B2CBF', link: 'https://www.spacecasino.com/', image: '/images/spacecasino.png', role: 'Frontend Developer', timeline: '2021 - 2022', techStack: 'React, TypeScript, Redux, Styled Components' },
    { id: 'medicus', title: 'MEDICUS Staufen', category: 'Medical Platform', description: 'A specialized career platform connecting Turkish healthcare professionals with German opportunities.', color: '#0D9488', link: 'https://medicus-turkey.vercel.app/', image: '/images/medicus_turkey.jpg', role: 'Full Stack Developer', timeline: '2024', techStack: 'Next.js, TypeScript, GraphQL, CMS, Tailwind CSS' },
  ],
  tr: [
    { id: 'fuelspy', title: 'FuelSpy', category: 'Yakıt & EV Şarj İstasyonu Bulucu', description: 'Birleşik Krallık genelinde gerçek zamanlı akaryakıt fiyatlarını takip eden kapsamlı platform.', color: '#0284c7', link: 'https://www.fuelspy.uk/', image: '/images/fuelspy.png', role: 'Ürün Sahibi ve Geliştirici', timeline: '2026 - Günümüz', techStack: 'Next.js, TypeScript, Drizzle ORM, Turso (SQLite), Leaflet Maps, PWA' },
    { id: 'degerim', title: 'degerim.com', category: 'AI Destekli Varlık Değerleme', description: 'Türkiye pazarı için geliştirilmiş, yapay zeka destekli kapsamlı varlık değerleme platformu.', color: '#C45C1A', link: 'https://degerim.com', image: '/images/degerim.png', role: 'Ürün Sahibi ve Geliştirici', timeline: '2026 - Günümüz', techStack: 'Next.js, TypeScript, Supabase, Gemini AI, Serper.dev' },
    { id: 'radio-free', title: 'RadioFree', category: 'Çok Platformlu Yayın Uygulaması', description: 'Balkan müziğine odaklanan modern bir yayın platformu.', color: '#E11D48', link: 'https://radio-free.com/', image: '/images/radiofree.png', role: 'Ürün Sahibi ve Geliştirici', timeline: '2026 - Günümüz', techStack: 'Next.js, TypeScript, Zustand, i18next, Vercel, Supabase' },
    { id: 'chalga-party', title: 'ChalgaParty', category: 'Web Uygulaması', description: 'Müzik, dans ve festival odaklı yerel etkinlikleri keşfetme platformu.', color: '#FD7E14', link: 'https://www.chalgaparty.com/tr', image: '/images/chalga.jpg', role: 'Ürün Sahibi ve Geliştirici', timeline: '2025 - Günümüz', techStack: 'Next.js, TypeScript, Mantine UI' },
    { id: 'bulgaristan-gundem', title: 'Bulgaristan Gündem', category: 'AI Haber Portalı', description: 'Bulgaristan kaynaklı haberleri Türkçeye otomatik çeviren yapay zeka destekli haber portalı.', color: '#1a365d', link: 'https://bulgaristan-gundem.com/', image: '/images/bg.png', role: 'Yazılım Mimarı ve Geliştirici', timeline: '2024 - Günümüz', techStack: 'Next.js, TypeScript, AI/LLM, Vercel' },
    { id: 'land-rover', title: 'Land Rover Konfigüratör', category: 'Otomotiv Konfigüratör', description: 'Küresel pazarlar için üst segment 3D araç özelleştirme aracı.', color: '#222222', link: 'https://buildyour.landrover.co.uk/', image: '/images/land_rover.png', role: 'Frontend Geliştirici', timeline: '2023 - 2024', techStack: 'React, Redux, WebGL, Micro-frontends' },
    { id: 'space-casino', title: 'SpaceCasino', category: 'iGaming Platformu', description: 'Kullanıcı deneyimi ve gerçek zamanlı etkileşimlere odaklanan modern online oyun platformu.', color: '#7B2CBF', link: 'https://www.spacecasino.com/', image: '/images/spacecasino.png', role: 'Frontend Geliştirici', timeline: '2021 - 2022', techStack: 'React, TypeScript, Redux, Styled Components' },
    { id: 'medicus', title: 'MEDICUS Staufen', category: 'Sağlık Platformu', description: 'Türk sağlık profesyonellerini Almanya\'daki kariyer fırsatlarıyla buluşturan kariyer platformu.', color: '#0D9488', link: 'https://medicus-turkey.vercel.app/', image: '/images/medicus_turkey.jpg', role: 'Full Stack Geliştirici', timeline: '2024', techStack: 'Next.js, TypeScript, GraphQL, CMS, Tailwind CSS' },
  ]
}

export default class ProjectDetail extends Component {
  template() {
    const localeVal = String(languageStore.locale)
    const locale = (localeVal === 'en' || localeVal === 'tr') ? localeVal : 'en'
    const projectId = navigationStore.currentProjectId
    const projects = fullWorksData[locale]
    const currentIndex = projects.findIndex(p => p.id === projectId)
    const project = projects[currentIndex]

    if (!project) return <div>Project not found</div>

    const prevProject = projects[currentIndex - 1] || projects[projects.length - 1]
    const nextProject = projects[currentIndex + 1] || projects[0]

    return (
      <div class="project-detail page-transition">
        <div class="container">
          <div class="back-btn" click={() => navigationStore.setProject(null)}>
            <ArrowLeft />
            {translate(locale, 'project.back') || 'Back'}
          </div>

          <header class="project-header">
            <h1 class="project-title">{project.title}</h1>
            <p class="project-category">{project.category}</p>
          </header>

          <div class="project-hero-image" style={{ backgroundColor: project.color }}>
            {project.image && (
              <img src={project.image} alt={project.title} class="full-img" />
            )}
          </div>

          <div class="project-grid">
            <div class="project-description">
              <h2>{translate(locale, 'project.overview') || 'Overview'}</h2>
              <p>{project.description}</p>
            </div>

            <div class="project-side">
              <div class="info-item">
                <label>{translate(locale, 'project.role') || 'Role'}</label>
                <p>{project.role}</p>
              </div>
              <div class="info-item">
                <label>{translate(locale, 'project.timeline') || 'Timeline'}</label>
                <p>{project.timeline}</p>
              </div>
              <div class="info-item">
                <label>{translate(locale, 'project.techStack') || 'Tech Stack'}</label>
                <p>{project.techStack}</p>
              </div>
              
              <a href={project.link} target="_blank" rel="noopener noreferrer" class="visit-link">
                <span>{translate(locale, 'project.visit') || 'Visit Project'}</span>
                <ExternalLink />
              </a>
            </div>
          </div>

          <div class="project-pagination">
            <div class="page-nav prev" click={() => {
              navigationStore.setProject(prevProject.id)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
              <span class="page-nav-label">{translate(locale, 'project.previous')}</span>
              <div class="page-nav-title">
                <ArrowLeft />
                <span>{prevProject.title}</span>
              </div>
            </div>

            <div class="page-nav next" click={() => {
              navigationStore.setProject(nextProject.id)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
              <span class="page-nav-label">{translate(locale, 'project.next')}</span>
              <div class="page-nav-title">
                <span>{nextProject.title}</span>
                <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
