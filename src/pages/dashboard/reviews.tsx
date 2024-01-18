import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {CheckIcon, XIcon} from "lucide-react";
import {useAppDispatch, useTypedSelector} from "@/redux";
import {DataTable} from "@/components/ui/data-table.tsx";
import LoaderComp from "@/components/loader.comp.tsx";
import {updateReviews} from "@/redux/actions/review.ts";
import React from "react";

const columns:ColumnDef<IReview>[]=[
    {
        accessorKey:"id",
        header:"SL",
        cell:props=>props.row.index+1
    },
    {
        accessorKey:"comment",
        header:"Comments",

    },
    {
        accessorKey:"service",
        header:"Service",
        cell:props=>props.row?.original?.service?.name
    },
    {
        accessorKey:"user",
        header:"User",
        cell:props=><div>
            <p>{props.row?.original?.user?.username}</p>
            <p>{props.row?.original?.user?.mobile||"-"}</p>
        </div>
    },
    {
        accessorKey:"status",
        header:"Status"
    },
    {
        accessorKey:"",
        header:"Action",
        cell:props=><ReviewAction {...props.row.original}/>
    }
]

const ReviewAction:React.FC<IReview>=({id})=>{
    const dispatch=useAppDispatch();

    return(
        <div className={"space-x-3"}>
            <Button onClick={()=>{
                dispatch(updateReviews(id,"approved"))
            }}>
                <CheckIcon/>
            </Button>
            <Button onClick={()=>{
                dispatch(updateReviews(id,"pending"))
            }}>
                <XIcon/>
            </Button>
        </div>
    )
}
export default  function Reviews(){
    const {reviews,isLoading}=useTypedSelector(state=>state.review)
    return(
        <div>
            <h2 className={"text-3xl font-semibold mb-6"}>Reviews</h2>
            {
                isLoading?<LoaderComp/>:<DataTable columns={columns} data={reviews}/>
            }
        </div>
    )
}