import { HttpRequest } from "../utils/ajax";

const baseUrl = "https://ya-praktikum.tech/api/v2/token/53428";

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

export default class TokenApi {
    public async getToken(): Promise<string> {
        return HttpRequest.post(getEndpointUrl(""), {});
    }
}
