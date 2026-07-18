import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <AppShell>
      <div className="mb-5">
        <h2 className="font-display text-2xl font-bold text-ink">Settings</h2>
        <p className="mt-1 text-sm text-charcoal font-medium">
          Profile, search preference, and notification defaults.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg font-bold text-ink">Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={session.user.name ?? "Portfolio User"} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={session.user.email ?? "you@example.com"} />
            </div>
            <div className="space-y-2">
              <Label>Target role</Label>
              <Input defaultValue="Full Stack Developer" />
            </div>
            <div className="space-y-2">
              <Label>Preferred location</Label>
              <Input defaultValue="Remote / Jakarta" />
            </div>
            <div className="sm:col-span-2">
              <Button>Save profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg font-bold text-ink">Defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between rounded-md border border-hairline p-3 text-sm hover:bg-surface-bone/35 transition-colors duration-100 cursor-pointer">
              <span className="font-semibold text-ink">Follow-up reminder</span>
              <input type="checkbox" defaultChecked className="size-4 accent-primary" />
            </label>
            <label className="flex items-center justify-between rounded-md border border-hairline p-3 text-sm hover:bg-surface-bone/35 transition-colors duration-100 cursor-pointer">
              <span className="font-semibold text-ink">Interview reminder</span>
              <input type="checkbox" defaultChecked className="size-4 accent-primary" />
            </label>
            <label className="flex items-center justify-between rounded-md border border-hairline p-3 text-sm hover:bg-surface-bone/35 transition-colors duration-100 cursor-pointer">
              <span className="font-semibold text-ink">Offer checklist</span>
              <input type="checkbox" className="size-4 accent-primary" />
            </label>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
