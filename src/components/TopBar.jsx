import { Menu, Plus, Search, X } from 'lucide-react'

export default function TopBar({ query, onQueryChange, onOpenMenu, onCreateNote }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e9eae4]/80 bg-canvas/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1160px] items-center gap-4">
        <button className="-ml-2 rounded-xl p-2 text-[#777b70] hover:bg-white lg:hidden" onClick={onOpenMenu} aria-label="Open menu"><Menu size={20} /></button>
        <div className="relative max-w-[490px] flex-1"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a4a69d]" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search your thoughts..." className="w-full rounded-[13px] border border-[#e9eae4] bg-white/70 py-3 pl-11 pr-10 text-sm outline-none transition placeholder:text-[#a4a69d] focus:border-[#b7c3ae] focus:bg-white focus:ring-4 focus:ring-[#74866a]/[.07]" />{query && <button onClick={() => onQueryChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#a4a69d] hover:text-ink" aria-label="Clear search"><X size={15} /></button>}</div>
        <div className="ml-auto hidden items-center gap-2 text-xs text-[#989a91] sm:flex"><span className="h-2 w-2 rounded-full bg-[#91a785]" /> All changes saved</div>
        <button onClick={onCreateNote} className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#74866a] text-white shadow-sm transition hover:rotate-90 hover:bg-[#687b5e] sm:hidden" aria-label="Create a note"><Plus size={19} /></button>
      </div>
    </header>
  )
}
