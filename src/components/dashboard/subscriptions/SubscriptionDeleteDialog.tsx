"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SubscriptionResponse } from "@/services/subscription.service";

interface SubscriptionDeleteDialogProps {
  deleteTarget: SubscriptionResponse | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubscriptionDeleteDialog({
  deleteTarget,
  onConfirm,
  onCancel,
}: SubscriptionDeleteDialogProps) {
  return (
    <AlertDialog
      open={Boolean(deleteTarget)}
      onOpenChange={(open) => !open && onCancel()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate Subscription</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the subscription for {deleteTarget?.user.email}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Deactivate</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
