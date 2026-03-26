import { Component } from '@geajs/core'
import languageStore from '../stores/language-store'
import { translations } from '../data/translations'

export default class Hero extends Component {
  titleIndex = 0

  created() {
    setInterval(() => {
      const locale = String(languageStore.locale) === 'tr' ? 'tr' : 'en'
      const len = translations[locale]['hero.titles']?.length || 1
      this.titleIndex = (this.titleIndex + 1) % len
    }, 5000)

    languageStore.observe('locale', () => {
      this.titleIndex = 0
    })
  }

  scrollTo(e: any, id: string) {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  template() {
    const localeVal = String(languageStore.locale)
    const locale = (localeVal === 'en' || localeVal === 'tr') ? localeVal : 'en'
    const trans = translations[locale]
    const currentTitle = String(trans['hero.titles'][this.titleIndex] || trans['hero.titles'][0])
    const currentSubtitle = String(trans['hero.subtitles'][this.titleIndex] || trans['hero.subtitles'][0])

    return (
      <section class="hero">
        <div class="container">
          <div class="badge">
            <span aria-hidden="true">✦</span>
            {trans['hero.badge']}
          </div>

          <div class="title-wrapper">
            {currentTitle.split('|').map((line: string, i: number) => (
              <div class="mask" key={`${this.titleIndex}-${i}`}>
                <h1 class="hero-title" style={{ animationDelay: `${i * 0.1}s` }}>
                  {line.trim()}
                </h1>
              </div>
            ))}
          </div>

          <p class="hero-subtitle">{currentSubtitle}</p>

          <div class="hero-features">
            <div class="feature">
              <span>🖥</span>
              <span>{trans['hero.feature.web']}</span>
            </div>
            <div class="feature">
              <span>📱</span>
              <span>{trans['hero.feature.mobile']}</span>
            </div>
            <div class="feature">
              <span>🤖</span>
              <span>{trans['hero.feature.ai']}</span>
            </div>
          </div>

          <div class="hero-cta">
            <a href="#works" class="btn-primary" click={(e: any) => this.scrollTo(e, 'works')}>{trans['nav.works']}</a>
            <a href="#contact" class="btn-secondary" click={(e: any) => this.scrollTo(e, 'contact')}>{trans['nav.contact']}</a>
          </div>
        </div>
      </section>
    )
  }
}
