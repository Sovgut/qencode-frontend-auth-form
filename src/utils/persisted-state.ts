/**
 * This is a namespace for working with `localStorage`, including the fallback mechanisms and correct type infering
 */
export const PersistedState = {
  get<Data = unknown>(key: string, fallback: Data): Data {
    const data = localStorage.getItem(key)

    if (!data) {
      return fallback
    }

    try {
      return JSON.parse(data as string) as Data
    } catch {
      return fallback
    }
  },

  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(error)
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key)
  },

  clear(): void {
    localStorage.clear()
  },
}
