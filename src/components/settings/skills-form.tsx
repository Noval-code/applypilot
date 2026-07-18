"use client";

import { useState, useTransition } from "react";
import { Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSkills } from "@/lib/actions/settings";

export function SkillsForm({
  name,
  email,
  skills: initialSkills,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
  skills: string[];
}) {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function addSkill() {
    const s = input.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
    }
    setInput("");
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleSave() {
    startTransition(async () => {
      await updateSkills(skills);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="font-display text-lg font-bold text-ink">Profile & skills</CardTitle>
          <p className="mt-1 text-sm text-charcoal font-medium">
            Your skills are used to compute match scores against job descriptions.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input defaultValue={name ?? ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={email ?? ""} disabled />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Your skills</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. React, Go, PostgreSQL"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <Button type="button" variant="outline" onClick={addSkill}>
              Add
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-bone px-3 py-1 text-xs font-semibold text-ink"
                >
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} className="text-charcoal/50 hover:text-rose-600 transition-colors">
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Save />}
            Save skills
          </Button>
          {saved && (
            <span className="text-sm font-semibold text-emerald-700">Saved!</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
