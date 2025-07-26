import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PostDetails from "../../../components/post/PostDetails";
import { Button } from "../../../components/ui/button";

const PostDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <PostDetails slug={params.slug} />
      </main>
    </div>
  );
};

export default PostDetail;
