import { DataTable } from "@/components/ui/data-table";
import { useAppDispatch, useTypedSelector } from "@/redux";
import { fetchContacts } from "@/redux/actions/contact";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import myDate from "dayjs";
import LoaderComp from "@/components/loader.comp";

const column: ColumnDef<IContactForm>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "created_at",
    header: "Submitted At",
    cell: (props) => {
      return (
        <div>
          {props.row
            ? myDate(props?.row?.original?.created_at).format(
                "DD-MM-YYYY h:m a"
              )
            : ""}
        </div>
      );
    },
  },
];
export default function ContactForm() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { contacts, isLoading } = useTypedSelector((state) => state.contact);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 font-RobotoMono">
        Contact Form Submitted
      </h1>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <DataTable columns={column} data={contacts} />
      )}
    </div>
  );
}
