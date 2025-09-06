// ========================
// User & Teams
// ========================
export interface User {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  name: string;
  avatar_url: string;
  updated_at: Date;
}

export interface Team {
  id: string;
  name: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export type TeamRole = "owner" | "admin" | "member" | "pending";

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: TeamRole;
  joined_at: Date;
}

// ========================
// Folders & Boards
// ========================
export interface Folder {
  id: string;
  team_id: string;
  parent_id?: string | null;
  name: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface Board {
  id: string;
  folder_id?: string | null;
  team_id: string;
  name: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export type BoardRole = "editor" | "viewer";

export interface BoardMember {
  id: string;
  board_id: string;
  user_id: string;
  role: BoardRole;
  joined_at: Date;
}

// ========================
// Board Elements & History
// ========================
export type BoardElementType = "shape" | "text" | "image" | "line";

export interface BoardElement {
  id: string;
  board_id: string;
  type: BoardElementType;
  properties: Record<string, any>;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export type BoardActionType = "create" | "update" | "delete";

export interface BoardHistory {
  id: string;
  board_id: string;
  element_id: string;
  action_type: BoardActionType;
  action_data: Record<string, any>;
  performed_by: string;
  performed_at: Date;
}

// ========================
// Chat & Voice
// ========================
export interface ChatMessage {
  id: string;
  board_id: string;
  sender_id: string;
  message: string;
  created_at: Date;
}

export interface VoiceChannel {
  id: string;
  board_id: string;
  is_active: boolean;
  created_at: Date;
}

export interface VoiceParticipant {
  id: string;
  channel_id: string;
  user_id: string;
  joined_at: Date;
  left_at: Date;
}

// ========================
// Notifications
// ========================
export type NotificationType =
  | "team_invite"
  | "board_invite"
  | "mention"
  | "comment"
  | "system";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  content: string;
  link_id: string;
  is_read: boolean;
  created_at: Date;
}

// ========================
// Return roles
// ========================
export interface IMemberTeam {
  joined_at: Date;
  role: TeamRole;
  teams: Team;
}
export interface SidebarCompProps {
  teams: IMemberTeam[] | undefined;
  user: User | null;
}
export interface IFolder {
  id: string;
  team_id: string;
  parent_id: string | null;
  name: string;
  created_by: string;
  created_at: string;
  updated_at?: string;
}
export interface IAllTableData {
  created_at: string;
  id: string;
  folder_id: string;
  name: string;
  team_id: string;
  updated_at: string;
  board_members: {
    joined_at: string;
    role: string;
    users: {
      avatar_url: string;
    };
  }[];
}
export interface ITeamWithMembers {
  created_at: string;
  id: string;
  team: Team;
  role: TeamRole;
  team_id: string;
  user: User;
  user_id: string;
}
