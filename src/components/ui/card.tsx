import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-slate-900/60 shadow-lg backdrop-blur-sm",
        className
      )}
      {...props} />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-6",
        className
      )}
      {...props} />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-slate-100",
        className
      )}
      {...props} />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        "p-6 pt-0",
        className
      )}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
}