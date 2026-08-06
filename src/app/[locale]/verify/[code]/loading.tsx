import { SkeletonRow } from '@/components/pure-roots/ui-kit';

export default function VerifyResultLoading() {
  return (
    <div className="grain mx-auto w-full max-w-5xl space-y-6 px-5 py-10 sm:px-8 sm:py-14">
      <SkeletonRow className="h-10 w-40 rounded-full" />
      <SkeletonRow className="h-64 w-full rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <SkeletonRow className="h-80 w-full rounded-2xl" />
        <div className="space-y-6">
          <SkeletonRow className="h-64 w-full rounded-2xl" />
          <SkeletonRow className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
