import {storage} from '../core/utils';

function toHtml(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  const date = new Date(model.openedDate)
  return `<li class="db__record">
          <a href="#excel/${id}">${model.title}</a>
          <strong>${date.toLocaleDateString()}
                  ${date.toLocaleTimeString()}</strong>
        </li>`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }
  return keys
}


export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) return 'Вы пока не создали ни 1 таблицы'
  return `
      <div class="db__list-header">
        <span>Название таблицы</span>
        <span>Дата открытия</span>
      </div>
      <ul class="db__list">
        ${keys.map(toHtml).join('')}
      </ul>`
}
