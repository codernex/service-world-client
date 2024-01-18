import {
  Contact2,
  ListTreeIcon,
  ServerIcon,
  ShoppingBagIcon,
  TerminalSquareIcon,
  UserIcon,
  WorkflowIcon,
} from "lucide-react";
import { TbCategory } from "react-icons/tb";
import {BiCommentDetail} from "react-icons/bi";

type Role = "admin" | "provider" | "user";
export const navigation: {
  title: string;
  icon: React.ElementType;
  href: string;
  access: Role[];
}[] = [
  {
    title: "Services",
    icon: ServerIcon,
    href: "services",
    access: ["admin"],
  },
  {
    title: "Users",
    icon: UserIcon,
    href: "users",
    access: ["admin"],
  },
  {
    title: "Orders",
    icon: ShoppingBagIcon,
    href: "orders",
    access: ["admin"],
  },
  // {
  //   title: "Profile",
  //   icon: User2Icon,
  //   href: "profile",
  //   access: ["admin", "provider", "user"],
  // },
  {
    title: "Contact",
    icon: Contact2,
    href: "contact",
    access: ["admin"],
  },
  {
    title: "Categories",
    icon: TbCategory,
    href: "categories",
    access: ["admin"],
  },
  {
    title: "Brands",
    icon: TbCategory,
    href: "brands",
    access: ["admin"],
  },
  {
    title: "Teams",
    icon: TerminalSquareIcon,
    href: "teams",
    access: ["admin"],
  },
  {
    title: "My Order",
    icon: ListTreeIcon,
    href: "my-order",
    access: ["user"],
  },
  {
    title: "Reviews",
    icon: BiCommentDetail,
    href: "reviews",
    access: ["admin"],
  },
  {
    title: "Assigned Orders ",
    icon: WorkflowIcon,
    href: "signed-worker",
    access: ["admin", "provider"],
  },
];
