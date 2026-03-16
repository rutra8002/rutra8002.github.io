import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-full border border-violet-500/30 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20",
        className
      )}
      {...props} />
  );
}

export { Input }
