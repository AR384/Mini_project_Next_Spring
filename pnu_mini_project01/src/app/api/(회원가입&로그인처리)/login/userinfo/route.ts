import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const sptingurl = process.env.SPRING_API;
    const logname = "넥스트 서버 | api log | login/userinfo : "
    //jwtToken 가져오기 
    const token = req.headers.get('authorization') || "";
    
    // 쿠키 가져오기 Oauth2 로그인->서버로 요청->토큰발급->쿠키발급->페이지 리로드
    const cookie = req.headers.get("cookie") || "";
    
    console.log(logname,req.headers)
    try {
        const res = await axios.get(`${sptingurl}/loged-in/user`,{headers : {authorization:token,cookie:cookie}})
        return NextResponse.json( res.data, {status : 200});
    } catch (error:any) {
        
        console.error("유저 정보 요청 실패", error.message, "서버 응답 데이터 : " ,error.response.data);
        
        return NextResponse.json({ error: error.response.data }, { status: 401 });
    }
}