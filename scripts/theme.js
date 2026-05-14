/**
 * Gère le thème (sombre/clair) de la calculatrice.
 */
function toggleTheme() {
  const body = document.body
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode')
    body.classList.add('light-mode')
    localStorage.setItem('theme', 'light')
  } else {
    body.classList.remove('light-mode')
    body.classList.add('dark-mode')
    localStorage.setItem('theme', 'dark')
  }
  updateThemeButton()
}

/**
 * Met à jour le texte du bouton de thème.
 */
function updateThemeButton() {
  const themeBtn = document.getElementById('theme-btn')
  const isDarkMode = document.body.classList.contains('dark-mode')
  themeBtn.textContent = isDarkMode ? '☀️ Thème / Theme' : '🌙 Thème / Theme'
}

/**
 * Charge le thème sauvegardé.
 */
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  const body = document.body
  if (savedTheme === 'light') {
    body.classList.add('light-mode')
  } else {
    body.classList.add('dark-mode')
  }
  updateThemeButton()
}

// Initialise le thème au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  loadTheme()
  document.getElementById('theme-btn').addEventListener('click', toggleTheme)
})
