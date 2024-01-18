import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import logo from "@/assets/logo.png";
import {useMemo, useState} from "react";
import {
    AiOutlineClose,
    AiOutlineMenu,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import {AnimatePresence, motion} from "framer-motion";
import Container from "@/components/ui/container";
import {useSettingContext} from "@/context/Setting";
import {cn} from "@/lib/utils";
import Footer from "../footer";
import {useCart} from "@/hooks/cart";
import {TbDashboard} from "react-icons/tb";
import {useIsAuthenticated} from "react-auth-kit";
import {LogInIcon} from "lucide-react";

const Layout = () => {
    const {screenSize} = useSettingContext();
    return (
        <>
            {screenSize >= 728 ? <DesktopMenu/> : <MobileMenu/>}
            <Outlet/>
            <Footer/>
        </>
    );
};

const DesktopMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useIsAuthenticated();
    const isAuth = useMemo(() => auth(), [auth]);
    const {data, setOpen} = useCart();

    return (
        <div className="flex items-center justify-between relative bg-primary">
            <div
                onClick={() => navigate("/")}
                className="w-1/4 flex justify-center bg-slate-50 clip cursor-pointer"
            >
                <img className="w-[250px]" src={logo} alt=""/>
            </div>
            <Container className="flex justify-between w-3/4 ">
                <ul className="flex gap-10 justify-center text-xl font-medium ">
                    <Link
                        className={cn(
                            location.pathname === "/" &&
                            "border-b border-b-black text-[18px]",
                            "text-[18px]"
                        )}
                        to={"/"}
                    >
                        হোম
                    </Link>
                    <Link
                        className={cn(
                            location.pathname === "/services" &&
                            "border-b border-b-black text-[18px]",
                            "text-[18px]"
                        )}
                        to={"/services"}
                    >
                        সার্ভিস
                    </Link>

                    <Link
                        className={cn(
                            location.pathname === "/about" &&
                            "border-b border-b-black text-[18px]",
                            "text-[18px]"
                        )}

                        to="/about"
                    >
                        আমাদের সম্পর্কে
                    </Link>

                    <Link
                        className={cn(
                            location.pathname === "/contact" &&
                            "border-b border-b-black text-[18px]",
                            "text-[18px]"
                        )}
                        to="/contact"
                    >
                        যোগাযোগ
                    </Link>
                </ul>
                <div className="flex justify-center space-x-6">
                    <div className="flex items-center">
                        <AiOutlineShoppingCart onClick={() => setOpen(true)} size={24}/>
                        <span>{data?.length || 0}</span>
                    </div>
                    {isAuth ? (
                        <button className="cursor-pointer flex items-center space-x-1"
                                onClick={() => navigate("dashboard")}>
                            <span>ড্যাশবোর্ড</span>
                            <TbDashboard
                                size={24}
                            />
                        </button>
                    ) : (
                        <Link className={'flex items-center justify-center space-x-1'} to={"login"}>
                            <span>লগইন</span>
                            <LogInIcon size={24}/>
                        </Link>
                    )}
                </div>
            </Container>
        </div>
    );
};

const MobileMenu = () => {
    const sidebarVariant = {
        initial: {width: 80, opacity: 0, x: "-300"},
        animate: {
            width: 300,
            x: 0,
            opacity: 1,
            transition: {duration: 0.3},
        },
        exit: {
            width: 0,
            opacity: 0,
            transition: {duration: 0.3},
        },
    };
    const navigate = useNavigate();
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const location = useLocation();
    const {data, setOpen} = useCart();
    const auth = useIsAuthenticated();
    const isAuth = useMemo(() => auth(), [auth]);

    return (
        <nav className="flex items-center justify-between px-4">
            <div
                onClick={() => navigate("/")}
                className="w-2/4 flex justify-center bg-slate-50 clip cursor-pointer"
            >
                <img className="w-[250px]" src={logo} alt=""/>
            </div>
            <div className="bg-primary px-2 py-2 text-slate-800 rounded-md">
                {isSidebarActive ? (
                    <AiOutlineClose size={20} onClick={() => setIsSidebarActive(false)}/>
                ) : (
                    <AiOutlineMenu size={20} onClick={() => setIsSidebarActive(true)}/>
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
                        <img className="w-[250px]" src={logo} alt=""/>
                    </div>
                    <ul className="flex flex-col mt-6 space-y-3 justify-center text-xl font-medium px-8 text-slate-900">
                        <Link
                            className={cn(
                                location.pathname === "/" && "border-b border-b-black"
                            )}
                            onClick={() => {
                                setIsSidebarActive(false);
                            }}
                            to={"/"}
                        >
                            হোম
                        </Link>
                        <Link
                            className={cn(
                                location.pathname === "/services" && "border-b border-b-black"
                            )}
                            onClick={() => {
                                setIsSidebarActive(false);
                            }}
                            to={"/services"}
                        >
                            সার্ভিস
                        </Link>
                        <Link
                            className={cn(
                                location.pathname === "/about" && "border-b border-b-black"
                            )}
                            onClick={() => {
                                setIsSidebarActive(false);
                            }}
                            to={"/about"}
                        >
                            আমাদের সম্পর্কে
                        </Link>
                        <Link
                            className={cn(
                                location.pathname === "/contact" && "border-b border-b-black"
                            )}
                            onClick={() => {
                                setIsSidebarActive(false);
                            }}
                            to={"/contact"}
                        >
                            যোগাযোগ
                        </Link>
                        {isAuth ? (
                            <button className="cursor-pointer flex items-center space-x-1"
                                    onClick={() => navigate("dashboard")}>
                                <span>ড্যাশবোর্ড</span>
                                <TbDashboard
                                    size={24}
                                />
                            </button>
                        ) : (
                            <Link className={'flex items-center space-x-1'} to={"login"}>
                                <span>লগইন</span>
                                <LogInIcon size={24}/>
                            </Link>
                        )}
                        <div className="flex items-center">
                            <AiOutlineShoppingCart
                                onClick={() => {
                                    setOpen(true);
                                    setIsSidebarActive(false);
                                }}
                                size={24}
                            />
                            <span>{data?.length || 0}</span>
                        </div>
                    </ul>
                </motion.div>
            </AnimatePresence>
        </nav>
    );
};

export default Layout;
