import type { ComponentType, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type Entitlement = string;

export type RouteLayout = "shell" | "bare";

export interface RouteReg {
  id: string;
  path: string;
  element: ReactNode;
  layout?: RouteLayout;
  entitlement?: Entitlement;
  order?: number;
}

export type NavSection = "primary" | "admin" | "footer";

export interface NavItemReg {
  id: string;
  section: NavSection;
  label: string;
  to: string;
  icon: LucideIcon;
  match?: (pathname: string) => boolean;
  entitlement?: Entitlement;
  order?: number;
}

export interface SettingsSectionReg {
  id: string;
  label: string;
  lede?: string;
  component: ComponentType;
  entitlement?: Entitlement;
  order?: number;
}

export type TopbarSlotPlacement = "left" | "right" | "actions";

export interface TopbarSlotReg {
  id: string;
  placement: TopbarSlotPlacement;
  component: ComponentType;
  entitlement?: Entitlement;
  order?: number;
}

/** Slot rendered inside the workspace chat header, between the status
 *  pill and the action buttons. Receives the active workspace so the
 *  injected control can render in context (e.g. a VPN tunnel picker
 *  scoped to that session). Multiple slots are sorted by `order`. */
export interface WorkspaceHeaderSlotProps {
  workspace: {
    session_id: string;
    profile_id: string;
    /** Currently attached tunnel, if any. */
    attached_tunnel?: { id: string; name: string } | null;
  };
}

export interface WorkspaceHeaderSlotReg {
  id: string;
  component: ComponentType<WorkspaceHeaderSlotProps>;
  entitlement?: Entitlement;
  order?: number;
}

export interface OnboardingStepProps {
  onNext: () => void;
  onSkip?: () => void;
}

export interface OnboardingStepReg {
  id: string;
  component: ComponentType<OnboardingStepProps>;
  predicate?: () => boolean;
  order?: number;
}

export interface UserMenuItemReg {
  id: string;
  label: ReactNode;
  /** Optional Lucide icon shown to the left of the label. */
  icon?: LucideIcon;
  /** Navigate to this path on click (uses react-router-dom). Mutually
   *  exclusive with `onClick` — `to` wins if both are set. */
  to?: string;
  /** Programmatic action on click. Use this when navigation alone
   *  isn't enough (e.g. opening a modal). */
  onClick?: () => void;
  danger?: boolean;
  entitlement?: Entitlement;
  /** Lower = higher in the menu. Hardcoded items get implicit orders
   *  (Settings=10, Operations=20, Agents=30) so extensions can slot
   *  between them by picking the appropriate number. */
  order?: number;
}
