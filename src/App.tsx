import Layout from "@/components/ui/layout";
import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthorizedRoles } from "./components/authroutes";
import DashboardLayout from "./components/dashboard-layout";
import { ErrorBoundary } from "./components/error";
import Loader from "./components/loader";
import { useCart } from "./hooks/cart";
import {
  About,
  AssignedWorker,
  Brands,
  Categories,
  Checkout,
  Contact,
  ContactForm,
  Dashboard,
  Home,
  MyOrder,
  Orders,
  Service,
  Services,
  SingleService,
  Team,
  Users,
} from "./pages";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Reviews from "@/pages/dashboard/reviews.tsx";
import { useAppDispatch } from "@/redux";
import { fetchBrands } from "@/redux/actions/brand";
import { fetchCategories } from "@/redux/actions/category";
import { fetchReviews } from "@/redux/actions/review";
import { fetchServices } from "@/redux/actions/service";
import { fetchTeams } from "@/redux/actions/team";

function App() {
  const { setData } = useCart();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchTeams());
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as IService[];

    setData(cart);
  }, [setData]);

  return (
    <>
      <ErrorBoundary
        fallback={({ stack }) => {
          return (
            <div className="flex h-screen items-center justify-center flex-col space-y-4">
              <p className="text-center text-3xl text-red-600 font-semibold font-Roboto">
                Something went wrong
              </p>
              <code>{stack ? stack.toString() : ""}</code>
              <span className="text-slate-700">
                Contact Your Developer To Resolve This Unwanted Issue
              </span>
            </div>
          );
        }}
      >
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services">
                <Route index element={<Service />} />
                <Route path=":id" element={<SingleService />} />
              </Route>
              <Route path="checkout" element={<Checkout />} />
              <Route path={"contact"} element={<Contact />} />
              <Route path={"about"} element={<About />} />
            </Route>

            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route
                path="services"
                element={
                  <AuthorizedRoles roles={["admin"]} fallback={<Services />} />
                }
              />
              <Route
                path="users"
                element={
                  <AuthorizedRoles roles={["admin"]} fallback={<Users />} />
                }
              />
              <Route
                path="orders"
                element={
                  <AuthorizedRoles roles={["admin"]} fallback={<Orders />} />
                }
              />
              {/* <Route
              path="profile"
              element={
                <AuthorizedRoles
                  roles={["admin", "provider", "user"]}
                  fallback={<Profile />}
                />
              }
            /> */}
              <Route
                path="contact"
                element={
                  <AuthorizedRoles
                    roles={["admin"]}
                    fallback={<ContactForm />}
                  />
                }
              />
              <Route
                path="categories"
                element={
                  <AuthorizedRoles
                    roles={["admin"]}
                    fallback={<Categories />}
                  />
                }
              />
              <Route
                path="brands"
                element={
                  <AuthorizedRoles roles={["admin"]} fallback={<Brands />} />
                }
              />
              <Route
                path="teams"
                element={
                  <AuthorizedRoles roles={["admin"]} fallback={<Team />} />
                }
              />
              <Route
                path="my-order"
                element={
                  <AuthorizedRoles roles={["user"]} fallback={<MyOrder />} />
                }
              />
              <Route
                path="signed-worker"
                element={
                  <AuthorizedRoles
                    roles={["admin", "provider"]}
                    fallback={<AssignedWorker />}
                  />
                }
              />
              <Route
                path="reviews"
                element={
                  <AuthorizedRoles roles={["admin"]} fallback={<Reviews />} />
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
