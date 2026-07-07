import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center gap-1 border px-1.5 py-0.5 text-[10px] font-bold tracking-wider rounded-none transition-colors cursor-pointer',
    {
        variants: {
            variant: {
                default: 'border-slate-800 bg-slate-900 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400',
                personal: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400/60 hover:bg-emerald-500/20',
                group: 'border-sky-500/30 bg-sky-500/10 text-sky-300 hover:border-sky-400/60 hover:bg-sky-500/20',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
    VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
