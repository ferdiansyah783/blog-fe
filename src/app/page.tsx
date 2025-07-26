import Link from "next/link";
import PostList from "../components/post/PostList";
import { Button } from "../components/ui/button";

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Blog</h1>
            <Button asChild>
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PostList />
      </main>
    </div>
  );
};

export default page;
