'use client'

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PostForm from "../../../../../../components/admin/PostForm";
import { Button } from "../../../../../../components/ui/button";
import { useParams } from "next/navigation";

const AdminEditPostPage = () => {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Post</h1>
      </div>

      <PostForm postId={Number(id)} />
    </div>
  );
};

export default AdminEditPostPage;
