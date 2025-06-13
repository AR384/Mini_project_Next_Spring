import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const body = await req.json();
    const logname = "넥스트 서버 | api log | /login : "
    console.log(logname,' 라우터가 받은 바디 :',body)
    const sptingurl = process.env.SPRING_API;
    try {
        const res = await axios.post(`${sptingurl}/login`,body);
        const response = NextResponse.json(res.headers, { status: 200 });
        return response;
    } catch (error:any) {
        console.error('로그인 요청 실패', error.message, "서버 응답 데이터 : " ,error.response.data);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}