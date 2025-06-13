'use client'

import { useEffect, useRef, useState } from "react";
import ImgSelectButton from "./imgSelectButton";
import Polybutton from "./polybutton";



export default function ResultRender({ result, jobid }: { result: ResultImage; jobid: string }) {
    const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
    const [selectedname, setSelectedname] = useState<string[]>([]);
    const [imwidth, setwidth] = useState<number>();
    const [imheight, setheight] = useState<number>();
    useEffect(() => {
        console.log("업데이트된 itemlist:", selectedIdx );
        if (selectedIdx.length>=result.names.length) {
            console.log("최대선택")
        }
        selectedIdx.map(i=>console.log("선택한 내용 : ",result.names[i]))
        setSelectedname(selectedIdx.map(i => result.names[i]))
    }, [selectedIdx]);
    
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
    const img = imgRef.current;
    console.log(img)
    if (img && img.complete) {
        console.log("Original size:", img.naturalWidth, img.naturalHeight);
    }
    }, [result.image_base64]);
    
    const handleonLoad = (e:any) =>{
        const img = e.target as HTMLImageElement;
        setTimeout(() => setwidth(img.width), 100);
        setTimeout(() => setheight(img.height), 100);
        setTimeout(() => console.log(img.width), 100);
        
    }
    
    return (
        <div className="">
            <div className="relative ">
                {/* <img src={result.image_base64} alt="result" className="max-w-full h-auto border" onLoad={(e) => { const img = e.target as HTMLImageElement; console.log(img.width); }} /> */}
                
                <img
                src={result.image_base64}
                alt="result"
                className="max-w-full h-auto border pointer-events-none"
                onLoad={handleonLoad}
                />
                <svg  className="absolute z-0 inset-0 min-w-full min-h-full  ">
                    <Polybutton names={result.names} poly={result.poly} jobid={jobid} setSelectedIdx={setSelectedIdx} selectedIdx={selectedIdx} />
                </svg>
            </div>
            <div className='flex flex-row justify-center items-center mt-2'>
                {imwidth},{imheight}
                현재 선택:{selectedIdx.map(i=><span className="bg-fuchsia-800 flex flex-row gap-2 m-2 w-fit">{result.names[i]}</span>)}
            </div>
            <ImgSelectButton selectedIdx={selectedIdx} result={result} jobid={jobid} selectedname={selectedname}/>
        </div>
    );
}
