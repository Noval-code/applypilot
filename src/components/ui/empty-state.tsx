import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon = BriefcaseBusiness,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-hairline bg-surface-card px-6 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-surface-bone">
        <Icon className="size-8 text-charcoal/45" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-charcoal font-medium">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
