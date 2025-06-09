'use client'
import { MouseEvent } from "react";

type Button01Color = "blue" | "orange" | "lime";

interface Button01Props {
    caption : string,
    bg_color : Button01Color,
    onClick? : (e:MouseEvent<HTMLButtonElement>) => void
}

export default function Button01({caption, bg_color, onClick}: Button01Props) {
    const bg = {
        'blue': 'bg-blue-700',
        'orange': 'bg-orange-700',
        'lime': 'bg-lime-700'
    }
    
    const bgHover = {
        'blue': 'hover:bg-blue-400',
        'orange': 'hover:bg-orange-400',
        'lime': 'hover:bg-lime-400'
    }
    return(
        <button onClick={onClick} className={`${bg[bg_color]} ${bgHover[bg_color]} font-bold p-1.5`}>
            {caption}
        </button>
    );
}