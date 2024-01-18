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
      return props.row.original.services.map((service) => {
        return service.name;
      });
    },
  },
  {
    accessorKey: "assignedWorker",
    header: "Assigned Worker",
    cell(props) {
      if (props.row.original.assignedWorker) {
        return (
          props.row.original.assignedWorker.name +
          "---" +
          (props.row.original.assignedWorker.mobile
            ? props.row.original.assignedWorker.mobile
            : "Number Not Available")
        );
      } else {
        return "Not Assigned";
      }
    },
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Staus",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "created_at",
    header: "Order Placed",
    cell: (props) =><p>{dayjs(props.row.original.created_at).format("DD-MM-YYYY hh:mm a")}</p>

  },
  {
    accessorKey: "updated_at",
    header: "Order Updated",
    cell: (props) =><p>{
      dayjs(props.row.original.updated_at).format("DD-MM-YYYY hh:mm a")}</p>,
  },
];
export default function MyOrder() {
  const { orders, isLoading } = useTypedSelector((state) => state.order);
  const authUser = useAuthUser();
  const user = useMemo(() => authUser(), [authUser]) as IUser;

  const filteredByUser = useMemo(
    () => orders.filter((order) => order.user.id === user.id),
    [orders, user]
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">My Orders</h2>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <DataTable columns={column} data={filteredByUser} />
      )}
    </div>
  );
}
