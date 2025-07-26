import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PostForm from "../../../../../components/admin/PostForm";
import { Button } from "../../../../../components/ui/button";

const AdminPostCreatePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>

      <PostForm />
    </div>
  );
};

export default AdminPostCreatePage;
