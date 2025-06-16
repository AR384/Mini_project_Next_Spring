'use client'
import Button01 from "@/components/etc/Button01";
import axios from "axios";


export default function ImgSelectButton({ permitRequest, setSelectedIdx, }:{permitRequest:ImagePermitRequestDTO,setSelectedIdx: React.Dispatch<React.SetStateAction<number[]>>;} ) {
    
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
        </div>
    );
}