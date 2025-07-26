"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const router = useRouter();

  const mutateSignIn = useMutation({
    mutationKey: ["login"],
    mutationFn: async () =>
      await login(credentials.email, credentials.password),
    onSuccess: (data) => {
      router.push("/admin");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateSignIn.mutate();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              email: e.target.value,
            })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
