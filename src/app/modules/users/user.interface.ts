export interface TUser {
  name: string;
  role: "admin" | "candidate" | "employer";
  email: string;
  password: string;
  avatar: string;
}
