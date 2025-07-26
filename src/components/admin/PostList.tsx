"use client";

import { Eye, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../api/admin";
import { Badge } from "../ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const PostList = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-posts", page, submittedTerm],
    queryFn: () => adminApi.getPosts(page, submittedTerm),
  });

  const posts = data?.data;

  const muatateDelete = useMutation({
    mutationFn: async (id: number) => await adminApi.deletePost(id),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-posts", page] });
    },
  });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedTerm(searchTerm);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2" onSubmit={handleSearchSubmit}>
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <div>
                      Loading ....
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                posts?.data.map((post: any) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {post.excerpt?.substring(0, 60)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.user.name}</TableCell>
                    <TableCell>
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {post.status === "published" && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/posts/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{post.title}"?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => muatateDelete.mutate(post.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              <span className="px-2 text-sm text-muted-foreground">
                Page {posts?.current_page} of {posts?.last_page}
              </span>

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, posts?.last_page))
                  }
                  className={
                    page === posts?.last_page
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          {data?.data.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                {/* {searchTerm
                  ? "Try adjusting your search terms."
                  : "Get started by creating your first post."} */}
                Get started by creating your first post.
              </p>
              <Button asChild>
                <Link href="/admin/posts/create">Create Post</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PostList;
