export type CRUD = {
    GET: string;
    POST: string;
    UPDATE: string;
    DELETE: string;
}

export type jsonform = {
    caller: string;
    receiver: string; 
    method:CRUD;
    status:number;
    url?:string;
    message?:any;
    content:object;
}