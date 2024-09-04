"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/core/components/ui/breadcrumb";
import { Fragment } from "react";

export const DashboardBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const breadcrumb = pathNames.map((path, index) => {
    const url = `/${pathNames.slice(0, index + 1).join("/")}`;
    return (
      <Fragment key={path}>
        <BreadcrumbItem>
          <BreadcrumbLink key={url} href={url}>
            {path}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {index < pathNames.length - 1 && <BreadcrumbSeparator />}
      </Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumb}</BreadcrumbList>
    </Breadcrumb>
  );
};
