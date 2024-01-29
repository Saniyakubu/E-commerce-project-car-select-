import { Skeleton } from "../ui/skeleton";

export const SkeletonLoadingUi = () => {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-5">
      <Skeleton className="h-[400px] w-[300px]" />
      <Skeleton className="h-[400px] w-[300px]" />
      <Skeleton className="h-[400px] w-[300px]" />
      <Skeleton className="h-[400px] w-[300px]" />
      <Skeleton className="h-[400px] w-[300px]" />
      <Skeleton className="h-[400px] w-[300px]" />
      <Skeleton className="h-[400px] w-[300px]" />
      <Skeleton className="h-[400px] w-[300px]" />
    </div>
  );
};
