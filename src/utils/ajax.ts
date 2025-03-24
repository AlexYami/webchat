import { HttpError } from "./errors";

const HTTP_ERROR_THRESHOLD = 400;
const HTTP_READY_STATE = 4;

export const HTTP_UNAUTHORIZED_ERROR = 401;

export enum RequestMethod {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
}

type HttpHeaders = Record<string, string> | null;
type HttpData = Record<string, string | number> | null;

export interface HttpRequestOptions {
    method: RequestMethod;
    url: string;
    data?: HttpData;
    headers?: HttpHeaders;
}

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

export class HttpRequest {
    public static async request(requestOptions: HttpRequestOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            const { method, url, data, headers } = HttpRequest.prepareRequestOptions(requestOptions);

            const request = new XMLHttpRequest();

            request.withCredentials = true;

            request.open(method, url, true);

            if (headers) {
                for (const headerName of Object.keys(headers)) {
                    if (headers[headerName]) request.setRequestHeader(headerName, headers[headerName]);
                }
            }

            request.onreadystatechange = (): void => {
                if (request.readyState === HTTP_READY_STATE) {
                    if (request.status < HTTP_ERROR_THRESHOLD) resolve(request.responseText);
                    else reject(new HttpError(request.status, request.statusText, request.responseText));
                }
            };

            const isFormData = data instanceof FormData;

            let body = data;

            if (data && !isFormData) {
                body = JSON.stringify(data);
            }

            request.send(body ? body : null);
        });
    }

    public static prepareRequestOptions(options: HttpRequestOptions): HttpRequestOptions {
        let { url, data } = options;

        if (options.method === RequestMethod.GET && data) {
            url += HttpRequest.prepareQueryParams(data);
            data = null;
        }

        return { url, data, method: options.method, headers: options.headers };
    }

    public static async get(url: string, headers?: HttpHeader): Promise<string> {
        return HttpRequest.request({
            method: RequestMethod.GET,
            url,
            data: null,
            headers,
        });
    }

    public static async post(url: string, data: HttpData, headers: HttpHeaders = DEFAULT_HEADERS): Promise<string> {
        return HttpRequest.request({
            method: RequestMethod.POST,
            url,
            data,
            headers,
        });
    }

    public static async put(url: string, data: HttpData, headers: HttpHeaders = DEFAULT_HEADERS): Promise<string> {
        return HttpRequest.request({
            method: RequestMethod.PUT,
            url,
            data,
            headers,
        });
    }

    public static async delete(url: string, data: HttpData, headers: HttpHeaders = DEFAULT_HEADERS): Promise<string> {
        return HttpRequest.request({
            method: RequestMethod.DELETE,
            url,
            data,
            headers,
        });
    }

    public static prepareQueryParams(data: HttpData): string {
        if (!data) return "";

        const params = new URLSearchParams();

        for (const key of Object.keys(data)) {
            const value = data[key];

            params.append(key, String(value));
        }

        return `?${params.toString()}`;
    }
}
