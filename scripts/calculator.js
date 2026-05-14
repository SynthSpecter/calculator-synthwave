/**
 * Classe Calculator
 * Gère la logique de calcul de la calculatrice.
 */
class Calculator {
  constructor() {
    this.currentOperand = '0'
    this.previousOperand = ''
    this.operation = undefined
    this.resetDisplay = false

    this.currentOperandElement = document.getElementById('current-operand')
    this.previousOperandElement = document.getElementById('previous-operand')

    this.setupButtons()
  }

  /**
   * Configure les écouteurs pour les boutons de la calculatrice.
   */
  setupButtons() {
    // Boutons numériques
    document.querySelectorAll('.btn.number').forEach((button) => {
      button.addEventListener('click', () => {
        this.appendNumber(button.dataset.number)
      })
    })

    // Boutons opérateurs
    document.querySelectorAll('.btn.operator').forEach((button) => {
      button.addEventListener('click', () => {
        this.handleOperator(button.dataset.action)
      })
    })

    // Raccourcis clavier
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') {
        this.appendNumber(e.key)
      } else if (e.key === '.') {
        this.appendNumber('.')
      } else if (
        e.key === '+' ||
        e.key === '-' ||
        e.key === '*' ||
        e.key === '/'
      ) {
        const operatorMap = {
          '+': 'add',
          '-': 'subtract',
          '*': 'multiply',
          '/': 'divide',
        }
        this.handleOperator(operatorMap[e.key])
      } else if (e.key === 'Enter' || e.key === '=') {
        this.calculate()
      } else if (e.key === 'Escape') {
        this.clear()
      } else if (e.key === 'Backspace') {
        this.delete()
      }
    })
  }

  /**
   * Ajoute un nombre à l'opérande actuel.
   * @param {string} number - Le nombre à ajouter.
   */
  appendNumber(number) {
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number
    } else if (number === '.' && this.currentOperand.includes('.')) {
      return // Empêche plusieurs points décimaux
    } else {
      this.currentOperand += number
    }
    this.updateDisplay()
  }

  /**
   * Gère les opérateurs (+, -, ×, /, =, C, ⌫, +/-).
   * @param {string} action - L'action à effectuer.
   */
  handleOperator(action) {
    switch (action) {
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        this.chooseOperation(action)
        break
      case 'calculate':
        this.calculate()
        break
      case 'clear':
        this.clear()
        break
      case 'delete':
        this.delete()
        break
      case 'toggle-sign':
        this.toggleSign()
        break
    }
  }

  /**
   * Choisit une opération à effectuer.
   * @param {string} operation - L'opération (+, -, ×, /).
   */
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.calculate()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    this.updateDisplay()
  }

  /**
   * Effectue le calcul.
   */
  calculate() {
    if (this.operation === undefined || this.currentOperand === '') return

    let result
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case 'add':
        result = prev + current
        break
      case 'subtract':
        result = prev - current
        break
      case 'multiply':
        result = prev * current
        break
      case 'divide':
        result = prev / current
        break
      default:
        return
    }

    // Sauvegarde le calcul dans l'historique
    saveToHistory(
      `${this.previousOperand} ${this.getOperationSymbol()} ${this.currentOperand} = ${result}`,
    )

    this.currentOperand = result.toString()
    this.operation = undefined
    this.previousOperand = ''
    this.updateDisplay()
  }

  /**
   * Retourne le symbole de l'opération.
   * @returns {string} - Symbole de l'opération (+, -, ×, /).
   */
  getOperationSymbol() {
    switch (this.operation) {
      case 'add':
        return '+'
      case 'subtract':
        return '-'
      case 'multiply':
        return '×'
      case 'divide':
        return '/'
      default:
        return ''
    }
  }

  /**
   * Efface tout.
   */
  clear() {
    this.currentOperand = '0'
    this.previousOperand = ''
    this.operation = undefined
    this.updateDisplay()
  }

  /**
   * Supprime le dernier caractère.
   */
  delete() {
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0'
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1)
    }
    this.updateDisplay()
  }

  /**
   * Inverse le signe de l'opérande actuel.
   */
  toggleSign() {
    this.currentOperand = (parseFloat(this.currentOperand) * -1).toString()
    this.updateDisplay()
  }

  /**
   * Met à jour l'affichage.
   */
  updateDisplay() {
    this.currentOperandElement.textContent = this.formatNumber(
      this.currentOperand,
    )
    this.previousOperandElement.textContent =
      this.previousOperand +
      (this.operation ? ` ${this.getOperationSymbol()}` : '')
  }

  /**
   * Formate un nombre pour l'affichage (ajoute des séparateurs de milliers).
   * @param {string} number - Le nombre à formater.
   * @returns {string} - Le nombre formaté.
   */
  formatNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
}

// Crée une instance globale de la calculatrice
const calculator = new Calculator()
