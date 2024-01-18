import { cn } from "@/lib/utils";
import React from "react";

type Ref = HTMLDivElement;

const Cotainer = React.forwardRef<
  Ref,
  React.PropsWithChildren & { className?: string; id?: string }
>(({ children, className, id }, ref) => {
  return (
    <div ref={ref} id={id} className={cn("padding-custom", className)}>
      {children}
    </div>
  );
});

export default Cotainer;
