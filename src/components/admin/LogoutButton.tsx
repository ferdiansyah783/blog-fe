"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "../AuthContext";
import { useMutation } from "@tanstack/react-query";

const LogoutButton = () => {
  const { logout, user } = useAuth();

  const mutateLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await logout(),
  });

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
      <Button onClick={() => mutateLogout.mutate()} variant="outline" size="sm">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
