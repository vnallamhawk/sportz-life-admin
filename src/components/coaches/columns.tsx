import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/utils/api";

export type Coach = {
  id: number;
  name: string;
  age: number;
  designation: string;
  sports: string;
  gender: string;
  batches: string;
  contact: string;
  avatar: string;
};

export const columns: ColumnDef<Coach>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const coach = row.original;

      const getInitials = (fullName: string) => {
        const allNames = fullName.trim().split(" ");
        const initials = allNames.reduce((acc, curr, index) => {
          if (index === 0 || index === allNames.length - 1) {
            acc = `${acc}${curr.charAt(0).toUpperCase()}`;
          }
          return acc;
        }, "");
        return initials;
      };

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={coach.avatar} />
            <AvatarFallback>{getInitials(coach.name)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{coach.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "sports",
    header: "Sports Coaching",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "batches",
    header: "Batches",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const coach = row.original;
      const utils = api.useContext();

      const {
        // data,
        mutate,
        // isLoading: isLoading,
      } = api.coach.deleteCoach.useMutation({
        onSettled: async () => {
          await utils.coach.invalidate();
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                mutate({ id: coach.id });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
