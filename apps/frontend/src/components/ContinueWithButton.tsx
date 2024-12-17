import React, { ReactElement } from "react";
import { Button } from "@/components/ui/button";

interface ContinueWithButtonProps {
  icon: ReactElement; // Icon should be passed as a ReactElement (e.g., an SVG component)
  service: String;
}

export default function ContinueWithButton({
  icon,
  service,
}: ContinueWithButtonProps) {
  function handleClick() {}

  return (
    <Button
      variant="secondary"
      className="w-[160px] dark:bg-gray-600 dark:border-gray-800 dark:shadow-gray-800 dark:text-white dark:hover:bg-gray-500/90 gap-2"
    >
      Continuar con
      {icon}
    </Button>
  );
}
