import * as http from 'http'
import { AxiosResponse, AxiosRequestConfig, Method, AxiosInstance } from 'axios'

let api: AxiosInstance;

export async function get<T>(path: string, data?: object): Promise<T> {
    return await handle<T>("GET", path, { params: data });
}

export async function post<T>(path: string, data?: object): Promise<T> {
    return await handle<T>("POST", path, { data });
}

export async function del<T>(path: string, data?: object): Promise<T> {
    return await handle<T>("DELETE", path, { params: data });
}

export async function stream<T = http.ServerResponse>(path: string, data?: object): Promise<T> {
    return await handle<T>("GET", path, { params: data, responseType: "stream" });
}

export function getUri(path: string, data?: object) {
    return api.getUri({
        url: path,
        params: data
    })
}

async function handle<T>(method: Method, path: string, reqConfig?: AxiosRequestConfig): Promise<T> {
    let config: AxiosRequestConfig = {
        method,
        url: path,
        ...reqConfig
    };
    let startTime = Date.now();
    let response: AxiosResponse;
    try {
        response = await api.request(config);
        return response.data as T
    } catch (ex) {
        if (!ex.response) { throw ex; }
        response = ex.response;
        if (response.status > 299 && config.responseType == "stream") {
            let stream = response.data;
            response.data = await new Promise<T>((resolve, reject) => {
                let cache = '';
                stream.on('data', (chunk: ArrayBuffer) => {
                    cache += chunk.toString()
                })
                stream.on('end', () => {
                    resolve(JSON.parse(cache) as T);
                })
            })
        }
        throw new Error(JSON.stringify(response.data));
    } finally {
        if (response) {
            console.log(`========== Docker API Invoke ==========
REQUEST  METHOD : ${method}
REQUEST  PATH   : ${response.request.path}
REQUEST  PARAMS : ${config.params ? JSON.stringify(config.params) : ''}
REQUEST  BODY   : ${config.data ? JSON.stringify(config.data) : ''}
RESPONSE BODY   : ${toString.call(response.data.pipe) === "[object Function]" ? '<Stream>' : JSON.stringify(response.data)}
HANDLE   TIME   : ${Date.now() - startTime}ms
=======================================`);
        }
    }
}
