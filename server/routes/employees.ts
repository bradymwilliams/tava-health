import { Router } from "express";
import EmployeeService from "../controllers/employees";

const router = Router();

// GET all employees, grouped by department
router.get("/", EmployeeService.getAllEmployees);

// GET a single employee by ID
router.get("/:id", EmployeeService.getEmployeeById);

// UPDATE a single employee by ID
router.put("/:id", EmployeeService.updateEmployee);

// CREATE a single employee
router.post("/new", EmployeeService.createEmployee);

// DELETE a single employee by ID
router.delete("/:id", EmployeeService.deleteEmployee);

export default router;
