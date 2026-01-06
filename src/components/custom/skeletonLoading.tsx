export const SkeletonLoadingUi = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card">
          <div className="aspect-[4/3] bg-secondary" />
          <div className="p-5">
            <div className="mb-2 h-3 w-16 rounded bg-secondary" />
            <div className="mb-1 h-5 w-3/4 rounded bg-secondary" />
            <div className="mb-3 h-4 w-1/2 rounded bg-secondary" />
            <div className="mb-4 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-secondary" />
              <div className="h-6 w-20 rounded-full bg-secondary" />
              <div className="h-6 w-16 rounded-full bg-secondary" />
            </div>
            <div className="mb-4 h-7 w-24 rounded bg-secondary" />
            <div className="flex gap-2">
              <div className="h-12 flex-1 rounded-xl bg-secondary" />
              <div className="h-12 flex-1 rounded-xl bg-secondary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
