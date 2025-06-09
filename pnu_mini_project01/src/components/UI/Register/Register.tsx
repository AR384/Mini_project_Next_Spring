'use client'

import { RegiserType } from "@/type/registerinfo";
import axios from "axios";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

export default function Register( { onclose } : { onclose : () => void }) {
    const { register , handleSubmit, watch, formState:{ errors } } = useForm<RegiserType>();

    const inputRule = {
        required: "필수입력입니다.",
        pattern:
            {value: /^[a-zA-Z0-9ㄱ-ㅎ가-힣]+$/,message: "형식이 틀림",}
    }
    
    type ResisterInputFiled = {
        type : string;
        placeholder:string;
        autoComplete?: string;
        error?: string;
        registration: ReturnType<typeof register>
    }

    function InputFiled( { type, placeholder, autoComplete, error, registration } : ResisterInputFiled){
        return(
            <div className="mb-2">
                <input
                    type={type}
                    {...registration}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="bg-gray-700 focus:outline-none w-50 p-2 pl-4 m-2"
                />
                {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}
            </div>
        );
    }
    
    const onSubmit = async ( data : RegiserType ): Promise<void> => {
        const payload = { ...data, enabled: true }
        console.log(payload)
            try {
                const response = await axios.post('api/register',payload)
                if ( response.status === 200&& response.data ==='이미 존재하는 아이디 입니다.') {
                    console.log(response.data)
                    alert(response.data)
                }else{
                    alert(response.data)
                    onclose()
                }
            } catch (error) {
                console.error('postSpring error:', error);
            }
        }
    
    return (
        <form className="m-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <InputFiled type="text" placeholder="아이디" autoComplete="username" registration={ register ('username',inputRule)} error={errors.username?.message?.toString()}/>
            <InputFiled type="text" placeholder="비밀번호" autoComplete="password" registration={ register ('password',inputRule)} error={errors.password?.message?.toString()}/>
            <InputFiled type="text" placeholder="닉네임" autoComplete="username" registration={ register ('nickname',inputRule)} error={errors.password?.message?.toString()}/>
            <label className="text-white flex flex-row gap-2 ">
                <input {...register("role", { required: '권한을 선택해주세요' })} type="radio" value="ROLE_MEMBER" /> 일반 사용자
                <input {...register("role", { required: '권한을 선택해주세요' })} type="radio" value="ROLE_ADMIN" /> 관리자 
            </label>
            {errors.role && <p className="text-red-500 text-xs mt-1 ml-2">{errors.role.message?.toString()}</p>}
            <button type="submit" className="bg-gray-700 focus:outline-none w-50 p-2 m-2">등록</button>
        </form>
    );
}