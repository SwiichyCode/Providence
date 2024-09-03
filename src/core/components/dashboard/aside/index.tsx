import { AsideLayout } from "@/core/components/dashboard/aside/aside-layout";
import { AsideLogo } from "@/core/components/dashboard/aside/aside-logo";
import { AsideGlobalNavigation } from "@/core/components/dashboard/aside/aside-global-navigation";
import { AsideAuthNavigation } from "@/core/components/dashboard/aside/aside-auth-navigation";

export const Aside = () => {
  return (
    <AsideLayout>
      <AsideLogo />
      <AsideGlobalNavigation />
      <AsideAuthNavigation />
    </AsideLayout>
  );
};
