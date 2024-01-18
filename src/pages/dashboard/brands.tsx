import LoaderComp from "@/components/loader.comp";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useTypedSelector } from "@/redux";
import { removeBrand, submitNewBrand } from "@/redux/actions/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const columns: ColumnDef<IBrand>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Brand Name",
  },
  {
    accessorKey: "image",
    header: "Brand Image",
    cell(props) {
      return <img className="w-20" src={props.row.original.image} />;
    },
  },

  {
    accessorKey: "",
    header: "Delete",
    cell(props) {
      return <BrandAction {...props.row.original} />;
    },
  },
];

const BrandAction: React.FC<IBrand> = ({ id }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(removeBrand(id));
      }}
    >
      <Trash2Icon />
    </Button>
  );
};

export default function Brands() {
  const [open, setOpen] = useState(false);
  const { brands, isLoading } = useTypedSelector((state) => state.brand);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Brands</h2>
        <Button onClick={() => setOpen(true)}>Create Brands</Button>
      </div>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <DataTable columns={columns} data={brands} />
      )}

      <CreateBrand open={open} setOpen={setOpen} />
    </div>
  );
}

const createBrandSchema = z.object({
  image: z.string({
    required_error: "Brand image required",
  }),
  name: z.string({
    required_error: "Brand Name required",
  }),
  number: z.string({
    required_error: "Number required",
  }),
});

const CreateBrand: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const form = useForm<z.infer<typeof createBrandSchema>>({
    resolver: zodResolver(createBrandSchema),
  });
  const { isLoading } = useTypedSelector((state) => state.brand);

  const [fileSize, setFileSize] = useState(0);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      setFileSize(file.size);

      if (file.size > 1048576) {
        toast.error("File size should be less than 1MB");
        return;
      }

      reader.readAsDataURL(file);

      if (reader.readyState) {
        reader.onload = () => {
          form.setValue("image", reader.result as string);
        };
      }
    },
    [form]
  );

  const dispatch = useAppDispatch();

  const submit = (data: any) => {
    if (fileSize > 1048576) {
      toast.error("File size should be less than 1MB");
      return;
    }

    dispatch(submitNewBrand(data));

    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Brands</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(submit)}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="name"
            />

            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="number"
            />

            <FormField
              render={() => (
                <FormItem>
                  <FormLabel>Brand Image</FormLabel>
                  <FormDescription>Image Upto 1MB</FormDescription>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="image"
            />

            <Button disabled={isLoading} onClick={submit}>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
