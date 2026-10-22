import { DELETED_KEY, INITIAL_NOTES, STORAGE_KEY } from '../data/notes.js'

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const loadNotes = () => readStorage(STORAGE_KEY, INITIAL_NOTES)
export const loadDeletedNotes = () => readStorage(DELETED_KEY, [])

export function formatNoteDate(value) {
  const date = new Date(value)
  if (date.toDateString() === new Date().toDateString()) {
    return `Today · ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export function countWords(value = '') {
  return value.trim().split(/\s+/).filter(Boolean).length
}
