'use client'
import { isLoginAtom } from "@/atoms/IsLoginAtom";
import { Logininfo } from "@/type/logininfo";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function DefalutLogin( { onclose } : { onclose : ()=>void}) {
    
    const { register , handleSubmit } = useForm();
    const [, setLoginSate] = useAtom<Logininfo>(isLoginAtom);
    const router = useRouter();
    // 로그인 프로세스
    const onSubmit = async ( data : any ) => {
        try {
            const response = await axios.post('api/login',data,{withCredentials:true})
            if (response.status===200) {
                setLoginSate({ isLogin: "logged-in" })
                const cookie = response.data['set-cookie'][0]
                const token = cookie.split(";")[0].split('=')[1]
                sessionStorage.setItem('jwtToken', `Bearer ${token}`)
                toast.success("로그인성공",{autoClose: 1000})
                setTimeout(() => {
                    onclose(); // 모달 닫기
                    router.push('/'); // 홈으로 자연스럽게 이동
                }, 1000);
            }
        } catch (error:any) {
            console.log(error.response.data.error)
            console.log(error.response)
        }
    }
    
    return (
            <form className="m-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username",{required:true})}  placeholder="아이디" autoComplete="username" className="bg-gray-500 focus:outline-none w-50 p-2 pl-4 m-2"/>
                <input type="password" {...register("password",{required:true})} placeholder="비밀번호" autoComplete="current-password" className="bg-gray-700 focus:outline-none w-50 p-2 pl-4 m-2"/>
                {/* <input type="password2" {...register("password2",{required:true})} placeholder="비밀번호2" autoComplete="current-password" className="bg-gray-700 focus:outline-none w-50 p-2 pl-4 m-2"/> */}
                <button type="submit" className="bg-gray-700 focus:outline-none w-50 p-2 m-2">로그인</button>
            </form>
    );
}