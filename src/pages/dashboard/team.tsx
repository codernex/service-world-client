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
import { createTeam, removeTeam } from "@/redux/actions/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const columns: ColumnDef<ITeam>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Member Name",
  },
  {
    accessorKey: "title",
    header: "Member Title",
  },
  {
    accessorKey: "image",
    header: "Member Image",
    cell(props) {
      return <img className="w-20" src={props.row.original.image} />;
    },
  },
  {
    accessorKey: "",
    header: "Delete",
    cell(props) {
      return <TeamAction {...props.row.original} />;
    },
  },
];

const TeamAction: React.FC<ITeam> = ({ id }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(removeTeam(id));
      }}
    >
      <Trash2Icon />
    </Button>
  );
};

export default function Team() {
  const [open, setOpen] = useState(false);
  const { teams, isLoading } = useTypedSelector((state) => state.team);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Team</h2>
        <Button onClick={() => setOpen(true)}>Create Team Member</Button>
      </div>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <DataTable columns={columns} data={teams} />
      )}

      <CreateTeam open={open} setOpen={setOpen} />
    </div>
  );
}

const createTeamSchema = z.object({
  name: z.string({
    required_error: "Member name is required",
  }),
  image: z.string({
    required_error: "Member image is required",
  }),
  title: z.string({
    required_error: "Member title is required",
  }),
});

const CreateTeam: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [fileSize, setFileSize] = useState(0);

  const form = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
  });

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      setFileSize(file.size);

      if (file.size > 2097152) {
        toast.error("File size should be less than 2MB");
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

    dispatch(createTeam(data));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Team Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(submit)}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Member Name" {...field} />
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
                  <FormLabel>Member Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Member Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="title"
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

            <Button onClick={submit}>Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
