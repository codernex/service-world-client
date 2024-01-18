import LoaderComp from "@/components/loader.comp";
import { DataTable } from "@/components/ui/data-table";
import {useAppDispatch, useTypedSelector} from "@/redux";
import { ColumnDef } from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Trash2Icon} from "lucide-react";
import {removeUser} from "@/redux/actions/user.ts";
import React from "react";

const column: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "User Type",
  },
  {
    accessorKey: "profession",
    header: "Profession",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey:"",
    header:"Delete User",
    cell:props=><UserAction id={props.row.original.id}/>
  }
];

const UserAction:React.FC<{id:string}>=({id})=>{
  const dispatch=useAppDispatch()
  return(
      <Button onClick={()=>{
        dispatch(removeUser(id))
      }}>
        <Trash2Icon/>
      </Button>
  )
}
const Users = () => {
  const { user, isLoading } = useTypedSelector((state) => state.user);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Users</h2>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <LoaderComp />
        ) : (
          <DataTable columns={column} data={user} />
        )}
      </div>
    </div>
  );
};

export default Users;
