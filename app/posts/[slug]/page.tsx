import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-bold text-3xl">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
