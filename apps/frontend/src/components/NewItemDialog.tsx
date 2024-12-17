import axios from "axios";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState } from "react";
import { PlusCircle, School } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GeneralSelect from "@/components/GeneralSelect";
import { useToast } from "@/hooks/use-toast";

interface NewItemDialogProps {
  type: "institution" | "class" | "subject"; // Restrict types
}

export default function NewItemDialog({ type }: NewItemDialogProps) {
  const { toast } = useToast(); // Use Shadcn toast hook
  const [formData, setFormData] = useState<{ [key: string]: string | boolean }>(
    {
      name: "",
    }
  );
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state

  // Content mapping based on the type
  const typeContent = {
    institution: {
      buttonLabel: "Nueva institución",
      title: "Crear una nueva institución",
      description:
        "Las instituciones que crees aquí serán visibles en el sistema.",
      fields: [
        {
          key: "name",
          label: "Nombre de la institución",
          placeholder: "Instituto Deep Nebula",
          type: "text",
        },
      ],
      endpoint: "/institutions",
    },
    class: {
      buttonLabel: "Nueva clase",
      title: "Crear una nueva clase",
      description:
        "Las clases creadas aquí serán públicas para los usuarios asignados.",
      fields: [
        {
          key: "name",
          label: "Nombre de la clase",
          placeholder: "2º DAM",
          type: "text",
        },
        {
          key: "year",
          label: "Año escolar",
          placeholder: "2024/25",
          type: "text",
        },
        {
          key: "acronym",
          label: "Acrónimo",
          placeholder: "2DAM",
          type: "text",
        },
        {
          key: "archived",
          label: "Archivada",
          placeholder: "",
          type: "boolean",
        },
        {
          key: "tutorId",
          label: "Tutor",
          placeholder: "-- Selecciona un tutor --",
          type: "select",
          options: ["Profesor 1", "Profesor 2"],
        },
      ],
      endpoint: "/classes",
    },
    subject: {
      buttonLabel: "Nueva asignatura",
      title: "Crear una nueva asignatura",
      description:
        "Las asignaturas estarán disponibles para ser asignadas a clases.",
      fields: [
        {
          key: "name",
          label: "Nombre de la asignatura",
          placeholder: "Diseño de Interfaces",
          type: "text",
        },
      ],
      endpoint: "/subjects",
    },
  };

  const content = typeContent[type]; // Select content dynamically

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3005${content.endpoint}`,
        formData,
        { withCredentials: true }
      );

      // Success toast
      toast({
        title: "Éxito",
        description: `${content.title} creada exitosamente.`,
        duration: 5000,
      });

      console.log("Response:", response.data);

      // Optional: Reset the form
      setFormData({ name: "" });
    } catch (error) {
      console.error(`Error creating ${type}:`, error);

      // Error toast
      toast({
        title: "Error",
        description: `Hubo un problema al crear ${type}.`,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-1 bg-accent/90 hover:bg-accent gap-2">
          <PlusCircle className="h-5 w-5" />
          {content.buttonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3">
            <School className="h-6 w-6" />
            {content.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {content.description}
            <div className="my-4">
              {content.fields.map((field) => (
                <div key={field.key} className="mb-4">
                  <Label className="text-gray-900">{field.label}</Label>
                  {field.type === "text" && (
                    <Input
                      value={formData[field.key] as string}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      required
                      className="text-black dark:text-white mt-1"
                    />
                  )}
                  {field.type === "boolean" && (
                    <Select
                      onValueChange={(value) =>
                        handleChange(field.key, value === "true")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Sí</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "select" && field.options && (
                    <GeneralSelect
                      type={"teachers"}
                      size={"w-full"}
                      usingLabel={false}
                    />
                  )}
                </div>
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-100 hover:text-black">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-accent/90 hover:bg-accent"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creando..." : content.title}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
