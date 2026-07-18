type Props = {
  status: string;
  label?: string;
};

export function BadgeLabPass({ status, label }: Props) {
  const pass = status.toUpperCase() === 'PASS';
  const active = status.toUpperCase() === 'ACTIVE';
  const failed =
    status.toUpperCase() === 'FAIL' || status.toUpperCase() === 'FAILED';

  let classes = 'bg-hero-mist text-muted border-border';
  if (pass || active) {
    classes = 'bg-pass-soft text-pass border-pass/20';
  } else if (failed) {
    classes = 'bg-red-50 text-red-800 border-red-200';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${classes}`}
    >
      {label ?? status}
    </span>
  );
}
