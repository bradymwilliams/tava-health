import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export function PageBreadcrumbs({ title }: { title: string }) {
  return (
    <>
      <Breadcrumb className="mt-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <SidebarTrigger />
          </BreadcrumbItem>
          <Separator orientation="vertical" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-2xl font-bold">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-2" />
    </>
  );
}
