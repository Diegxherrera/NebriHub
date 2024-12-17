"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  PanelLeft,
  Home,
  CalendarDays,
  PanelsTopLeft,
  Users2,
  School,
  LineChart,
  Settings,
  BellRing,
  Cog,
  CircleHelp,
  LogOut,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/context/UserContext";
import axios from "axios";

const pathNameMap: { [key: string]: string } = {
  "/dashboard": "Panel de control",
  "/calendar": "Calendario",
  "/members": "Miembros",
  "/attendance": "Asistencia",
  "/statistics": "Estadísticas",
  "/settings": "Configuración",
};

function getPathNameInSpanish(pathname: string): string {
  return (
    pathNameMap[pathname] ||
    pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)
  );
}

async function logout() {
  try {
    const response = await axios.post("http://localhost:3005/auth/logout"); // Adjust the endpoint URL as needed
    if (response.status === 200) {
      console.log(response.data.message); // "Logout successful"
    }
  } catch (error) {
    console.error("Error logging out", error);
  }
}

export default function Header() {
  const pathname = usePathname();
  const spanishPathName = getPathNameInSpanish(pathname);

  // Acceder al usuario desde el contexto
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Home className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">NebriHub</span>
            </Link>
            {/*<Link
              href="/calendar"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <CalendarDays className="h-5 w-5" />
              Calendario
            </Link>*/}
            <Link
              href="/attendance"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <School className="h-5 w-5" />
              Asistencia
            </Link>
            <Link
              href="/members"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Miembros
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Configuración
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">
                Instituto Nebrija de Formación Profesional
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={pathname}>{spanishPathName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <Sheet>
        <SheetTrigger>
          <BellRing className="h-5 w-5 text-muted-foreground" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications Center</SheetTitle>
            <SheetDescription>
              <ScrollArea className="h-[100%] w-[100%] rounded-md p-4"></ScrollArea>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="/example_pfp.jpeg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {user ? `${user.firstName} ${user.lastName}` : "Cargando..."}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Cog className="h-4 w-4 m-1 mr-2" />
            <p>Configuración</p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CircleHelp className="h-4 w-4 m-1 mr-2" />
            <p>Ayuda</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="h-4 w-4 m-1 mr-2" strokeWidth={2.5} />
            <p>Cerrar sesión</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
