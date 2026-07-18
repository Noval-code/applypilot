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
import { registerUser } from "@/lib/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const raw = Object.fromEntries(formData.entries());
      const result = await registerUser(raw);

      if ("error" in result) {
        return { error: result.error };
      }

      await signIn("credentials", {
        email: raw.email as string,
        password: raw.password as string,
        redirect: false,
      });

      router.push("/");
      router.refresh();
      return { error: null };
    },
    { error: null } as Record<string, unknown>,
  );

  const err = (state as any).error;
  const errorMessage = err
    ? typeof err === "string"
      ? err
      : Object.values(err).flat().join(", ")
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas p-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-primary text-white">
            <BriefcaseBusiness className="size-5" />
          </div>
          <CardTitle className="font-display text-2xl font-bold text-ink">Create ApplyPilot account</CardTitle>
          <p className="text-sm text-charcoal font-medium">
            Save applications, deadlines, notes, and pipeline movement.
          </p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input name="name" placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="Minimum 8 characters" required minLength={8} />
            </div>
            {errorMessage && (
              <p className="text-sm font-medium text-rose-600">{errorMessage}</p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              {pending ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-charcoal">
            Already registered?{" "}
            <Link className="font-semibold text-primary hover:text-primary/80 transition-colors" href="/login">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
