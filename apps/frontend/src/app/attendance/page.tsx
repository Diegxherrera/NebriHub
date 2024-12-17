"use client";
import axios from "axios";
import { useRouter } from "next/navigation"; // For client-side navigation
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
import { UserProvider, useUser } from "@/context/UserContext";
import { LibraryBig, SquareUserRound } from "lucide-react";
import NoContentBanner from "@/components/NoContent";
import AttendanceSkeleton from "@/components/skeletons/AttendanceSkeleton";
import { Separator } from "@/components/ui/separator";
import CardSkeleton from "@/components/CardSkeleton";
import Image from "next/image";
import NewItemDialog from "@/components/NewItemDialog";

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
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const router = useRouter(); // To handle redirection

  // Fetch user classes
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
      <div className="ml-6 mt-5 sm:text-left sm:ml-9 lg:ml-10 lg:mt-4 md:ml-10">
        <AttendanceSkeleton />
      </div>
    );
  }

  return (
    <div className="ml-6 mt-5 sm:text-left sm:ml-9 lg:ml-10 lg:mt-4 md:ml-10 w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between">
          <p className="text-4xl font-bold">Asistencia</p>
          <p className="leading-relaxed text-muted-foreground mt-3 mb-5">
            La sección de asistencias te permite gestionar el absentismo y se
            organiza según las clases que tu institución tenga.
          </p>
        </div>
        <NewItemDialog type={"class"} />
      </div>

      <div
        className={
          classes.length === 0
            ? "mt-10 mb-10"
            : "grid gap-4 mt-8 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        }
      >
        {classes.length === 0 ? (
          <NoContentBanner />
        ) : (
          classes.map((clase) => (
            <Card key={clase.id} className="relative w-full flex rounded-lg">
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <CardHeader className="flex pb-3">
                  <CardTitle className="text-xl">{clase.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center">
                    <LibraryBig className="h-5 w-5" />
                    <p>{clase.subject}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <SquareUserRound className="h-5 w-5" />
                    <p>{clase.tutorName}</p>
                  </div>
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
    </div>
  );
}
