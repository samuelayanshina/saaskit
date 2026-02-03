// lib/guards.ts
import {NextRequest} from "next/server";
import {requireUser} from "@/lib/serverAuth";
import {assertRole, assertPermission} from "@/lib/rbac";
import {Role, Permission} from "@prisma/client";

export async function requireRole(
  req: NextRequest,
  role: Role
) {
  const user = await requireUser(req);
  assertRole(user.role, role);
  return user;
}

export async function requirePermission(
  req: NextRequest,
  permission: Permission
) {
  const user = await requireUser(req);
  assertPermission(user.role, permission);
  return user;
}
