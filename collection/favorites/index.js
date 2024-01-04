export default class Favorites {
  constructor() {
    this.favorites = []
  }
  get() {
    const data = localStorage.getItem('favorites')
    if (data) this.favorites = JSON.parse(data)
    return this.favorites
  }
  set(code) {
    const index = this.favorites.indexOf(code)
    index === -1 ? this.favorites.push(code) : this.favorites.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
    return this.favorites
  }
}