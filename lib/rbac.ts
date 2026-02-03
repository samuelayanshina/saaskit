// lib/rbac.ts
import {Role, Permission} from "@prisma/client";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  OWNER: ["READ", "WRITE", "BILLING", "ADMIN"],
  ADMIN: ["READ", "WRITE", "BILLING"],
  MEMBER: ["READ"],
};

export function hasPermission(role: Role, permission: Permission) {
  return ROLE_PERMISSIONS[role]?.includes(permission);
}

export function assertRole(userRole: Role, required: Role) {
  if (userRole !== required) {
    throw new Error("Forbidden");
  }
}

export function assertPermission(userRole: Role, permission: Permission) {
  if (!hasPermission(userRole, permission)) {
    throw new Error("Forbidden");
  }
}
