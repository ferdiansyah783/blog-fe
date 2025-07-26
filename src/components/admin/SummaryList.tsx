"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { adminApi } from "../../api/admin";
import { Badge } from "../ui/badge";

const SummaryList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await adminApi.getPosts(),
  });

  return (
    <div className="space-y-4">
      {data?.data?.data.slice(0, 5).map((post: any) => (
        <div key={post.id} className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <Badge
            variant={post.status === "published" ? "default" : "secondary"}
          >
            {post.status}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default SummaryList;
