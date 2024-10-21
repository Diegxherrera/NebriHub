"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Calendar from "@/components/FullCalendar";
import { UserProvider, useUser } from "@/context/UserContext";
import { AsideMenu } from "@/components/AsideMenu";
import GeneralSelect from "@/components/GeneralSelect";
import NewContentSheet from "@/components/NewContentSheet";
import { Plus } from "lucide-react";
export default function Dashboard() {
  return (
    <UserProvider>
      <TooltipProvider>
        <DashboardComponent />
      </TooltipProvider>
    </UserProvider>
  );
}

export function DashboardComponent() {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-muted/40 flex min-h-screen w-full flex-col">
      <AsideMenu />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle>Tus profesores</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Aquí aparecerán los profesores a los que asignar las clases a
                impartir.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary" className="mr-3">
                    Añadir profesor
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Añadir un profesor a tu espacio
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      En tu espacio tendrás a los profesores que quieras
                      coordinar, también verás sus horas por semana y las horas
                      asignadas hasta ahora. Aún así, podrás hacerlo también en
                      la sección
                      <Link className="font-bold text-primary" href="/members">
                        {" "}
                        miembros
                      </Link>
                      .
                      <Select>
                        <SelectTrigger className="w-[380px] mt-2">
                          <SelectValue placeholder="-- Elige el profesor --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={" "}>Francisco Albiar</SelectItem>
                          <SelectItem value={" "}>
                            Jose Carlos Ramirez
                          </SelectItem>
                          <SelectItem value={" "}>Elvira Pérez</SelectItem>
                        </SelectContent>
                      </Select>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <NewContentSheet triggerName="Nuevo profesor" type="teacher" />
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle>Tus clases</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Aquí aparecerán las clases que personalmente,
                {user ? ` ${user.firstName}` : "Cargando..."}, impartes.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary" className="mr-3">
                    Añadir clase
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Añadir una clase a tu espacio
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      En tu espacio tendrás las clases que quieras coordinar,
                      también verás sus horas por semana y las horas asignadas
                      hasta ahora. Aún así, podrás hacerlo también en la sección
                      <Link className="font-bold text-primary" href="/classes">
                        {" "}
                        clases
                      </Link>
                      .
                      <div className="flex flex-row justify-between mt-3">
                        <GeneralSelect
                          size={"large"}
                          type={"classes"}
                          usingLabel={false}
                        />
                        <Button
                          className="bg-white border text-black hover:bg-gray-100"
                          variant="default"
                        >
                          <Plus />
                        </Button>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <NewContentSheet triggerName="Nueva clase" type="class" />
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle>Tus alumnos</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Aquí aparecerán los alumnos a los que asignar tareas, proyectos
                y demás trabajos.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary" className="mr-3">
                    Añadir alumnos
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Añadir un alumno a tu espacio
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      En tu espacio tendrás a los alumnos que quieras coordinar,
                      también verás sus horas por semana y las horas asignadas
                      hasta ahora. Aún así, podrás hacerlo también en la sección
                      <Link className="font-bold text-primary" href="/members">
                        {" "}
                        miembros
                      </Link>
                      .
                      <Select>
                        <SelectTrigger className="w-[380px] mt-2">
                          <SelectValue placeholder="-- Elige el alumno --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={" "}>Francisco Albiar</SelectItem>
                          <SelectItem value={" "}>
                            Jose Carlos Ramirez
                          </SelectItem>
                          <SelectItem value={" "}>Elvira Pérez</SelectItem>
                        </SelectContent>
                      </Select>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <NewContentSheet triggerName="Nuevo alumno" type="student" />
            </CardFooter>
          </Card>
          <div className="lg:col-span-2 xl:col-span-2">
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  );
}
