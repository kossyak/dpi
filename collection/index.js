import data from '../data.js'
import dpi from '../package/dpi.js'

export default class Collection {
  constructor(editor, favorites) {
    this.collection = document.querySelector('.collection')
    this.countBar = document.querySelector('.count')
    this.favorites = favorites.get()
    this.controls(editor, favorites)
    this.count(data.length)
  }
  controls(editor, favorites) {
    const resetBtn = document.querySelector('.topbar > div > button')
    const favoritesBtn = document.querySelector('.topbar > button')
    const search = document.querySelector('.search input')
    
    const updateFavoritesBtn = () => {
      favoritesBtn.textContent = favoritesBtn.textContent.replace(/\((.*?)\)/, `(${this.favorites.length})`)
    }
    updateFavoritesBtn()
    this.update(data)
    search.oninput = (event) => this.update(this.search(event.target.value.trim()))
    favoritesBtn.onclick = () => this.update(data.filter(el => this.favorites.includes(el.code)))
    resetBtn.onclick = () => {
      search.value = ''
      this.update(data)
    }
    this.collection.onclick = (event) => {
      const card = event.target.closest('.card')
      if (card) {
        const keyword = event.target.closest('.keywords span')
        if (keyword) {
          search.value = keyword.textContent.trim()
          this.update(this.search(search.value))
          return
        }
        const favorite = event.target.closest('.favorite')
        if (favorite) {
          favorite.classList.toggle('active')
          this.favorites = favorites.set(card.dataset.icon)
          updateFavoritesBtn()
          return
        }
        const prev = this.collection.querySelector('.card.active')
        prev?.classList.remove('active')
        card.classList.add('active')
        editor.display(card.dataset.icon)
      }
    }
  }
  count(v)  {
    this.countBar.textContent = `${v} / ${data.length}`
  }
  update(data) {
    this.count(data.length)
    this.collection.innerHTML = data.reduce((accum, current) => accum + this.card(current), '')
  }
  keywordsHTML(keywords) {
    return keywords.split(',').reduce((a, k) => a + `<span>${ k }</span>`, '')
  }
  card(current) {
    return `
    <div class="card" data-icon="${current.code}">
      <div class="favorite${this.favorites.includes(current.code) ? ' active' : ''}"></div>
      <div class="icon">${dpi(current.code, 16)}</div>
      <div class="code">${current.code}</div>
      <div class="keywords">${this.keywordsHTML(current.keywords)}</div>
    </div>`
  }
  search(v) {
    const inputArray = v.split(' ')
    const result = []
    for (let item of data) {
      const keywords = item.keywords.split(',')
      if (inputArray.some(word => keywords.some(keyword => keyword.includes(word) || word.includes(keyword)))) {
        result.push(item)
      }
    }
    return result
  }
}