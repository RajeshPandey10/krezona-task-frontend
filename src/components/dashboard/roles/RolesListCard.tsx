"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoleRecord } from "@/types";
import { Shield, Edit2, Trash2 } from "lucide-react";
import { getRoleColor, formatDate } from "./role-utils";

interface RolesListCardProps {
  roles: RoleRecord[];
  onEdit: (role: RoleRecord) => void;
  onDelete: (role: RoleRecord) => void;
}

export function RolesListCard({ roles, onEdit, onDelete }: RolesListCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20">
      <CardHeader className="border-b border-zinc-800/80">
        <CardTitle className="flex items-center gap-2 text-zinc-100">
          <Shield className="h-5 w-5 text-emerald-400" />
          Roles ({roles.length})
        </CardTitle>
        <CardDescription className="text-zinc-400">
          View and manage all roles
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {roles.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-zinc-400">No roles found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 hover:border-zinc-700"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {role.name}
                      </span>
                      {role.description && (
                        <span className="text-xs text-zinc-500">
                          {role.description}
                        </span>
                      )}
                    </div>
                    <Badge
                      className={`border ${getRoleColor(role.name)}`}
                      variant="outline"
                    >
                      {role.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-500">ID: {role.id}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(role)}
                    className="h-9 border-blue-500/20 bg-blue-500/10 text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/20 hover:text-white"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(role)}
                    className="h-9 border-red-500/20 bg-red-500/10 text-red-300 hover:border-red-500/30 hover:bg-red-500/20 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
