import {
  CreateEmployee,
  DeleteEmployee,
  Employee,
  EmployeeUpdate,
} from "../../types";

export interface EmployeeFilter {
  name?: string;
}

class CompanyApiService {
  baseURL: string;

  constructor(baseURL = "https://yhwpmw-3000.csb.app") {
    this.baseURL = baseURL;
  }

  async getEmployees({ name }: EmployeeFilter = {}) {
    try {
      const maybeFilter = name ? `?name=${name}` : "";
      const response = await fetch(
        `${this.baseURL}/api/employees${maybeFilter}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }

  async getEmployeeById(id: number | string) {
    try {
      const response = await fetch(`${this.baseURL}/api/employees/${id}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok for ID ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error);
      throw error;
    }
  }

  async updateEmployee(data: EmployeeUpdate) {
    const { id } = data;

    try {
      const response = await fetch(`${this.baseURL}/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok for ID ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating employee with ID ${id}:`, error);
      throw error;
    }
  }

  async createEmployee(data: CreateEmployee): Promise<Employee> {
    try {
      const response = await fetch(`${this.baseURL}/api/employees/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("response", response);

        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  }

  async deleteEmployee({ id }: DeleteEmployee) {
    try {
      const response = await fetch(`${this.baseURL}/api/employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok for ID ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new CompanyApiService(); // Adjust the base URL as necessary
