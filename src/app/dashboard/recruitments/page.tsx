import { db } from "@/config/server/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import Link from "next/link";

export default async function RecruitmentsPage() {
  const recruitments = await db.recruitment.findMany();

  return (
    <main className="p-12">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {recruitments.map((recruitment) => (
          <Link
            href={`/dashboard/recruitments/${recruitment.id}`}
            key={recruitment.id}
          >
            <Card>
              <CardHeader>
                <CardTitle>{recruitment.pseudo}</CardTitle>
                <CardDescription>
                  {recruitment.class} / {recruitment.discord}
                </CardDescription>
              </CardHeader>
              <CardContent>{recruitment.presentation}</CardContent>
            </Card>
          </Link>
        ))}
      </ul>
    </main>
  );
}
