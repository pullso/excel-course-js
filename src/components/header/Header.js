import {ExcelComponent} from '@/core/ExcelComponent';
import * as actions from '../../store/actions';
import {defaultTitle} from '../../constants';
import {$} from '../../core/dom';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  onInput(e) {
    const $target = $(e.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <label>
        <input type="text" class="input" value="${title}">
      </label>
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }
}
