"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, RectangleEllipsis } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { LoginAlert } from "@/components/LoginError";
import SeparatorWithText from "@/components/SeparatorWithText";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [resultTitle, setTitle] = useState<string>("");
  const [iconColor, setIconColor] = useState<string>("currentColor");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3005/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setTitle("Login Successful!");
      setMessage("Redirecting to dashboard!");
      setIconColor("currentColor"); // Restablecer el color al normal tras un login exitoso

      const { token } = response.data;

      // Configurar la cookie con un tiempo de expiración de 14 días
      const expirationDays = 14;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays); // Suma 14 días a la fecha actual

      document.cookie = `token=${token}; path=/; expires=${expirationDate.toUTCString()}; secure; sameSite=strict;`;

      router.push("/dashboard");
    } catch (error: any) {
      setIconColor("#ff2600"); // Cambiar los iconos a rojo tras un error de login
      setTitle("Login Failed!");
      setMessage(`${error.response?.data?.message || "An error occurred"}`);
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Inicio de sesión</h1>
        <p className="text-balance text-muted-foreground">
          Introduce tu correo electrónico corporativo más abajo.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center">
            {" "}
            {/* Usamos items-center para centrar en el eje Y */}
            <Label htmlFor="email">Correo electrónico</Label>
            <Mail className={`ml-2 h-3.5 w-3.5 text-${iconColor}`} />{" "}
            {/* Cambia el color del icono */}
          </div>
          <Input
            id="email"
            type="email"
            placeholder="pedrogarcia@tuinstituto.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            {" "}
            {/* Usamos items-center aquí también */}
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
              <RectangleEllipsis
                className={`ml-2 h-4 w-4.5 text-${iconColor}`}
              />{" "}
              {/* Cambia el color del icono */}
            </div>
            <Link
              href={"/forgot-password"}
              className="ml-auto inline-block text-sm underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Iniciar sesión
        </Button>
        <SeparatorWithText />
        <div className="flex justify-around">
          <Button variant="outline" className="w-[160px]">
            Continuar con
            <Image
              src="/google.webp"
              width={15}
              height={15}
              alt="Google Logo"
              className="m-1"
            />
          </Button>
          <Button variant="outline" className="w-[160px]">
            Continuar con
            <Image
              src="/microsoft.png"
              width={20}
              height={20}
              alt="Microsoft Logo"
              className="mr-1"
            />
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href={"/register-student"} className="underline">
          Registrarse
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 mb-4 ml-4 p-4 z-50">
        {message && <LoginAlert message={message} title={resultTitle} />}
      </div>
    </>
  );
}
