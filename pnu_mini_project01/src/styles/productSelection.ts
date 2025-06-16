import clsx from "clsx";

export const productselected = clsx(
        'font-semibold ',
        'after:absolute',
        
        'text-slate-700 ',
        
        'rounded-lg ',
        'transition-all ',
        'active:shadow-xl bg-zinc-950 hover:bg-zinc-950/55 h-9 relative',
        'active:scale-95',
        'after:-inset-1',
        'after:-z-10 ',
        'hover:shadow-xl ',
        'shadow-lg ',
        'after:rounded-lg',
        'after:opacity-100 ',
        
        'bg-gradient-to-r ',
        'from-cyan-300',
        'to-blue-500',
        'hover:from-blue-500',
        'hover:to-cyan-300',
        
        'after:animate-pulse ',
        'after:bg-gradient-to-r ',
        'after:from-emerald-600',
        'after:to-blue-500',
        'after:blur-lg',
);