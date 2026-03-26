import { Store } from '@geajs/core'

type Theme = 'light' | 'dark'

class ThemeStore extends Store {
  theme: Theme = 'light'

  constructor() {
    super()
    const saved = localStorage.getItem('theme') as Theme
    if (saved) {
      this.theme = saved
      document.documentElement.setAttribute('data-theme', saved)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark'
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', this.theme)
    document.documentElement.setAttribute('data-theme', this.theme)
  }
}

export default new ThemeStore()
