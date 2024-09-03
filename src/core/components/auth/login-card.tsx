import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { LoginButton } from "@/core/components/auth/login-button";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const LoginCard = ({ session }: Props) => {
  return (
    <Card className={"max-w-sm"}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginButton session={session} />
      </CardContent>
    </Card>
  );
};