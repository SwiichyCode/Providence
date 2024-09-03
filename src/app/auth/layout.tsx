import React, { type PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={"flex h-screen w-full items-center justify-center"}>
      {children}
    </div>
  );
};

export default AuthLayout;
