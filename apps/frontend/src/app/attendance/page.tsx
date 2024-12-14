"use client";
import axios from "axios";
import { AsideMenu } from "@/components/AsideMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import GeneralSelect from "@/components/GeneralSelect";
import Image from "next/image";
import { UserProvider, useUser } from "@/context/UserContext";
import { LibraryBig, SquareUserRound } from "lucide-react";
import NoContentBanner from "@/components/NoContent";
import AttendanceSkeleton from "@/components/skeletons/AttendanceSkeleton";
import { Separator } from "@/components/ui/separator";
import CardSkeleton from "@/components/CardSkeleton";

interface Class {
  id: string;
  name: string;
  subject: string;
  tutorName: string;
}

export default function Attendance() {
  return (
    <UserProvider>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-muted/40 min-h-screen">
        <TooltipProvider>
          <Header />
          <AsideMenu />
        </TooltipProvider>
        <div className="flex mr-9">
          <AttendanceComponent />
        </div>
      </div>
    </UserProvider>
  );
}

export function AttendanceComponent() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClassName, setNewClassName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser(); // Obtener usuario desde el contexto

  // Fetch para obtener las clases del usuario (profesor o estudiante)
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/users/${user.id}/details`,
          {
            withCredentials: true,
          }
        );
        const { teacherDetails, studentDetails } = response.data;

        // Asignar clases en función del rol del usuario
        if (teacherDetails) {
          setClasses(
            teacherDetails.classes.map((clase: any) => ({
              id: clase.id,
              name: clase.name,
              subject: clase.subjects[0]?.name || "Sin asignatura",
              tutorName: `${user.firstName} ${user.lastName}`,
            }))
          );
        } else if (studentDetails) {
          setClasses(
            studentDetails.classes.map((clase: any) => ({
              id: clase.id,
              name: clase.name,
              subject: clase.subjects[0]?.name || "Sin asignatura",
              tutorName: clase.tutor?.name || "Sin tutor",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchClasses();
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <div className="ml-6 mt-5 sm:text-left sm:ml-9 lg:ml-10 lg:mt-4 md:ml-10">
          <AttendanceSkeleton />
        </div>
      </>
    );
  }

  return (
    <div className="ml-6 mt-5 sm:text-left sm:ml-9 lg:ml-10 lg:mt-4 md:ml-10">
      <p className="text-4xl font-bold">Asistencia</p>
      <div className="flex mb-5">
        <p className="leading-relaxed text-muted-foreground mr-4 sm:mr-10 mt-1">
          La sección de asistencias te permite gestionar el absentismo y se
          organiza según las clases de tu institución. A continuación, puedes
          controlar la asistencia de las clases que te hayan sido asignadas.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="mt-1">Nueva clase</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Crear una nueva clase</AlertDialogTitle>
              <AlertDialogDescription>
                Las clases que crees aquí serán públicas para todos aquellos a
                los que des acceso. El coordinador y administradores de la
                plataforma ven todas las clases creadas aún sin tenerlas
                asignadas.
                <div className="my-3">
                  <Label className="text-gray-900">Nombre de la clase</Label>
                  <Input
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    required
                    className="mb-2"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Separator />

      <div
        className={
          classes.length === 0
            ? "mt-10 mb-10"
            : "grid gap-4 mt-8 text-left md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        }
      >
        {classes.length === 0 ? (
          <>
            <NoContentBanner />
          </>
        ) : (
          classes.map((clase) => (
            <Card
              key={clase.id}
              className="relative w-full flex rounded-lg overflow-hidden"
            >
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <CardHeader className="flex pb-3">
                  <CardTitle className="text-xl">
                    <TooltipProvider>
                      <Tooltip delayDuration={750}>
                        <TooltipTrigger>{clase.name}</TooltipTrigger>
                        <TooltipContent>
                          <p>{clase.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <div className="flex gap-2 items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <LibraryBig className="h-5 w-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Asignatura</p>
                        </TooltipContent>
                      </Tooltip>
                      <p>
                        <Link href={`/subjects/${clase.subject}`}>
                          {clase.subject}
                        </Link>
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SquareUserRound className="h-5 w-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Profesor/a</p>
                        </TooltipContent>
                      </Tooltip>
                      <p>
                        <Link href={`/teachers/${clase.tutorName}`}>
                          {clase.tutorName}
                        </Link>
                      </p>
                    </div>
                  </TooltipProvider>
                </CardContent>
                <CardFooter>
                  <Button>Acceder</Button>
                </CardFooter>
              </div>

              <div className="relative w-1/3 h-full overflow-hidden">
                <Image
                  src="/login-cover.jpg"
                  alt="Descripción de la imagen"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Card>
          ))
        )}
      </div>
      <Separator />
    </div>
  );
}
