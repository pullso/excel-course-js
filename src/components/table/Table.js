import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@/core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  onClick() {

  }

  onInput(e) {
    this.$emit('table:input', $(e.target))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  prepare() {
    this.selection = new TableSelection()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text =>
      this.selection.current.text(text))

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  onMousemove() {
    // TODO remove console
    console.log(`: mousemove`)
  }

  toHTML() {
    return createTable()
  }


  onKeydown({key}) {
    const keys = [
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ]

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.id({parse: true})
      const $next = this.$root.find(nextSelector(key, id))
      if (!$next.$el) return
      this.selectCell($next)
    }
  }
}


