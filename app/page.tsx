import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-bold text-3xl">Welcome to my blog</h1>
      <Link href="/posts" className="font-semibold text-blue-500 hover:text-blue-300">View Posts</Link>
    </main>
  );
}
