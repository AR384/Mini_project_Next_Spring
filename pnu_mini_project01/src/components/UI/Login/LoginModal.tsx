'use clinet'

import { useState } from "react";
import Resister from "../Register/Register";
import DefalutLogin from "./DefalutLogin";
import Button01 from "@/components/etc/Button01";
import SocialLogin from "./SocialLogin";

export default function LoginModal( { onclose } : { onclose : () => void} ) {
    
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-black w-200 h-[600px]">
                <div className="flex flex-row p-2 gap-2 ">
                    <Button01 caption="로그인" bg_color={formType === 'login' ? 'orange' : 'blue'} onClick={ () => setFormType('login')} />
                    <Button01 caption="회원가입" bg_color={formType === 'register' ? 'orange' : 'blue'} onClick={ () => setFormType('register')}/>
                </div>
                <div className="h-px bg-white mt-2" />
                <p className="text-violet-300 font-extrabold">소셜로그인</p>
                <SocialLogin/>
                {/* 모달창 전환 */}
                {formType === 'login' ? <DefalutLogin onclose = {onclose}/> : <Resister onclose={onclose}/>}
                <button onClick={onclose}>닫기</button>
            </div>
        </div>
    );
}