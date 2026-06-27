export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border-subtle py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-amber font-display text-sm font-bold tracking-wider uppercase">&copy; {new Date().getFullYear()}</span>
          <span className="w-px h-3 bg-border-subtle" aria-hidden="true" />
          <span className="text-text-dim text-[10px] tracking-wider uppercase font-sans">SniperKing</span>
        </div>
        <div className="flex items-center gap-4 text-text-dim text-[10px] tracking-wider uppercase font-sans">
          <span>Competitive Gaming Portfolio</span>
          <span className="w-1 h-1 rounded-full bg-amber/40" aria-hidden="true" />
          <span>APAC Division</span>
        </div>
      </div>
    </footer>
  )
}
