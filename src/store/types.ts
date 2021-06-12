export interface RootState {
  root: string;
}

export interface AppState {
  version: string;
  layoutMode: string;
}

export interface UserState {
  userName: string;
  nickName: string;
}

export interface ParentState {
  root: RootState;
  user: UserState;
  app: AppState;
}
