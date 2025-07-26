"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../api/admin";

const SummaryCard = ({ status, title }: { status: string, title: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts-count", status],
    queryFn: async () => adminApi.getPostsCount(status),
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.data}</div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
