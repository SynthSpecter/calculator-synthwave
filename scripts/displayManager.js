/**
 * Update the calculator display with the current calculation and input.
 * This function updates both the calculation text and the result text based on the current state of the calculator.
 * / Met à jour l'affichage de la calculatrice avec le calcul et l'entrée actuels.
 * Cette fonction met à jour à la fois le texte du calcul et le texte du résultat en fonction de l'état actuel de la calculatrice.
 */
export function updateDisplay(calculator) {
  // Update the calculation display with the current calculation string and current input
  // Met à jour l'affichage du calcul avec la chaîne de calcul actuelle et l'entrée actuelle
  calculator.calculationText.textContent =
    calculator.calculation + calculator.currentInput

  // If there is a current input, update the result display with the current input
  // Si une entrée actuelle existe, met à jour l'affichage du résultat avec l'entrée actuelle
  if (calculator.currentInput !== '') {
    calculator.resultText.textContent = calculator.currentInput
  }
}
