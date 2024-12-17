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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserProvider, useUser } from "@/context/UserContext";
import { AsideMenu } from "@/components/AsideMenu";
import NewContentSheet from "@/components/NewContentSheet";
import { Plus } from "lucide-react";
import NoContentBanner from "@/components/NoContent";
import { checkToken } from "@/app/actions";
import Cookies from "js-cookie";

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
  const [classes, setClasses] = useState([]); // State to hold classes
  const [error, setError] = useState(null); // State for error handling
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    // Fetch the list of classes from the API
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:3005/classes");
        if (!response.ok) {
          throw new Error(`Error fetching classes: ${response.status}`);
        }
        const data = await response.json();
        setClasses(data); // Update state with fetched classes
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      }
    };

    fetchClasses();
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
              <CardTitle>¿Has pasado lista?</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Aquí aparecen las clases en las que aún no has pasado lista.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Show error if fetching fails */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Show classes list */}
              {classes.length > 0 ? (
                <ul>
                  {classes.map((classItem: any, index: number) => (
                    <li
                      key={index}
                      className="py-2 border-b last:border-b-0 border-gray-300"
                    >
                      <strong>{classItem.name}</strong> -{" "}
                      {classItem.description || "Sin descripción"}
                    </li>
                  ))}
                </ul>
              ) : (
                !error && <NoContentBanner />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
