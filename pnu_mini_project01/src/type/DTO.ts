interface ApiResponseDTO<T>{
    status: string;
    message: string;
    data: T;
}
interface ImageUploadRequestDTO{
    image:File;
    username:string;
}

interface ImageUploadResponseDTO {
    jobid: string;
    username: string;
}

interface ImageProcessResultDTO {
    message: string;
    image_base64: string;
    status: string;
    poly: string[];
    names:string[];
    type:string[];
    viewSize:string[];
}

interface ImagePermitRequestDTO{
    jobid:string;
    selectedIdx:number[]
    selectedname:string[]

}

