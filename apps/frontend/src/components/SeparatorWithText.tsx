import React from "react";

export default function SeparatorWithText() {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-muted-foreground">O</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}
