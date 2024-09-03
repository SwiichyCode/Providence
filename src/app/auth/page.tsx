import { LoginCard } from "@/core/components/auth/login-card";
import { getServerAuthSession } from "@/config/server/auth";

export default async function AuthPage() {
  const session = await getServerAuthSession();

  return <LoginCard session={session} />;
}
