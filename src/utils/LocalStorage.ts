export default class LocalStorage {
  private readonly key: string

  constructor(key: string) {
    this.key = `max-wellness_${key}`
  }

  get<T>(): T | null {
    const item = localStorage.getItem(this.key)
    return item ? JSON.parse(item) : null
  }

  set<T>(item: T) {
    localStorage.setItem(this.key, JSON.stringify(item))
  }

  remove() {
    localStorage.removeItem(this.key)
  }
}
