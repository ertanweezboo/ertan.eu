import { Store } from '@geajs/core'
import type { Locale } from '../data/translations'

class LanguageStore extends Store {
  locale: Locale = 'en'

  constructor() {
    super()
    const saved = localStorage.getItem('locale') as Locale
    if (saved === 'en' || saved === 'tr') {
      this.locale = saved
    } else {
      const lang = navigator.language.split('-')[0]
      if (lang === 'tr') this.locale = 'tr'
    }
  }

  setLocale(locale: Locale) {
    this.locale = locale
    localStorage.setItem('locale', locale)
  }
}

export default new LanguageStore()
