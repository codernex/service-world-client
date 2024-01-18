import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTypedSelector } from "@/redux";
import { useMemo } from "react";
import { useAuthUser } from "react-auth-kit";

function Dashboard() {
  const { orders } = useTypedSelector((state) => state.order);
  const { user } = useTypedSelector((state) => state.user);
  const { services } = useTypedSelector((state) => state.service);
  const { contacts } = useTypedSelector((state) => state.contact);

  const worker = useMemo(() => {
    return user.filter((u) => u.role === "provider");
  }, [user]);

  const users = useMemo(() => {
    return user.filter((u) => u.role === "user");
  }, [user]);

  const authUser = useAuthUser();

  const userAuth = useMemo(() => authUser(), [authUser]) as IUser;

  if (userAuth.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">Welcome {userAuth.name}</h1>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-10">
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-gray-700">
          {orders.length}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Worker</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-gray-700">
          {worker.length}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-gray-700">
          {users.length}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Services</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-gray-700">
          {services.length}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Request</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-gray-700">
          {contacts.length}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
