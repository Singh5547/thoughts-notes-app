import { useEffect, useMemo, useState } from 'react'
import { Check, FileText, Lightbulb, Plus } from 'lucide-react'
import EmptyState from './components/EmptyState.jsx'
import NoteCard from './components/NoteCard.jsx'
import NoteEditor from './components/NoteEditor.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import { DELETED_KEY, STORAGE_KEY } from './data/notes.js'
import { countWords, loadDeletedNotes, loadNotes } from './utils/notes.js'

const blankForm = () => ({ title: '', content: '', category: 'Personal', color: 'cream', pinned: false })

export default function App() {
  const [notes, setNotes] = useState(loadNotes)
  const [deletedNotes, setDeletedNotes] = useState(loadDeletedNotes)
  const [activeFilter, setActiveFilter] = useState('All notes')
  const [query, setQuery] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(blankForm)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)) }, [notes])
  useEffect(() => { localStorage.setItem(DELETED_KEY, JSON.stringify(deletedNotes)) }, [deletedNotes])
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const categories = useMemo(() => [...new Set(notes.map((note) => note.category).filter(Boolean))], [notes])
  const filteredNotes = useMemo(() => {
    const source = activeFilter === 'Recently deleted' ? deletedNotes : notes
    const term = query.trim().toLowerCase()
    return source
      .filter((note) => activeFilter === 'All notes' || activeFilter === 'Recently deleted' || (activeFilter === 'Pinned' ? note.pinned : note.category === activeFilter))
      .filter((note) => !term || `${note.title} ${note.content} ${note.category}`.toLowerCase().includes(term))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt)
  }, [notes, deletedNotes, activeFilter, query])
  const totalWords = notes.reduce((sum, note) => sum + countWords(`${note.title} ${note.content}`), 0)

  function createNote() {
    setEditingId(null)
    setForm(blankForm())
    setEditorOpen(true)
  }

  function editNote(note) {
    setEditingId(note.id)
    setForm({ title: note.title, content: note.content, category: note.category, color: note.color, pinned: note.pinned })
    setEditorOpen(true)
  }

  function saveNote(event) {
    event.preventDefault()
    if (!form.title.trim() && !form.content.trim()) return
    const savedNote = { ...form, title: form.title.trim() || 'Untitled note', content: form.content.trim(), updatedAt: Date.now() }
    if (editingId) setNotes((current) => current.map((note) => note.id === editingId ? { ...note, ...savedNote } : note))
    else setNotes((current) => [{ id: crypto.randomUUID(), ...savedNote }, ...current])
    setEditorOpen(false)
    setToast(editingId ? 'Your note is updated' : 'A new note, ready for you')
  }

  function deleteNote(id) {
    const note = notes.find((item) => item.id === id)
    if (note) setDeletedNotes((current) => [{ ...note, deletedAt: Date.now() }, ...current])
    setNotes((current) => current.filter((item) => item.id !== id))
    setToast('Note moved to recently deleted')
  }

  function restoreNote(id) {
    const note = deletedNotes.find((item) => item.id === id)
    if (note) setNotes((current) => [{ ...note, deletedAt: undefined, updatedAt: Date.now() }, ...current])
    setDeletedNotes((current) => current.filter((item) => item.id !== id))
    setToast('Note restored')
  }

  function togglePin(id) {
    setNotes((current) => current.map((note) => note.id === id ? { ...note, pinned: !note.pinned, updatedAt: Date.now() } : note))
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar notes={notes} deletedCount={deletedNotes.length} categories={categories} activeFilter={activeFilter} onSelectFilter={(filter) => { setActiveFilter(filter); setMobileNavOpen(false) }} onCreateNote={createNote} mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <main className="min-h-screen lg:ml-[260px]">
        <TopBar query={query} onQueryChange={setQuery} onOpenMenu={() => setMobileNavOpen(true)} onCreateNote={createNote} />
        <section className="mx-auto max-w-[1160px] px-5 pb-16 pt-9 sm:px-8 sm:pt-12 lg:px-12">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
            <div className="animate-[rise-in_.45s_ease_both]"><div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#90938a]"><span>My space</span><span className="text-[#c4c5be]">/</span><span className="text-[#74866a]">{activeFilter}</span></div><h1 className="font-display text-[32px] font-bold tracking-[-.055em] sm:text-[40px]">{activeFilter === 'All notes' ? 'Your thoughts, gathered.' : activeFilter}<span className="text-[#a6b19c]"> {activeFilter === 'All notes' ? '✳' : ''}</span></h1><p className="mt-2 text-sm text-[#91938a]">A little space to clear your mind and keep what matters.</p></div>
            <button onClick={createNote} className="hidden items-center gap-2 rounded-[13px] bg-[#74866a] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(116,134,106,.2)] transition hover:-translate-y-0.5 hover:bg-[#687b5e] sm:flex"><Plus size={17} /> New note</button>
          </div>

          <div className="mb-7 flex flex-wrap items-center gap-2"><span className="mr-2 text-xs font-medium text-[#a0a198]">View</span><button className="flex items-center gap-2 rounded-full border border-[#e5e6df] bg-white px-3.5 py-2 text-xs font-semibold text-[#64675f]"><FileText size={14} /> {activeFilter} <span className="text-[#a0a198]">⌄</span></button><span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#ecefe8] px-3 py-2 text-[11px] font-medium text-[#75816c]"><FileText size={13} /> {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}</span></div>

          {filteredNotes.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((note, index) => {
              const isDeleted = activeFilter === 'Recently deleted'
              return <NoteCard key={note.id} note={note} index={index} isDeleted={isDeleted} onOpen={isDeleted ? undefined : () => editNote(note)} onTogglePin={() => togglePin(note.id)} onDelete={() => deleteNote(note.id)} onRestore={() => restoreNote(note.id)} onPermanentDelete={() => { setDeletedNotes((current) => current.filter((item) => item.id !== note.id)); setToast('Note permanently deleted') }} />
            })}
            {activeFilter !== 'Recently deleted' && <button onClick={createNote} className="group flex min-h-[222px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#d9dcd2] bg-white/35 text-[#9b9e94] transition hover:border-[#aab8a0] hover:bg-[#f1f4ed]"><span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf0e9] text-[#819275] transition group-hover:rotate-90 group-hover:scale-105"><Plus size={21} /></span><span className="text-sm font-semibold text-[#7f8378]">A thought to add?</span><span className="mt-1 text-xs">Start with a blank note</span></button>}
          </div> : <EmptyState query={query} filter={activeFilter} onClearSearch={() => setQuery('')} onCreateNote={createNote} />}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#e8e9e2] pt-5 text-[11px] text-[#a1a399]"><span className="flex items-center gap-2"><Lightbulb size={14} /> Good ideas like a little room to breathe.</span><span>{totalWords.toLocaleString()} words tucked away</span></div>
        </section>
      </main>

      {editorOpen && <NoteEditor editing={Boolean(editingId)} form={form} setForm={setForm} onSubmit={saveNote} onClose={() => setEditorOpen(false)} />}
      {toast && <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#2c3329] px-4 py-3 text-xs font-medium text-white shadow-lg"><Check size={15} className="text-[#b4c5a8]" />{toast}</div>}
    </div>
  )
}
