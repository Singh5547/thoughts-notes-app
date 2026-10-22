import { Plus, Search } from 'lucide-react'

export default function EmptyState({ query, filter, onClearSearch, onCreateNote }) {
  const title = query ? 'No thoughts found' : filter === 'Recently deleted' ? 'Nothing in the bin' : 'A little quiet here'
  const description = query ? 'Try another word or clear your search.' : filter === 'Pinned' ? 'Pin a note you want to find again quickly.' : filter === 'Recently deleted' ? 'Deleted notes will stay here until you remove them permanently.' : 'There’s always room for a new thought.'
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#dfe1d8] bg-white/40 px-6 text-center"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#edf0e9] text-[#819275]"><Search size={22} /></div><h2 className="font-display text-lg font-bold">{title}</h2><p className="mt-2 max-w-xs text-sm leading-relaxed text-[#96988f]">{description}</p>{query ? <button onClick={onClearSearch} className="mt-5 text-sm font-semibold text-[#74866a] hover:underline">Clear search</button> : filter !== 'Recently deleted' && <button onClick={onCreateNote} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#74866a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#687b5e]"><Plus size={16} /> Write your first note</button>}</div>
  )
}
