import * as faas from './interfaces'
import axios, { AxiosRequestConfig } from 'axios'

const instanceConfig: AxiosRequestConfig = {
    baseURL: 'https://faas.yumc.pw',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46MmQ2MzdiYzQ4MWQxYThhMjg2M2E2ZTIzOTY1ZWRlNDI0ZTRjMTk2OTQyMzU5N2M5MzRlNGQyY2FlZTNkMjk2OA=='
    },
    timeout: 5000
}

let api = axios.create(instanceConfig)

async function get<T>(path: string) {
    let result = await api.get(path);
    return result.data as T;
}

export async function getFunctions() {
    return await get<faas.Function[]>('/system/functions');
}

export async function getFunction(name: string) {
    return await get<faas.Function>(`/system/function/${name}`);
}
