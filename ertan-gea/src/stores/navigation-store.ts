import { Store } from '@geajs/core'

class NavigationStore extends Store {
  isMenuOpen = false
  currentProjectId: string | null = null

  constructor() {
    super()
    this.syncWithHash()
  }

  syncWithHash() {
    const hash = window.location.hash
    if (hash.startsWith('#/works/')) {
      const id = hash.replace('#/works/', '')
      this.currentProjectId = id
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  closeMenu() {
    this.isMenuOpen = false
  }

  setProject(id: string | null) {
    this.currentProjectId = id
    if (id) {
       window.location.hash = `#/works/${id}`
       window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
       // Only clear if it was a project hash
       if (window.location.hash.startsWith('#/works/')) {
         window.location.hash = ''
       }
    }
  }
}

export default new NavigationStore()
