import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceSkeleton() {
  return (
    <div className="ml-6 mt-5 sm:text-left sm:ml-9 lg:ml-10 lg:mt-4 md:ml-10">
      {/* Título (Asistencia) */}
      <Skeleton className="w-[200px] h-[40px] rounded-lg mb-4" />

      <div className="flex flex-row justify-between min-w-screen">
        {/* Div de Skeletons alineados a la izquierda */}
        <div className="flex flex-col">
          <Skeleton className="w-[600px] h-[20px] rounded-md mb-2" />
          <Skeleton className="w-[550px] h-[20px] rounded-md mb-6" />
        </div>
      </div>
    </div>
  );
}
