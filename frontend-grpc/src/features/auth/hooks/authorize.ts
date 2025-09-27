import { UserAuthenticationData } from "..";

export function useCanEdit(
  userAuthenticationData: UserAuthenticationData | null,
): boolean {
  return !!userAuthenticationData;
}

export function useCanCreate(
  userAuthenticationData: UserAuthenticationData | null,
): boolean {
  return !!userAuthenticationData;
}

export function useCanDelete(
  userAuthenticationData: UserAuthenticationData | null,
): boolean {
  return !!userAuthenticationData;
}
