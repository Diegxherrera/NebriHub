import { Telescope } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function NoContentBanner() {
  return (
    <div className="flex flex-col items-center justify-center min-w-screen">
      <Separator />
      <Telescope className="w-10 h-10 mt-5 text-gray-600" strokeWidth={1} />
      <p className="font-medium text-gray-600 mt-2 mb-5"> Aún no hay nada. </p>
      <Separator />
    </div>
  );
}
