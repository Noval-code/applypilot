"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { statuses, type ApplicationPriority } from "@/lib/application-data";

const priorities: ApplicationPriority[] = ["LOW", "MEDIUM", "HIGH"];

export function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (search) {
        next.set("q", search);
      } else {
        next.delete("q");
      }
      router.push(`/applications?${next.toString()}`);
    }, 400);
    return () => clearTimeout(timer.current);
  }, [search]);

  const status = params.get("status") ?? "";
  const priority = params.get("priority") ?? "";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    router.push(`/applications?${next.toString()}`);
  }

  return (
    <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_180px_180px_160px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-charcoal/50" />
        <Input
          className="pl-10"
          placeholder="Search company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <FilterSelect value={status} onChange={(v) => setParam("status", v)}>
        <option value="">All statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect value={priority} onChange={(v) => setParam("priority", v)}>
        <option value="">All priorities</option>
        {priorities.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect value={params.get("sort") ?? ""} onChange={(v) => setParam("sort", v)}>
        <option value="">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="company">Company A-Z</option>
        <option value="deadlineAt">Deadline</option>
      </FilterSelect>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 rounded-md border border-hairline bg-surface-card px-3 text-sm text-ink outline-none transition-colors focus:border-hairline-strong focus:ring-2 focus:ring-ring/20 cursor-pointer"
    >
      {children}
    </select>
  );
}
