import { cn } from "@/lib/utils";

export default function CountUp() {
  return (
    <div className="padding-custom py-20 bg-slate-100 grid  grid-cols-2 md:grid-cols-4">
      <Count
        className="border-r-[1px] border-b-[1px] md:border-b-0 border-slate-300"
        title="Succesfull Projects"
        number={"85"}
      />
      <Count
        className="border-b-[1px] border-r-0 md:border-r-[1px] md:border-b-0 border-slate-300"
        title="Satisfied Customer"
        number={"80"}
      />
      <Count
        className="border-r-[1px] border-slate-300"
        title="Experts"
        number={"152"}
      />
      <Count title="Call Response" number={"100%"} />
    </div>
  );
}

const Count = ({
  number,
  title,
  className,
}: {
  number: string;
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn(className, "text-center py-2")}>
      <h1 className="text-primary text-3xl font-semibold">{number}</h1>
      <h3 className="text-slate-500 text-xl font-semibold">{title}</h3>
    </div>
  );
};
