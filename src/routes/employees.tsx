import EmployeeTable from "@/components/employee-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployeesData } from "@/hooks/use-employee-data";
import { Select } from "@radix-ui/react-select";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Employees() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, isLoading } = useEmployeesData();

  if (!data)
    return (
      <div>
        <PageBreadcrumbs title="Employees" />
        <div>No data</div>
      </div>
    );

  function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    setGlobalFilter(e.target.value);
  }

  return (
    <div className="pb-4">
      <PageBreadcrumbs title="Employees" />

      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Filter names..."
            value={globalFilter}
            onChange={handleUpdate}
          />
          <Select
            value={
              (columnFilters.find((filter) => filter.id === "status")
                ?.value as string) ?? ""
            }
            onValueChange={(value) =>
              setColumnFilters(value === "all" ? [] : [{ id: "status", value }])
            }
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {/* reset status filter */}
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link to="/employees/new">New Employee</Link>
          </Button>
        </div>
        {isLoading ? (
          "Loading..."
        ) : (
          <EmployeeTable
            data={data}
            globalFilter={globalFilter}
            columnFilters={columnFilters}
          />
        )}
      </div>
    </div>
  );
}
