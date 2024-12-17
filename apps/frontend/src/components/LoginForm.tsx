"use client";

import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, RectangleEllipsis } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginAlert } from "@/components/LoginError";
import SeparatorWithText from "@/components/SeparatorWithText";
import Cookies from "js-cookie";
import Google from "../../public/GoogleLogo";
import Microsoft from "../../public/MicrosoftLogo";
import ContinueWithButton from "@/components/ContinueWithButton";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [resultTitle, setTitle] = useState<string>("");
  const [iconColor, setIconColor] = useState<string>("currentColor");
  const router = useRouter();

  // Check token and redirect if it exists
  useEffect(() => {
    const token = Cookies.get("token"); // Fetch the JWT token from cookies
    if (token != null) {
      // Optionally validate the token server-side here
      router.push("/dashboard"); // Redirect to dashboards if token exists
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3005/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data); // Debug to ensure token is returned

      setTitle("Login Successful!");
      setMessage("Redirecting to dashboards!");

      const { token } = response.data;

      // Set cookie without "secure" for local development
      Cookies.set("token", token, {
        path: "/",
        expires: 14, // Expiration in days
        sameSite: "strict",
        secure: true,
      });

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);
      setTitle("Login Failed!");
      setMessage(`${error.response?.data?.message || "An error occurred"}`);
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center items-center justify-center">
        <div className="flex justify-center">
          <Image
            src={"/NebriHub.png"}
            alt={""}
            width={200}
            height={200}
            className="-m-16"
          />
        </div>
        <h1 className="text-3xl font-bold text-accent/90 dark:text-gray-300">
          Inicio de sesión
        </h1>
        <p className="text-balance text-muted-foreground dark:text-white/60">
          Bienvenido de nuevo a la plataforma NebriHub.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="email">Correo electrónico</Label>
            <Mail className={`ml-2 h-3.5 w-3.5 text-${iconColor}`} />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="pedrogarcia@tuinstituto.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-300 dark:border-gray-600 dark:shadow-gray-800"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
              <RectangleEllipsis
                className={`ml-2 h-4 w-4.5 text-${iconColor}`}
              />
            </div>
            <Link
              href={"/forgot-password"}
              className="ml-auto inline-block text-sm underline dark:text-gray-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300"
          />
        </div>
        <Button type="submit" className="w-full bg-accent/90 hover:bg-accent">
          Iniciar sesión
        </Button>
        <SeparatorWithText />
        <div className="flex justify-between">
          <ContinueWithButton icon={<Google />} service={"Google"} />
          <ContinueWithButton icon={<Microsoft />} service={"Microsoft"} />
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
