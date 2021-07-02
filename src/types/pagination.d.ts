type AdditionalFields = {
    sequelizeAdditional?: any
}
export type KeyValueEntryPagination<T> = {
    [P in keyof T]?: any;
} & AdditionalFields;

export type PaginationResult<T> = {
    total: number,
    totalInPage: number,
    pages: number,
    page: number,
    data: T[]
}