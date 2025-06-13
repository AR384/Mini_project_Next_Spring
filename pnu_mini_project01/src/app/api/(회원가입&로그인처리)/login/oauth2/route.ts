import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const sptingurl = process.env.SPRING_API;

    const {provider , returnTo} = await req.json()
    const logname = "넥스트 서버 | api/login/oauth2 | "
    console.log(logname,'provider : ',provider,' returnTo ',returnTo)

    const redirectUrl = `${sptingurl}/oauth2/authorization/${provider}`;
    return NextResponse.json({ redirectUrl });
}

export async function GET(req: NextRequest) {
    const userCookies = req.headers.get("cookie") || "";

    // OAuth2 로그인 여부 확인 == 쿠키 존재 여부
    const isOAuthLoggedIn = userCookies.includes("jwtToken");

    return NextResponse.json({ isOAuthLoggedIn });
}
