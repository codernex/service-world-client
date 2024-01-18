import LoaderComp from "@/components/loader.comp";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useServiceModal } from "@/hooks/services";
import { useAppDispatch, useTypedSelector } from "@/redux";
import {
  createService,
  deleteServices,
  updateService,
} from "@/redux/actions/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SelectValue } from "@radix-ui/react-select";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, MoreVertical, Trash2Icon } from "lucide-react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
const column: ColumnDef<IService>[] = [
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (props) => <ServiceDescription data={props.row.original.description}/>,
  },
  {
    accessorKey: "image",
    cell: (props) => (
      <div className="w-30 bg-white rounded-md flex items-center justify-center">
        <img
          className="w-20"
          src={props.row.original?.thumbnail}
          alt="Thumbnail"
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price(TK)",
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (props) => {
      return <ServiceAction original={props.row.original} />;
    },
  },
];

const ServiceDescription:React.FC<{data:string}>=({data})=>{
    const ref=useRef<HTMLDivElement|null>(null)

    useEffect(()=>{
        if(ref.current){
            ref.current.innerHTML=data
        }
    },[data])
    return(
        <div ref={ref}></div>
    )
}

const ServiceAction: React.FC<{ original: IService }> = ({ original }) => {
  const { setOpen } = useServiceModal();
  const dispatch = useAppDispatch();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Edit2Icon onClick={() => setOpen(true, original)} />
        <Trash2Icon
          onClick={() => {
            dispatch(deleteServices(original.id));
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

const Services = () => {
  const { setOpen } = useServiceModal();
  const { services, isLoading } = useTypedSelector((state) => state.service);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Services</h2>
        <Button onClick={() => setOpen(true)}>Create services</Button>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <LoaderComp />
        ) : (
          <DataTable columns={column} data={services} />
        )}
      </div>

      <CreateService />
    </div>
  );
};

export default Services;

const createServiceSchema = z.object({
  name: z.string({
    required_error: "Service name is required",
  }),
  description: z.string({
    required_error: "Service description is required",
  }),
  price: z.preprocess(
    (a) => Number(a),
    z.number({
      required_error: "Service price is required",
    })
  ),
  category: z
    .string({
      required_error: "Service category is required",
    })
    .optional(),
  thumbnail: z.string({
    required_error: "Thumbnail is required",
  }),
  title: z.string({
    required_error: "Title is required",
  }),
});

const CreateService = React.memo(() => {
  const { open, setOpen, data } = useServiceModal();
  const { categories } = useTypedSelector((state) => state.category);
  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
    values: data && {
      category: data.category,
      description: data.description,
      name: data.name,
      price: data.price,
      thumbnail: data.thumbnail,
      title: data.title,
    },
  });
  const dispatch = useAppDispatch();
  const submit = (values: z.infer<typeof createServiceSchema>) => {
    if (fileSize > 2097152) {
      toast.error("File size should be less than 2MB");
      return;
    }
    if (data) {
      dispatch(updateService(data.id, values));
    } else {
      dispatch(createService(values));
    }
    form.reset({
      category: "",
      description: "",
      name: "",
      price: undefined,
      thumbnail: "",
      title: "",
    });

    setOpen(false, undefined);
  };
  const [fileSize, setFileSize] = useState(0);
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
          form.setValue("thumbnail", reader.result as string);
        };
      }
    },
    [form]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={"max-h-screen lg:max-w-screen-lg overflow-y-scroll"}>
        <DialogHeader>
          <DialogTitle>Create Service</DialogTitle>
        </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
                    <FormField
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="EG: Plumbing" {...field} />
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
                                <FormLabel>Service Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="EG: Plumbing Repair" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        control={form.control}
                        name="title"
                    />
                    <FormField
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <ReactQuill theme="snow" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        control={form.control}
                        name="description"
                    />
                    <FormField
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="120" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        control={form.control}
                        name="price"
                    />
                    <FormField
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full md:w-1/2 h-14">
                                        <SelectValue placeholder="Select A Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category, i) => {
                                            if (category.categoryName)
                                                return (
                                                    <SelectItem
                                                        key={i}
                                                        value={
                                                            category.categoryName && category.categoryName
                                                        }
                                                    >
                                                        {category.categoryName}
                                                    </SelectItem>
                                                );
                                            else return null;
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        control={form.control}
                        name="category"
                    />

                    <FormField
                        render={() => (
                            <FormItem>
                                <FormLabel>Service Thumbnail</FormLabel>
                                <FormDescription>Image Upto 2MB</FormDescription>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </FormControl>
                                {data ? (
                                    <div>
                                        <h2>Current Thumbnail</h2>
                                        <img
                                            className="w-20"
                                            src={data.thumbnail}
                                            alt="Thumbnail"
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                        control={form.control}
                        name="thumbnail"
                    />
                    <Button>{data ? "Update" : "Save"}</Button>
                </form>
            </Form>
      </DialogContent>
    </Dialog>
  );
});
