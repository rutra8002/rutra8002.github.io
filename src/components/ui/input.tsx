import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "flex h-10 w-full rounded-none border border-slate-800 bg-slate-950/60 px-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 font-mono",
                className
            )}
            {...props} />
    );
}

export { Input };