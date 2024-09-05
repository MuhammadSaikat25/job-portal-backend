export interface TUser {
  name: string;
  role: "admin" | "candidate" | "employee";
  email: string;
  password: string;
  avatar: string;
}
