import { HttpStatusCode } from '@/utils/HttpClient/constants';

export interface IResponseMeta {
    status_code: HttpStatusCode;
    message: string;
}

export type IResponseData = Record<string, unknown>;
export type IResponseDataArray = Array<string | null | number>;
export type IResponseDataType = IResponseData | IResponseData[] | [] | IResponseDataArray;

export type IDefaultResponseDataType = IResponseData | IResponseData[] | [] | IResponseDataArray;

export interface IResponse<T = IDefaultResponseDataType> {
    data: T;
    meta: IResponseMeta | null;
}

export interface IResponseError<T = IDefaultResponseDataType> {
    response?: {
        data?: IResponse<T>;
    };
    meta: IResponseMeta | null;
}
