/**
 * Gère l'historique des calculs.
 */
const HISTORY_KEY = 'calculatorHistory'

/**
 * Sauvegarde un calcul dans l'historique.
 * @param {string} entry - L'entrée à sauvegarder (ex: "2 + 3 = 5").
 */
function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
  history.unshift(entry) // Ajoute au début du tableau
  if (history.length > 10) {
    history = history.slice(0, 10) // Garde seulement les 10 derniers calculs
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  renderHistory()
}

/**
 * Affiche l'historique des calculs.
 */
function renderHistory() {
  const historyList = document.getElementById('history-list')
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []

  if (history.length === 0) {
    historyList.innerHTML =
      '<div class="history-item">Aucun calcul / No calculations</div>'
    return
  }

  historyList.innerHTML = ''
  history.forEach((entry) => {
    const item = document.createElement('div')
    item.className = 'history-item'
    item.textContent = entry
    historyList.appendChild(item)
  })
}

/**
 * Efface l'historique.
 */
function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
  renderHistory()
}

// Initialise l'historique au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  renderHistory()
  document
    .getElementById('clear-history-btn')
    .addEventListener('click', clearHistory)
})
