import { Pin, Trash2 } from 'lucide-react'
import { NOTE_COLORS } from '../data/notes.js'
import { countWords, formatNoteDate } from '../utils/notes.js'

export default function NoteCard({ note, index, isDeleted, onOpen, onTogglePin, onDelete, onRestore, onPermanentDelete }) {
  const color = NOTE_COLORS.find((item) => item.name === note.color) || NOTE_COLORS[0]
  return (
    <article onClick={onOpen} style={{ animationDelay: `${index * 45}ms` }} className={`note-card group relative flex min-h-[222px] flex-col rounded-[20px] border border-black/[.035] ${color.bg} p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,49,39,.10)] ${onOpen ? 'cursor-pointer' : ''}`}>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${color.dot}`} /><span className="text-[11px] font-semibold tracking-wide text-[#888a80]">{note.category || 'Unsorted'}</span></div>
        <div className="flex -translate-y-1 translate-x-1 items-center gap-1 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          {isDeleted ? <><button onClick={(event) => { event.stopPropagation(); onRestore() }} className="rounded-lg px-2 py-1 text-[11px] font-semibold text-[#74866a] transition hover:bg-white/70">Restore</button><button onClick={(event) => { event.stopPropagation(); onPermanentDelete() }} className="rounded-lg p-2 text-[#95978e] transition hover:bg-white/70 hover:text-[#b45f54]" aria-label="Delete permanently"><Trash2 size={15} /></button></> : <><button onClick={(event) => { event.stopPropagation(); onTogglePin(event) }} className={`rounded-lg p-2 transition hover:bg-white/70 ${note.pinned ? 'text-[#74866a]' : 'text-[#95978e]'}`} aria-label={note.pinned ? 'Unpin note' : 'Pin note'}><Pin size={15} fill={note.pinned ? 'currentColor' : 'none'} /></button><button onClick={(event) => { event.stopPropagation(); onDelete() }} className="rounded-lg p-2 text-[#95978e] transition hover:bg-white/70 hover:text-[#b45f54]" aria-label="Delete note"><Trash2 size={15} /></button></>}
        </div>
        {note.pinned && !isDeleted && <Pin size={14} className="text-[#74866a] group-hover:hidden" fill="currentColor" />}
      </div>
      <h2 className="mb-2 font-display text-[17px] font-bold leading-snug tracking-[-.03em]">{note.title}</h2>
      <p className="line-clamp-5 whitespace-pre-line text-[13px] leading-[1.75] text-[#70736b]">{note.content || 'No additional details.'}</p>
      <div className="mt-auto flex items-center justify-between pt-5"><span className="text-[10px] text-[#a1a297]">{formatNoteDate(note.updatedAt)}</span><span className="rounded-full bg-white/60 px-2.5 py-1 text-[10px] text-[#999b91]">{countWords(note.content)} words</span></div>
    </article>
  )
}
