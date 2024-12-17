"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Home,
  LineChart,
  PanelsTopLeft,
  Settings,
  Users2,
  PanelLeft,
  School,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";

export function AsideMenu() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);

  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link href="/dashboard">
            <div
              className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-lg text-lg font-semibold md:h-8 md:w-8 md:text-base ${
                pathName === "/dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }`}
            >
              <Home
                className={`transition-all ${
                  pathName === "/dashboard"
                    ? "text-primary-foreground h-4 w-4"
                    : "h-5 w-5"
                }`}
              />
              <span className="sr-only">NebriHub</span>
            </div>
          </Link>
          {/*<Tooltip>
            <TooltipTrigger asChild>
              <Link href="/calendar">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathName === '/calendar'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground transition-colors hover:text-foreground'
                  }`}
                >
                  <CalendarDays
                    className={`transition-all group-hover:scale-110 ${
                      pathName === '/calendar' ? 'h-4 w-4' : 'h-5 w-5'
                    }`}
                  />
                  <span className="sr-only">Calendario</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Calendario</TooltipContent>
          </Tooltip>*/}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/attendance">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathName === "/attendance"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground transition-colors hover:text-foreground"
                  }`}
                >
                  <School
                    className={`transition-all group-hover:scale-110 ${
                      pathName === "/attendance" ? "h-4 w-4" : "h-5 w-5"
                    }`}
                  />
                  <span className="sr-only">Asistencia</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Asistencia</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/projects">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathName === "/projects"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground transition-colors hover:text-foreground"
                  }`}
                >
                  <PanelsTopLeft
                    className={`transition-all group-hover:scale-110 ${
                      pathName === "/projects" ? "h-4 w-4" : "h-5 w-5"
                    }`}
                  />
                  <span className="sr-only">Proyectos</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Proyectos</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/members">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathName === "/members"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground transition-colors hover:text-foreground"
                  }`}
                >
                  <Users2
                    className={`transition-all group-hover:scale-110 ${
                      pathName === "/members" ? "h-4 w-4" : "h-5 w-5"
                    }`}
                  />
                  <span className="sr-only">Miembros</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Miembros</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/statistics">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathName === "/statistics"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground transition-colors hover:text-foreground"
                  }`}
                >
                  <LineChart
                    className={`transition-all group-hover:scale-110 ${
                      pathName === "/statistics" ? "h-4 w-4" : "h-5 w-5"
                    }`}
                  />
                  <span className="sr-only">Estadísticas</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Estadísticas</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/settings">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathName === "/settings"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground transition-colors hover:text-foreground"
                  }`}
                >
                  <Settings
                    className={`transition-all group-hover:scale-110 ${
                      pathName === "/settings" ? "h-4 w-4" : "h-5 w-5"
                    }`}
                  />
                  <span className="sr-only">Configuración</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Configuración</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  );
}
