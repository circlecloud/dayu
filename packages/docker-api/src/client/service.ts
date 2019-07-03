import * as api from '../utils/api';
import * as opts from '../api/opts';
import * as types from '../api/types';

export namespace service {
    export async function list(filters?: opts.service.ListOpts) {
        return await api.get<types.service.Service[]>('/services', filters);
    }
}