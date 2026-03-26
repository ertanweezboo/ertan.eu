import { Component } from '@geajs/core'
import languageStore from './stores/language-store'
import { translate } from './data/translations'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Works from './components/Works'
import About from './components/About'
import ProjectDetail from './components/ProjectDetail'
import navigationStore from './stores/navigation-store'

export default class App extends Component {
  template() {
    const localeValue = String(languageStore.locale)
    const locale = (localeValue === 'en' || localeValue === 'tr') ? localeValue : 'en'
    const isProjectView = !!navigationStore.currentProjectId

    return (
      <div class="app-root">
        <div class="grid-bg" aria-hidden="true"></div>
        <Navbar />
        <main>
          {isProjectView ? (
            <div class="page-transition" key={String(navigationStore.currentProjectId)}>
              <ProjectDetail />
            </div>
          ) : (
            <div class="page-transition" key="home-sections">
              <Hero />
              <About />
              <Works />

              <section id="contact" class="section contact-section">
                <div class="container">
                  <div class="contact-inner">
                    <h2 class="section-title">{translate(locale, 'contact.title')}</h2>
                    <p class="contact-subtitle">{translate(locale, 'contact.subtitle')}</p>
                    <div class="contact-links">
                      <a href="mailto:hi@ertan.eu" class="contact-link">hi@ertan.eu</a>
                      <a
                        href="https://wa.me/447305906476"
                        class="contact-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {translate(locale, 'contact.whatsapp')}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          <footer class="footer">
            <div class="container">
              <p class="footer-text">
                © {String(new Date().getFullYear())} Ertan Yakub. {translate(locale, 'footer.rights')}
              </p>
            </div>
          </footer>
        </main>
      </div>
    )
  }
}
