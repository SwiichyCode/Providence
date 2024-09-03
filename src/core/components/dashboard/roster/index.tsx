import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { RosterForm } from "@/core/components/dashboard/roster/roster-form";

export const Roster = () => {
  return (
    <main className="grid flex-1 gap-4 overflow-auto p-12 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add member</CardTitle>
          <CardDescription>Complete the different fields</CardDescription>
          <CardContent className={"p-0"}>
            <RosterForm />
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
};
