export default function NavItem({ icon, label, count, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-[11px] px-3 py-[10px] text-left text-[13px] transition ${active ? 'bg-[#e9eee5] font-semibold text-[#64765b]' : 'text-[#777a71] hover:bg-[#f0f1ec] hover:text-ink'}`}>
      <span className={active ? 'text-[#788d6d]' : 'text-[#a3a59d]'}>{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && <span className={`text-[11px] ${active ? 'text-[#829078]' : 'text-[#b0b1aa]'}`}>{count}</span>}
    </button>
  )
}
