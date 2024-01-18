import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TbBrandTabler } from "react-icons/tb";
import { navigation } from "./nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSettingContext } from "@/context/Setting";
import {useAuthUser, useSignOut} from "react-auth-kit";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const Sidebar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const signOut=useSignOut()
  const path = useLocation().pathname.slice(1);

  const authUser = useAuthUser();
  const user = useMemo(() => authUser(), [authUser]);

  const { sidebar } = useSettingContext();


  return (
    <AnimatePresence>
      <motion.aside
        className={cn(
          "px-6 border-r border-slate-700  py-4 relative text-neutral-400 dark:text-slate-300"
        )}
        initial="initial"
        animate={sidebar ? "animate" : "exit"}
      >
        <Link to="/dashboard" className="flex gap-x-2 items-center">
          <TbBrandTabler className="text-3xl" />
          {sidebar && (
            <motion.h2
              initial="initial"
              animate={sidebar ? "animate" : "exit"}
              className="font-semibold"
            >
              Codernex
            </motion.h2>
          )}
        </Link>
        <div className="flex justify-end my-3">
          <Link to={"/"} className="text-center">
            Visit Site
          </Link>
        </div>
        <Separator className="my-2 " />
        <nav>
          <ul className="space-y-4">
            {navigation.map((item, i) => {
              if (user && item.access.includes(user.role)) {
                return (
                  <div key={i}>
                    <div
                      className="cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        navigate(item.href);
                      }}
                    >
                      <div
                        className={cn(
                          "flex gap-x-2 w-full px-2 py-1 items-center",
                          path === item.href
                            ? "bg-slate-100 rounded-[5px] text-slate-700"
                            : ""
                        )}
                      >
                        <item.icon size={20} className="text-xl" />
                        {sidebar && (
                          <p className="font-semibold">{item.title}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return "";
              }
            })}
            <Button onClick={()=>{
              signOut()
            }}>
              <LogOut/>
              <span>Logout</span>
            </Button>
          </ul>
        </nav>
      </motion.aside>
    </AnimatePresence>
  );
});
