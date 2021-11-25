import {ExcelComponent} from '@/core/ExcelComponent';
import {$} from '@/core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text())
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  onClick(e) {

  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" 
        id="formula" 
        contenteditable="true" 
      spellcheck="false">
      </div>
    `
  }
}
