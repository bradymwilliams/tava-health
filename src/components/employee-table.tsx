import { useMemo } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "../../types";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => (
      <Link
        to={`/employees/${row.original.id}`}
        className="flex items-center gap-2"
      >
        <Avatar>
          <AvatarImage src={row.original.avatarUrl} />
          <AvatarFallback className="font-bold text-xs">
            {`${row.original.firstName.charAt(0)}${row.original.lastName.charAt(
              0
            )}`}
          </AvatarFallback>
        </Avatar>
        {`${row.original.firstName} ${row.original.lastName}`}
      </Link>
    ),
  },
  {
    accessorKey: "dateStarted",
    header: "Date Started",
    cell: ({ row }) => {
      const date = new Date(row.original.dateStarted);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      const day = date.getDate();
      const suffix =
        day % 10 === 1 && day !== 11
          ? "st"
          : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
      return `${formattedDate.replace(/\d+/, day + suffix)}`;
    },
  },
  {
    accessorKey: "quote",
    header: "Quote",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const text =
        row.original.status.charAt(0).toUpperCase() +
        row.original.status.slice(1);

      const variant = row.original.status === "active" ? "success" : "inactive";
      return <Badge variant={variant}>{text}</Badge>;
    },
  },
];

function DepartmentTable({
  department,
  employees,
  columns,
  columnFilters,
}: {
  department: string;
  employees: Employee[];
  columns: ColumnDef<Employee>[];
  columnFilters: ColumnFiltersState;
}) {
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="space-y-2">
      <div className="rounded-md border shadow bg-background p-4">
        <h2 className="text-xl font-bold">{department}</h2>
        <Table className="mt-4">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function EmployeeTable({
  data,
  globalFilter,
  columnFilters,
}: {
  data: Employee[];
  globalFilter: string;
  columnFilters: ColumnFiltersState;
}) {
  // get unique departments
  const departments = [
    ...new Set(data?.map((employee) => employee.department)),
  ];

  // Default filter object to enable blank states
  const filterObject = departments.reduce((acc, department) => {
    acc[department] = [];
    return acc;
  }, {} as Record<string, Employee[]>);

  // memoize filtered data because it can be expensive to filter
  const filteredData = useMemo(() => {
    const statusFilter = columnFilters.find(
      (filter) => filter.id === "status"
    )?.value;
    return data.filter((employee) => {
      const matchesName = (
        employee.firstName.toLowerCase() +
        " " +
        employee.lastName.toLowerCase()
      ).includes(globalFilter.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        statusFilter === undefined ||
        employee.status === statusFilter;

      return matchesName && matchesStatus;
    });
  }, [data, globalFilter, columnFilters]);

  const groupedData = useMemo(() => {
    return filteredData.reduce((acc, employee) => {
      if (!acc[employee.department]) {
        acc[employee.department] = [];
      }
      acc[employee.department].push(employee);
      return acc;
    }, filterObject);
  }, [filteredData, filterObject]);

  return (
    <div className="space-y-4">
      {Object.entries(groupedData).map(([department, employees]) => (
        <DepartmentTable
          key={department}
          department={department}
          employees={employees}
          columns={columns}
          columnFilters={columnFilters}
        />
      ))}
    </div>
  );
}
