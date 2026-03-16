import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-violet-500/30 bg-violet-500/10 text-violet-300 hover:border-violet-400/60 hover:bg-violet-500/20',
        secondary:
          'border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700',
        outline: 'border-slate-600 text-slate-300',
        personal:
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400/60 hover:bg-emerald-500/20',
        group:
          'border-sky-500/30 bg-sky-500/10 text-sky-300 hover:border-sky-400/60 hover:bg-sky-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
