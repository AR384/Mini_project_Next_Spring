import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    /*formdata형태로 받아야함 
        FormData {
            image: File {
                                size: 875135,
                                type: 'image/jpeg',
                                name: '부차트가든2.jpg',
                                lastModified: 1749487689032
                                }
                            }
    req.formData()로 받은 FormData는 Web API 기준의 객체
    Node.js용 axios는 이 Web API의 FormData를 처리할 수 없음
    axios는 내부적으로 Node.js의 HTTP 스트림을 사용하기 때문에, 
    실제 파일 데이터 (stream/buffer) 를 직접 넣어줘야함*/
    const formData = await req.formData();
    const file = formData.get('image');
    
    
    if (!file || typeof file === 'string') {
        return NextResponse.json({ error: '이미지를 찾을 수 없습니다.' }, { status: 400 });
    }
    
    /* 
    Axios가 boundary 등 multipart 전송 형식을 만들지 못함
    Axios 내부에서 formData.get('image')가 Blob이 아닌 단순 object로 인식
    multipart/form-data 요청이 제대로 포맷되지 않음 → Spring에서 MultipartFile 못 받음
    buffer	파일의 이진 데이터
    Blob	Axios가 multipart 파일로 처리할 수 있는 포맷
    filename	Content-Disposition 헤더를 올바르게 만들기 위해 필요
    */
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = (file as File).name;
    const mimetype = (file as File).type;
    
    console.log('파일 이름:', filename);
    console.log('파일 크기:', buffer.length);
    console.log('파일 타입:', mimetype);
    // Spring으로 보낼 FormData 구성
    const serverFormData = new FormData();
    serverFormData.append('image', new Blob([buffer], { type: mimetype }), filename);
    
    const sptingurl = process.env.SPRING_API;
    try {
        const res = await axios.post(
            `${sptingurl}/imgToPython`,
            serverFormData,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
        )
        console.log(res.data)
        return NextResponse.json({message: '파일전송성공', springresponse:res.data})
    } catch (error:any) {
        console.error("Spring 서버 전송 실패", error.message, "서버 응답 데이터 : " ,error.response.data);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}