import { Employee as PrismaEmployee } from "@prisma/client";
import { z } from "zod";

export interface Employee {
  id: PrismaEmployee["id"];
  firstName: PrismaEmployee["firstName"];
  lastName: PrismaEmployee["lastName"];
  department:
    | "Management"
    | "Engineering"
    | "Operations"
    | "Food Services"
    | string;
  dateStarted: PrismaEmployee["dateStarted"] | string;
  quote: PrismaEmployee["quote"];
  status: "active" | "inactive";
  avatarUrl: PrismaEmployee["avatarUrl"];
}

// Zod Schema for creating an employee
export const createEmployeeZ = z.object({
  firstName: z.string(),
  lastName: z.string(),
  department: z.enum([
    "Management",
    "Engineering",
    "Operations",
    "Food Services",
  ]),
  status: z.enum(["active", "inactive"]),
  dateStarted: z.date(),
  quote: z.string(),
  avatarUrl: z.string().url({ message: "Invalid URL format" }),
});

export type CreateEmployee = z.infer<typeof createEmployeeZ>;

// Zod Schema for updating an employee
export const updateEmployeeZ = z.object({
  id: z.number(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  department: z
    .enum(["Management", "Engineering", "Operations", "Food Services"])
    .optional(),
  status: z.enum(["active", "inactive"]).optional(),
  dateStarted: z.string().optional(),
  quote: z.string().optional(),
  avatarUrl: z.string().url({ message: "Invalid URL format" }).optional(),
});

// Type for updating an employee
export type EmployeeUpdate = Partial<Employee> & { id: Employee["id"] };
export type DeleteEmployee = { id: Employee["id"] };
