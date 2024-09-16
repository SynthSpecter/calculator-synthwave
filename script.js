document.addEventListener('DOMContentLoaded', () => {
  const calculationText = document.getElementById('calculationText')
  const resultText = document.getElementById('resultText')
  const buttons = document.querySelectorAll('.btn')

  let currentInput = ''
  let calculation = ''

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action
      const value = button.textContent

      switch (action) {
        case 'number':
        case 'decimal':
          handleNumber(value)
          break
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
          handleOperator(value)
          break
        case 'clear':
          clearAll()
          break
        case 'backspace':
          handleBackspace()
          break
        case 'equals':
          calculate()
          break
      }
      updateDisplay()
    })
  })

  document.addEventListener('keydown', handleKeyboardInput)

  function handleKeyboardInput(event) {
    const key = event.key

    if (/^[0-9.]$/.test(key)) {
      // Nombres et point décimal
      handleNumber(key)
    } else if (['+', '-', '*', '/'].includes(key)) {
      // Opérateurs
      handleOperator(key === '*' ? 'x' : key)
    } else if (key === 'Enter' || key === '=') {
      // Égal
      calculate()
    } else if (key === 'Backspace') {
      // Retour arrière
      handleBackspace()
    } else if (key === 'Escape') {
      // Effacer
      clearAll()
    }

    updateDisplay()
  }

  function handleNumber(value) {
    if (value === '.' && currentInput.includes('.')) return
    currentInput += value
  }

  function handleOperator(value) {
    if (currentInput !== '') {
      calculation += currentInput + ' ' + value + ' '
      currentInput = ''
    }
  }

  function clearAll() {
    currentInput = ''
    calculation = ''
    resultText.textContent = '0'
  }

  function handleBackspace() {
    currentInput = currentInput.slice(0, -1)
  }

  function calculate() {
    if (currentInput !== '') {
      calculation += currentInput
    }
    try {
      const result = eval(calculation.replace(/x/g, '*'))
      resultText.textContent = Number.isInteger(result)
        ? result
        : result.toFixed(2)
      calculation = ''
      currentInput = result.toString()
    } catch (error) {
      resultText.textContent = 'Erreur'
      calculation = ''
      currentInput = ''
    }
  }

  function updateDisplay() {
    calculationText.textContent = calculation + currentInput
    if (currentInput !== '') {
      resultText.textContent = currentInput
    }
  }
})
