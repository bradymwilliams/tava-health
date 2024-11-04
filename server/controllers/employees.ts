import { prisma } from "../db"; // Adjust the import path as necessary
import { Request, Response } from "express";
import { createEmployeeZ, updateEmployeeZ } from "../../types";

class EmployeeService {
  async getAllEmployees(req: Request, res: Response): Promise<void> {
    const { name } = req.query as { name?: string };

    try {
      const employees = await prisma.employee.findMany({
        where: name
          ? {
              OR: [
                { firstName: { contains: name } },
                { lastName: { contains: name } },
              ],
            }
          : {},
      });

      res.json(employees);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // Get an employee by ID
  async getEmployeeById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const employee = await prisma.employee.findUnique({
        where: { id },
      });
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateEmployee(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const employeeData = req.body;

    try {
      const parsedEmployeeData = updateEmployeeZ.parse(employeeData);
      const updatedEmployee = await prisma.employee.update({
        where: { id: parseInt(id) },
        data: parsedEmployeeData,
      });
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: "Failed to update employee", error });
    }
  }

  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employeeData = req.body;
      employeeData.dateStarted = new Date(employeeData.dateStarted);
      const parsedEmployeeData = createEmployeeZ.parse(employeeData);
      const createdEmployee = await prisma.employee.create({
        data: {
          ...parsedEmployeeData,
        },
      });

      res.json(createdEmployee);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Failed to create employee", error });
    }
  }

  async deleteEmployee(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await prisma.employee.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Employee deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete employee", error });
    }
  }
}

export default new EmployeeService();
