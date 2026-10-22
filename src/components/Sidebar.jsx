import { Clock3, LayoutGrid, Pin, Plus, Sparkles, StickyNote, X } from 'lucide-react'
import NavItem from './NavItem.jsx'

export default function Sidebar({ notes, deletedCount, categories, activeFilter, onSelectFilter, onCreateNote, mobileOpen, onClose }) {
  const pinnedCount = notes.filter((note) => note.pinned).length
  return (
    <>
      {mobileOpen && <button onClick={onClose} className="fixed inset-0 z-30 bg-black/20 lg:hidden" aria-label="Close navigation" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-[#e9eae4] bg-[#fafaf7] px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#e6ecdf] text-[#687b5e]"><StickyNote size={21} strokeWidth={1.8} /></div>
          <div><div className="font-display text-[17px] font-extrabold tracking-[-.04em]">thoughts<span className="text-[#95a28b]">.</span></div><div className="text-[11px] tracking-[.08em] text-[#a0a198]">YOUR QUIET CORNER</div></div>
          <button className="ml-auto rounded-lg p-2 text-muted lg:hidden" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
        </div>
        <button onClick={onCreateNote} className="group mb-8 flex items-center justify-center gap-2 rounded-[13px] bg-[#74866a] px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(116,134,106,.2)] transition hover:-translate-y-0.5 hover:bg-[#687b5e]"><Plus size={17} className="transition group-hover:rotate-90" /> Create a note</button>
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#a3a49b]">Workspace</div>
        <nav className="space-y-1">
          <NavItem icon={<LayoutGrid size={17} />} label="All notes" count={notes.length} active={activeFilter === 'All notes'} onClick={() => onSelectFilter('All notes')} />
          <NavItem icon={<Pin size={17} />} label="Pinned" count={pinnedCount} active={activeFilter === 'Pinned'} onClick={() => onSelectFilter('Pinned')} />
          <NavItem icon={<Clock3 size={17} />} label="Recently deleted" count={deletedCount} active={activeFilter === 'Recently deleted'} onClick={() => onSelectFilter('Recently deleted')} />
        </nav>
        <div className="mb-2 mt-8 flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#a3a49b]"><span>Your labels</span><button onClick={onCreateNote} aria-label="Create a note" className="rounded p-1 hover:bg-[#edeee8]"><Plus size={14} /></button></div>
        <nav className="space-y-1">{categories.map((category, index) => <NavItem key={category} icon={<span className={`h-2 w-2 rounded-full ${['bg-[#d8ad78]', 'bg-[#91a785]', 'bg-[#b09acb]', 'bg-[#84a7b6]'][index % 4]}`} />} label={category} active={activeFilter === category} onClick={() => onSelectFilter(category)} />)}</nav>
        <div className="mt-auto rounded-[18px] bg-[#eef1e9] p-4"><div className="mb-2 flex items-center gap-2 text-[#74866a]"><Sparkles size={15} /><span className="text-xs font-semibold">A little reminder</span></div><p className="text-xs leading-relaxed text-[#70796a]">You don’t have to remember everything. That’s what this space is for.</p></div>
      </aside>
    </>
  )
}
