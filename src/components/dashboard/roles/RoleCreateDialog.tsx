"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface RoleCreateDialogProps {
  isOpen: boolean;
  isSaving: boolean;
  name: string;
  description: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onCreate: () => void;
  onCancel: () => void;
}

export function RoleCreateDialog({
  isOpen,
  isSaving,
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onCreate,
  onCancel,
}: RoleCreateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent
        showCloseButton={false}
        className="border border-zinc-700/50 bg-linear-to-b from-zinc-900 to-zinc-950 shadow-xl"
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-white">
            Create New Role
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Add a new role to the system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-6">
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-white">
              Role Name
            </label>
            <Input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g., QA_MANAGER"
              disabled={isSaving}
              className="h-11 rounded-lg border border-zinc-600 bg-zinc-950/80 text-white placeholder-zinc-500 shadow-sm transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-white">
              Description (Optional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="e.g., Quality assurance and approval role"
              disabled={isSaving}
              className="min-h-24 rounded-lg border border-zinc-600 bg-zinc-950/80 text-white placeholder-zinc-500 shadow-sm transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
            className="border-zinc-600 hover:border-zinc-500 hover:bg-zinc-900"
          >
            Cancel
          </Button>
          <Button
            onClick={onCreate}
            disabled={isSaving || !name.trim()}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSaving ? "Creating..." : "Create Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
