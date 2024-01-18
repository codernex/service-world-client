import {lazy} from "react";

const Team = lazy(() => import("./dashboard/team"));
const Home = lazy(() => import("./home"));
const Service = lazy(() => import("./service"));
const SingleService = lazy(() => import("./service/[id]"));
const Checkout = lazy(() => import("./checkout"));
const Dashboard = lazy(() => import("./dashboard"));
const Users = lazy(() => import("./dashboard/users"));
const MyOrder = lazy(() => import("./dashboard/my-order"));
const AssignedWorker = lazy(() => import("./dashboard/assigned-orders"));
const Categories = lazy(() => import("./dashboard/categories"));
const ContactForm = lazy(() => import("./dashboard/contac-form"));
const Orders = lazy(() => import("./dashboard/orders"));
const Brands = lazy(() => import("./dashboard/brands"));
const Services = lazy(() => import("./dashboard/services"));

const About = lazy(() => import('./about'))
const Contact = lazy(() => import('./contact'))

export {
    Team,
    AssignedWorker,
    Brands,
    Categories,
    Checkout,
    ContactForm,
    Dashboard,
    Home,
    MyOrder,
    Orders,
    Service,
    Services,
    SingleService,
    Users,
    About,
    Contact
};
