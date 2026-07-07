import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-none text-xs font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 border uppercase tracking-wider',
    {
        variants: {
            variant: {
                default: 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400/60',
                outline: 'border-slate-800 bg-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200',
                ghost: 'border-transparent bg-transparent hover:bg-white/5 text-slate-400 hover:text-white',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-7 px-3 text-[10px]',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };