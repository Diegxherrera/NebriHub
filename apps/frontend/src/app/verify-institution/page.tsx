"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyInstitutionPage() {
  const router = useRouter();
  const institution: string = "Instituto Nebrija de Formación Profesional";

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-cover.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      <Card className="w-full max-w-md z-10 font-wei">
        <CardHeader>
          <CardTitle>Verificación de tu organización</CardTitle>
          <CardDescription>{institution}</CardDescription>
        </CardHeader>
        <CardContent className="-mt-3 wei">
          <p>
            El administrador de tu organización acaba de recibir tu solicitud
            para entrar al NebriHub, cuando seas aceptado te enviaremos un
            correo electrónico informándote que ya tienes acceso a la
            plataforma.
          </p>
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button variant="outline">
            <Link href="/register-student">Ir al registro</Link>
          </Button>
          <Button>
            <Link href="/login">Ir al inicio de sesión</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
