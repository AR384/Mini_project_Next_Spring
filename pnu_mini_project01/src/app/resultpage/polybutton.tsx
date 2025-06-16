'use client'

import React, { useEffect, useState } from "react";
import { number } from "framer-motion";
import { caption, style } from "framer-motion/client";

type props ={
    names:string[];
    poly:string[];
    jobid:string;
    selectedIdx:number[]
    setSelectedIdx: React.Dispatch<React.SetStateAction<number[]>>; //디스페치 안할경우 세터로서만 쓰고 함수 업데이트 형태를 받도록 선언되지 않아서 발생
}

export default function Polybutton({ names, poly, jobid,selectedIdx,setSelectedIdx }: props) {
    const [draw, setDraw] = useState<React.JSX.Element[] | undefined>(undefined)
    
    
    const togglePolygon = (id: number) => {
        setSelectedIdx((prev) => {
            const hasId = prev.includes(id);
            return hasId ? prev.filter((x) => x !== id) : [...prev, id];
        });
    };
    
    useEffect(()=>{
        const getRandomColor = () =>{
            const colors =  [
                'fill-red-400', 'fill-blue-400', 'fill-green-400', 'fill-yellow-400', 'fill-pink-400',
                'fill-fuchsia-600', 'fill-orange-600', 'fill-yellow-600', 'fill-yellow-600', 'fill-pink-600',
                'fill-purple-800', 'fill-blue-300', 'fill-amber-600', 'fill-yellow-800', 'fill-pink-800',
            ];
            // Fisher-Yates shuffle
            for (let i = colors.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [colors[i], colors[j]] = [colors[j], colors[i]];
            }
            return colors;
        }
        
        const shuffledColors = getRandomColor();
        
        const myPolys = names.map((name: string, index: number) => (
            <polygon
                points={poly[index]}
                key={index}
                className={`opacity-65 ${shuffledColors[index % shuffledColors.length]} animate-pulse hover:fill-emerald-600 hover:animate-shake`}
                onMouseUp={ ()=>togglePolygon(index) }
            />
        ));
        setDraw(myPolys)
        
    },[])
    
    return (
        <>
            {
                draw
            }
        </>
    );
}