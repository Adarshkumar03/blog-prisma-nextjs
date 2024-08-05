import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostsPage() {
  const user = await prisma.user.findUnique({
    where: {
      email: "john@email.com",
    },
    include: {
      posts: true,
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-bold text-3xl">All Posts({user?.posts.length})</h1>
      <ul>
        {user?.posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.slug}`}
              className="text-xl text-blue-500 hover:text-blue-300"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <form
        action={createPost}
        className="flex flex-col gap-y-2 w-[300px] mt-2"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          name="content"
          placeholder="Content"
          className="px-2 py-1 rounded-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
