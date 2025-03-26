import type { SettingsEditFormData } from "../pages/settingsEdit/settingsEdit";
import type { SettingsPasswordFormData } from "../pages/settingsPassword/settingsPassword";
import { HttpRequest } from "../utils/ajax";
import { BASE_API_URL } from "../utils/constants";

const baseUrl = `${BASE_API_URL}/user`;

export interface SearchUserResult {
    avatar: string;
    display_name: string;
    first_name: string;
    id: number;
    login: string;
    second_name: string;
}

export interface UpdateUserResult {
    avatar: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
}

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

export default class UserApi {
    public async searchUser(login: string): Promise<SearchUserResult | null> {
        return HttpRequest.post(getEndpointUrl(`/search`), { login }).then((result) => {
            const users = JSON.parse(result) as unknown;

            if (Array.isArray(users)) {
                return users[0] as SearchUserResult;
            }

            return null;
        });
    }

    public async updateUser(data: SettingsEditFormData): Promise<UpdateUserResult> {
        return HttpRequest.put(getEndpointUrl(`/profile`), { ...data }).then((result) => {
            return JSON.parse(result) as UpdateUserResult;
        });
    }

    public async uploadAvatar(data: FormData): Promise<UpdateUserResult> {
        return HttpRequest.put(getEndpointUrl("/profile/avatar"), data, {}).then((result) => {
            return JSON.parse(result) as UpdateUserResult;
        });
    }

    public async changePassword(data: SettingsPasswordFormData): Promise<string> {
        return HttpRequest.put(getEndpointUrl(`/password`), { ...data });
    }
}

export const __UserAPI = new UserApi();
