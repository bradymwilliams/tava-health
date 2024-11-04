import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import EmployeeService from "../employees";
import { prisma } from "../../db";
import { Employee } from "@prisma/client";

const MOCK_EMPLOYEE: Employee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  status: "active",
  department: "Engineering",
  dateStarted: new Date("2024-11-04T20:13:59.703Z"),
  quote: "I love coding",
  avatarUrl: "https://i.pravatar.cc/150",
  createdAt: new Date("2024-11-04T20:13:59.703Z"),
  updatedAt: new Date("2024-11-04T20:13:59.703Z"),
};

const MOCK_EMPLOYEES: Employee[] = [MOCK_EMPLOYEE];

// Mock prisma
vi.mock("../../db", () => ({
  prisma: {
    employee: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("EmployeeService", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  describe("getAllEmployees", () => {
    it("should return all employees when no name filter is provided", async () => {
      mockReq = { query: {} };
      vi.mocked(prisma.employee.findMany).mockResolvedValue(MOCK_EMPLOYEES);

      await EmployeeService.getAllEmployees(
        mockReq as Request,
        mockRes as Response
      );

      expect(prisma.employee.findMany).toHaveBeenCalledWith({ where: {} });
      expect(mockRes.json).toHaveBeenCalledWith(MOCK_EMPLOYEES);
    });

    it("should filter employees by name when provided", async () => {
      // const mockEmployees = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
      mockReq = { query: { name: "John" } };
      vi.mocked(prisma.employee.findMany).mockResolvedValue(MOCK_EMPLOYEES);

      await EmployeeService.getAllEmployees(
        mockReq as Request,
        mockRes as Response
      );

      expect(prisma.employee.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { firstName: { contains: "John" } },
            { lastName: { contains: "John" } },
          ],
        },
      });
    });
  });

  describe("getEmployeeById", () => {
    it("should return an employee when found", async () => {
      mockReq = { params: { id: "1" } };
      vi.mocked(prisma.employee.findUnique).mockResolvedValue(MOCK_EMPLOYEE);

      await EmployeeService.getEmployeeById(
        mockReq as Request,
        mockRes as Response
      );

      expect(prisma.employee.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockRes.json).toHaveBeenCalledWith(MOCK_EMPLOYEE);
    });

    it("should return 404 when employee is not found", async () => {
      mockReq = { params: { id: "999" } };
      vi.mocked(prisma.employee.findUnique).mockResolvedValue(null);

      await EmployeeService.getEmployeeById(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Employee not found",
      });
    });
  });

  describe("createEmployee", () => {
    it("should create a new employee successfully", async () => {
      vi.mocked(prisma.employee.create).mockResolvedValue(MOCK_EMPLOYEE);

      mockReq = { body: MOCK_EMPLOYEE };

      await EmployeeService.createEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(prisma.employee.create).toHaveBeenCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledWith(MOCK_EMPLOYEE);
    });
  });

  describe("updateEmployee", () => {
    it("should update an employee successfully", async () => {
      const mockUpdatedEmployee = {
        ...MOCK_EMPLOYEE,
        firstName: "John Updated",
      };
      mockReq = {
        params: { id: "1" },
        body: { id: 1, firstName: "John Updated" },
      };
      vi.mocked(prisma.employee.update).mockResolvedValue(mockUpdatedEmployee);

      await EmployeeService.updateEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(prisma.employee.update).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedEmployee);
    });
  });

  describe("deleteEmployee", () => {
    it("should delete an employee successfully", async () => {
      mockReq = { params: { id: "1" } };
      vi.mocked(prisma.employee.delete).mockResolvedValue(MOCK_EMPLOYEE);

      await EmployeeService.deleteEmployee(
        mockReq as Request,
        mockRes as Response
      );

      expect(prisma.employee.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee deleted",
      });
    });
  });
});
