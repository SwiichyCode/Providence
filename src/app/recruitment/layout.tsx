import type { PropsWithChildren } from "react";

export default function RecruitmentLayout({ children }: PropsWithChildren) {
  return <div className={"p-12"}>{children}</div>;
}
