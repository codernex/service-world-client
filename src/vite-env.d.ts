/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface IService {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  reviews: IReview[];
  extra_info: string;
}
enum Payment {
  CASH = "cash",
  ONLINE = "online",
}

interface IOrder {
  id: string;
  note?: string;
  amount: number;
  contact_no: string;
  services: IService[];
  status: "pending" | "accepted" | "delivered";
  user: IUser;
  assignedWorker: IUser;
  created_at: Date;
  updated_at: Date;
  payment: Payment;
}

interface ICategory {
  id: string;
  categoryName: string;
}

interface IContactForm {
  id: string;
  name: string;
  email: string;
  number: string;
  message?: string;
  service?: string;
  created_at: Date;
}
interface IReview {
  id: string;
  rating: number;
  comment: string;
  service: Service;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  status: "pending" | "approved";
}

enum UserRole {
  ADMIN = "admin",
  PROVIDER = "provider",
  USER = "user",
}

interface IUser {
  id: string;
  name: string;
  username: string;
  mobile?: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  profession?: string;
  address?: string;
}

interface IBrand {
  id: string;
  image: string;
  name: string;
  number?: string;
}

interface ITeam {
  id: string;
  name: string;
  title: string;
  image: string;
}
