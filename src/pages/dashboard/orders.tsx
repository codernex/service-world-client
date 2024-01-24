import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateStatus, useWorkerDialog } from "@/hooks/worker";
import { cn } from "@/lib/utils";
import { useAppDispatch, useTypedSelector } from "@/redux";
import { assignWorker, updateStatus } from "@/redux/actions/order";
import { PopoverContent } from "@radix-ui/react-popover";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import toast from "react-hot-toast";

const column: ColumnDef<IOrder>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "note",
    header: "Order Note",
  },
  {
    accessorKey: "contact_no",
    header: "Customer No",
  },
  {
    accessorKey: "",
    header: "Services",
    cell(props) {
      return (
        <>
          {props.row.original?.services?.map((service) => {
            return (
              <p className="list-disc" key={service.id}>
                {service.name}
              </p>
            );
          })}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell(props) {
      return (
        <p
          className={cn(
            props.row.original.status === "pending"
              ? "bg-destructive"
              : props.row.original.status === "delivered"
              ? "bg-green-600"
              : "bg-yellow-700",
            "py-2 text-center rounded-md capitalize"
          )}
        >
          {props?.row?.original?.status}
        </p>
      );
    },
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "assignedWorker",
    header: "Worker",
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
  {
    accessorKey: "",
    header: "Actions",
    cell: (props) => <OrderAction {...props.row.original} />,
  },
];
const OrderAction: React.FC<IOrder> = (props) => {
  const { setOpen } = useWorkerDialog();
  const { setOpen: setUpdate } = useUpdateStatus();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal />
      </PopoverTrigger>
      <PopoverContent className="bg-white h-fit w-full space-x-4 py-4 px-3 rounded-xl">
        <Button
          onClick={() => {
            if (props.assignedWorker) {
              toast.error("Worker Already Assigned");
              return;
            }
            setOpen(true, props);
          }}
        >
          Assign Worker
        </Button>
        <Button
          onClick={() => {
            setUpdate(true, props);
          }}
        >
          Update Status
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const AssingWorkerDialog = () => {
  const { user } = useTypedSelector((state) => state.user);
  const [workerId, setWorkerId] = useState("");
  const filteredUser = useMemo(
    () => user.filter((user) => user.role === "provider"),
    [user]
  );
  const { open, data, setOpen } = useWorkerDialog();
  const dispatch = useAppDispatch();
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>Update worker</DialogHeader>
        <Select onValueChange={setWorkerId} value={workerId}>
          <SelectTrigger>
            <SelectValue placeholder="Select worker" />
          </SelectTrigger>
          <SelectContent>
            {filteredUser.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            if (data) {
              dispatch(assignWorker(data.id as string, workerId));
              setOpen(false, undefined);
            }
          }}
        >
          Assign
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const UpdateStatus = () => {
  const [status, setStatus] = useState("");
  const { open, data, setOpen } = useUpdateStatus();
  const dispatch = useAppDispatch();
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>Update Status</DialogHeader>
        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"pending"}>Pending</SelectItem>
            <SelectItem value={"accepted"}>Accepted</SelectItem>
            <SelectItem value={"delivered"}>Delivered</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            if (data) {
              dispatch(updateStatus(data.id as string, status));
              setOpen(false, undefined);
            }
          }}
        >
          Update Status
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const Orders = () => {
  const { orders } = useTypedSelector((state) => state.order);
  const authUser = useAuthUser();
  const user = useMemo(() => authUser(), [authUser]) as IUser;

  const filteredOrderByUser = useMemo(() => {
    if (user.role === "admin") {
      return orders;
    }
    return orders.filter((order) => order.user.id === user.id);
  }, [orders, user]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Orders</h2>
      </div>
      <div className="mt-10">
        <DataTable columns={column} data={filteredOrderByUser} />
      </div>
      <AssingWorkerDialog />
      <UpdateStatus />
    </div>
  );
};

export default Orders;
