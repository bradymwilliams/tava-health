import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employees from "./routes/employees.tsx";
import EmployeeDetails from "./routes/employees.$id.tsx";
import Payroll from "./routes/payroll.tsx";
import NewEmployee from "./routes/employees.new.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/employees/:id",
        element: <EmployeeDetails />,
      },
      {
        path: "/payroll",
        element: <Payroll />,
      },
      {
        path: "/employees/new",
        element: <NewEmployee />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
