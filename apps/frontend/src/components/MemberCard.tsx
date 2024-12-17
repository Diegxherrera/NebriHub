"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import Image from "next/image";
import GeneralSelect from "@/components/GeneralSelect";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext"; // Importa el contexto

export default function MemberCard() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [institutionClass, setInstitutionClass] = useState<string>("");
  const [subjects, setSubjects] = useState<string>("");
  const [avatarLink, setAvatarLink] = useState<string>("");
  const [isEditingClass, setIsEditingClass] = useState<boolean>(false);

  // Obtener el usuario desde el contexto
  const { user } = useUser();

  const handleRequest = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3005/",
        {
          firstName,
          lastName,
          institutionClass,
          subjects,
          avatarLink,
        },
        { withCredentials: true }
      );
      /*('Registration successful');*/
    } catch (error: any) {
      console.log(
        `Edit failed: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  const handleDoubleClick = () => {
    setIsEditingClass(true);
  };

  const handleClassSelect = (value: string) => {
    setInstitutionClass(value);
    setIsEditingClass(false);
  };

  return (
    <Card className="w-[300px] mt-10">
      <CardHeader className="flex flex-col items-center">
        <Image
          src={avatarLink || "/example_pfp.jpeg"}
          width={80}
          height={80}
          alt="Avatar"
          className="overflow-hidden rounded-full mb-1"
        />
        <CardTitle>
          {user ? `${user.firstName} ${user.lastName}` : "Cargando..."}
        </CardTitle>
        {!isEditingClass ? (
          <CardDescription onDoubleClick={handleDoubleClick}>
            {institutionClass}
          </CardDescription>
        ) : (
          <GeneralSelect type="classes" size="small" usingLabel={false} />
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRequest}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <GeneralSelect
                type={"subjects"}
                onSelect={setSubjects}
                size={"medium"}
                usingLabel={false}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex">
        <div className="w-full">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción eliminará todas las modificaciones sin guardar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Ir atrás</AlertDialogCancel>
                <AlertDialogAction>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Button className="w-full">Actualizar</Button>
      </CardFooter>
    </Card>
  );
}
