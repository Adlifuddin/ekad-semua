/**
 * Footer - Shared footer component for all layouts
 */
export function Footer() {
  return (
    <footer className="py-8 text-center bg-white/50 backdrop-blur-sm">
      <p className="text-foreground/60 text-sm">
        © {new Date().getFullYear()} ekad-semua. Hak cipta terpelihara.
      </p>
    </footer>
  );
}
