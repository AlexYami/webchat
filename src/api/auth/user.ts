import { HttpRequest } from "../../utils/ajax";

const baseUrl = "https://ya-praktikum.tech/api/v2/user";

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

export default class UserApi {
    public async searchUser(login: string): Promise<string> {
        return HttpRequest.post(getEndpointUrl(`/search`), { login }).then((res) => {
            debugger;
            return JSON.parse(res);
        });
    }

    public async updateUser(data): Promise<string> {
        return HttpRequest.put(getEndpointUrl(`/profile`), data).then((res) => {
            return JSON.parse(res);
        });
    }

    public async uploadAvatar(data: FormData): Promise<string> {
        return HttpRequest.put(getEndpointUrl("/profile/avatar"), data, {}).then((res) => JSON.parse(res));
    }

    public async changePassword(data): Promise<string> {
        return HttpRequest.put(getEndpointUrl(`/password`), data);
    }
}

export const __UserAPI = new UserApi();
