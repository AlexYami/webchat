import type { SignupFormData } from "../../pages/signup/signup";
import { HttpRequest } from "../../utils/ajax";

const baseUrl = "https://ya-praktikum.tech/api/v2/auth";

function getEndpointUrl(targetUrl: string): string {
    return `${baseUrl}${targetUrl}`;
}

const signinUrl = getEndpointUrl("/signin");
const signupUrl = getEndpointUrl("/signup");
const userUrl = getEndpointUrl("/user");
const logoutUrl = getEndpointUrl("/logout");

export default class AuthApi {
    public async create(data: SignupFormData): Promise<string> {
        return HttpRequest.post(signupUrl, { ...data });
    }

    public async login(login: string, password: string): Promise<string> {
        return HttpRequest.post(signinUrl, { login, password });
    }

    public async me(): Promise<string> {
        const userInfo = await HttpRequest.get(userUrl);

        return JSON.parse(userInfo);
    }

    public async logout(): Promise<string> {
        return HttpRequest.post(logoutUrl, {});
    }
}

export const __AuthAPI = new AuthApi();
