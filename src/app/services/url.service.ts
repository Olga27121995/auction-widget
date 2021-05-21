export type UrlType = string | number | string[] | number[];
export interface UrlQuery {
    [key: string]: any;
}

export class UrlService {
    public static getQuery(config: UrlQuery): string {
        return Object.keys(config).reduce((prev, curr) => `${prev}${this.transformValue(config[curr], curr)}`, '?');
    }

    private static transformValue(value: UrlType, key: string): string {
        if (Array.isArray(value)) {
            return this.transformArray(value.map(val => String(val)), key);
        }
        return this.transformToString(value, key);
    }

    private static transformArray(values: string[], key: string): string {
        return values && values[0] ? values.reduce((prev, curr) => `${prev}${this.transformToString(curr, key)}`, '') : '';
    }

    private static transformToString(value: string | number, key: string): string {
        return this.isEmpty(value) ? '' : `&${key}=${value}`;
    }

    private static isEmpty(value: string | number | undefined | null | string[]): boolean {
        return value === undefined || value === null || value === '';
    }
}
