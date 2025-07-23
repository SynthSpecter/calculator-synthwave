// Import necessary functions from respective modules
// Importer les fonctions nécessaires depuis les modules respectifs
import { setupEventListeners } from './eventHandlers.js'
import { initializeCalculator } from './calculatorOperations.js'
import { setupSidebarEventListeners } from './sidebarHandlers.js'

// Initialize the application once the DOM content is fully loaded
// Initialiser l'application une fois que le contenu du DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  const calculator = initializeCalculator()
  setupEventListeners(calculator)
  setupSidebarEventListeners()
})

// Function to convert units based on user input
// Fonction pour convertir les unités en fonction de l'entrée utilisateur
window.convertUnits = function () {
  // Get the input value and selected units from the dropdowns
  // Récupérer la valeur d'entrée et les unités sélectionnées dans les menus déroulants
  const value = parseFloat(document.getElementById('unitInput').value)
  const unitFrom = document.getElementById('unitFrom').value
  const unitTo = document.getElementById('unitTo').value

  let result

  // Convert meters to feet
  // Convertir des mètres en pieds
  if (unitFrom === 'meters' && unitTo === 'feet') {
    result = value * 3.28084
  }
  // Convert feet to meters
  // Convertir des pieds en mètres
  else if (unitFrom === 'feet' && unitTo === 'meters') {
    result = value / 3.28084
  }

  // Display the conversion result
  // Afficher le résultat de la conversion
  document.getElementById('conversionResult').textContent = result.toFixed(2)
}
