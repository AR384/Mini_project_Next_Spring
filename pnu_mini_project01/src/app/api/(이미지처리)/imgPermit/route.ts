import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    console.log('이미지 선택 후 헤더',req.headers)
    // const text = await req.text();
    // console.log('Raw body text:', text);
    // const { jobid, selectedIdx,selectedname } = await req.json();
    const body = await req.json()
    const { jobid, selectedIdx, selectedname } = body || {};
    console.log("바디",body)
    console.log('req.json 값 =>', { jobid, selectedIdx , selectedname})
    if (!jobid ) {
        return NextResponse.json({ error: "잘못된 요청 데이터" }, { status: 400 });
    }
    
    const sptingurl = process.env.SPRING_API;
    try {
        const res = await axios.post(`${sptingurl}/api/inference/${jobid}/permission`,{jobid, selectedIdx , selectedname},{headers:{'Content-Type':'application/json'},withCredentials:true})
        console.log("/fastapi/inference/{jobid}/permission 서버응답",res.status)
        console.log(res.data)
        
        return NextResponse.json({message: '데이터전송성공', spring_response:res.data}) 
    } catch (error:any) {
        console.error('Spring API 요청 실패:', error);
        return NextResponse.json({ error: "서버 요청 실패" }, { status: 500 });
    }
}