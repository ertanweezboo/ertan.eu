import { Component } from '@geajs/core'
import languageStore from '../stores/language-store'
import { translate } from '../data/translations'
import navigationStore from '../stores/navigation-store'

interface Work {
  id: string
  title: string
  category: string
  description: string
  color: string
  link: string
  image?: string
}

const worksData: Record<string, Work[]> = {
  en: [
    { id: 'fuelspy', title: 'FuelSpy', category: 'Fuel & EV Station Finder', description: 'A comprehensive real-time fuel price and EV charging station finder for the UK.', color: '#0284c7', link: 'https://www.fuelspy.uk/', image: '/images/fuelspy.png' },
    { id: 'degerim', title: 'degerim.com', category: 'AI-Powered Asset Valuation', description: 'A comprehensive AI-driven career and asset valuation platform for the Turkish market.', color: '#C45C1A', link: 'https://degerim.com', image: '/images/degerim.png' },
    { id: 'radio-free', title: 'RadioFree', category: 'Cross-platform Streaming App', description: 'A modern streaming platform dedicated to Balkan music and global radio stations.', color: '#E11D48', link: 'https://radio-free.com/', image: '/images/radiofree.png' },
    { id: 'chalga-party', title: 'ChalgaParty', category: 'Web Application', description: 'A modern platform to discover and share local events like music, dance, and festivals.', color: '#FD7E14', link: 'https://www.chalgaparty.com/', image: '/images/chalga.jpg' },
    { id: 'bulgaristan-gundem', title: 'Bulgaristan Gündem', category: 'AI News Portal', description: 'An AI-powered news platform that automatically aggregates and translates Bulgarian news.', color: '#1a365d', link: 'https://bulgaristan-gundem.com/', image: '/images/bg.png' },
    { id: 'land-rover', title: 'Land Rover Configurator', category: 'Automotive Configurator', description: 'High-end 3D vehicle customization tool for global markets.', color: '#222222', link: 'https://buildyour.landrover.co.uk/', image: '/images/land_rover.png' },
    { id: 'space-casino', title: 'SpaceCasino', category: 'iGaming Platform', description: 'A modern futuristic online gaming platform with a focus on user experience.', color: '#7B2CBF', link: 'https://www.spacecasino.com/', image: '/images/spacecasino.png' },
    { id: 'medicus', title: 'MEDICUS Staufen', category: 'Medical Platform', description: 'A specialized career platform connecting Turkish healthcare professionals with German opportunities.', color: '#0D9488', link: 'https://medicus-turkey.vercel.app/', image: '/images/medicus_turkey.jpg' },
  ],
  tr: [
    { id: 'fuelspy', title: 'FuelSpy', category: 'Yakıt & EV Şarj İstasyonu Bulucu', description: 'Birleşik Krallık genelinde gerçek zamanlı akaryakıt fiyatlarını takip eden kapsamlı platform.', color: '#0284c7', link: 'https://www.fuelspy.uk/', image: '/images/fuelspy.png' },
    { id: 'degerim', title: 'degerim.com', category: 'AI Destekli Varlık Değerleme', description: 'Türkiye pazarı için geliştirilmiş, yapay zeka destekli kapsamlı varlık değerleme platformu.', color: '#C45C1A', link: 'https://degerim.com', image: '/images/degerim.png' },
    { id: 'radio-free', title: 'RadioFree', category: 'Çok Platformlu Yayın Uygulaması', description: 'Balkan müziğine odaklanan modern bir yayın platformu.', color: '#E11D48', link: 'https://radio-free.com/', image: '/images/radiofree.png' },
    { id: 'chalga-party', title: 'ChalgaParty', category: 'Web Uygulaması', description: 'Müzik, dans ve festival odaklı yerel etkinlikleri keşfetme platformu.', color: '#FD7E14', link: 'https://www.chalgaparty.com/tr', image: '/images/chalga.jpg' },
    { id: 'bulgaristan-gundem', title: 'Bulgaristan Gündem', category: 'AI Haber Portalı', description: 'Bulgaristan kaynaklı haberleri Türkçeye otomatik çeviren yapay zeka destekli haber portalı.', color: '#1a365d', link: 'https://bulgaristan-gundem.com/', image: '/images/bg.png' },
    { id: 'land-rover', title: 'Land Rover Konfigüratör', category: 'Otomotiv Konfigüratör', description: 'Küresel pazarlar için üst segment 3D araç özelleştirme aracı.', color: '#222222', link: 'https://buildyour.landrover.co.uk/', image: '/images/land_rover.png' },
    { id: 'space-casino', title: 'SpaceCasino', category: 'iGaming Platformu', description: 'Kullanıcı deneyimi ve gerçek zamanlı etkileşimlere odaklanan modern online oyun platformu.', color: '#7B2CBF', link: 'https://www.spacecasino.com/', image: '/images/spacecasino.png' },
    { id: 'medicus', title: 'MEDICUS Staufen', category: 'Sağlık Platformu', description: 'Türk sağlık profesyonellerini Almanya\'daki kariyer fırsatlarıyla buluşturan kariyer platformu.', color: '#0D9488', link: 'https://medicus-turkey.vercel.app/', image: '/images/medicus_turkey.jpg' },
  ]
}

export default class Works extends Component {
  canScrollLeft = false
  canScrollRight = true

  onAfterRender() {
    const el = this.$('.works-scroll') as HTMLElement
    if (el) {
      el.addEventListener('scroll', () => this.updateButtons(el))
      this.updateButtons(el)
    }
    window.addEventListener('resize', () => {
      const scrollEl = this.$('.works-scroll') as HTMLElement
      if (scrollEl) this.updateButtons(scrollEl)
    })
  }

  updateButtons(el: HTMLElement) {
    const { scrollLeft, scrollWidth, clientWidth } = el
    this.canScrollLeft = scrollLeft > 10
    this.canScrollRight = scrollLeft < scrollWidth - clientWidth - 10
  }

  scrollLeft() {
    const el = this.$('.works-scroll') as HTMLElement
    if (!el) return
    const amount = window.innerWidth <= 768 ? 332 : 500
    el.scrollTo({ left: el.scrollLeft - amount, behavior: 'smooth' })
  }

  scrollRight() {
    const el = this.$('.works-scroll') as HTMLElement
    if (!el) return
    const amount = window.innerWidth <= 768 ? 332 : 500
    el.scrollTo({ left: el.scrollLeft + amount, behavior: 'smooth' })
  }

  template() {
    const localeVal = String(languageStore.locale)
    const locale = (localeVal === 'en' || localeVal === 'tr') ? localeVal : 'en'
    
    return (
      <section id="works" class="section works-section">
        <div class="container">
          <h2 class="section-title">{translate(locale, 'section.works')}</h2>
        </div>

        <div class="works-gallery">
          <div class="works-scroll">
            <div class="works-track">
              {(worksData[locale as 'en' | 'tr'] || worksData['en']).map((work: Work) => (
                <div
                  class="work-card"
                  key={work.id}
                  click={() => navigationStore.setProject(work.id)}
                >
                  <div class="work-card-color" style={{ backgroundColor: work.color }}>
                    {work.image && (
                      <img src={work.image} alt={work.title} class="full-img" loading="lazy" decoding="async" />
                    )}
                  </div>
                  <div class="work-card-info">
                    <span class="work-card-category">{work.category}</span>
                    <h3 class="work-card-title">{work.title}</h3>
                    <p class="work-card-desc">{work.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div class="container">
          <div class="works-controls">
            <button
              class={`ctrl-btn ${!this.canScrollLeft ? 'ctrl-btn--disabled' : ''}`}
              click={() => this.scrollLeft()}
              disabled={!this.canScrollLeft}
              aria-label="Previous"
            >←</button>
            <button
              class={`ctrl-btn ${!this.canScrollRight ? 'ctrl-btn--disabled' : ''}`}
              click={() => this.scrollRight()}
              disabled={!this.canScrollRight}
              aria-label="Next"
            >→</button>
          </div>
        </div>
      </section>
    )
  }
}
