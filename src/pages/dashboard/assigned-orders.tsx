import LoaderComp from "@/components/loader.comp";
import { DataTable } from "@/components/ui/data-table";
import { useTypedSelector } from "@/redux";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useAuthUser } from "react-auth-kit";
const column: ColumnDef<IOrder>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: "services",
    header: "Service",
    cell(props) {
      return props.row.original?.services?.map((service) => {
        return service.name;
      });
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "contact_no",
    header: "Customer Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "created_at",
    header: "Order Placed",
    cell: (props) =>
      dayjs(props.row.original.created_at).format("DD-MM-YYYY hh:mm a"),
  },
  {
    accessorKey: "updated_at",
    header: "Order Updated",
    cell: (props) =>
      dayjs(props.row.original.updated_at).format("DD-MM-YYYY hh:mm a"),
  },
];
export default function AssignedWorker() {
  const { orders, isLoading } = useTypedSelector((state) => state.order);
  const authUser = useAuthUser();
  const user = useMemo(() => authUser(), [authUser]) as IUser;

  const filteredByUser = useMemo(() => {
    if (user.role === "admin") {
      return orders.filter((order) => order.assignedWorker);
    } else {
      return orders.filter((order) => order.assignedWorker?.id === user.id);
    }
  }, [orders, user]);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Assigned Orders</h2>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <DataTable columns={column} data={filteredByUser} />
      )}
    </div>
  );
}
