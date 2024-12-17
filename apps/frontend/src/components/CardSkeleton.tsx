import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="relative w-full flex rounded-lg overflow-hidden">
      {/* Parte izquierda del Card */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Header del Card con el título */}
        <div className="flex pb-3">
          <Skeleton className="w-[150px] h-[30px] rounded-md mb-3" />
        </div>

        {/* Contenido del Card */}
        <div className="flex flex-col gap-3">
          {/* Asignatura */}
          <div className="flex gap-2 items-center">
            <Skeleton className="w-[25px] h-[25px] rounded-full" />
            <Skeleton className="w-[120px] h-[20px] rounded-md" />
          </div>

          {/* Profesor/a */}
          <div className="flex gap-2 items-center">
            <Skeleton className="w-[25px] h-[25px] rounded-full" />
            <Skeleton className="w-[150px] h-[20px] rounded-md" />
          </div>
        </div>

        {/* Footer del Card con el botón */}
        <div className="mt-4">
          <Skeleton className="w-[80px] h-[30px] rounded-md" />
        </div>
      </div>

      {/* Parte derecha del Card con la imagen */}
      <div className="relative w-1/3 h-full overflow-hidden">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    </div>
  );
}
