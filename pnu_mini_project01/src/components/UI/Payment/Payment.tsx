'use clinet'

import { useState } from "react";
import Resister from "../Register/Register";
import Button01 from "@/components/etc/Button01";
import DefalutLogin from "../Login/DefalutLogin";
import axios from "axios";



export default function Payment( { onclose, jobid } : { onclose : () => void , jobid:string} ) {

    // route.push(`/resultpage/${res.data.spring_response.data.jobid}/payment`)
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-black w-200 h-[600px]">
                <div className="h-px bg-white mt-2" />
                <p className="text-violet-300 font-extrabold">결제</p>
                
                    
                <button onClick={onclose}>닫기</button>
            </div>
        </div>
    );
}