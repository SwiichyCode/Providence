import Link from "next/link";
import { getServerAuthSession } from "@/config/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center pl-[32px]">
      <h1 className="text-4xl font-bold">Hello, World!</h1>

      {session ? (
        <Link href={"/dashboard"} className="text-blue-500">
          Go to Dashboard
        </Link>
      ) : (
        <Link href={"/auth"} className="text-blue-500">
          Go to Auth
        </Link>
      )}
    </div>
  );
}
