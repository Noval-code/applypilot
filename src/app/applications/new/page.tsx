import { ApplicationForm } from "@/components/applications/application-form";
import { AppShell } from "@/components/layout/app-shell";

export default function NewApplicationPage() {
  return (
    <AppShell>
      <ApplicationForm redirectTo="/applications/[id]" />
    </AppShell>
  );
}
