"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { postsApi } from "../../api/post";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";

const PostDetails = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => postsApi.getPost(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            {data?.data.title}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {data?.data.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{data?.data.user.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(data?.data.published_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: data?.data.content }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default PostDetails;
