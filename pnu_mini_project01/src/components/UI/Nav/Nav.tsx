'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button01 from "@/components/etc/Button01";
import LoginModal from "../Login/LoginModal";
import { useAtom } from "jotai";
import { Logininfo } from "@/type/logininfo";
import { isLoginAtom } from "@/atoms/IsLoginAtom";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";
import { redirect, usePathname, useRouter } from "next/navigation";


export default function Nav() {

    // 로그인모달창 처리
    const [open,setOpen] = useState(false)
    // 모델선택모달창 처리
    const [chooseModel,setchooseModel] = useState(false)
    //로그인 상태 관리
    const [loginstate,setloginstate] = useAtom<Logininfo>(isLoginAtom)
    //로그인 정보 불러오기 & 에러 메세지 처리
    useEffect(()=>{
            //Oauth유저 로그인시 쿠키확인용
            const checkOauthUser = async()=>{
                try {
                    const res = await axios.get('/api/login/oauth2', { withCredentials: true });
                    return res.data; // 응답 데이터를 반환 쿠키헤더에서 토큰 읽어서 세션에 저장 할지 물어볼것
                } catch (error) {
                    console.error("OAuth2 사용자 정보 가져오기 실패:", error);
                    return null; // 오류 발생 시 null 반환
                }
            }
            //로그인 정보 불러오기
            const getUserInfo = async ()=>{
                const sessionToken = sessionStorage.getItem('jwtToken')?.trim()||""; // DB유저 확인 Session 토큰 확인
                const oauth2user =await checkOauthUser(); // Oauth2유저 확인 True False
                //토큰 이나 쿠키가 있으면 로그인 유저 확인
                if (oauth2user.isOAuthLoggedIn|| sessionToken.length>0){
                    try {
                        const res  = await axios.get('/api/login/userinfo',{headers:{Authorization : sessionToken},withCredentials:true});
                        setloginstate(res.data); 
                        if (res.data.message) {

                        }
                    } catch (error:any) {
                        console.error("유저 불러오기 실패 Nav : ", error.response?.data?.error);
                        const errmsg = error.response?.data?.error.message
                        const keyword = 'The Token has expired on'
                        if (errmsg && JSON.stringify(errmsg).includes(keyword)) {
                            console.log("getUserInfo - 토큰만료");
                            sessionStorage.removeItem('jwtToken');
                            setloginstate({
                                isLogin: 'logged-out',
                                nickname: '',
                                logintype: '',
                                role: undefined,
                                username: ''
                            });
                        }
                    }
                }
            }
            //다른페이지에서 왔을때 에러 확인후 출력용
            const params = new URLSearchParams(window.location.search)
            const errorMessage = params.get("error");
    
            if (errorMessage) {
                alert("결과를 로딩할 수 없음: 서버 문제 확인 필요");
                redirect('/')
            }
            getUserInfo();
    },[loginstate.isLogin])
    //로그아웃 api요청 로그아웃에서 세션 토큰 삭제 방식으로 바꿈
    const handleLogout = async () => {
        sessionStorage.removeItem('jwtToken');
        setloginstate({
            isLogin: 'logged-out',
            nickname: '',
            logintype: '',
            role: undefined,
            username: ''
        });
        
    };

    return (
        <div className="bg-pink-800 space-y-2 space-x-3 flex flex-col items-center justify-center">
            
            <div className="flex flex-row flex-wrap gap-2">
                <Link href="/about">페이지1</Link>
                <Link href="/about">페이지1</Link>
                <Link href="/about">페이지1</Link>
                {loginstate.isLogin==='logged-in' ? (
                <Button01 caption="로그아웃" bg_color="orange" onClick={handleLogout} />
                ) : (
                <>
                <Button01 caption="로그인" bg_color="blue" onClick={() => setOpen(true)} />
                {open && <LoginModal onclose={() => setOpen(false)} />}
                </>
                )}
            </div>
            

            <div>로그인 유저 : {loginstate.nickname}</div>
            <div>로그인 타입 : {loginstate.logintype}</div>
            <div>로그인 권한 : {loginstate.role}</div>
            <div>로그인 아이디  : {loginstate.username}</div>
            <div>로그인 상태 : {loginstate.isLogin}</div>
        </div>
    );
}