export type IResponseData = Record<string, unknown>;

export type IDefaultResponseDataType = IResponseData;

export interface IResponse<T = IDefaultResponseDataType> {
    Data: T;
}

export interface IResponseError<T = IDefaultResponseDataType> {
    response?: {
        Data?: IResponse<T>;
    };
}
