"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"


export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string[]
  class: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: () => <div className="text-left p-2">Nombre</div>,
    cell: ({ row }) => {
      const firstName: string = (row.getValue("first_name"))

      return <div className="text-left font-medium p-2">{firstName}</div>
    },
  },
  {
    accessorKey: "last_name",
    header: () => <div className="text-left p-2">Apellidos</div>,
    cell: ({ row }) => {
      const lastName: string = (row.getValue("last_name"))

      return <div className="text-left font-medium p-2">{lastName}</div>
    },
  },
  {
    accessorKey: "class",
    header: () => <div className="text-left p-2">Clase</div>,
    cell: ({ row }) => {
      const course: string = (row.getValue("class"))

      return <div className="text-left font-medium p-2">{course}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
          <div className={"text-right"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
      )
    },
  },
]

