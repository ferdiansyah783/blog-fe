"use client";

import { FileText, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const navbars = [
  {
    title: "View Site",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "All Posts",
    href: "/admin/posts",
    icon: FileText,
  },
];

const AdminNav = () => {
  const pathName = usePathname();

  return (
    <nav className="space-y-2">
      {navbars.map((item, index) => (
        <Button
          key={index}
          variant={
            pathName === item.href ||
            (item.href === "/admin/posts" && pathName.includes("/admin/posts/"))
              ? "default"
              : "ghost"
          }
          className="w-full justify-start"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default AdminNav;
