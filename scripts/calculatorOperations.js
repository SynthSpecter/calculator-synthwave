// Initialize calculator state
// Initialise l'état de la calculatrice
export function initializeCalculator() {
  return {
    currentInput: '', // Current input being entered by the user
    // Entrée actuelle saisie par l'utilisateur
    calculation: '', // Stores the current calculation string
    // Stocke la chaîne de calcul actuelle
    resultText: document.getElementById('resultText'), // Reference to the result display element
    // Référence à l'élément d'affichage du résultat
    calculationText: document.getElementById('calculationText'), // Reference to the calculation display element
    // Référence à l'élément d'affichage du calcul
  }
}

// Handle number input (including decimal point)
// Gère l'entrée des nombres (y compris le point décimal)
export function handleNumber(calculator, value) {
  // Prevent multiple decimal points in the current input
  // Empêche plusieurs points décimaux dans l'entrée actuelle
  if (value === '.' && calculator.currentInput.includes('.')) return
  calculator.currentInput += value // Append the number or decimal to the current input
  // Ajoute le nombre ou le point décimal à l'entrée actuelle
}

// Handle operator input
// Gère l'entrée des opérateurs
export function handleOperator(calculator, value) {
  // Append the current input and the operator to the calculation string if there is a current input
  // Ajoute l'entrée actuelle et l'opérateur à la chaîne de calcul s'il y a une entrée actuelle
  if (calculator.currentInput !== '') {
    calculator.calculation += calculator.currentInput + ' ' + value + ' '
    calculator.currentInput = '' // Reset current input after appending to calculation
    // Réinitialise l'entrée actuelle après l'ajout au calcul
  }
}

// Clear all calculator state
// Efface tout l'état de la calculatrice
export function clearAll(calculator) {
  calculator.currentInput = '' // Clear the current input
  // Efface l'entrée actuelle
  calculator.calculation = '' // Clear the calculation string
  // Efface la chaîne de calcul
  calculator.resultText.textContent = '0' // Reset the result display to zero
  // Réinitialise l'affichage du résultat à zéro
}

// Handle backspace operation
// Gère l'opération de retour arrière
export function handleBackspace(calculator) {
  // Remove the last character from the current input
  // Supprime le dernier caractère de l'entrée actuelle
  calculator.currentInput = calculator.currentInput.slice(0, -1)
}

// Perform calculation
// Effectue le calcul
export function calculate(calculator) {
  // Append the current input to the calculation string if there is any
  // Ajoute l'entrée actuelle à la chaîne de calcul s'il y en a une
  if (calculator.currentInput !== '') {
    calculator.calculation += calculator.currentInput
  }

  try {
    // Evaluate the calculation string and replace 'x' with '*' for multiplication
    // Évalue la chaîne de calcul et remplace 'x' par '*' pour la multiplication
    const result = eval(calculator.calculation.replace(/x/g, '*'))

    // Display the result, using toFixed(2) for non-integer results
    // Affiche le résultat, utilisant toFixed(2) pour les résultats non entiers
    calculator.resultText.textContent = Number.isInteger(result)
      ? result
      : result.toFixed(2)

    // Add the calculation to the history
    // Ajoute le calcul à l'historique
    const historyList = document.getElementById('historyList')
    const historyItem = document.createElement('li')
    historyItem.textContent = `${calculator.calculation} = ${result}`
    historyList.appendChild(historyItem)

    // Reset the calculation and set current input to the result
    // Réinitialise le calcul et définit l'entrée actuelle au résultat
    calculator.calculation = ''
    calculator.currentInput = result.toString()
  } catch (error) {
    // Handle errors during calculation, such as invalid expressions
    // Gère les erreurs pendant le calcul, comme les expressions invalides
    calculator.resultText.textContent = 'Erreur | Error'
    calculator.calculation = ''
    calculator.currentInput = ''
  }
}
