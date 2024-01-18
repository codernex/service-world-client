import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux";
import { fetchContacts } from "@/redux/actions/contact";
import { fetchOrders } from "@/redux/actions/order";
import { fetchUsers } from "@/redux/actions/user";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {useAuthUser, useIsAuthenticated, useSignOut} from "react-auth-kit";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import { navigation } from "./nav";
import { Sidebar } from "./sidebar";
import { useSettingContext } from "@/context/Setting";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  const authUser = useAuthUser();

  const user = useMemo(() => authUser(), [authUser]) as IUser;

  useEffect(() => {
    dispatch(fetchOrders());
    if (user&&user.role === "admin") {
      dispatch(fetchUsers());
      dispatch(fetchContacts());
    }
  }, [dispatch, user]);


  const { screenSize } = useSettingContext();

  const isAuth = useIsAuthenticated();
  const location = useLocation();

  if (!isAuth()) {
    localStorage.clear()
    return (
        <Navigate to={'/login'} state={{from: location.pathname}} replace/>
    );
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col md:flex-row scrollbar-hide bg-slate-900 text-white">
      {screenSize > 768 ? <Sidebar /> : <MobileMenu />}
      <div className="flex-1 w-full overflow-y-scroll scrollbar-hide px-4 py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

const MobileMenu = () => {
  const sidebarVariant = {
    initial: { width: 80, opacity: 0, x: "-300" },
    animate: {
      width: 300,
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const authUser = useAuthUser();
  const user = useMemo(() => authUser(), [authUser]) as IUser;

  const signOut= useSignOut();
  return (
    <nav className="flex items-center justify-between px-4">
      <div
        onClick={() => navigate("/")}
        className="w-2/4 flex justify-center bg-slate-50 clip cursor-pointer"
      >
        <img className="w-[250px]" src={logo} alt="" />
      </div>
      <div className="bg-primary px-2 py-2 text-slate-800 rounded-md">
        {isSidebarActive ? (
          <AiOutlineClose size={20} onClick={() => setIsSidebarActive(false)} />
        ) : (
          <AiOutlineMenu size={20} onClick={() => setIsSidebarActive(true)} />
        )}
      </div>
      <AnimatePresence>
        <motion.div
          animate={isSidebarActive ? "animate" : "exit"}
          variants={sidebarVariant}
          initial="initial"
          className="absolute top-0 left-0 bg-primary h-full z-50"
        >
          <div className="w-full flex justify-center bg-slate-50 clip">
            <img className="w-[250px]" src={logo} alt="" />
          </div>
          <ul className="flex flex-col mt-6 space-y-3 justify-center text-xl font-medium px-8 text-slate-900">
            {navigation.map((item, i) => {
              if (user && item.access.includes(user.role)) {
                return (
                  <div key={i}>
                    <div
                      className="cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        navigate(item.href);
                        setIsSidebarActive(false);
                      }}
                    >
                      <div
                        className={cn(
                          "flex gap-x-2 w-full px-2 py-1 items-center"
                        )}
                      >
                        <item.icon size={20} className="text-xl" />
                        {isSidebarActive && (
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
        </motion.div>
      </AnimatePresence>
    </nav>
  );
};
