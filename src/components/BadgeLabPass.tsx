type Props = {
  status: string;
  label?: string;
};

export function BadgeLabPass({ status, label }: Props) {
  const s = status.toUpperCase();
  const pass = s === 'PASS' || s === 'ACTIVE';
  const failed = s === 'FAIL' || s === 'FAILED';
  const pending = s === 'PENDING';

  let classes = 'bg-hero-mist text-muted border-border';
  let dot = 'bg-muted';
  if (pass) {
    classes = 'bg-pass-soft text-pass border-pass/20';
    dot = 'bg-pass';
  } else if (failed) {
    classes = 'bg-fail-soft text-fail border-fail/20';
    dot = 'bg-fail';
  } else if (pending) {
    classes = 'bg-pending-soft text-pending border-pending/20';
    dot = 'bg-pending';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[1px] ${classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label ?? status}
    </span>
  );
}
