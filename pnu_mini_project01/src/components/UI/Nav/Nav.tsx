'use client'

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Button01 from "@/components/etc/Button01";
import LoginModal from "../Login/LoginModal";
import { useAtom } from "jotai";
import { Logininfo } from "@/type/logininfo";
import { isLoginAtom } from "@/atoms/IsLoginAtom";
import axios from "axios";

export default function Nav() {
    // 로그인모달창 처리
    const [open,setOpen] = useState(false)
    //로그인 상태 관리
    const [loginstate,setloginstate] = useAtom<Logininfo>(isLoginAtom)
    //이미지 업로드 테스트
    const fileInputRef = useRef<HTMLInputElement>(null);
    const onButtonClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        fileInputRef.current?.click();
        console.log(fileInputRef.current)
    };
    
    //로그인 정보 불러오기
    useEffect(()=>{
            const getUserInfo = async ()=>{
                try {
                    const res  = await axios.get('/api/login/userinfo',{withCredentials:true});
                    console.log('응답 데이터 : ',res.data);
                    setloginstate(res.data); 
                    
                } catch (error:any) {
                    console.error("유저 불러오기 실패 Nav : ", error.response?.data?.error);
                }
            }
            getUserInfo();
    },[])
    
    //로그아웃
    const handleLogout = async () => {
        try {
            const res = await axios.post('api/logout',{},{withCredentials:true})
            if (res.status===200) {
                setloginstate({isLogin:'logged-out'})
            }
        } catch (error:any) {
            console.log(error.response.data.error)
        }
    };
    
    return (
        <div className="bg-pink-800 space-y-1">
            
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
            <form action="/" method="post" >
                <input ref={fileInputRef} className="bg-fuchsia-400" type="file" name="file" accept="image/*" capture="environment" style={{display:"none"}}/>
                    <button className="bg-fuchsia-400 px-4 py-2" onClick={onButtonClick}>
                        사진업로드
                    </button>
                <button type="submit">업로드</button>
            </form>
            <div>로그인 유저 : {loginstate.nickname}</div>
            <div>로그인 타입 : {loginstate.logintype}</div>
            <div>로그인 권한 : {loginstate.role}</div>
            <div>로그인 아이디  : {loginstate.username}</div>
            <div>로그인 상태 : {loginstate.isLogin}</div>
        </div>
    );
}