"use client";

import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Editor from "react-simple-wysiwyg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adminApi } from "../../api/admin";
import { toast } from "sonner";

const PostForm = ({ postId }: { postId?: number }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    status: "draft" as "draft" | "published",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => await adminApi.getPost(postId!),
    enabled: !!postId,
  });

  useEffect(() => {
    if (data) {
      setFormData(data.data);
    }
  }, [data]);

  const mutateCreatePost = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async () => await adminApi.createPost(formData),
    onSuccess: (data) => {
      toast.success("Post created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    }
  });

  const mutateUpdatePost = useMutation({
    mutationKey: ["update-post"],
    mutationFn: async () => await adminApi.updatePost(postId!, formData),
    onSuccess: (data) => {
      toast.success("Post updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postId) {
      mutateUpdatePost.mutate();
    } else {
      mutateCreatePost.mutate();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excerpt: e.target.value,
                    })
                  }
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Content</Label>
                <Editor
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            {postId ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
