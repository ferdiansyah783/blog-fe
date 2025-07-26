"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Link from "next/link";
import { postsApi } from "../../api/post";

const PostList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postsApi.getPosts(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.data.map((post: any) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span>By {post.user.name}</span>
                  <span>
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {data?.data?.data.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
          <p className="text-muted-foreground">
            Check back later for new content!
          </p>
        </div>
      )}
    </>
  );
};

export default PostList;
