import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CompanyApiService, { EmployeeFilter } from "../lib/company-api";
import {
  CreateEmployee,
  DeleteEmployee,
  Employee,
  EmployeeUpdate,
} from "../../types";

export const useEmployeesData = ({ name }: EmployeeFilter = {}) => {
  return useQuery<Employee[]>({
    queryKey: ["employees", name],
    queryFn: () => CompanyApiService.getEmployees({ name }),
  });
};

export const useEmployee = (id: string) => {
  return useQuery<Employee>({
    queryKey: ["employee", id],
    queryFn: () => CompanyApiService.getEmployeeById(id),
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: EmployeeUpdate) => {
      return CompanyApiService.updateEmployee(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: (values: CreateEmployee) => {
      return CompanyApiService.createEmployee(values);
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteEmployee) =>
      CompanyApiService.deleteEmployee({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
