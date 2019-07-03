import * as http from 'http'
import axios, { AxiosResponse, AxiosRequestConfig, Method, AxiosInstance } from 'axios'

class HttpClient {
    private api: AxiosInstance;
    constructor() {
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
        this.api = axios.create(instanceConfig)
    }
    async  get<T = any>(path: string, data?: object): Promise<T> {
        return await this.handle<T>("GET", path, { params: data });
    }
    async  post<T = any>(path: string, data?: object): Promise<T> {
        return await this.handle<T>("POST", path, { data });
    }
    async  stream<T = http.ServerResponse>(path: string, data?: object): Promise<T> {
        return await this.handle<T>("GET", path, { params: data, responseType: "stream" });
    }
    async  handle<T>(method: Method, path: string, reqConfig?: AxiosRequestConfig): Promise<T> {
        let config: AxiosRequestConfig = {
            method,
            url: path,
        };
        let startTime = Date.now();
        Object.assign(config, reqConfig)
        let response: AxiosResponse;
        try {
            response = await this.api.request(config);
            return response.data as T
        } catch (ex) {
            if (!ex.response) { throw ex; }
            response = ex.response;
            if (this.isStream(response)) {
                let stream = response.data;
                response.data = await new Promise<T>((resolve, reject) => {
                    let cache = '';
                    stream.on('data', (chunk: ArrayBuffer) => { cache += chunk.toString() })
                    stream.on('end', () => { resolve(JSON.parse(cache) as T); })
                })
            }
            throw new Error(JSON.stringify(response.data));
        } finally {
            if (response) {
                console.log(`============== API Invoke ==============
REQUEST  METHOD : ${method}
REQUEST  PATH   : ${axios.getUri(config)}
REQUEST  PARAMS : ${JSON.stringify(config.params || {})}
REQUEST  BODY   : ${JSON.stringify(config.data || {})}
RESPONSE BODY   : ${this.isStream(response) ? '<Stream>' : JSON.stringify(response.data)}
HANDLE   TIME   : ${Date.now() - startTime}ms
========================================`);
            }
        }
    }
    isStream(response: AxiosResponse) {
        return toString.call(response.data.pipe) === "[object Function]";
    }
}
