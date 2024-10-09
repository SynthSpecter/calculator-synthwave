import {
  handleNumber,
  handleOperator,
  clearAll,
  handleBackspace,
  calculate,
} from './calculatorOperations.js'
import { updateDisplay } from './displayManager.js'

// Set up event listeners for buttons and keyboard
// Configure les écouteurs d'événements pour les boutons et le clavier
export function setupEventListeners(calculator) {
  const buttons = document.querySelectorAll('.btn')

  buttons.forEach((button) => {
    button.addEventListener('click', () =>
      handleButtonClick(button, calculator)
    )
  })

  document.addEventListener('keydown', (event) =>
    handleKeyboardInput(event, calculator)
  )
}

// Handle button click events
// Gère les événements de clic sur les boutons
function handleButtonClick(button, calculator) {
  const action = button.dataset.action
  const value = button.textContent

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
  updateDisplay(calculator)
}

// Handle keyboard input events
// Gère les événements d'entrée au clavier
function handleKeyboardInput(event, calculator) {
  const key = event.key

  if (/^[0-9.]$/.test(key)) {
    // Numbers and decimal point
    // Nombres et point décimal
    handleNumber(calculator, key)
  } else if (['+', '-', '*', '/'].includes(key)) {
    // Operators
    // Opérateurs
    handleOperator(calculator, key === '*' ? 'x' : key)
  } else if (key === 'Enter' || key === '=') {
    // Equals
    // Égal
    calculate(calculator)
  } else if (key === 'Backspace') {
    // Backspace
    // Retour arrière
    handleBackspace(calculator)
  } else if (key === 'Escape') {
    // Clear
    // Effacer
    clearAll(calculator)
  }

  updateDisplay(calculator)
}
