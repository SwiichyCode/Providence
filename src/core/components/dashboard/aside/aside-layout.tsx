import React, { type PropsWithChildren } from "react";

export const AsideLayout = ({ children }: PropsWithChildren) => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      {children}
    </aside>
  );
};
