import App from './app'
import './styles.css'
import themeStore from './stores/theme-store'
import languageStore from './stores/language-store'
import navigationStore from './stores/navigation-store'

// Initialize stores
void themeStore
void languageStore

const root = document.getElementById('app')

if (!root) {
  throw new Error('App root element not found')
}

const app = new App()
app.render(root)

/**
 * Global smooth scroll with fixed navbar offset
 */
const scrollToId = (id: string, isInitial = false) => {
  if (!id) return

  // If we're in project view, we MUST go back to main first
  if (navigationStore.currentProjectId) {
    navigationStore.setProject(null)
  }

  const findAndScroll = (attempts = 0) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      
      // If position is 0 and it's not hero, it might not be in DOM or layout not finished
      if (elementRect === 0 && id !== 'hero' && attempts < 10) {
        setTimeout(() => findAndScroll(attempts + 1), 50)
        return
      }

      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: isInitial ? 'instant' : 'smooth'
      })
    } else if (attempts < 10) {
      setTimeout(() => findAndScroll(attempts + 1), 100)
    }
  }

  findAndScroll()
}

// Handle initial load with hash
setTimeout(() => {
  const hash = window.location.hash
  if (hash.startsWith('#/works/')) {
    const id = hash.replace('#/works/', '')
    navigationStore.setProject(id)
  } else if (hash) {
    scrollToId(hash.replace('#', ''), true)
  }
}, 500)

// Handle changes to hash while on page
window.addEventListener('hashchange', () => {
  const hash = window.location.hash
  if (hash.startsWith('#/works/')) {
    const id = hash.replace('#/works/', '')
    navigationStore.setProject(id)
  } else if (hash) {
    scrollToId(hash.replace('#', ''))
  } else if (!hash) {
    // If we cleared the hash (going back to home)
    navigationStore.setProject(null)
  }
})
