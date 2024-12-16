"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import GeneralSelect from "./GeneralSelect";
import { Mail, RectangleEllipsis } from "lucide-react";
import Google from "../../public/GoogleLogo";
import Microsoft from "../../public/MicrosoftLogo";

export default function SignUpForm({ userType }: { userType: string }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3005/auth/register",
        {
          email,
          password,
          firstName,
          lastName,
          institution,
        },
        { withCredentials: true }
      );
      router.push("/verify-institution");
    } catch (error: any) {
      setMessage(
        `Registration failed: ${
          error.response?.data?.message || "An error occurred"
        }`
      );
    }
  };

  const oppositeUserType = userType === "profesor" ? "estudiante" : "profesor";
  const oppositeUserTypeUrl =
    userType === "profesor" ? "/register-student" : "/register-teacher";

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Registro de {userType}</h1>
        <p className="text-balance text-muted-foreground">
          Introduce tus datos más abajo para crear una cuenta NebriHub.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Nombre</Label>
            <Input
              id="first-name"
              placeholder="Pedro"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Apellidos</Label>
            <Input
              id="last-name"
              placeholder="García"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="email">Correo electrónico</Label>
            <Mail className={`ml-2 h-3.5 w-3.5`} />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="pedrogarcia@tuinstituto.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <RectangleEllipsis className={`ml-2 h-4 w-4.5`} />
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300"
          />
        </div>
        <GeneralSelect
          type={"institutions"}
          onSelect={setInstitution}
          size={"large"}
          usingLabel={true}
        />
        <Button type="submit" className="w-full bg-accent/90 hover:bg-accent">
          Crear cuenta
        </Button>
        <Separator />
        <div className="flex justify-around">
          <Button
            variant="secondary"
            className="w-[160px] dark:bg-accent/90 dark:text-white dark:hover:bg-accent gap-2"
          >
            Continuar con
            <Google />
          </Button>
          <Button
            variant="secondary"
            className="w-[160px] dark:bg-accent/90 dark:text-white dark:hover:bg-accent gap-2"
          >
            Continuar con
            <Microsoft />
          </Button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
      <div className="mt-4 text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link href={"/login"} className="underline">
          Iniciar sesión
        </Link>
      </div>
    </>
  );
}
