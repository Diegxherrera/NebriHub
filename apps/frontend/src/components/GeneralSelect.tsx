"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface GeneralSelectProps {
  type: keyof SelectTypes;
  size: "small" | "medium" | "mediumPlus" | "large" | "w-full";
  usingLabel: boolean | undefined;
  onSelect?: (value: ((prevState: string) => string) | string) => void;
}

interface SelectTypes {
  classes: string;
  institutions: string;
  subjects: string;
  teachers: string;
  students: string;
  users: string;
}

export default function GeneralSelect({
  type,
  size,
  usingLabel,
  onSelect,
}: GeneralSelectProps) {
  const [items, setItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);
  let typeTranslated = "";

  switch (type) {
    case "classes":
      typeTranslated = "Clases asignadas";
      break;
    case "institutions":
      typeTranslated = "Institución";
      break;
    case "subjects":
      typeTranslated = "Asignaturas asignadas";
      break;
    case "users":
      typeTranslated = "Usuario";
      break;
    case "teachers":
      typeTranslated = "Profesor/es";
      break;
    default:
      typeTranslated = "Tipo incorrecto para el select";
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        switch (type) {
          case "classes":
            url = "http://localhost:3005/classes";
            break;
          case "institutions":
            url = "http://localhost:3005/institutions";
            break;
          case "subjects":
            url = "http://localhost:3005/subjects";
            break;
          case "teachers":
            url = "http://localhost:3005/teachers";
            break;
          case "users":
            url = "http://localhost:3005/teachers";
            break;
          default:
            throw new Error("Unknown type");
        }

        const response = await axios.get(url, {
          withCredentials: true,
        });
        const names = response.data.map((item: { name: string }) => item.name);
        setItems(names);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    setOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-[100px]";
      case "medium":
        return "w-[230px]";
      case "mediumPlus":
        return "w-[300px]";
      case "large":
        return "w-[350px]";
      case "w-full":
        return "w-full";
      default:
        return "w-[200px]"; // default to medium if size is not recognized
    }
  };

  const buttonLabel = selectedItem || `${typeTranslated} no definida`;

  const content = (
    <Command>
      <CommandInput
        placeholder={`Buscar ${typeTranslated}`}
        autoComplete="off"
        autoCorrect={"off"}
      />
      <CommandList>
        <CommandEmpty>No se encontraron: {typeTranslated}.</CommandEmpty>
        <CommandGroup>
          {items.map((item, index) => (
            <CommandItem
              key={`${item}-${index}`} // Asegurarse de que la key sea única
              value={item}
              onSelect={(value) => handleSelect(value)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedItem === item ? "opacity-100" : "opacity-0"
                )}
              />
              {item}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  return (
    <div className="flex flex-col">
      {usingLabel ? (
        <Label htmlFor={type} className={"mb-2"}>{`${typeTranslated}`}</Label>
      ) : (
        ""
      )}
      {isLoading ? (
        <Skeleton className="w-[350px] h-[35px] rounded bg-gray-600 flex items-center pl-4 text-sm"></Skeleton>
      ) : isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`${getSizeClass()} justify-between dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300`}
            >
              <span className="text-muted-foreground dark:text-white">
                {buttonLabel}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-75" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={`${getSizeClass()} p-0`}>
            {content}
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={`${getSizeClass()} justify-between dark:bg-gray-700 dark:border-gray-600 dark:shadow-gray-800 dark:text-white dark:placeholder:text-gray-300`}
            >
              {buttonLabel}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-75" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">{content}</div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
