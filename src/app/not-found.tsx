import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-zinc-400">Page not found</p>
      <p className="mt-2 text-sm text-zinc-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-emerald-500 px-4 py-2 text-zinc-950 hover:bg-emerald-400"
      >
        Go home
      </Link>
    </div>
  );
}
