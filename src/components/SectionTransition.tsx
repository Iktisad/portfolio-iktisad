export function SectionTransition() {
  return (
    <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-20">
      <div className="absolute inset-0 bg-gradient-to-t from-surface to-surface/0" />
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-full bg-accent/[0.08] blur-3xl rounded-full" />
    </div>
  );
}
