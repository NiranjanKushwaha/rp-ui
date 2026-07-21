export default function VerifyResultLoading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-4 px-4 py-6 sm:px-6 md:py-8">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div className="h-11 w-11 shrink-0 rounded-full bg-hero-mist" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-2/3 rounded bg-hero-mist" />
          <div className="h-3.5 w-1/2 rounded bg-hero-mist" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="h-6 w-1/2 rounded bg-hero-mist" />
          <div className="h-3 w-2/3 rounded bg-hero-mist" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between border-t border-border pt-3">
              <div className="h-3.5 w-1/3 rounded bg-hero-mist" />
              <div className="h-3.5 w-1/4 rounded bg-hero-mist" />
            </div>
          ))}
          <div className="h-11 w-full rounded-lg bg-hero-mist" />
        </div>
        <div className="space-y-4 rounded-2xl bg-gradient-to-br from-forest-deep to-forest-light p-5 sm:p-6">
          <div className="h-3 w-24 rounded bg-white/20" />
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/20" />
            <div className="space-y-2">
              <div className="h-5 w-36 rounded bg-white/20" />
              <div className="h-3.5 w-28 rounded bg-white/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 rounded bg-white/10" />
            <div className="h-10 rounded bg-white/10" />
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="h-6 w-1/3 rounded bg-hero-mist" />
        <div className="h-3.5 w-full rounded bg-hero-mist" />
        <div className="h-3.5 w-3/4 rounded bg-hero-mist" />
        <div className="h-11 w-48 rounded-lg bg-hero-mist" />
      </div>
    </div>
  );
}
