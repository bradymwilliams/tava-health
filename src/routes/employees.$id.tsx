import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import {
  useDeleteEmployee,
  useEmployee,
  useUpdateEmployee,
} from "@/hooks/use-employee-data";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Employee, updateEmployeeZ } from "../../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

export default function EmployeeProfile() {
  const { id } = useParams() as { id: string };

  const { data: employee, isLoading } = useEmployee(id);

  return (
    <div>
      {isLoading && <PageBreadcrumbs title={`User Profile`} />}
      {!isLoading && employee && (
        <>
          <PageBreadcrumbs
            title={`${employee?.firstName} ${employee?.lastName} Profile`}
          />
          <ProfileForm employee={employee} />
        </>
      )}
    </div>
  );
}

export function ProfileForm({ employee }: { employee: Employee }) {
  const navigate = useNavigate();
  const { mutate, isSuccess, isError } = useUpdateEmployee();
  const { mutate: deleteEmployee, isSuccess: isDeleteSuccess } =
    useDeleteEmployee();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateEmployeeZ>>({
    resolver: zodResolver(updateEmployeeZ),
    defaultValues: employee
      ? {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          department: employee.department as
            | "Management"
            | "Engineering"
            | "Operations"
            | "Food Services",
          status: employee.status,
          dateStarted: employee.dateStarted as unknown as string,
          quote: employee.quote,
          avatarUrl: employee.avatarUrl,
        }
      : {},
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            mutate(values, {
              onSuccess: () => {
                toast({
                  title: "Success!",
                  duration: 2000,
                  description: "Employee has been updated",
                });
              },
              onError: () => {
                toast({
                  title: "Error",
                  duration: 2000,
                  description: "Failed to update employee",
                });
              },
            });
          })}
          className="space-y-4 max-w-md p-4 bg-background rounded shadow"
        >
          <input type="hidden" value={employee.id} {...form.register("id")} />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Food Services">Food Services</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://i.pravatar.cc/150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quote</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your quote" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button type="submit">Submit</Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2">
                <p>Are you sure you want to delete this employee?</p>
                <div className="flex gap-2 justify-end">
                  <PopoverClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </PopoverClose>
                  <Button
                    onClick={() => {
                      deleteEmployee({ id: employee.id });

                      toast({
                        title: "Success!",
                        duration: 2000,
                        description: "Employee has been deleted",
                      });
                      navigate("/employees");
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </Form>
    </>
  );
}
