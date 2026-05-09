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
import { AdminUser } from "@/types";

interface UserDeleteDialogProps {
  deleteTarget: AdminUser | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function UserDeleteDialog({
  deleteTarget,
  onConfirm,
  onCancel,
  isDeleting = false,
}: UserDeleteDialogProps) {
  return (
    <AlertDialog
      open={Boolean(deleteTarget)}
      onOpenChange={(open) => !open && onCancel()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {deleteTarget?.email} and all related
            data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
