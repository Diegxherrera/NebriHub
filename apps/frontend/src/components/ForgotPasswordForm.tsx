"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const email_placeholder = "pedrogarcia@tuinstituto.com";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3005/auth/forgot-password",
        { email }
      );
      setMessage("Correo de reseteo de contraseña enviado.");
    } catch (error: any) {
      setMessage(
        `Failed to send password reset email: ${
          error.response?.data?.message || "An error occurred"
        }`
      );
    }
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Olvidaste tu contraseña</h1>
        <p className="text-balance text-muted-foreground">
          Escribe tu correo para restablecer tu contraseña.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder={email_placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300"
          />
        </div>
        <Button type="submit" className="w-full bg-accent/90 hover:bg-accent">
          Restablecer contraseña
        </Button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </>
  );
}
