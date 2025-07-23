/**
 * Toggle the visibility and animation state of a sidebar.
 * This function checks if the sidebar is currently open and toggles its state accordingly.
 * / Basculer la visibilité et l'état d'animation d'une barre latérale.
 * Cette fonction vérifie si la barre latérale est actuellement ouverte et bascule son état en conséquence.
 */
export function toggleSidebar(sidebarId) {
  const sidebar = document.getElementById(sidebarId)

  // Check if the sidebar is currently open
  // Vérifier si la barre latérale est actuellement ouverte
  if (sidebar.classList.contains('open')) {
    // If open, start closing animation
    // Si ouverte, commencer l'animation de fermeture
    sidebar.classList.remove('open')
    sidebar.classList.add('closing')

    // After the closing animation completes, hide the sidebar
    // Une fois l'animation de fermeture terminée, masquer la barre latérale
    setTimeout(() => {
      sidebar.classList.remove('closing')
      sidebar.style.visibility = 'hidden'
    }, 500)
  } else {
    // If closed, make it visible and start opening animation
    // Si fermée, la rendre visible et commencer l'animation d'ouverture
    sidebar.style.visibility = 'visible'
    sidebar.classList.add('open')
  }
}

/**
 * Set up event listeners for the sidebar toggle buttons.
 * This function attaches click event listeners to the converter and history buttons to toggle their respective sidebars.
 * / Configurer les écouteurs d'événements pour les boutons de basculement des barres latérales.
 * Cette fonction attache des écouteurs d'événements de clic aux boutons du convertisseur et de l'historique pour basculer leurs barres latérales respectives.
 */
export function setupSidebarEventListeners() {
  // Get the converter button and attach an onclick event listener to toggle the unit converter sidebar
  // Récupérer le bouton du convertisseur et attacher un écouteur d'événement onclick pour basculer la barre latérale du convertisseur d'unités
  const converterButton = document.getElementById('openConverter')
  converterButton.onclick = () => toggleSidebar('unitConverter')

  // Get the history button and attach an onclick event listener to toggle the calculation history sidebar
  // Récupérer le bouton de l'historique et attacher un écouteur d'événement onclick pour basculer la barre latérale de l'historique des calculs
  const historyButton = document.getElementById('openHistory')
  historyButton.onclick = () => toggleSidebar('calculationHistory')
}
