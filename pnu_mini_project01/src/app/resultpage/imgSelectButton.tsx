'use client'
import Button01 from "@/components/etc/Button01";
import axios from "axios";

type Props  = {
    selectedIdx:number[]
    result:ResultImage;
    jobid: string;
    selectedname:string[]
}

export default function ImgSelectButton( {selectedIdx,result,jobid,selectedname}:Props ) {
    const handleClick = () => {
        console.log('클릭됨!');
    };
    const imgPermtTOPython = async () => {
        console.log(jobid)
        console.log(selectedIdx)
        console.log(selectedname)
        try {
            const res = await axios.post('/api/imgPermit',{jobid,selectedIdx,selectedname},{headers:{"Content-Type":'application/json'},withCredentials:true})
            
        } catch (error:any) {
            
        }
    }
    
    return (
        <div className="mt-2">
            <div className="flex flex-row justify-center items-center gap-2">
                <Button01 caption="승인" bg_color="blue" onClick={imgPermtTOPython} />
                <Button01 caption="거절" bg_color="blue" onClick={handleClick} />
            </div>
        </div>
    );
}