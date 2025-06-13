import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    console.log('헤더',req.headers)
    const { jobid, selectedIdx,selectedname } = await req.json();
    if (!jobid || Array.isArray(selectedIdx)) {
        
    }
    console.log('바디', { jobid, selectedIdx , selectedname})
    const sptingurl = process.env.SPRING_API;
    try {
        const res = await axios.post(`${sptingurl}/imgpermitTopython/${jobid}`,{jobid, selectedIdx , selectedname},{headers:{'Content-Type':'application/json'},withCredentials:true})
        console.log("서버응답",res.status)
        console.log(`${sptingurl}/imgpermitTopython/${jobid}`)
        
        return NextResponse.json({message: '파일전송성공', springresponse:res.data}) 
    } catch (error:any) {
        
    }
}