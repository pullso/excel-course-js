import {ExcelComponent} from '@/core/ExcelComponent';
import * as actions from '../../store/actions';
import {defaultTitle} from '../../constants';
import {$} from '../../core/dom';
import {ActiveRoute} from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  onInput(e) {
    const $target = $(e.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
      }
      ActiveRoute.navigate('')
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <label>
        <input type="text" class="input" value="${title}">
      </label>
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `
  }
}
