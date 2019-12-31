export function toJSON(filter: any) {
    let filters: any = {}
    for (const key in filter) {
        let temp: any = {}
        temp[`${filter[key]}`] = true
        filters[`${key}`] = temp
    }
    return JSON.stringify(filters);
}