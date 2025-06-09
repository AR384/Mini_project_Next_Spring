import Button01 from "@/components/etc/Button01";
import axios from "axios";
import Image from "next/image";

export default function SocialLogin() {
    const w = 30;
    const h = 30;
    
    // 로그인 프로세스 oauth2
    const handleClick = async (provider: string) => {
        try {
            const res = await axios.post('/api/login/oauth2', { provider, returnTo: window.location.origin, }, { withCredentials: true });
            if (res.data && res.data.redirectUrl) {
                window.location.href = res.data.redirectUrl;
            }
        } catch (error) {
            console.error("OAuth 로그인 실패:", error);
        }
    };

    return (
        <div className="flex flex-row">
            <button onClick={()=>handleClick('google')}>
                <Image 
                    src='/icons/icons8-google64.png'
                    alt="google icon"
                    width={w}
                    height={h}
                    />
            </button>
            <button onClick={()=>handleClick('naver')}>
                <Image 
                    src='/icons/icons8-naver.png'
                    alt="google icon"
                    width={w}
                    height={h}
                    />
            </button>
            <button onClick={()=>handleClick('github')}>
                <Image 
                    src='/icons/icons8-github64.png'
                    alt="google icon"
                    width={w}
                    height={h}
                    />
            </button>
            <button onClick={()=>handleClick('kakaotalk')}>
                <Image 
                    src='/icons/icons8-kakaotalk-48.png'
                    alt="google icon"
                    width={w}
                    height={h}
                    />
            </button>
        </div>
    );
}