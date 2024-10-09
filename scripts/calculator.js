// Main entry point for the calculator application
// Point d'entrée principal pour l'application de calculatrice
import { setupEventListeners } from './eventHandlers.js'
import { initializeCalculator } from './calculatorOperations.js'

document.addEventListener('DOMContentLoaded', () => {
  // Initialize calculator state and set up event listeners
  // Initialise l'état de la calculatrice et configure les écouteurs d'événements
  const calculator = initializeCalculator()
  setupEventListeners(calculator)
})
