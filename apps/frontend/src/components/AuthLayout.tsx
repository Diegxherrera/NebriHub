"use client";

import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [selectedLocale, setSelectedLocale] = useState<string>("Español");

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
  };

  return (
    <div className="relative w-full lg:grid xl:min-h-[820px] lg:min-h-[600px] lg:grid-cols-2 dark:bg-gray-950">
      <div className="absolute top-5 left-7 p-4 text-sm">
        <span className="dark:text-white">Idioma: </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-muted-foreground dark:text-white/70">
            {selectedLocale}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-gray-900 bg-white text-black dark:text-white dark:border-gray-900">
            <DropdownMenuItem
              className="hover:bg-accent hover:bg-opacity-90 dark:hover:bg-opacity-90 dark:hover:bg-gray-600 transition-colors"
              onClick={() => handleLocaleChange("Español")}
            >
              🇪🇸 Español
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-accent hover:bg-opacity-90 dark:hover:bg-opacity-90 dark:hover:bg-gray-600 transition-colors"
              onClick={() => handleLocaleChange("English")}
            >
              🇬🇧 English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
      </div>
      <div className="flex items-center justify-center min-h-screen py-12">
        <div className="mx-auto grid w-[350px] gap-6 dark:text-white">
          {children}
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/login-cover.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
        />
      </div>
    </div>
  );
}
