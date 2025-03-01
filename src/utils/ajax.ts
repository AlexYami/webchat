import { HttpError } from "./errors";

const HTTP_ERROR_THRESHOLD = 400;
const HTTP_READY_STATE = 4;

enum RequestMethod {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
}

type HttpHeaders = Record<string, string> | null;
type HttpData = Record<string, unknown> | null;
interface HttpRequestOptions {
    method: RequestMethod;
    url: string;
    data?: HttpData;
    headers?: HttpHeaders;
}

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

export async function httpRequest({ method, url, data, headers }: HttpRequestOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open(method, url, true);

        if (headers) {
            for (const headerName of Object.keys(headers)) {
                if (headers[headerName]) request.setRequestHeader(headerName, headers[headerName]);
            }
        }

        request.onreadystatechange = (): void => {
            if (request.readyState === HTTP_READY_STATE) {
                if (request.status < HTTP_ERROR_THRESHOLD) resolve(request.responseText);
                else reject(new HttpError(request.status, request.statusText));
            }
        };

        request.send(data ? JSON.stringify(data) : null);
    });
}

export async function httpGet(url: string, headers?: HttpHeaders): Promise<string> {
    return httpRequest({
        method: RequestMethod.GET,
        url,
        data: null,
        headers,
    });
}

export async function httpPost(url: string, data: HttpData, headers: HttpHeaders = DEFAULT_HEADERS): Promise<string> {
    return httpRequest({
        method: RequestMethod.POST,
        url,
        data,
        headers,
    });
}

export async function httpPut(url: string, data: HttpData, headers: HttpHeaders = DEFAULT_HEADERS): Promise<string> {
    return httpRequest({
        method: RequestMethod.PUT,
        url,
        data,
        headers,
    });
}

export async function httpDelete(url: string, headers: HttpHeaders): Promise<string> {
    return httpRequest({
        method: RequestMethod.DELETE,
        url,
        headers,
    });
}
