export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  clear() {
    this.group.forEach($c => $c.removeClass(TableSelection.className))
    this.group = []
  }

  select($el) {
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }

  selectGroup($group = []) {
    this.clear()

    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  get selectedIds() {
    return this.group.map($el=>$el.id())
  }

  applyStyle(style) {
    this.group.forEach(el=>el.css(style))
  }
}
