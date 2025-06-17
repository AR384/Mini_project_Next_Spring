'use client'
import Button01 from "@/components/etc/Button01";
import Payment from "@/components/UI/Payment/Payment";
import axios from "axios";
import React, { useState } from "react";


export default function ImgSelectButton({ permitRequest, setSelectedIdx, }:{permitRequest:ImagePermitRequestDTO,setSelectedIdx: React.Dispatch<React.SetStateAction<number[]>>;} ) {
    const [payment , setpayment] = useState<React.JSX.Element>();
    const handleClick = () => {
        console.log('클릭됨!');
        setSelectedIdx([])
    };
    const imgPermtTOPython = async () => {
        console.log("ImgSelectButton - 승인",permitRequest.jobid)
        console.log("ImgSelectButton - 승인",permitRequest.selectedIdx)
        console.log("ImgSelectButton - 승인",permitRequest.selectedname)
        try {
            const res = await axios.post('/api/imgPermit',permitRequest,{headers:{"Content-Type":'application/json'},withCredentials:true})
            console.log("승인 결과 응답",res.data)
            if (res.data.spring_response.status==='200'&&res.status==200) {
                setpayment(<Payment onclose={() => setpayment(undefined)} jobid={permitRequest.jobid} />)
            }
        } catch (error:any) {
            console.error("API 호출 실패:", error.response?.data || error.message)
        }
    }
    
    return (
        <div className="mt-2">
            <div className="flex flex-row justify-center items-center gap-2">
                <Button01 caption="승인" bg_color="blue" onClick={imgPermtTOPython} />
                <Button01 caption="초기화" bg_color="blue" onClick={handleClick} />
            </div>
            {payment}
        </div>
    );
}