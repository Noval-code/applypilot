"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { deleteApplication } from "@/lib/actions/applications";
import { Button } from "@/components/ui/button";

export function DeleteApplicationButton({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this application? This action cannot be undone.")) return;

    setDeleting(true);
    const result = await deleteApplication(id);

    if ("error" in result) {
      toast.error(result.error as string);
      setDeleting(false);
      return;
    }

    toast.success("Application deleted");
    router.push("/applications");
  }

  return (
    <Button variant="outline" onClick={handleDelete} disabled={deleting}>
      {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
      {deleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
