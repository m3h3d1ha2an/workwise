import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TeamCardSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </CardHeader>
    </Card>
  );
};
