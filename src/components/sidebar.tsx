import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Employees",
    url: "/employees",
  },
  {
    title: "Payroll",
    url: "/payroll",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="dark:bg-foreground  p-2 border rounded-lg">
          <img src={logo} alt="logo" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        !isActive &&
                          "bg-sidebar-background text-sidebar-foreground hover:text-white",
                        "w-full justify-start"
                      )
                    }
                  >
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
