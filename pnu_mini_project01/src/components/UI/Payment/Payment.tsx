'use clinet'

import { useState } from "react";
import Resister from "../Register/Register";
import Button01 from "@/components/etc/Button01";
import DefalutLogin from "../Login/DefalutLogin";
import axios from "axios";



export default function Payment<T>( { onclose, jobid, data } : { onclose : () => void , jobid:string, data:any} ) {
    const sorteditems = data;
    console.log("품목",sorteditems)
    {(sorteditems.map((i: any) => i.map((i:any)=>{
        const a = parseInt(i.수수료)
        
    })))}
    // route.push(`/resultpage/${res.data.spring_response.data.jobid}/payment`)
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-black w-200 h-[600px]">
                <div className="h-px bg-white mt-2" />
                    <div className="flex flex-col">
                        {(sorteditems.map((i: any) => i.map((i:any)=><span key={i}>{i.연번} {i.품명} {i.규격} {i.수수료}원</span>)))}
                    </div>
                    <div>
                    총 수수료: {
                        sorteditems
                        .flat() // 중첩 배열을 평탄화
                        .reduce((total:number, item:any) => total + (parseInt(item.수수료) || 0), 0)
                    }원
                    </div>
                <p className="text-violet-300 font-extrabold">결제</p>
                <button onClick={onclose}>닫기</button>
            </div>
        </div>
    );
}