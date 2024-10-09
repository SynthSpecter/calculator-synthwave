// Initialize calculator state
// Initialise l'état de la calculatrice
export function initializeCalculator() {
  return {
    currentInput: '',
    calculation: '',
    resultText: document.getElementById('resultText'),
    calculationText: document.getElementById('calculationText'),
  }
}

// Handle number input (including decimal point)
// Gère l'entrée des nombres (y compris le point décimal)
export function handleNumber(calculator, value) {
  if (value === '.' && calculator.currentInput.includes('.')) return
  calculator.currentInput += value
}

// Handle operator input
// Gère l'entrée des opérateurs
export function handleOperator(calculator, value) {
  if (calculator.currentInput !== '') {
    calculator.calculation += calculator.currentInput + ' ' + value + ' '
    calculator.currentInput = ''
  }
}

// Clear all calculator state
// Efface tout l'état de la calculatrice
export function clearAll(calculator) {
  calculator.currentInput = ''
  calculator.calculation = ''
  calculator.resultText.textContent = '0'
}

// Handle backspace operation
// Gère l'opération de retour arrière
export function handleBackspace(calculator) {
  calculator.currentInput = calculator.currentInput.slice(0, -1)
}

// Perform calculation
// Effectue le calcul
export function calculate(calculator) {
  if (calculator.currentInput !== '') {
    calculator.calculation += calculator.currentInput
  }
  try {
    const result = eval(calculator.calculation.replace(/x/g, '*'))
    calculator.resultText.textContent = Number.isInteger(result)
      ? result
      : result.toFixed(2)
    calculator.calculation = ''
    calculator.currentInput = result.toString()
  } catch (error) {
    calculator.resultText.textContent = 'Erreur'
    calculator.calculation = ''
    calculator.currentInput = ''
  }
}
