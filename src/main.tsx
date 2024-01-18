import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "@/redux";
import "./index.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";
import SettingProvider from "./context/Setting.tsx";
import { Toaster } from "react-hot-toast";
import { Cart } from "./components/cart.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider authName="auth" authType="localstorage">
    <SettingProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster />
          <Cart />
        </BrowserRouter>
      </Provider>
    </SettingProvider>
  </AuthProvider>
);
