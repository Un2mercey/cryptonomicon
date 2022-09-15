export type ResponseData = Record<string, unknown>;

export type DefaultResponseDataType = ResponseData;

export interface Response<T = DefaultResponseDataType> {
    Data: T;
}

export interface ResponseError<T = DefaultResponseDataType> {
    response?: {
        Data?: Response<T>;
    };
}
