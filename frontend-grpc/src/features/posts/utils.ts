import { UserAuthenticationData } from "@/features/auth/types";

// Permission utility functions for posts
export function canEdit(
  userAuthenticationData: UserAuthenticationData | null,
): boolean {
  return !!userAuthenticationData;
}

export function canCreate(
  userAuthenticationData: UserAuthenticationData | null,
): boolean {
  return !!userAuthenticationData;
}

export function canDelete(
  userAuthenticationData: UserAuthenticationData | null,
): boolean {
  return !!userAuthenticationData;
}
