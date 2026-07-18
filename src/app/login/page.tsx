"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validations";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const raw = Object.fromEntries(formData.entries());
      const parsed = loginSchema.safeParse(raw);
      if (!parsed.success) {
        return { error: "Invalid email or password format" };
      }

      const result = await signIn("credentials", {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: false,
      });

      if (result?.error) {
        return { error: "Invalid email or password" };
      }

      router.push("/");
      router.refresh();
      return { error: null };
    },
    { error: null as string | null },
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas p-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-primary text-white">
            <BriefcaseBusiness className="size-5" />
          </div>
          <CardTitle className="font-display text-2xl font-bold text-ink">Sign in to ApplyPilot</CardTitle>
          <p className="text-sm text-charcoal font-medium">
            Your application pipeline and reminder workspace.
          </p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="********" required />
            </div>
            {state.error && (
              <p className="text-sm font-medium text-rose-600">{state.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-charcoal">
            New here?{" "}
            <Link className="font-semibold text-primary hover:text-primary/80 transition-colors" href="/register">
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
