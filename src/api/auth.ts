import type { SignupFormData } from "../pages/signup/signup";
import { HttpRequest } from "../utils/ajax";
import { BASE_API_URL } from "../utils/constants";

function getEndpointUrl(targetUrl: string): string {
    return `${BASE_API_URL}/auth/${targetUrl}`;
}

const signinUrl = getEndpointUrl("signin");
const signupUrl = getEndpointUrl("signup");
const userUrl = getEndpointUrl("user");
const logoutUrl = getEndpointUrl("logout");

export interface AuthMeResult {
    avatar?: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
}

export default class AuthApi {
    public async create(data: SignupFormData): Promise<string> {
        return HttpRequest.post(signupUrl, { ...data });
    }

    public async login(login: string, password: string): Promise<string> {
        return HttpRequest.post(signinUrl, { login, password });
    }

    public async me(): Promise<AuthMeResult> {
        const result = await HttpRequest.get(userUrl);

        return JSON.parse(result) as AuthMeResult;
    }

    public async logout(): Promise<string> {
        return HttpRequest.post(logoutUrl, {});
    }
}

export const __AuthAPI = new AuthApi();
