import "./App.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/sidebar";
import { ThemeProvider } from "./hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-800">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 container">
              <Outlet />
            </main>
            <Toaster />
          </SidebarProvider>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
