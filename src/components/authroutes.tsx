import { Lock } from "lucide-react";
import { useMemo } from "react";
import { useAuthUser } from "react-auth-kit";

type Role = "admin" | "provider" | "user";

export const AuthorizedRoles: React.FC<{
  fallback?: JSX.Element;
  roles: Role[];
}> = ({ roles, fallback }) => {
  const authUser = useAuthUser();

  const user = useMemo(() => authUser(), [authUser]);

  if (user && roles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return (
    <div className="flex justify-center space-x-4 items-center h-screen">
      <h1 className="text-center text-2xl font-semibold">
        You don't have enough permission
      </h1>
      <Lock />
    </div>
  );
};
