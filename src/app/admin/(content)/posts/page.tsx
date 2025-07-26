import { Plus } from "lucide-react";
import Link from "next/link";
import PostList from "../../../../components/admin/PostList";
import { Button } from "../../../../components/ui/button";

const AdminPostPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Link>
        </Button>
      </div>

      <PostList />
    </div>
  );
};

export default AdminPostPage;
