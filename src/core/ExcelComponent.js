import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }

  prepare() {

  }

  $emit(event, ...args) {
    const unsub = this.emitter.emit(event, ...args)
    this.unsubscribers.push(unsub)
  }

  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }


  toHTML() {
    return ''
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
