import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                "border border-slate-800 bg-slate-950/80 shadow-md backdrop-blur-sm relative overflow-hidden rounded-none",
                className
            )}
            {...props} />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn("flex flex-col gap-1 p-4 border-b border-white/5", className)} {...props} />
    );
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
    return (
        <h3 className={cn("text-sm font-bold text-slate-100 font-mono", className)} {...props} />
    );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn("p-4", className)} {...props} />
    );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
}