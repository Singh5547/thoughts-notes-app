export const STORAGE_KEY = 'thoughts-notes-v1'
export const DELETED_KEY = 'thoughts-deleted-v1'

export const NOTE_COLORS = [
  { name: 'cream', bg: 'bg-[#fffefa]', dot: 'bg-[#f3e6c7]' },
  { name: 'sage', bg: 'bg-[#e7eee3]', dot: 'bg-[#c5d6be]' },
  { name: 'peach', bg: 'bg-[#f8e8df]', dot: 'bg-[#edc9b7]' },
  { name: 'lavender', bg: 'bg-[#ece8f5]', dot: 'bg-[#d0c6e6]' },
  { name: 'blue', bg: 'bg-[#e5edf2]', dot: 'bg-[#c0d4df]' },
]

export const INITIAL_NOTES = [
  { id: 'sample-1', title: 'Little things to remember', content: 'Make room for the things that make a day feel like yours.\n\nA slow coffee. A walk without a destination. Calling home just to say hi.', category: 'Personal', color: 'sage', pinned: true, updatedAt: Date.now() - 1000 * 60 * 22 },
  { id: 'sample-2', title: 'Ideas for the weekend', content: 'Visit the flower market\nTry that little pasta place on Elm\nBring a book to the park\n\nMaybe finally start the balcony herb garden 🌱', category: 'Ideas', color: 'peach', pinned: false, updatedAt: Date.now() - 1000 * 60 * 60 * 2 },
  { id: 'sample-3', title: 'A thought on creativity', content: 'You don’t have to feel inspired to begin. Sometimes beginning is the thing that brings the inspiration.', category: 'Journal', color: 'lavender', pinned: false, updatedAt: Date.now() - 1000 * 60 * 60 * 18 },
  { id: 'sample-4', title: 'Books for a rainy day', content: 'The Creative Act — Rick Rubin\nBraiding Sweetgrass — Robin Wall Kimmerer\nSmall Things Like These — Claire Keegan', category: 'Reading list', color: 'blue', pinned: false, updatedAt: Date.now() - 1000 * 60 * 60 * 26 },
  { id: 'sample-5', title: 'Weekly reset', content: 'Clear the desk, plan three good meals, water the plants, and choose one thing to look forward to.', category: 'Personal', color: 'cream', pinned: false, updatedAt: Date.now() - 1000 * 60 * 60 * 40 },
]
