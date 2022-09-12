import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Qs from 'qs';
import { IResponse, IResponseError } from '@/@interfaces';

type HandleInterceptorErrorOnResponse = (error: AxiosError) => void;

type AxiosConfig = {
    handleInterceptorErrorOnResponse?: HandleInterceptorErrorOnResponse;
};

interface AdvancedAxiosRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
    singletonRequestId?: string;
}

interface AdvancedAxiosResponse<T = IResponse, D = IResponse> extends AxiosResponse<T, D> {
    config: AdvancedAxiosRequestConfig<D>;
}

type ResponseErrors = IResponse<Record<string, string[]>>;
type ResponseWithErrors = IResponseError<Record<string, string[]>>;

export class HttpClient {
    private readonly instance: AxiosInstance;
    private readonly handleInterceptorErrorOnResponse?: HandleInterceptorErrorOnResponse;

    constructor(baseURL: string, config?: AxiosConfig) {
        this.instance = axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                Accept: 'application/json',
            },
        });

        this.handleInterceptorErrorOnResponse = config?.handleInterceptorErrorOnResponse;
        this.initializeSingletonRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.request.use((config: AdvancedAxiosRequestConfig) => {
            config.paramsSerializer = <T>(params: T) => Qs.stringify(params);
            return config;
        });

        this.instance.interceptors.response.use(this.handleResponse, this.handleError);
    };

    private handleResponse = (response: AdvancedAxiosResponse): IResponse => {
        const { data, meta } = response.data;
        return {
            data,
            meta,
        };
    };

    private handleError = (error: AxiosError): Promise<AxiosError> => {
        this.handleInterceptorErrorOnResponse?.(error);
        return Promise.reject(error);
    };

    public get<T = IResponse, R = AxiosResponse<T>, D = unknown>(
        url: string,
        config?: AdvancedAxiosRequestConfig<D>
    ): Promise<T> {
        return this.instance.get(url, config);
    }

    public post<T = IResponse, R = AxiosResponse<T>, D = unknown>(
        url: string,
        data?: D,
        config?: AdvancedAxiosRequestConfig<D>
    ): Promise<T> {
        return this.instance.post(url, data, config);
    }

    public put<T = IResponse, R = AxiosResponse<T>, D = unknown>(
        url: string,
        data?: D,
        config?: AdvancedAxiosRequestConfig<D>
    ): Promise<T> {
        return this.instance.put(url, data, config);
    }

    public delete<T = IResponse, R = AxiosResponse<T>, D = unknown>(
        url: string,
        config?: AdvancedAxiosRequestConfig<D>
    ): Promise<T> {
        return this.instance.delete(url, config);
    }

    private initializeSingletonRequestInterceptor = () => {
        if (typeof AbortController === 'undefined') {
            return;
        }
        const singletonRequests: {
            [key: string]: (() => void) | undefined;
        } = {};

        function getSingletonRequestId(config: AdvancedAxiosRequestConfig) {
            return config?.singletonRequestId;
        }

        function deleteSingletonRequest(id: string) {
            singletonRequests[id] = undefined;
        }

        this.instance.interceptors.request.use((config: AdvancedAxiosRequestConfig) => {
            const singletonRequestId: string | undefined = getSingletonRequestId(config);
            if (singletonRequestId) {
                singletonRequests[singletonRequestId]?.();
                const controller: AbortController = new AbortController();
                config.signal = controller.signal;
                singletonRequests[singletonRequestId] = () => {
                    if (singletonRequests[singletonRequestId]) {
                        deleteSingletonRequest(singletonRequestId);
                        controller.abort();
                    }
                };
            }
            return config;
        });
        this.instance.interceptors.response.use((response: AdvancedAxiosResponse) => {
            const singletonRequestId: string | undefined = getSingletonRequestId(response?.config);
            if (singletonRequestId) {
                deleteSingletonRequest(singletonRequestId);
            }
            return response;
        });
    };

    public isCancel = (error: Error | IResponseError) => axios.isCancel(error);

    /**
     * Get error message from response
     * @param error {ResponseWithErrors}
     */
    public getErrorMessage = (error?: ResponseWithErrors) => {
        const data: ResponseErrors | undefined = error?.response?.data || (error as ResponseErrors);
        const title: string | undefined = data?.meta?.message;
        return [
            title,
            ...Object.values(data?.data && typeof data?.data === 'object' ? data.data : {})
                .map((value: string[]) => value)
                .flat(),
        ]
            .filter(Boolean)
            .join(' ');
    };

    /**
     * Get promise rejection with error message from response
     * @param error {IResponse}
     */
    public processError = (error?: ResponseWithErrors) => Promise.reject(Error(this.getErrorMessage(error)));
}
