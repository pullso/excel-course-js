import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@/core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
    });
  }

  onClick() {

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

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
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
      if ($next.$el) this.selection.select($next)
    }
  }
}


