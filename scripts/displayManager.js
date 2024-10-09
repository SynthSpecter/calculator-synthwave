// Update calculator display
// Met à jour l'affichage de la calculatrice
export function updateDisplay(calculator) {
  calculator.calculationText.textContent =
    calculator.calculation + calculator.currentInput
  if (calculator.currentInput !== '') {
    calculator.resultText.textContent = calculator.currentInput
  }
}
