import { ServerResponse } from 'http'
import axios, { AxiosInstance, AxiosRequestConfig, Method, AxiosResponse } from 'axios';
export interface DockerApiClient {
    get<T>(path: string, data?: object): Promise<T>;
    post<T>(path: string, data?: object): Promise<T>;
    del<T>(path: string, data?: object): Promise<T>;
    stream<T = ServerResponse>(path: string, data?: object): Promise<T>;
    getUri(path: string, data?: object): string;
}

class DefaultDockerApiClient implements DockerApiClient {
    private api: AxiosInstance;
    constructor(host: string = process.env.DOCKER_HOST) {
        const instanceConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (host.startsWith("/")) {
            instanceConfig.socketPath = host
        } else {
            instanceConfig.baseURL = host
        }
        this.api = axios.create(instanceConfig)
    }
    async get<T>(path: string, data?: object): Promise<T> {
        return await this.handle<T>("GET", path, { params: data });
    }

    async post<T>(path: string, data?: object): Promise<T> {
        return await this.handle<T>("POST", path, { data });
    }

    async del<T>(path: string, data?: object): Promise<T> {
        return await this.handle<T>("DELETE", path, { params: data });
    }

    async stream<T = ServerResponse>(path: string, data?: object): Promise<T> {
        return await this.handle<T>("GET", path, { params: data, responseType: "stream" });
    }

    getUri(path: string, data?: object): string {
        return this.api.getUri({
            url: path,
            params: data
        })
    }

    async handle<T>(method: Method, path: string, reqConfig?: AxiosRequestConfig): Promise<T> {
        let config: AxiosRequestConfig = {
            method,
            url: path,
            ...reqConfig
        };
        let startTime = Date.now();
        let response: AxiosResponse;
        try {
            response = await this.api.request(config);
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

}

export default new DefaultDockerApiClient();
