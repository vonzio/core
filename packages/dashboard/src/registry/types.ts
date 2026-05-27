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

/** Slot rendered in the composer's meta line, alongside the ModelPicker.
 *  Designed for per-message / per-workspace choices: the picker can
 *  manage its own state but should treat `workspaceId === null` as
 *  "new chat, not yet created — stash the choice and apply after
 *  workspace creation". `profileId === null` means no profile is
 *  active yet either (extension should skip rendering or stay inert). */
export interface ComposerSlotProps {
  /** Active workspace session id, or null when the user is composing
   *  a new chat that hasn't been persisted yet. */
  workspaceId: string | null;
  /** Active profile id; null when no profile has been picked yet. */
  profileId: string | null;
}

export interface ComposerSlotReg {
  id: string;
  component: ComponentType<ComposerSlotProps>;
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
  onClick?: () => void;
  danger?: boolean;
  entitlement?: Entitlement;
  order?: number;
}
