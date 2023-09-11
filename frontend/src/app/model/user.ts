export interface User {
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  userInfo?: {
    username: string;
    name?: string;
    password?: string;
    email?: string;
    roleId?: number;
  };
}
