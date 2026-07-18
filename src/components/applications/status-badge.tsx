import { Badge } from "@/components/ui/badge";
import { type ApplicationStatus, statusConfig } from "@/lib/application-data";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={cn("border", config.className)}>
      <Icon className="size-3.5" />
      {config.label}
    </Badge>
  );
}
