import React from "react";
import AdminNav from "../../../components/admin/AdminNav";
import LogoutButton from "../../../components/admin/LogoutButton";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { Separator } from "../../../components/ui/separator";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <LogoutButton />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <aside className="w-64">
              <AdminNav />
            </aside>

            <Separator orientation="vertical" className="h-auto" />

            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
