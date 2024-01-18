import React, { useState } from "react";

const SettingContext = React.createContext<{
  screenSize: number;
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  loginDialog: boolean;
  showLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
}>({
  screenSize: 0,
  sidebar: false,
  setSidebar: () => {},
  loginDialog: false,
  showLoginDialog: () => {}
});

const SettingProvider = ({ children }: React.PropsWithChildren) => {
  const [screenSize, setScreenSize] = React.useState<number>(window.innerWidth);
  const [sidebar, setSidebar] = useState(true);
  const [loginDialog, showLoginDialog] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <SettingContext.Provider
      value={{
        screenSize,
        sidebar,
        setSidebar,
        loginDialog,
        showLoginDialog,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};
export default SettingProvider;

export const useSettingContext = () => React.useContext(SettingContext);
