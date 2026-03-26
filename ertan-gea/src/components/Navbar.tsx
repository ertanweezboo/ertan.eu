import { Component } from '@geajs/core'
import languageStore from '../stores/language-store'
import { translate } from '../data/translations'
import themeStore from '../stores/theme-store'
import navigationStore from '../stores/navigation-store'
import Globe from '../icons/Globe'
import Sun from '../icons/Sun'
import Moon from '../icons/Moon'
import Menu from '../icons/Menu'
import XIcon from '../icons/X'

export default class Navbar extends Component {
  handleNavigation(e: any, id: string) {
    if (navigationStore.currentProjectId) {
      navigationStore.setProject(null)
      setTimeout(() => this.scrollToSection(id), 50)
    } else {
      this.scrollToSection(id)
    }
    navigationStore.closeMenu()
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  template() {
    const localeValue = String(languageStore.locale)
    const isEn = localeValue === 'en'
    const isDark = String(themeStore.theme) === 'dark'
    const isMenuOpen = navigationStore.isMenuOpen

    return (
      <nav class="navbar">
        <div class="navbar-inner">
          <a href="#" class="navbar-logo" click={(e: any) => {
            e.preventDefault()
            navigationStore.setProject(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            <svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.75rem' }}>
              <circle cx="100" cy="100" r="90" fill="currentColor" />
              <g fill="var(--bg)">
                <rect x="65" y="60" width="20" height="80" rx="4" />
                <rect x="65" y="60" width="70" height="18" rx="4" />
                <rect x="65" y="91" width="55" height="18" rx="4" />
                <rect x="65" y="122" width="70" height="18" rx="4" />
              </g>
            </svg>
            <span>ERTAN YAKUB</span>
          </a>

          <div class="navbar-links">
            <a href="#experience" class="nav-link" click={(e: any) => {
              e.preventDefault()
              this.handleNavigation(e, 'experience')
            }}>{translate(localeValue, 'nav.experience')}</a>
            <a href="#skills" class="nav-link" click={(e: any) => {
              e.preventDefault()
              this.handleNavigation(e, 'skills')
            }}>{translate(localeValue, 'nav.skills')}</a>
            <a href="#works" class="nav-link" click={(e: any) => {
              e.preventDefault()
              this.handleNavigation(e, 'works')
            }}>{translate(localeValue, 'nav.works')}</a>
            <a href="#contact" class="nav-link" click={(e: any) => {
              e.preventDefault()
              this.handleNavigation(e, 'contact')
            }}>{translate(localeValue, 'nav.contact')}</a>
          </div>

          <div class="navbar-actions">
            <button class="icon-btn" click={() => themeStore.toggle()} aria-label={isDark ? translate(localeValue, 'nav.menu.light') : translate(localeValue, 'nav.menu.dark')}>
              {isDark ? <Sun /> : <Moon />}
            </button>
            <button class="icon-btn lang-select" click={() => languageStore.setLocale(isEn ? 'tr' : 'en')} aria-label={isEn ? 'Switch to Turkish' : 'İngilizce\'ye geç'}>
              <Globe />
              <span class="lang-label">{isEn ? 'EN' : 'TR'}</span>
            </button>
            <button class="icon-btn mobile-toggle" click={() => navigationStore.toggleMenu()} aria-label="Toggle mobile menu">
              {isMenuOpen ? <XIcon /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div class="mobile-menu">
            <div class="container">
              <div class="mobile-links">
                <a href="#experience" class="mobile-link" click={(e: any) => this.handleNavigation(e, 'experience')}>{translate(localeValue, 'nav.experience')}</a>
                <a href="#skills" class="mobile-link" click={(e: any) => this.handleNavigation(e, 'skills')}>{translate(localeValue, 'nav.skills')}</a>
                <a href="#works" class="mobile-link" click={(e: any) => this.handleNavigation(e, 'works')}>{translate(localeValue, 'nav.works')}</a>
                <a href="#contact" class="mobile-link" click={(e: any) => this.handleNavigation(e, 'contact')}>{translate(localeValue, 'nav.contact')}</a>
              </div>

              <div class="mobile-actions">
                <button class="mobile-action-btn" click={() => languageStore.setLocale(isEn ? 'tr' : 'en')}>
                  <Globe />
                  <span>{isEn ? 'Türkçe' : 'English'}</span>
                </button>
                <button class="mobile-action-btn" click={() => themeStore.toggle()}>
                  {isDark ? <Sun /> : <Moon />}
                  <span>{isDark ? translate(localeValue, 'nav.menu.light') : translate(localeValue, 'nav.menu.dark')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    )
  }
}
