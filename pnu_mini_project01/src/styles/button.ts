import { clsx } from "clsx";

const commonthings = clsx(
        'font-semibold ',
        'px-0.5 ',
        'py-2 ',
        'after:absolute',
        'z-auto',
        'text-zinc-700',
        'hover:text-white ',
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
);

export const neon_green_button = clsx(
        commonthings,
        'bg-gradient-to-r ',
        'from-lime-300',
        'to-emerald-200',
        'hover:from-lime-500',
        'hover:to-teal-300',
        
        'after:animate-pulse ',
        'after:bg-gradient-to-r ',
        'after:from-lime-600',
        'after:to-indigo-500',
        'after:blur-lg',
);


export const neon_pink_button = clsx(
        commonthings,
        'bg-gradient-to-r ',
        'from-pink-500 ',
        'to-violet-500 ',
        'hover:from-pink-600 ',
        'hover:to-violet-600 ',
        'after:animate-pulse ',
        'after:bg-gradient-to-r ',
        'after:from-pink-600',
        'after:to-violet-600',
        'after:blur-lg',
);

export const neon_orange_button = clsx(
        commonthings,
        'bg-gradient-to-r ',
        'from-orange-300 ',
        'to-yellow-200 ',
        'hover:from-orange-600 ',
        'hover:to-yellow-300 ',
        'after:animate-pulse ',
        'after:bg-gradient-to-r ',
        'after:from-red-600',
        'after:to-yellow-300',
        'after:blur-lg',
);