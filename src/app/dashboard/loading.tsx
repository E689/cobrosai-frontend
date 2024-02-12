import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen h-screen flex flex-col py-10 gap-4">
      <Skeleton className="w-[80%] h-8 rounded-full mt-auto mx-auto" />
      <Skeleton className="w-[80%] h-8 rounded-full mx-auto" />
      <Skeleton className="w-[80%] h-8 rounded-full mb-auto mx-auto" />
    </div>
  )
}