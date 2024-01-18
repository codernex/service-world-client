import LoaderComp from "@/components/loader.comp";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useTypedSelector } from "@/redux";
import {createCategories, removeCat} from "@/redux/actions/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {Trash2Icon} from "lucide-react";

const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: "categoryName",
    header: "Category Name",
    cell: (props) => props.row.original.categoryName,
  },
  {
    accessorKey:"",
    header:"Delete",
    cell:(props)=><CategoryAction {...props.row.original}/>
  }
];

const CategoryAction:React.FC<ICategory>=({id})=>{
  const dispatch= useAppDispatch();
  return(
      <Button onClick={()=>{
        dispatch(removeCat(id))
      }}>
        <Trash2Icon/>
      </Button>
  )
}

export default function Categories() {
  const [open, setOpen] = useState(false);
  const { categories, isLoading } = useTypedSelector((state) => state.category);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <DataTable columns={columns} data={categories} />
      )}
      <CreateCategory open={open} setOpen={setOpen} />
    </div>
  );
}
const categorySchema = z.object({
  categoryName: z.string({
    required_error: "Category name is required",
  }),
});

const CreateCategory: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}> = React.memo(({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });
  const submit = (data: any) => {
    dispatch(createCategories(data));
  };
  const { isLoading } = useTypedSelector((state) => state.category);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create Category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(submit)}>
            <FormField
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Plumbing" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
              control={form.control}
              name="categoryName"
            />
            <Button disabled={isLoading}>Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
