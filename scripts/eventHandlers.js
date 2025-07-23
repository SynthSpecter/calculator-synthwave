// Import necessary functions from calculatorOperations and displayManager modules
// Importer les fonctions nécessaires depuis les modules calculatorOperations et displayManager
import {
  handleNumber,
  handleOperator,
  clearAll,
  handleBackspace,
  calculate,
} from './calculatorOperations.js'
import { updateDisplay } from './displayManager.js'

/**
 * Set up event listeners for calculator buttons and keyboard inputs.
 * This function attaches click event listeners to all calculator buttons and a keydown event listener to the document.
 * / Configure les écouteurs d'événements pour les boutons de la calculatrice et les entrées clavier.
 * Cette fonction attache des écouteurs d'événements de clic à tous les boutons de la calculatrice et un écouteur d'événement keydown au document.
 */
export function setupEventListeners(calculator) {
  // Select all buttons and attach click event listeners
  // Sélectionner tous les boutons et attacher des écouteurs d'événements de clic
  const buttons = document.querySelectorAll('.btn')
  buttons.forEach((button) => {
    button.addEventListener('click', () =>
      handleButtonClick(button, calculator)
    )
  })

  // Attach keydown event listener to the document
  // Attacher un écouteur d'événement keydown au document
  document.addEventListener('keydown', (event) =>
    handleKeyboardInput(event, calculator)
  )
}

/**
 * Handle button click events based on the button's data-action attribute.
 * / Gère les événements de clic sur les boutons en fonction de l'attribut data-action du bouton.
 */
function handleButtonClick(button, calculator) {
  const action = button.dataset.action
  const value = button.textContent

  // Determine the action to take based on the button's data-action attribute
  // Déterminer l'action à prendre en fonction de l'attribut data-action du bouton
  switch (action) {
    case 'number':
    case 'decimal':
      handleNumber(calculator, value)
      break
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      handleOperator(calculator, value)
      break
    case 'clear':
      clearAll(calculator)
      break
    case 'backspace':
      handleBackspace(calculator)
      break
    case 'equals':
      calculate(calculator)
      break
  }

  // Update the display after handling the button click
  // Mettre à jour l'affichage après avoir géré le clic sur le bouton
  updateDisplay(calculator)
}

/**
 * Handle keyboard input events to mimic button clicks.
 * / Gère les événements d'entrée au clavier pour imiter les clics sur les boutons.
 */
function handleKeyboardInput(event, calculator) {
  const key = event.key

  // Handle number and decimal point input
  // Gérer l'entrée des nombres et du point décimal
  if (/^[0-9.]$/.test(key)) {
    handleNumber(calculator, key)
  }
  // Handle operator input
  // Gérer l'entrée des opérateurs
  else if (['+', '-', '*', '/'].includes(key)) {
    handleOperator(calculator, key === '*' ? 'x' : key)
  }
  // Handle equals/enter key press
  // Gérer la pression sur la touche égal/entrée
  else if (key === 'Enter' || key === '=') {
    calculate(calculator)
  }
  // Handle backspace key press
  // Gérer la pression sur la touche de retour arrière
  else if (key === 'Backspace') {
    handleBackspace(calculator)
  }
  // Handle escape key press to clear all
  // Gérer la pression sur la touche d'échappement pour tout effacer
  else if (key === 'Escape') {
    clearAll(calculator)
  }

  // Update the display after handling the keyboard input
  // Mettre à jour l'affichage après avoir géré l'entrée clavier
  updateDisplay(calculator)
}
