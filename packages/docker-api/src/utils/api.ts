import * as http from 'http'
import axios, { AxiosResponse, AxiosRequestConfig, Method, AxiosInstance } from 'axios'

let api: AxiosInstance;

export async function get<T>(path: string, data?: object): Promise<T> {
    return await handle<T>("GET", path, { params: data });
}

export async function post<T>(path: string, data?: object): Promise<T> {
    return await handle<T>("POST", path, { data });
}

export async function stream<T = http.ServerResponse>(path: string, data?: object): Promise<T> {
    return await handle<T>("GET", path, { params: data, responseType: "stream" });
}

async function handle<T>(method: Method, path: string, reqConfig?: AxiosRequestConfig): Promise<T> {
    let config: AxiosRequestConfig = {
        method,
        url: path,
    };
    let startTime = Date.now();
    Object.assign(config, reqConfig)
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
        // console.log(`${method} ${path} HTTP/1.1
        // ${config.data ? JSON.stringify(config.data, null, 2) + '\n' : ''}
        // HTTP/1.1 ${response.status} ${response.statusText}
        // ${config.responseType != 'stream' ? JSON.stringify(response.data, null, 2) : config.responseType}`);
    }
}

function init() {
    const instanceConfig: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 5000
    }
    if (process.env.DOCKER_HOST.startsWith("/")) {
        instanceConfig.socketPath = process.env.DOCKER_HOST
    } else {
        instanceConfig.baseURL = process.env.DOCKER_HOST
    }
    api = axios.create(instanceConfig)
}

init();
