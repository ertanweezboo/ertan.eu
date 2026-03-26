import { Component } from '@geajs/core'
import languageStore from '../stores/language-store'
import { translate } from '../data/translations'
import aboutData from '../data/about.json'

export default class About extends Component {
  template() {
    const localeVal = String(languageStore.locale)
    const locale = (localeVal === 'en' || localeVal === 'tr') ? localeVal : 'en'
    const data = (aboutData as any)[locale]

    return (
      <div class="about-container">
        <section id="experience" class="section about-section">
          <div class="container">
            <h2 class="section-title">{translate(locale, 'section.experience')}</h2>
            <p class="about-desc">{translate(locale, 'about.bioDescription')}</p>

            <div class="exp-list">
              {data.experience.map((item: any, i: number) => (
                <div class="exp-item" key={String(i)}>
                  <div class="exp-period">{item.period}</div>
                  <div class="exp-content">
                    <div class="exp-role">{item.role}</div>
                    <div class="exp-company">{item.company}</div>
                    <p class="exp-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" class="section">
          <div class="container">
            <h2 class="section-title">{translate(locale, 'section.skills')}</h2>
            
            <div class="skills-grid-wrapper">
              {data.skillCategories.map((cat: any) => (
                <div class="skill-group" key={cat.id}>
                  <h3 class="skill-group-title">{cat.title}</h3>
                  <p class="skill-group-metaphor">{cat.metaphor}</p>
                  <div class="skills-inner-grid">
                    {cat.skills.map((skill: string) => (
                      <span class="skill-tag" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
