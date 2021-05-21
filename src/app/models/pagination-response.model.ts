export interface PaginationResponse<T> {
    entities: T[];
    offset: number;
    totalCount: number;
}
